import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rongpur Daily Needs",
  description: "Local Grocery Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
