import type { Metadata } from 'next';

import '@/common/styles/globals.css';
import { TrpcProvider } from '@/trpc/client/TrpcProvider';

export const metadata: Metadata = {
  title: 'Nextjs TRPC',
  description: 'Nextjs TRPC',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="font-custom" lang="en">
      <body>
        <TrpcProvider>
          <main className="mx-20 mt-30 flex justify-center">{children}</main>
        </TrpcProvider>
      </body>
    </html>
  );
}
