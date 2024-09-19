import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

import { Providers } from "@/components/providers";
import { cn } from "@/utils";

import "./globals.css";

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
    <html lang="en">
      <body className={cn(`min-h-screen bg-background font-sans antialiased ${inter.variable}`)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
