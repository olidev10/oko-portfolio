"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { Leaf } from "lucide-react"
import { useEffect, useState } from "react"

export default function NotFound() {
  // Use state to store window dimensions
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })
  const [isMounted, setIsMounted] = useState(false)

  // Only access window after component is mounted
  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
    setIsMounted(true)

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Don't render animations until client-side
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-gradient relative overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md p-8 rounded-lg border border-sky-300/20 shadow-xl">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <img
                  src="/images/dev.png"
                  alt="Olivier Kouassi - Lost in the Django sky"
                  className="w-32 h-32 object-contain"
                />
              </div>
              <h1 className="text-6xl font-bold text-white mb-2">404</h1>
              <h2 className="text-2xl font-semibold text-sky-200 mb-4">Lost ?</h2>
              <p className="text-slate-200 mb-8">
                Oops! It seems you've wandered off the path. This page doesn't exist in our Universe😁.
              </p>
              <Button asChild className="bg-sky-600 hover:bg-sky-700 text-white">
                <Link href="/">
                  <Leaf className="mr-2 h-4 w-4" /> Return to my portfolio 👈🏽
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-gradient relative overflow-hidden">
      {/* sky background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url('/images/next-sky.jpg')` }}
      />

      {/* Floating leaves - only rendered client-side */}
      {Array.from({ length: 10 }).map((_, i) => (
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

      <div className="container relative z-10">
        <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md p-8 rounded-lg border border-sky-300/20 shadow-xl">
          <div className="text-center">
            <motion.div
              className="flex justify-center mb-6"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <img
                src="/images/dev.png"
                alt="Stephen Kihuni - Lost in the Django sky"
                className="w-32 h-32 object-contain"
              />
            </motion.div>

            <h1 className="text-6xl font-bold text-white mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-sky-200 mb-4">Bad news !</h2>
            <p className="text-slate-200 mb-8">
              Oops! It seems you've wandered off the path. This page doesn't exist.
            </p>

            <Button asChild className="bg-sky-600 hover:bg-sky-700 text-white">
              <Link href="/">
                <Leaf className="mr-2 h-4 w-4" /> Return to my portfolio
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
