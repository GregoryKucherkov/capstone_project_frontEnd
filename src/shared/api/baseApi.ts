const BASE_URL = "https://record-api-y4hr.onrender.com/api";

export const baseFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  // Merge headers
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
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
    throw new Error(errorData.message || "API Error");
  }

  return response.json();
};