'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Blog {
  _id: string;
  title: string;
  description: string;
  image?: string;
  author: {
    name: string;
    email: string;
  };
  createdAt: string;
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch('/api/blogs');
        if (!response.ok) throw new Error('Error al cargar los blogs');
        const data = await response.json();
        setBlogs(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los blogs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []); // Solo se ejecuta al montar el componente

  if (loading) return <div className="text-center text-gray-800 dark:text-gray-200">Cargando blogs...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (blogs.length === 0) return <div className="text-center text-gray-800 dark:text-gray-200">No hay blogs publicados aún.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <article key={blog._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-200 border border-gray-200 dark:border-gray-700">
          {blog.image && (
            <div className="relative h-48">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{blog.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{blog.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              <span>Lo escribió: {blog.author.name}</span>
              <time>Fecha: {new Date(blog.createdAt).toLocaleDateString('es-ES')}</time>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
} 