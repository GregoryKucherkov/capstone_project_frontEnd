export const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

export const normalizeImagePath = (path: string | undefined | null): string => {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const separator = (BACKEND_URL || "").endsWith("/") ? "" : "/";

  return `${BACKEND_URL}${separator}static${path.replace(/\\/g, "/")}`;
};
