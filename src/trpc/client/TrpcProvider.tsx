'use client';

import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import superjson from 'superjson';

import { makeReactQueryClient } from './makeReactQueryClient';

import { trpc } from '.';

let clientQueryClientSingleton: QueryClient | null;
const getQueryClient = () => {
  // On the server, always create a new QueryClient instance
  if (typeof window === 'undefined') return makeReactQueryClient();

  return (clientQueryClientSingleton ??= makeReactQueryClient());
};

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

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
