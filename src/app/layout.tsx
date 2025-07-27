import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter_Tight } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Questporter - Quest Schedule Exporter",
  description: "A tool for UWaterloo students to export their Quest schedule to their calendar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="snOFUtkJWdWSSOA0DKvRet3UOcQjgm3kEo8tcj1Zn9g" />
      </head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-9ZJYLDGYVL"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-9ZJYLDGYVL');
        `}
      </Script>
      <body
        className={`${interTight.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
