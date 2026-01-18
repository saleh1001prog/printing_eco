import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inventory Pro - نظام إدارة المخزون الاحترافي",
  description: "نظام إدارة مخزون متكامل للشركات الصغيرة والمتوسطة. يشمل نقطة البيع، إدارة المشتريات، التصنيع، الموارد البشرية، والتقارير. يعمل بدون إنترنت.",
  keywords: ["إدارة المخزون", "نقطة البيع", "POS", "inventory management", "برنامج محاسبة", "إدارة المبيعات"],
  authors: [{ name: "Saleh Benchikh" }],
  openGraph: {
    title: "Inventory Pro - نظام إدارة المخزون الاحترافي",
    description: "نظام إدارة مخزون متكامل للشركات الصغيرة والمتوسطة",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
