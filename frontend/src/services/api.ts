const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

function getAuthHeaders(token?: string | null): Record<string, string> {
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export async function apiGet<T>(path: string, token?: string | null): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    headers: {
      ...getAuthHeaders(token),
    },
  });
  return handleResponse<T>(res);
}

export async function apiPost<T>(path: string, body: BodyInit, token?: string | null, isJSON: boolean = true): Promise<T> {
  const headers: Record<string, string> = {
    ...getAuthHeaders(token),
  };
  if (isJSON) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers,
    body,
  });
  return handleResponse<T>(res);
}

export async function apiPut<T>(path: string, body: BodyInit, token?: string | null, isJSON: boolean = true): Promise<T> {
  const headers: Record<string, string> = {
    ...getAuthHeaders(token),
  };
  if (isJSON) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "PUT",
    headers,
    body,
  });
  return handleResponse<T>(res);
}

export async function apiPatch<T>(path: string, body: BodyInit, token?: string | null, isJSON: boolean = true): Promise<T> {
  const headers: Record<string, string> = {
    ...getAuthHeaders(token),
  };
  if (isJSON) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "PATCH",
    headers,
    body,
  });
  return handleResponse<T>(res);
}

export { API_BASE_URL };
