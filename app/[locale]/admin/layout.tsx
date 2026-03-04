'use client';

import '@/lib/parseConfig';
import type React from "react";
import Link from 'next/link';
import ThemeToggle from '@/components/theme-toggle';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Parse from 'parse';

export default function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter();

  useEffect(() => {
    const currentUser = Parse.User.current();
    if (!currentUser) {
      router.replace('/login');
    }
  }, [router]);

  return (    
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-8"> Espace Administrateur</h1>
          <nav className="space-y-4">
            <Link href="/admin#projects" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Projets
            </Link>
            <Link href="/admin#techstack" className="block py-2 px-4 text-gray-300 rounded">
              Tech Stack
            </Link>
            <Link href="/admin#blogs" className="block py-2 px-4 text-gray-300 rounded">
              Articles
            </Link>
            <Link href="/admin#services" className="block py-2 px-4 text-gray-300 rounded">
              Services
            </Link>
          </nav>
        </div>
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-gray-300 hover:text-white">
              Retour au site
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}