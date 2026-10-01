import { sanityConfig } from "./config";

export interface SanityFetchOptions {
  query: string;
  params?: Record<string, string | number | boolean>;
  tags?: string[];
  revalidate?: number | false;
}

/**
 * Lightweight, zero-dependency Sanity fetch using native Next.js fetch with ISR caching.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = ["sanity"],
  revalidate = 60,
}: SanityFetchOptions): Promise<T | null> {
  const { projectId, dataset, apiVersion, useCdn } = sanityConfig;

  // Substitute simple params into query if provided
  let queryString = query;
  for (const [key, value] of Object.entries(params)) {
    const formatted = typeof value === "string" ? `"${value}"` : `${value}`;
    queryString = queryString.replaceAll(`$${key}`, formatted);
  }

  const host = useCdn ? `${projectId}.apicdn.sanity.io` : `${projectId}.api.sanity.io`;
  const url = `https://${host}/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(
    queryString
  )}`;

  try {
    const res = await fetch(url, {
      next: {
        revalidate: revalidate === false ? 0 : revalidate,
        tags,
      },
    });

    if (!res.ok) {
      console.warn(`Sanity query failed [${res.status}]:`, await res.text());
      return null;
    }

    const data = await res.json();
    return data.result as T;
  } catch (error) {
    console.error("Error executing Sanity query:", error);
    return null;
  }
}
