'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut({ redirect: false });
      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-indigo-600">Star Project Blog</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">
              Hola, {session?.user?.name || 'Usuario'}
            </span>
            <button
              onClick={handleSignOut}
              disabled={isLoading}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Cerrando sesión...' : 'Cerrar Sesión'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 