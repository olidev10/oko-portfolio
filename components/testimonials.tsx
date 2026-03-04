"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { useScopedI18n } from "@/locales/client"

export default function Testimonials() {
  const t = useScopedI18n()
  // Placeholder testimonials - these will be replaced with real ones as you gain clients
  const testimonials = [
    {
      name: t('future_client'),
      role: t('role_founder'),
      content: t('content_1'),
      avatar: "FC",
      stars: 5,
    },
    {
      name: t('future_client'),
      role: t('role_pm'),
      content: t('content_2'),
      avatar: "FC",
      stars: 5,
    },
    {
      name: t('future_client'),
      role: t('role_cto'),
      content: t('content_3'),
      avatar: "FC",
      stars: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">{t('heading')}</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t('intro')}
          </p>
          <div className="h-1 w-20 bg-emerald-500 mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                <CardHeader className="pb-2">
                  <div className="flex">
                    {Array.from({ length: testimonial.stars }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-slate-600 dark:text-slate-300 italic">"{testimonial.content}"</p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-emerald-100 text-emerald-800">{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">{testimonial.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
