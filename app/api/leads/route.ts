import { NextRequest, NextResponse } from "next/server";
import {
  CLIENT_ERROR_GENERIC_RETRY,
  toClientFriendlyError,
} from "@/lib/api/clientErrors";

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
    const serviceSlug =
      String(body.serviceSlug || body.slug || "").trim() || undefined;
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

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!service) {
      return NextResponse.json(
        { success: false, message: "Please select a service." },
        { status: 400 }
      );
    }

    if (phone && phone.length > 30) {
      return NextResponse.json(
        { success: false, message: "Please enter a shorter phone number." },
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
        ...(typeof body.formData === "object" && body.formData
          ? body.formData
          : {}),
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
      const userMessage = toClientFriendlyError(response.status, data);
      const clientStatus = response.status >= 500 ? 500 : response.status;

      return NextResponse.json(
        {
          success: false,
          message: userMessage,
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
        message: CLIENT_ERROR_GENERIC_RETRY,
      },
      { status: 500 }
    );
  }
}
