'use client'
import * as React from "react"
import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Provider({ children, themeProps }) {
  return (
    <NextUIProvider>
      <NextThemesProvider {...themeProps}>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}
