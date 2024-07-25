'use client'
import * as React from "react"
import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AuthProvider } from './context/AuthContext';

export function Provider({ children, themeProps, session }) {
  return (
    <NextUIProvider>
      <NextThemesProvider {...themeProps}>
        <AuthProvider>
        {children}
        </AuthProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
