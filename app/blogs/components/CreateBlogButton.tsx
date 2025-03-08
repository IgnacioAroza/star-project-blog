'use client';

import { useState } from 'react';
import BlogFormModal from './BlogFormModal';

export default function CreateBlogButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
      >
        Crear Blog
      </button>

      <BlogFormModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
} 