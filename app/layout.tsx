import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VidyaaraaAiWidget } from "@/components/ai/VidyaaraaAiWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CampusForge — College Resources, Tools & Study Platform",
  description: "CampusForge brings college notes, previous-year papers, SGPA and CGPA calculators, study tools and placement resources together in one place for VTU and other engineering students.",
  keywords: "VTU, SGPA, CGPA, engineering, notes, previous year papers, PYQ, calculator, study planner, placement prep, college resources",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text-1)] transition-colors duration-200">
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow pt-16" id="main-content">
            {children}
          </main>
          <Footer />
          <VidyaaraaAiWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
