export interface SubmitLeadPayload {
  name: string;
  email: string;
  phone?: string;
  service: string;
  serviceSlug?: string;
  slug?: string;
  message?: string;
}

export interface SubmitLeadResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    referenceId: string;
    name: string;
    email: string;
    service: string;
    status: string;
    createdAt: string;
  };
}

export async function submitContactLead(
  payload: SubmitLeadPayload
): Promise<SubmitLeadResponse> {
  let response: Response;
  try {
    response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      "Unable to process your request right now. Please try again later."
    );
  }

  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.success) {
    // Never display internal 5xx errors to the user
    if (response.status >= 500) {
      throw new Error(
        "Unable to process your request right now. Please try again later."
      );
    }

    // Extract field validation errors if present (Record<string, string> or Array)
    let validationMessage = "";
    if (result?.errors && typeof result.errors === "object") {
      if (Array.isArray(result.errors)) {
        validationMessage = result.errors
          .map((e: unknown) =>
            typeof e === "string"
              ? e
              : typeof e === "object" && e && "message" in e
                ? String((e as { message: unknown }).message)
                : ""
          )
          .filter(Boolean)
          .join(" ");
      } else {
        validationMessage = Object.values(
          result.errors as Record<string, unknown>
        )
          .map((v) => (typeof v === "string" ? v.trim() : ""))
          .filter(Boolean)
          .join(" ");
      }
    }

    const errorMessage =
      (result?.message &&
      result.message.toLowerCase() !== "validation failed" &&
      result.message.toLowerCase() !== "internal server error"
        ? result.message
        : validationMessage) ||
      validationMessage ||
      "Please check your details and try again.";

    throw new Error(errorMessage);
  }

  return result as SubmitLeadResponse;
}
