// layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import SidebarWithState from "@/components/sideBar/mainSideBar";

// Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Inter_font = Inter({
  subsets: ['latin'],
  weight: ["100", "300", "400", "500", "600", "700", "900"],
  variable: '--font-inter'
});

// Server-side metadata (no use client directive needed)
export const metadata: Metadata = {
  title: "Jumper Media",
  description: "Jumper Media IP-DashBoard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${geistSans.variable} ${geistMono.variable} ${Inter_font.variable} antialiased`}>
        <div>
        
          <SidebarWithState>{children}</SidebarWithState>
        </div>
      </body>
    </html>
  );
}
