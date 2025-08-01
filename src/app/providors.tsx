'use client'

import {HeroUIProvider} from '@heroui/react'

export function HeroProviders({children}: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  )
}