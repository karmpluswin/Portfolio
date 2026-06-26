import type { Metadata } from "next";
import Script from "next/script";
import { MotionConfig } from "motion/react";
import "./globals.css";
import InitialLoaderGate from "@/components/InitialLoaderGate";

export const metadata: Metadata = {
  title: "Karmjeet Chauhan — Frontend Developer",
  description: "Personal portfolio of Karmjeet Chauhan",
  icons: {
    icon: "/pfp.jpg",
    shortcut: "/pfp.jpg",
    apple: "/pfp.jpg",
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
            __html: `(()=>{try{var key='portfolio-color-theme';var t=localStorage.getItem(key);var theme=(t==='dark'||t==='light')?t:((window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light');var r=document.documentElement;r.classList.toggle('dark',theme==='dark');r.classList.toggle('light',theme==='light');r.style.colorScheme=theme;}catch(e){}})();`,
          }}
        />
        <MotionConfig reducedMotion="user">
          <InitialLoaderGate>{children}</InitialLoaderGate>
        </MotionConfig>
        <Script src="/oneko.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
