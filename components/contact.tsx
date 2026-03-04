"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { useScopedI18n } from "@/locales/client"

export default function Contact() {
  const t = useScopedI18n("contact")
  const access_key: string = "7cba3acc-6d19-4ae5-8bff-28f9d89d4b0d"
  const [formData, setformData] = useState({
    name: "",
    email: "",
    message: "",
    access_key,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isError, setIsError] = useState(true)
  const updateIsError = (errors: { [key: string]: string }): void => {
    const t = Object.values(errors).some((error) => error !== "")
    setIsError(t)
  }

  const inputRefs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  }

  // Regex pour validation
  const nameRegex = /^[A-Za-zÀ-ÿ' -]{2,}$/ // Lettres, espaces, tirets, apostrophes
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // Animation vibration
  const shake = (field: keyof typeof inputRefs) => {
    const ref = inputRefs[field].current
    if (ref) {
      ref.classList.add("animate-shake")
      setTimeout(() => ref.classList.remove("animate-shake"), 300)
    }
  }
  // Validation des champs
  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        if (!nameRegex.test(value)){
          return t("fields.name_error")
        }
        break
      case "email":
        if (!emailRegex.test(value)){
          return t("fields.email_error")
        }
        break
      case "message":
        if (value.trim().length < 10){
          return t("fields.message_error")
        }
        break
    }
    return ""
  }
  // Handle message errors
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setformData((prev) => ({ ...prev, [name]: value }))
    const errorMsg = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: errorMsg }))
    updateIsError({...errors, [name]: errorMsg})
  }
  // Handle message errors
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const errorMsg = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: errorMsg }))
    if (errorMsg) {
      shake(name as keyof typeof inputRefs)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validation before submission
    const newErrors: typeof errors = {}
    Object.entries(formData).forEach(([key, value]) => {
      const errorMsg = validateField(key, value)
      if (errorMsg) {
        newErrors[key] = errorMsg
        shake(key as keyof typeof inputRefs)
      }
    })
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false)
      return
    }
    const json = JSON.stringify(formData)

    const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
    });
    const result = await res.json();
    if (result.success) {
        setSubmitted(true);
        setformData({ name: "", email: "", message: "", access_key,})
    }

    setIsSubmitting(false)
    // Reset the submitted state after 10 seconds
    setTimeout(() => setSubmitted(false), 10000)
  }

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-800">
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
          <div className="h-1 w-20 bg-sky-500 mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">{t('info_heading')}</h3>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-sky-100 dark:bg-sky-900/30 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{t('email_label')}</p>
                      <p className="text-slate-800 dark:text-white font-medium">kouassiolivier18@gmail.com</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">{t('connect_heading')}</h4>
                    <div className="flex gap-4">
                      <Link
                        href="https://www.linkedin.com/in/olivier-kouassi-a5abb616a/"
                        target="_blank"
                        className="bg-slate-100 dark:bg-slate-800 p-3 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                      </Link>
                      <Link
                        href="https://github.com/MisterO1?tab=repositories" 
                        target="_blank"
                        className="bg-slate-100 dark:bg-slate-800 p-3 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        aria-label="GitHub"
                      >
                        <Github className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                      </Link>
                      {/* <Link
                        href="#"
                        className="bg-slate-100 dark:bg-slate-800 p-3 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        aria-label="Resume"
                      >
                        <FileText className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                      </Link> */}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">{t('form_heading')}</h3>

                {submitted ? (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4 text-center">
                    <h4 className="text-blue-800 dark:text-blue-400 font-medium text-lg mb-2">{t('success_title')}</h4>
                    <p className="text-blue-700 dark:text-blue-300">
                      {t('success_text')}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                      >
                        {t('fields.name_label')}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        ref={inputRefs.name}
                        value={formData.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={t('fields.name_placeholder')}
                        required
                        autoComplete="given-name"
                        className={`bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 ${errors.name ? "border-red-500 outline outline-red-500" : ""}`}
                      />
                      {errors.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs mt-1"
                        >
                          {errors.name}
                        </motion.div>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                      >
                        {t('fields.email_label')}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        ref={inputRefs.email}
                        value={formData.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={t('fields.email_placeholder')}
                        required
                        autoComplete="off"
                        className={`bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 ${errors.email ? "border-red-500 outline outline-red-500" : ""}`}
                      />
                      {errors.email && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs mt-1"
                        >
                          {errors.email}
                        </motion.div>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                      >
                        {t('fields.message_label')}
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        ref={inputRefs.message}
                        value={formData.message}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={t('fields.message_placeholder')}
                        required
                        className={`min-h-[150px] bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 ${errors.message ? "border-red-500 outline outline-red-500" : ""}`}
                      />
                      {errors.message && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs mt-1"
                        >
                          {errors.message}
                        </motion.div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-sky-600 hover:bg-sky-700 text-white"
                      disabled={isSubmitting || isError}
                    >
                      {isSubmitting ? t('sending') : t('send')}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}