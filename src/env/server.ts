import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import { removeSlahAtEndOfUrl } from "./../utils";

export const env = createEnv({
  server: {
    INTERNAL_SSRFID_API_URL: z.url().transform(removeSlahAtEndOfUrl),
  },
  client: {},
  experimental__runtimeEnv: process.env,
});
