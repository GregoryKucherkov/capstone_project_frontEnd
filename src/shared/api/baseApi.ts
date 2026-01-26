const BASE_URL = "https://record-api-y4hr.onrender.com/api";

export const baseFetch = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  const token = localStorage.getItem("token");

  // Merge headers
  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Global error handling
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    const errorMessage = errorData.detail || errorData.message || "API Error";

    const error = new Error(errorMessage);

    Object.assign(error, { status: response.status });
    throw error;

    // throw new Error(errorMessage);
  }

  return await response.json();
};
