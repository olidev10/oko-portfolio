"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Leaf } from "lucide-react"
import { useEffect, useState } from "react"
import { useScopedI18n } from "@/locales/client"

export default function Projects() {
  const t = useScopedI18n("projects")
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    async function load() {
      try {
        const res = await fetch('/api/projects', { cache: 'no-store' })
        const data = await res.json()
        if (!res.ok) throw new Error(data?.error || t('error_fetch'))
        if (!isMounted) return
        setProjects(Array.isArray(data) ? data.filter((project) => project.toDisplay === true) : [])
      } catch (e: any) {
        if (!isMounted) return
        setError(e?.message || t('error_unexpected'))
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    load()
    return () => { isMounted = false }
  }, [])

  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-sky-900/30">
      <div className="container mx-auto px-4">
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
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t('intro')}
          </p>
          <div className="h-1 w-20 bg-sky-500 mx-auto mt-4"></div>
        </motion.div>

        {error && (
          <p className="text-red-600 text-center mb-6">{error}</p>
        )}
        {loading ? (
          <p className="text-center text-slate-600 dark:text-slate-300">{t('loading')}</p>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full flex flex-col overflow-hidden border-slate-200 dark:border-sky-800 hover:shadow-lg transition-shadow duration-300 dark:bg-sky-800/30">
                <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-sky-800 relative group">
                  <img
                    src={(project.imageUrl || "/placeholder.svg") as string}
                    alt={(project.title || 'project image') as string}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-slate-800 dark:text-white">{(project.title as string) || t('untitled')}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(project.techStack || []).map((tech: string, i: number) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-sky-100 dark:bg-sky-700/50 text-sky-800 dark:text-sky-200"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-slate-600 dark:text-slate-300 text-base">
                    {(project.description as string) || t('no_description')}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" asChild className="border-sky-200 dark:border-sky-700">
                    <a href={(project.github as string) || '#'} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-1" /> {t('github')}
                    </a>
                  </Button>
                  {project.demo && (
                    <Button variant="outline" size="sm" asChild className="border-sky-200 dark:border-sky-700">
                      <a href={(project.demo as string)} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" /> {t('demo')}
                      </a>
                    </Button>
                  )}
                  {project.video && (
                    <Button variant="outline" size="sm" asChild className="border-sky-200 dark:border-sky-700">
                      <a href={(project.video as string)} target="_blank" rel="noopener noreferrer">
                        {t('video')}
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        )}
      </div>
    </section>
  )
}
