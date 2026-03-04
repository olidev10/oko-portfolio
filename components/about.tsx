"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf } from "lucide-react"
import { useScopedI18n } from "@/locales/client"

export default function About() {
  const t = useScopedI18n("about")
  const skills = [
    { name: "Next", icon: <img src="/svg/next-js-seeklogo.svg" loading="lazy" alt="NextJs" title="NextJs" width="64" height="64" />, color: "bg-blue-100 dark:bg-blue-900" },
    { name: "React", icon: <img src="/svg/react-seeklogo.svg" loading="lazy" alt="React" title="React" width="64" height="64"/>, color: "bg-sky-100 dark:bg-sky-900" },
    { name: "TypeScript", icon: <img src="/svg/typescript-seeklogo.svg" loading="lazy" alt="Typescript " title="Typescript " width="64" height="64"/>, color: "bg-indigo-100 dark:bg-indigo-900" },
    { name: "TailwindCSS", icon: <img src="/svg/tailwind-css-seeklogo.svg" loading="lazy" alt="TailwindCSS" title="TailwindCSS" width="64" height="64" />, color: "bg-cyan-100 dark:bg-cyan-900" },
    { name: "Sass", icon: <img src="/svg/sass-seeklogo.svg" loading="lazy" alt="Sass " title="Sass " width="64" height="64"/>, color: "bg-orange-100 dark:bg-orange-900" },
    { name: "JWT", icon: <img src="/svg/jwt-seeklogo.svg" loading="lazy" alt="Jwt" title="Jwt" width="64" height="64" />, color: "bg-red-100 dark:bg-red-900" },
  ]

  return (
    <section id="about" className="py-20 bg-white dark:bg-sky-950 relative overflow-hidden">
      {/* sky background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0 bg-contain"
          style={{
            backgroundImage: `url('/images/next-sky.jpg')`,
            backgroundPosition: "center",
            backgroundSize: "80%",
            backgroundRepeat: "no-repeat",
            filter: "blur(2px)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4 flex items-center justify-center gap-2">
            <Leaf className="h-6 w-6 text-sky-500 dark:text-sky-400" />
            {t('heading')}
            <Leaf className="h-6 w-6 text-sky-500 dark:text-sky-400" />
          </h2>
          <div className="h-1 w-20 bg-sky-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="aspect-square max-w-md mx-auto bg-gradient-to-b from-sky-700/50 to-sky-950/50 rounded-lg overflow-hidden relative">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <img
                  src="/images/dev.png"
                  alt="Olivier Kouassi - Frontend Developer"
                  className="w-full h-full object-contain p-4"
                />
              </motion.div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-sky-900/90 to-transparent p-6">
                <h3 className="text-white text-xl font-bold">Olivier kouassi</h3>
                {/* <p className="text-sky-200">Next sky Explorer</p> */}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-slate-700 dark:text-slate-300">
              {t('bio')}
            </p>
            {/* <p className="text-lg text-slate-700 dark:text-slate-300">
              ...
            </p> */}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              {skills.map((skill, index) => (
                <Card key={index} className={`border-none ${skill.color}`}>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <div className="mb-2"><div className="w-[80px] h-[80px] flex items-center justify-center">{skill.icon}</div></div>
                    <span className="font-medium text-slate-800 dark:text-white">{skill.name}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
