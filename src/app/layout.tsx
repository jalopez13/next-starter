import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import { cn } from "@/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Next.Js 14 - Next Starter",
  description: "A basic starter for next.js.",
};

type PropsType = {
  children: Readonly<ReactNode>;
};

const RootLayout = ({ children }: PropsType) => {
  return (
    <html
      lang="en"
      className="dark"
      style={{ colorScheme: "dark" }}
    >
      <body className={cn(`min-h-screen bg-background font-sans antialiased ${inter.variable}`)}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
