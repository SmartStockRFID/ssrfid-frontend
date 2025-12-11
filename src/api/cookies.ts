"server-only";

import { cookies } from "next/headers";
import type { LoginResponseDTO } from "@/types";

export const TokenCookiesKeys = {
  access: "access-token",
  refresh: "refresh-token",
};

export const AuthCookies = {
  setTokens: async (response: LoginResponseDTO) => {
    const cookiesStore = await cookies();

    const isProduction = process.env.NODE_ENV === "production";

    const sharedAtributtes = {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict" as const, // TODO: verificar se é o mais adequado
      path: "/",
    };

    cookiesStore.set({
      name: TokenCookiesKeys.access,
      value: response.access_token,
      expires: new Date(response.access_expire),
      ...sharedAtributtes,
    });

    cookiesStore.set({
      name: TokenCookiesKeys.refresh,
      value: response.refresh_token,
      expires: new Date(response.refresh_expire), // Not sure if I can just pass the string directly
      ...sharedAtributtes,
    });
  },

  getAcessToken: async (): Promise<string | null> => {
    const cookiesStore = await cookies();

    return cookiesStore.get(TokenCookiesKeys.access)?.value ?? null;
  },

  getRefreshToken: async (): Promise<string | null> => {
    const cookiesStore = await cookies();

    return cookiesStore.get(TokenCookiesKeys.refresh)?.value ?? null;
  },

  getTokens: async () => {
    const cookiesStore = await cookies();

    return {
      access: cookiesStore.get(TokenCookiesKeys.access)?.value ?? null,
      refresh: cookiesStore.get(TokenCookiesKeys.refresh)?.value ?? null,
    } satisfies { [key: string]: string | null };
  },

  deleteTokens: async () => {
    const cookiesStore = await cookies();
    cookiesStore.delete(TokenCookiesKeys.access);
    cookiesStore.delete(TokenCookiesKeys.refresh);
  },
};
