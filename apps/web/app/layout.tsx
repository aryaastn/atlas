import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ATLAS",
    template: "%s | ATLAS",
  },
  description:
    "Your Financial Operating System. Track, analyze, and optimize your financial life.",
  applicationName: "ATLAS",
  keywords: [
    "ATLAS",
    "Finance",
    "Personal Finance",
    "Investment",
    "Portfolio",
    "Dashboard",
    "Money Management",
  ],
  authors: [
    {
      name: "Arya Setiawan",
    },
  ],
  creator: "Arya Setiawan",
  publisher: "ATLAS",

  openGraph: {
    title: "ATLAS",
    description:
      "Your Financial Operating System. Track, analyze, and optimize your financial life.",
    siteName: "ATLAS",
    type: "website",
    locale: "id_ID",
  },

  twitter: {
    card: "summary_large_image",
    title: "ATLAS",
    description:
      "Your Financial Operating System. Track, analyze, and optimize your financial life.",
  },

  icons: {
    icon: "/brand/atlas-mark.svg",
    shortcut: "/brand/atlas-mark.svg",
    apple: "/brand/atlas-mark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#050816] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}