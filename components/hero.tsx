"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Leaf } from "lucide-react"
import { useScopedI18n } from "@/locales/client"

export default function Hero() {
  const t = useScopedI18n("hero")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    setIsMounted(true)
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-sky-gradient">
      {/* sky background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{
          backgroundImage: `url('/images/next-sky.jpg')`,
          transform: isMounted
            ? `translateX(${mousePosition.x * -20}px) translateY(${mousePosition.y * -20}px)`
            : "none",
        }}
      />

      {/* Floating leaves - only rendered client-side */}
      {isMounted &&
        Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-sky-300 opacity-30 z-10"
            initial={{
              x: Math.random() * dimensions.width,
              y: -20,
              rotate: Math.random() * 360,
              scale: 0.5 + Math.random() * 1.5,
            }}
            animate={{
              y: dimensions.height + 50,
              x: `calc(${Math.random() * 100}vw + ${Math.sin(i) * 100}px)`,
              rotate: Math.random() * 360 + 180,
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            <Leaf size={20 + Math.random() * 15} />
          </motion.div>
        ))}

      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              className="relative h-40 w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 animate-float"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="/images/dev.png"
                alt="Olivier KOUASSI - Frontend Developer"
                className="w-full h-full object-contain drop-shadow-xl"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {t('title_prefix')}
              <span className="text-sky-300">{t('title_stack')}</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-8 drop-shadow">
              {t('subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-sky-500 hover:bg-sky-700 text-white border-2 border-sky-500"
              >
                {t('cta_hire')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToProjects}
                className="border-2 border-sky-300 text-foreground"
              >
                {t('cta_projects')}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* sky vines */}
      <div className="absolute left-10 top-0 h-full w-24 opacity-40 pointer-events-none">
        <motion.div
          className="absolute top-0 left-4 w-4 h-full bg-contain bg-no-repeat bg-top"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 300"><path d="M12,0 Q16,50 8,100 Q0,150 12,200 Q24,250 12,300" stroke="%239ab354" fill="none" strokeWidth="2" /></svg>\')',
          }}
          animate={{ y: [0, 150, 0] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      <div className="absolute right-10 top-0 h-full w-24 opacity-40 pointer-events-none">
        <motion.div
          className="absolute top-0 right-4 w-4 h-full bg-contain bg-no-repeat bg-top"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 300"><path d="M12,0 Q8,50 16,100 Q24,150 12,200 Q0,250 12,300" stroke="%239ab354" fill="none" strokeWidth="2" /></svg>\')',
          }}
          animate={{ y: [0, 130, 0] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>
    </section>
  )}
