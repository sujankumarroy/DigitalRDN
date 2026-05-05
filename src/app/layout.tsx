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
          <div className="min-h-100 pt-20 p-5 max-w-200 m-auto">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
