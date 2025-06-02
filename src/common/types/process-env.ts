/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/consistent-type-definitions */

import { z } from 'zod';

const envVariables = z.object({
  NEXT_PUBLIC_NODE_ENV: z.union([z.literal('development'), z.literal('stage'), z.literal('production')]),
  NEXT_PUBLIC_TRPC_API: z.string(),
  MONGODB_URI: z.string(),
  EMAIL_ADDRESS: z.string(),
  EMAIL_PASSWORD: z.string(),
  EMAIL_MODE: z.union([z.literal('live'), z.literal('test')]),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
