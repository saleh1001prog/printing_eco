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
  metadataBase: new URL('https://softera-dz.com'),
  title: {
    default: "Softera-DZ | حلول برمجية احترافية للشركات الجزائرية",
    template: "%s | Softera-DZ"
  },
  description: "شركة Softera-DZ متخصصة في تطوير البرمجيات في الجزائر. نقدم أنظمة إدارة المخزون، نقطة البيع، برامج المحاسبة، وحلول برمجية متكاملة للشركات الصغيرة والمتوسطة.",
  keywords: [
    // Arabic Keywords - Algeria focused
    "Softera-DZ", "سوفتيرا الجزائر",
    "برامج محاسبة الجزائر", "نظام إدارة المخزون الجزائر",
    "نقطة البيع الجزائر", "POS الجزائر",
    "برامج إدارة المشتريات", "برنامج الفواتير",
    "نظام المحاسبة للشركات", "إدارة المبيعات",
    "برنامج المخازن", "إدارة المستودعات",
    "نظام الموارد البشرية", "برنامج الرواتب",
    // English Keywords
    "inventory management Algeria", "POS system Algeria",
    "accounting software Algeria", "business management software",
    "ERP Algeria", "warehouse management", "Softera DZ"
  ],
  authors: [{ name: "Softera-DZ", url: "https://softera-dz.com" }],
  creator: "Softera-DZ",
  publisher: "Softera-DZ",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_DZ",
    alternateLocale: ["en_US", "fr_FR"],
    url: "https://softera-dz.com",
    siteName: "Softera-DZ",
    title: "Softera-DZ | حلول برمجية احترافية للشركات الجزائرية",
    description: "شركة متخصصة في تطوير البرمجيات في الجزائر. أنظمة إدارة المخزون، نقطة البيع، برامج المحاسبة وحلول ERP متكاملة.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Softera-DZ - حلول برمجية احترافية",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Softera-DZ | حلول برمجية احترافية",
    description: "أنظمة إدارة المخزون ونقطة البيع للشركات الجزائرية",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://softera-dz.com",
    languages: {
      'ar-DZ': 'https://softera-dz.com',
      'en': 'https://softera-dz.com/en',
      'fr': 'https://softera-dz.com/fr',
    },
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-google-site-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  other: {
    'google-site-verification': 'your-google-site-verification-code',
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
