'use client';

import '@/lib/parseConfig';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Parse from 'parse';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await Parse.User.logIn(
        formData.get('username') as string,
        formData.get('password') as string
      );
      router.push('/admin');
    } catch (error) {
      setError('Identifiants invalides');
      console.log('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-sky-900/30">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-slate-900 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">Connexion Admin</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Nom d'utilisateur
            </label>
            <Input
              type="text"
              name="username"
              required
              className="mt-1 p-2 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Mot de passe
            </label>
            <Input
              type="password"
              name="password"
              required
              className="mt-1 p-2 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-sky-600 text-white rounded p-2 hover:bg-sky-700"
          >
            Se connecter
          </Button>
        </form>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}