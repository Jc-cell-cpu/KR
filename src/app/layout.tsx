import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { StarBackground } from "@/components/layout/star-background";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KR Dashboard",
  description: "Enterprise platform for AI agents, legal ops, analytics, and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full overflow-x-hidden bg-background text-foreground transition-colors duration-200">
        <ThemeProvider>
          <Sidebar />
          <main className="relative min-h-screen p-3 pt-[84px] lg:ml-[88px] lg:pt-3">
            <StarBackground />
            <div className="relative z-10 min-w-0">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
