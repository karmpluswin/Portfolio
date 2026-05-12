import type { Metadata } from "next";
import Script from "next/script";
import { MotionConfig } from "motion/react";
import "./globals.css";
import InitialLoaderGate from "@/components/InitialLoaderGate";

export const metadata: Metadata = {
  title: "Karmjeet Chauhan",
  description: "Personal portfolio of Karmjeet Chauhan",
  icons: {
    icon: "/pfp.svg",
    shortcut: "/pfp.svg",
    apple: "/pfp.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="initial-loading">
      <body>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(()=>{try{var t=localStorage.getItem('portfolio:theme');var d=t? t==='dark' : (window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;r.classList.toggle('dark',!!d);r.classList.toggle('light',!d);}catch(e){} })();`,
          }}
        />
        <MotionConfig reducedMotion="never">
          <InitialLoaderGate>{children}</InitialLoaderGate>
        </MotionConfig>
        <Script src="/oneko.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
