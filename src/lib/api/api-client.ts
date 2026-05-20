const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

export async function fetchApi<T>(path: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.error || data?.message || response.statusText;
    throw new Error(`API request failed: ${message}`);
  }

  return data as T;
}

export const API_BASE = API_BASE_URL;
