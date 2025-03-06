import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "أصُول العقارية",
    template: `أصُول العقارية - %s`,
  },
  openGraph: {
    type: "website",
    siteName: "Ousol",
    description: "Ousol is website for buying and selling real estate",
    url: "https://app.ousol.ai/",
    locale: "ar_AR",
  },
  keywords: [],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${rubik.variable} antialiased`}
      >
        <Toaster />
        <NextTopLoader
            color={"#4C4DDC"}
            initialPosition={0.08}
            height={3}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            zIndex={1600}
          />
        {children}
      </body>
    </html>
  );
}
