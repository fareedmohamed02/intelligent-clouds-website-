const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";
const TOKEN_KEY = "ic_admin_token";

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit & { token?: string; formData?: boolean },
): Promise<T> {
  const { token, formData, ...rest } = init ?? {};
  const headers = new Headers(rest.headers ?? {});

  if (!formData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const auth = token ?? getAuthToken();
  if (auth) {
    headers.set("Authorization", `Bearer ${auth}`);
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers,
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new Error(body?.message ?? `Request failed (${res.status})`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

export async function uploadImage(file: File) {
  const body = new FormData();
  body.append("file", file);
  const res = await apiFetch<{
    success: boolean;
    data: { url: string; filename: string };
  }>("/admin/uploads", {
    method: "POST",
    body,
    formData: true,
  });
  return `${API_URL}${res.data.url}`;
}

export { API_URL };
