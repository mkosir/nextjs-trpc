'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import superjson from 'superjson';

import { trpc } from './client';

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line react/hook-use-state
  const [queryClient] = useState(() => new QueryClient({}));

  // eslint-disable-next-line react/hook-use-state
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          transformer: superjson,
          url: process.env.NEXT_PUBLIC_TRPC_API,
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
