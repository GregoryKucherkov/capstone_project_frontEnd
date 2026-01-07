import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is "fresh" for 5 minutes
      gcTime: 1000 * 60 * 60, // Keep in cache for 30 min hours
      retry: 1, // Retry failed requests once before showing error
      refetchOnWindowFocus: false, // Don't refetch every time you switch tabs
    },
  },
});