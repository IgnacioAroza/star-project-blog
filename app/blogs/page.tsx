import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/auth.config";
import BlogList from "./blog-list";
import CreateBlogButton from "./create-blog-button";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Blogs - Star Project",
  description: "Lista de blogs sobre los avances de nuestra marca de ropa",
};

export default async function BlogsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Blogs</h1>
            <CreateBlogButton />
          </div>
          <BlogList />
        </div>
      </main>
    </div>
  );
}
