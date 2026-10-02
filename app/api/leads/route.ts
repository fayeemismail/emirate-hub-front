import { NextRequest, NextResponse } from "next/server";

function getBackendLeadsEndpoint(): string {
  const rawBase =
    process.env.BACKEND_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";
  const trimmed = rawBase.replace(/\/+$/, "");

  if (trimmed.endsWith("/api")) {
    return `${trimmed}/v1/public/leads`;
  }
  return `${trimmed}/api/v1/public/leads`;
}

function extractUserFacingError(
  status: number,
  data: Record<string, unknown> | null
): string {
  const rawMessage = typeof data?.message === "string" ? data.message.trim() : "";

  // Check if a duplicate key error leaked or was normalized by the backend
  if (
    rawMessage.toLowerCase().includes("duplicate field value") ||
    rawMessage.toLowerCase().includes("e11000")
  ) {
    return "You have already submitted an application with these details.";
  }

  // Never expose 5xx internal server errors to the user
  if (status >= 500) {
    return "Unable to process your request right now. Please try again later.";
  }

  // Extract field-level validation messages (Record<string, string> or Array)
  if (data?.errors && typeof data.errors === "object") {
    if (Array.isArray(data.errors)) {
      const messages = data.errors
        .map((err) =>
          typeof err === "string"
            ? err
            : typeof err === "object" && err && "message" in err
              ? String((err as { message: unknown }).message)
              : ""
        )
        .filter(Boolean);
      if (messages.length > 0) {
        return messages.join(" ");
      }
    } else {
      const messages = Object.values(data.errors as Record<string, unknown>)
        .map((val) => (typeof val === "string" ? val.trim() : ""))
        .filter(Boolean);
      if (messages.length > 0) {
        return messages.join(" ");
      }
    }
  }

  // Pass through operational 4xx messages from the backend (e.g., already submitted, conflict, rate limit)
  if (
    rawMessage &&
    rawMessage.toLowerCase() !== "internal server error" &&
    rawMessage.toLowerCase() !== "validation failed"
  ) {
    return rawMessage;
  }

  return "Please check your details and try again.";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = String(body.name || "").trim();
    const nameParts = name.split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    const phone = body.phone ? String(body.phone).trim() : undefined;
    const service = String(
      body.service || body.businessActivity || "General Inquiry"
    ).trim();
    const serviceSlug = String(
      body.serviceSlug || body.slug || ""
    ).trim() || undefined;
    const message =
      body.message || body.request
        ? String(body.message || body.request).trim()
        : undefined;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email address is required." },
        { status: 400 }
      );
    }

    if (!service) {
      return NextResponse.json(
        { success: false, message: "Please select a service." },
        { status: 400 }
      );
    }

    // Payload aligned with foundx-crm-backend createPublicLeadSchema
    const backendPayload: Record<string, unknown> = {
      name: name || "Anonymous Client",
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      email,
      ...(phone && { phone }),
      service,
      ...(serviceSlug && { serviceSlug, slug: serviceSlug }),
      ...(message && { message }),
      formData: {
        ...(typeof body.formData === "object" && body.formData ? body.formData : {}),
        ...(serviceSlug && { serviceSlug, slug: serviceSlug }),
      },
    };

    const endpoint = getBackendLeadsEndpoint();

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(backendPayload),
    });

    const data = (await response.json().catch(() => null)) as Record<
      string,
      unknown
    > | null;

    if (!response.ok) {
      const userMessage = extractUserFacingError(response.status, data);
      const clientStatus = response.status >= 500 ? 500 : response.status;

      return NextResponse.json(
        {
          success: false,
          message: userMessage,
          ...(clientStatus < 500 && data?.errors ? { errors: data.errors } : {}),
        },
        { status: clientStatus }
      );
    }

    return NextResponse.json(
      data || {
        success: true,
        message: "Lead submitted successfully",
      },
      { status: response.status }
    );
  } catch (error) {
    console.error("Error forwarding contact lead to CRM backend:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to process your request right now. Please try again later.",
      },
      { status: 500 }
    );
  }
}
