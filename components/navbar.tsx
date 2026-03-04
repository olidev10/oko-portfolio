"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import { Menu, X, Leaf } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { useScopedI18n } from "@/locales/client"
import LocaleToggle from "@/components/locale-toggle"

type NavItem = "home" | "about" | "projects" | "contact"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useScopedI18n("navbar")
  const isMobile = useMobile()

  const navItems : { name: NavItem, href: string}[] = [
    { name: "home", href: "#" },
    { name: "projects", href: "#projects" },
    { name: "about", href: "#about" },
    { name: "contact", href: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false)
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 dark:bg-sky-900/90 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-2">
              <img src="/images/logo.png" alt="Stephen Kihuni" className="h-10 w-10 rounded-md" />
              <div className={`${isScrolled ? "text-slate-600 dark:text-white" : "text-white"} "font-bold text-xl flex items-center`}>
                Olivier<span className="text-sky-500 dark:text-sky-300"> KOUASSI</span>
                <Leaf className="h-4 w-4 ml-1 text-sky-500 dark:text-sky-300" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  onClick={() => scrollToSection(item.href)}
                  className={`${ isScrolled ? "text-slate-600" : "text-white"} dark:text-slate-300 dark:hover:text-white`}
                >
                  {t(item.name)}
                </Button>
              ))}
              <LocaleToggle isScrolled={isScrolled}/>
              <ThemeToggle isScrolled={isScrolled}/>
            </nav>

            {/* Mobile Navigation Toggle */}
            <div className="flex items-center md:hidden gap-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-slate-800 dark:text-white" />
                ) : (
                  <Menu className="h-6 w-6 text-slate-800 dark:text-white" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && isMobile && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-sky-900/95 pt-16">
          <nav className="container mx-auto px-4 py-8 flex flex-col gap-4">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                onClick={() => scrollToSection(item.href)}
                className="w-full justify-start text-lg py-4 text-slate-800 dark:text-white"
              >
                {t(item.name)}
              </Button>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
