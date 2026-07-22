// Spring Boot API client (not Supabase).
// Configure the backend base URL via VITE_API_BASE_URL, e.g.
//   VITE_API_BASE_URL=https://api.agripen.example.com
// When unset, the client runs in `simulated` mode so the UI still works.

export const API_BASE_URL: string = (
  import.meta.env.VITE_API_BASE_URL ?? ""
).replace(/\/$/, "");

export const IS_SIMULATED = API_BASE_URL === "";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
  timeoutMs = 8000,
): Promise<T> {
  if (IS_SIMULATED) {
    throw new ApiError("API base URL not configured", 0);
  }
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
      },
    });
    if (!res.ok) {
      throw new ApiError(`Request failed (${res.status})`, res.status);
    }
    return (await res.json()) as T;
  } finally {
    clearTimeout(t);
  }
}
