import type { NextRequest } from "next/server";
import { TokenCookiesKeys } from "@/api/cookies";
import { AppRoutes } from "./constants";

export function proxy(request: NextRequest) {
  const token = request.cookies.get(TokenCookiesKeys.access)?.value; // TODO: Change to refresh token

  const publicRoutes = [AppRoutes.login];

  const isPublicRoute = publicRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (!token && !isPublicRoute) {
    return Response.redirect(new URL(AppRoutes.login, request.url));
  }

  if (token && request.nextUrl.pathname.startsWith(AppRoutes.login)) {
    return Response.redirect(new URL("/", request.url));
  }

  return;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/autenticacao/login"],
};
