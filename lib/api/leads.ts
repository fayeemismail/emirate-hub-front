import {
  CLIENT_ERROR_GENERIC_CHECK,
  CLIENT_ERROR_GENERIC_RETRY,
  toClientFriendlyError,
} from "./clientErrors";

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
    throw new Error(CLIENT_ERROR_GENERIC_RETRY);
  }

  const result = (await response.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;

  if (!response.ok || !result?.success) {
    throw new Error(
      toClientFriendlyError(response.status, result, CLIENT_ERROR_GENERIC_CHECK)
    );
  }

  return result as unknown as SubmitLeadResponse;
}
