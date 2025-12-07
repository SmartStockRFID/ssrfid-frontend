"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/ui/theme-provider";

export default function RootProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem
      defaultTheme="system"
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
