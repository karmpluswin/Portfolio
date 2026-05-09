import type { Metadata } from "next";
import "./globals.css";
import InitialLoaderGate from "@/components/InitialLoaderGate";

export const metadata: Metadata = {
  title: "Karmjeet Chauhan",
  description: "Personal portfolio of Karmjeet Chauhan",
  icons: {
    icon: "/kcLogo.svg",
    shortcut: "/kcLogo.svg",
    apple: "/kcLogo.svg",
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
            __html: `(()=>{try{var t=localStorage.getItem('portfolio:theme');var d=t? t==='dark' : (window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;r.classList.toggle('dark',!!d);r.classList.toggle('light',!d);}catch(e){};try{var seen=sessionStorage.getItem('portfolio:introSeen:v1')==='1';var prefersReduced=(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);if(seen||prefersReduced){document.documentElement.classList.remove('initial-loading')}}catch(e){} })();`,
          }}
        />
        <InitialLoaderGate>{children}</InitialLoaderGate>
      </body>
    </html>
  );
}
