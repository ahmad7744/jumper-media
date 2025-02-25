"use client";

import { Geist, Geist_Mono, Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import SidebarWithState from "@/components/sideBar/mainSideBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Inter_font = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "900"],
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const publicRoutes = ["/login", "/signup"];

  return (
    <html>
      <body className={`${geistSans.variable} ${geistMono.variable} ${Inter_font.variable} antialiased`}>
        {publicRoutes.includes(pathname) ? children : <SidebarWithState>{children}</SidebarWithState>}
      </body>
    </html>
  );
}
