'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateBlogButton() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      image: formData.get('image') as string,
    };

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el blog');
      }

      // Limpiar el formulario y cerrar el modal
      setIsModalOpen(false);
      
      // Forzar la actualización de los datos
      router.refresh();
      
      // Esperar un momento y recargar los datos
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al crear el blog');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Crear Blog
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-black">Crear Nuevo Blog</h2>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-black">
                  Título
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-black">
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-black">
                  URL de la imagen (opcional)
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? 'Creando...' : 'Crear Blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
} 