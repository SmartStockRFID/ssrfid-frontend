import type { Route } from "next";
import { env } from "./env/client";

interface AssetsDefinition {
  [key: string]: string | AssetsDefinition;
}

export const Assets = {
  icons: {
    toyota: "/icons/toyota-icon.svg",
    newland: "/icons/newland-icon.svg",
  },
  favicons: {
    app: "/favicons/app.ico",
    newland: "/favicons/newland.ico",
  },
} satisfies AssetsDefinition;

interface AppRoutesDefinition {
  [key: string]: Route | AppRoutesDefinition;
}

export const AppRoutes = {
  dashboard: "/",
  login: "/autenticacao/login",
  products: "/produtos",
} satisfies AppRoutesDefinition;

export const DEFAULT_HEADERS = {
  "Accept-Language": "pt-BR" as const,
  "Content-Type": "application/json" as const,
};

export const newlandTheme: boolean = env.NEXT_PUBLIC_THEME_MODE === "newland";
