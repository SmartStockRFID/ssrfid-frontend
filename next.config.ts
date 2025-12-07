import type { NextConfig } from "next";
import { env as clientEnv } from "@/env/client";
import { env as serverEnv } from "@/env/server";

console.debug(clientEnv);
console.debug(serverEnv);

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@t3-oss/env-nextjs"],
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
