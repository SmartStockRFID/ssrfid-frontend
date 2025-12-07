import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Assets, newlandTheme } from "@/constants";
import { cn } from "@/utils";
import RootProvider from "./providers";

const toyotaFont = localFont({
  src: "../../public/fonts/Toyota-Type.ttf",
});

const rubikFont = Rubik({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SSRFID Newland",
  description: "Módulo de gestão do inventário ",
  icons: [
    {
      rel: "icon",
      url: newlandTheme ? Assets.favicons.newland : Assets.favicons.app,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const font = newlandTheme ? toyotaFont : rubikFont;
  const theme = newlandTheme ? "theme-red" : "theme-blue";
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          `${font.className} ${theme} min-h-svh flex flex-col antialiased`,
        )}
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
