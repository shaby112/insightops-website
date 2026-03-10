const ENV_API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL?.replace(/\/$/, "");

function inferApiBaseUrl(): string {
  if (ENV_API_BASE_URL) return ENV_API_BASE_URL;

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    const isLocalHost = host === "localhost" || host === "127.0.0.1";
    if (!isLocalHost) {
      // Safe production fallback to avoid accidentally calling localhost from deployed frontend.
      return "https://kuantra-v1-backend.vercel.app";
    }
  }

  return "http://127.0.0.1:8000";
}

export const API_BASE_URL = inferApiBaseUrl();

export class ApiError extends Error {
  status: number;
  detail?: unknown;
  constructor(message: string, status: number, detail?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
  }
}

async function parseJsonSafe(res: Response): Promise<any> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

type ApiFetchInit = RequestInit & {
  auth?: boolean;
  token?: string | null;
};

export async function apiFetch<T>(
  path: string,
  init?: ApiFetchInit
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
  const headers = new Headers(init?.headers || {});
  if (!(init?.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (init?.token) {
    headers.set("Authorization", `Bearer ${init.token}`);
  }

  const res = await fetch(url, { ...init, headers });
  if (!res.ok) {
    const data = await parseJsonSafe(res);
    const msg =
      (data && (data.detail || data.message)) || res.statusText || "Request failed";
    throw new ApiError(String(msg), res.status, data);
  }
  return (await parseJsonSafe(res)) as T;
}

export async function apiFetchWithToken<T>(
  path: string,
  token: string,
  init?: RequestInit,
): Promise<T> {
  return apiFetch<T>(path, { ...init, token });
}
