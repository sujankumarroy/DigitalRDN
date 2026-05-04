import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Rongpur Daily Needs",
  description: "Local Grocery Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
