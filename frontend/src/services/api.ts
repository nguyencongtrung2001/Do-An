const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

/**
 * Enhanced API layer with centralized configuration and interceptor-like behavior.
 */

interface RequestOptions extends RequestInit {
  token?: string | null;
  isJSON?: boolean;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { token, isJSON = true, ...fetchOptions } = options;
  
  const headers = new Headers(fetchOptions.headers);
  
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  
  if (isJSON && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...fetchOptions,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      // Global Interceptor logic (e.g., handle 401 Unauthorized)
      if (response.status === 401) {
        console.warn("Session expired. Redirection logic should be handled by the caller or a global event.");
      }
      throw new Error(data.message || `API Error: ${response.status} ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error(`API Request Failure [${options.method || 'GET'} ${path}]:`, error);
    throw error;
  }
}

export async function apiGet<T>(path: string, token?: string | null): Promise<T> {
  return request<T>(path, { method: "GET", token });
}

export async function apiPost<T>(path: string, body: unknown, token?: string | null, isJSON: boolean = true): Promise<T> {
  return request<T>(path, {
    method: "POST",
    token,
    isJSON,
    body: isJSON ? JSON.stringify(body) : (body as BodyInit),
  });
}

export async function apiPut<T>(path: string, body: unknown, token?: string | null, isJSON: boolean = true): Promise<T> {
  return request<T>(path, {
    method: "PUT",
    token,
    isJSON,
    body: isJSON ? JSON.stringify(body) : (body as BodyInit),
  });
}

export async function apiPatch<T>(path: string, body: unknown, token?: string | null, isJSON: boolean = true): Promise<T> {
  return request<T>(path, {
    method: "PATCH",
    token,
    isJSON,
    body: isJSON ? JSON.stringify(body) : (body as BodyInit),
  });
}

export async function apiDelete<T>(path: string, token?: string | null): Promise<T> {
  return request<T>(path, { method: "DELETE", token });
}

export { API_BASE_URL };
