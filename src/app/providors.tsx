"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";

export function HeroProviders({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider placement="top-right" />
      {children}
    </HeroUIProvider>
  );
}
