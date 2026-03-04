'use client';

import { usePathname } from 'next/navigation';
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Link from 'next/link';
import ThemeToggle from './theme-toggle';


interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        
            {!isAdminRoute && (
                <Navbar />
            )}
        
            {isAdminRoute && (
                <header className="bg-gray-800 text-white shadow-sm mb-10">
                    <nav className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-bold">Espace Administrateur</h1>
                            <div className="space-x-4 text-gray-300">
                                <Link href="/admin" className="hover:text-white">Dashboard</Link>
                                <Link href="/admin/projects" className="hover:text-white">Projets</Link>
                                <Link href="/" className="hover:text-white">Retour au site</Link>
                                <ThemeToggle />
                            </div>
                        </div>
                    </nav>
                </header>
            )}
      
            <main className="flex-1">{children}</main>

        </ThemeProvider>
    </>
  );
}