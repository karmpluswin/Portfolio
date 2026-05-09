import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
