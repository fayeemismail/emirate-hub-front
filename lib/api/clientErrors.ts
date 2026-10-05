/**
 * Maps CRM/BFF error payloads into short, client-safe copy for the public contact form.
 * Never surfaces Sanity/Mongo/stack internals.
 */

const GENERIC_RETRY =
  "Unable to process your request right now. Please try again later.";

const GENERIC_CHECK =
  "Please check your details and try again.";

function normalize(text: string): string {
  return text.trim().toLowerCase();
}

function firstMeaningfulMessage(
  data: Record<string, unknown> | null | undefined
): string {
  if (!data) return "";

  const top =
    typeof data.message === "string" ? data.message.trim() : "";
  if (
    top &&
    normalize(top) !== "validation failed" &&
    normalize(top) !== "internal server error" &&
    normalize(top) !== "bad request"
  ) {
    return top;
  }

  const errors = data.errors;
  if (!errors || typeof errors !== "object") return top || "";

  if (Array.isArray(errors)) {
    return errors
      .map((err) =>
        typeof err === "string"
          ? err.trim()
          : typeof err === "object" && err && "message" in err
            ? String((err as { message: unknown }).message).trim()
            : ""
      )
      .filter(Boolean)
      .join(" ");
  }

  return Object.values(errors as Record<string, unknown>)
    .map((val) => (typeof val === "string" ? val.trim() : ""))
    .filter(Boolean)
    .join(" ");
}

/**
 * Translate a raw API message (and optional HTTP status) into visitor-facing text.
 */
export function toClientFriendlyError(
  status: number | undefined,
  data: Record<string, unknown> | null | undefined,
  fallback = GENERIC_CHECK
): string {
  if (typeof status === "number" && status >= 500) {
    return GENERIC_RETRY;
  }

  if (status === 429) {
    return "Too many requests. Please wait a moment and try again.";
  }

  const raw = firstMeaningfulMessage(data);
  const lower = normalize(raw);

  if (!raw) return fallback;

  if (
    lower.includes("duplicate") ||
    lower.includes("e11000") ||
    lower.includes("already submitted") ||
    lower.includes("already been submitted")
  ) {
    return "You have already submitted an inquiry with these details.";
  }

  if (
    lower.includes("invalid service") ||
    lower.includes("service must exist") ||
    lower.includes("emiratecorporateservice") ||
    lower.includes("services catalog")
  ) {
    return "Please select a valid service from the list and try again.";
  }

  if (
    lower.includes("sanity") ||
    lower.includes("pipeline configuration") ||
    lower.includes("temporarily unavailable") ||
    lower.includes("service unavailable")
  ) {
    return GENERIC_RETRY;
  }

  if (lower.includes("phone") && (lower.includes("30") || lower.includes("max"))) {
    return "Please enter a shorter phone number.";
  }

  if (lower.includes("invalid email") || lower.includes("email address format")) {
    return "Please enter a valid email address.";
  }

  if (lower.includes("email") && lower.includes("required")) {
    return "Email address is required.";
  }

  if (lower.includes("service") && lower.includes("required")) {
    return "Please select a service.";
  }

  if (lower.includes("message") && (lower.includes("2000") || lower.includes("max"))) {
    return "Your message is too long. Please shorten it and try again.";
  }

  if (lower.includes("name") && lower.includes("exceed")) {
    return "Please use a shorter name.";
  }

  if (
    lower.includes("mongo") ||
    lower.includes("cast error") ||
    lower.includes("objectid") ||
    lower.includes("jwt") ||
    lower.includes("token") ||
    lower.includes("cors") ||
    lower.includes("stack") ||
    lower.includes("enoent") ||
    lower.includes("econnrefused")
  ) {
    return GENERIC_RETRY;
  }

  // Already-friendly BFF / short operational copy — keep if it doesn't look technical.
  if (
    raw.length <= 160 &&
    !lower.includes("slug") &&
    !lower.includes("cms") &&
    !lower.includes("sanity") &&
    !lower.includes("mongodb") &&
    !/`[^`]+`/.test(raw) &&
    !/'[^']{20,}'/.test(raw)
  ) {
    return raw;
  }

  return fallback;
}

export const CLIENT_ERROR_GENERIC_RETRY = GENERIC_RETRY;
export const CLIENT_ERROR_GENERIC_CHECK = GENERIC_CHECK;
