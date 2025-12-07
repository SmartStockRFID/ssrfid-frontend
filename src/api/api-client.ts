"use server";

import { redirect } from "next/navigation";
import { AppRoutes, DEFAULT_HEADERS } from "@/constants";
import { env } from "@/env/server";
import { ExternalAPIException, NetworkFetchException } from "@/exceptions";
import { AuthCookies } from "./cookies";
import { refreshTokenAction } from "./mutations";

const BACKEND_URL = env.INTERNAL_SSRFID_API_URL;

type QueryClient = (
  endpoint: string,
  options?: RequestInit & { skipErrorOnThisCodes?: number[]; baseUrl?: string },
) => Promise<Response | ExternalAPIException | NetworkFetchException>;

/**
 * Faz requisições de Client Components via Server Actions, lidando com rotação de tokens.
 */
export const apiClient: QueryClient = async (
  endpoint,
  options,
): Promise<Response | NetworkFetchException | ExternalAPIException> => {
  const UNAUTHORIZED = 401;

  const onLogout = async () => {
    await AuthCookies.deleteTokens();
    redirect(AppRoutes.login);
  };

  const skipError = (statusCode: number) =>
    options?.skipErrorOnThisCodes?.includes(statusCode);

  function request(token: string | null) {
    return fetch(`${options?.baseUrl ?? BACKEND_URL}${endpoint}`, {
      ...options,
      headers: {
        ...DEFAULT_HEADERS,
        Authorization: `Bearer ${token}`,
        ...options?.headers,
      },
    });
  }

  const accessToken: string | null = await AuthCookies.getAcessToken();

  let firstResponse: Response = new Response(null, { status: UNAUTHORIZED });

  if (accessToken) {
    try {
      firstResponse = await request(accessToken);
    } catch (err) {
      return new NetworkFetchException(`Netowrk error during fetch: ${err}`);
    }

    if (firstResponse.ok || skipError(firstResponse.status)) {
      return firstResponse;
    }
  }

  if (!accessToken || firstResponse.status === UNAUTHORIZED) {
    const refresh = await refreshTokenAction();

    if (!refresh.success || typeof refresh.token !== "string") {
      await onLogout();
    }

    let retryResponse: Response;

    try {
      retryResponse = await request(refresh.token);
    } catch (err) {
      return new NetworkFetchException(`Netowrk error during fetch: ${err}`);
    }

    if (retryResponse.ok || skipError(retryResponse.status)) {
      return retryResponse;
    }

    if (retryResponse.status === UNAUTHORIZED) {
      await onLogout();
    }
    return new ExternalAPIException(
      `Response from API was not ok: ${retryResponse.status}`,
    );
  }

  return new ExternalAPIException(
    `Response from API was not ok: ${firstResponse.status}`,
  );
};
