"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, Lock, Server, Settings, Workflow, Leaf } from "lucide-react"

export default function Services() {
  const services = [
    {
      title: "title",
      description: "description",
      icon: <Server className="h-10 w-10 text-sky-500" />,
    },
  ]

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="services" className="py-20 bg-white dark:bg-sky-950 relative overflow-hidden">
      {/* sky vines decoration */}
      <div className="absolute -left-4 top-0 w-24 h-full opacity-10 pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 600"><path d="M30,0 Q60,100 20,200 Q-20,300 30,400 Q80,500 30,600" stroke="%239ab354" fill="none" strokeWidth="5" /></svg>\')',
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        />
      </div>

      <div className="absolute -right-4 top-0 w-24 h-full opacity-10 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-full h-full"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 600"><path d="M70,0 Q40,100 80,200 Q120,300 70,400 Q20,500 70,600" stroke="%239ab354" fill="none" strokeWidth="5" /></svg>\')',
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
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
            heading
            <Leaf className="h-6 w-6 text-sky-500 dark:text-sky-400" />
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            intro
          </p>
          <div className="h-1 w-20 bg-sky-500 mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-slate-200 dark:border-sky-800 hover:shadow-md transition-shadow duration-300 dark:bg-sky-900/30">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-full p-2 bg-sky-100 dark:bg-sky-800">{service.icon}</div>
                  <CardTitle className="text-xl text-slate-800 dark:text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 dark:text-slate-300 text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" onClick={scrollToContact} className="bg-sky-600 hover:bg-sky-700 text-white">
            cta
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
