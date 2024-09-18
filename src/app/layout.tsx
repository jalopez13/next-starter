import type { Metadata } from "next";
import { ReactNode } from "react";

import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
