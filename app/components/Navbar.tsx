'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Solo ejecutar en el cliente para evitar problemas de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Si no está montado aún, no renderizar nada
  if (!mounted) return null;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-lg sm:text-xl font-bold text-indigo-600 dark:text-indigo-400 truncate">
              Star Project Blog
            </h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hidden sm:block">
              Hola,{' '}
            </span>
            <span className="text-sm sm:text-base font-medium text-indigo-600 dark:text-indigo-400 truncate max-w-[100px] sm:max-w-none">
              {session?.user?.name || 'Usuario'}
            </span>
            <button
              onClick={handleSignOut}
              disabled={isLoading}
              className="ml-2 sm:ml-4 bg-red-600 dark:bg-red-700 text-white px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-md hover:bg-red-700 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="hidden sm:inline">Cerrando...</span>
                  <span className="sm:hidden">...</span>
                </span>
              ) : (
                <>
                  <span className="hidden sm:inline">Cerrar Sesión</span>
                  <span className="sm:hidden">Salir</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 