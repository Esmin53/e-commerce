import type { Metadata } from "next";
import "@uploadthing/react/styles.css";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {Toaster} from "sonner"
import FooterComponent from "@/components/FooterComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cottonwood & Co.",
  description: "Vintage tyle & vintage prices ",
  icons: {
    icon: "/icon.ico",
    href: "/icon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html lang="en" className="h-full">
    <head>
        <link rel='icon' href='/icon.ico' />
        </head>
  <body className={`relative h-full antialiased min-h-screen ${inter.className} bg-blue-50`}>
    <main className="relative flex flex-col min-h-screen bg-blue-50">
      <Navbar />
      <div className="flex-grow flex-1">
        {children}
      </div>
      <FooterComponent />
    </main>
    <Toaster richColors position="top-center"/>
  </body>
</html>
  );
}
