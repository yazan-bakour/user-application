"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ThemeProvider } from "../contexts/ThemeContext";

export function HeroProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <HeroUIProvider>
        <ToastProvider placement="top-right" />
        {children}
      </HeroUIProvider>
    </ThemeProvider>
  );
}
