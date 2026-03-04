import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import ConditionalLayout from '@/components/ConditionalLayout'
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Frontend Developer | Olivier KOUASSI",
  description: "Frontend Developer specializing in Next & React & tailwindCSS",
  icons: {
    icon: [{ url: "/images/dev.png" }],
  },
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: Promise<{locale: string}>
}>) {
  const { locale } = await params

  return (    
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers locale={locale}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
