// src/providers/QueryProvider.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { useState } from 'react';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // We use useState to ensure the client is created ONLY ONCE per session
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 60,
            retry: 1,
            // 2. Dynamic setting for Window Focus
            refetchOnWindowFocus: import.meta.env.PROD,
            // refetchOnWindowFocus: false, // Don't refetch every time you switch tabs
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Devtools will only show up in development mode automatically */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}