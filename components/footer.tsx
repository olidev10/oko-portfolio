import { Github, Linkedin, Mail, Leaf } from "lucide-react"
import Link from "next/link"
import { getScopedI18n } from "@/locales/server"

export default async function Footer() {
  const t = await getScopedI18n("footer")

  return (
    <footer className="py-8 bg-sky-900 text-slate-300 relative overflow-hidden">
      {/* sky silhouette at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-20">
        <div
          className="w-full h-full bg-bottom bg-repeat-x"
          style={{
            backgroundImage: `url('/images/next-sky.jpg')`,
            backgroundSize: "auto 100%",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 flex items-center gap-3">
            <img src="/images/dev.png" alt="Olivier Kouassi" className="h-10 w-10 rounded-md" />
            <div>
              <p className="text-lg font-semibold flex items-center">
                Olivier Kouassi <Leaf className="h-4 w-4 ml-1 text-sky-400" />
              </p>
              <p className="text-sm text-sky-400">{t('role')}</p>
            </div>
          </div>

          <div className="flex gap-4 mb-4 md:mb-0">
            <Link
              href="https://www.linkedin.com/in/olivier-kouassi-a5abb616a/"
              className="p-2 rounded-full hover:bg-sky-800 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="https://github.com/MisterO1"
              className="p-2 rounded-full hover:bg-sky-800 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:kouassiolivier18@gmail.com.com"
              className="p-2 rounded-full hover:bg-sky-800 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>

          <div className="text-sm text-sky-400">© 2025 Olivier Kouassi. {t('rights')}</div>
        </div>
      </div>
    </footer>
  )
}
