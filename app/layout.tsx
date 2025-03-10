import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./providers";
import { ThemeProvider } from "./context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog de Star Project",
  description: "Blog sobre los avances de nuestra marca de ropa",
  icons: {
    icon: [
      {
        url: "/starIcon.jpg",
        href: "/starIcon.jpg",
      }
    ],
    apple: [
      {
        url: "/starIcon.jpg",
        href: "/starIcon.jpg",
      }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} transition-colors duration-200`}>
        <NextAuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
