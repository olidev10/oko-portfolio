'use client'

import { Button } from "./ui/button"
import { Globe } from 'lucide-react'
import Router from "next/router"
import { usePathname, useRouter } from "next/navigation"

interface LocaleToggleProps {
    isScrolled?: boolean
  }

export default function LocaleToggle({ isScrolled }: LocaleToggleProps ){
  
  const pathname = usePathname()
  const locale = pathname.split('/')[1]
  const router = useRouter()

  const switchLocale = () => {
    const newLocale = locale === 'en' ? 'fr' : 'en'
    router.push(`/${newLocale}`)
  }
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => switchLocale()}
      className={`rounded-full ${isScrolled ? "text-slate-600 dark:text-foreground" : "text-accent-foreground"}`}
      aria-label="Toggle locale"
    >
      <Globe className="h-5 w-5" />
    </Button>
  )
}

