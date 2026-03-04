import { ChevronDown } from "lucide-react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"


export default function Home() {
  
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      <div className="flex justify-center my-8">
        <a href="#about" className="animate-bounce p-2 bg-slate-100 rounded-full dark:bg-slate-800 transition-colors">
          <ChevronDown className="h-6 w-6 text-slate-700 dark:text-slate-200" />
        </a>
      </div>

      <About />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
