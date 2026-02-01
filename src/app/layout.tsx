import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { JsonLd } from "@/components/json-ld";
import { CSPostHogProvider } from "@/components/analytics-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://giftbound.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "GiftBound - The Easiest Secret Santa Generator",
    template: "%s | GiftBound",
  },
  description:
    "Organize Secret Santa exchanges in seconds. No accounts required, totally private, and free. Perfect for friends, families, and office parties.",
  keywords: [
    "Secret Santa",
    "Secret Santa Generator",
    "Office Secret Santa",
    "Christmas Gift Exchange",
    "Online Secret Santa",
    "Gift Exchange Organizer",
  ],
  authors: [{ name: "Shubham Gupta" }],
  creator: "Shubham Gupta",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "GiftBound - The Easiest Secret Santa Generator",
    description:
      "Organize Secret Santa exchanges in seconds. No accounts required, totally private, and free.",
    siteName: "GiftBound",
    images: [
      {
        url: "/og-image.png", // We will need to make sure this image exists or is generated
        width: 1200,
        height: 630,
        alt: "GiftBound Secret Santa Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GiftBound - The Easiest Secret Santa Generator",
    description:
      "Organize Secret Santa exchanges in seconds. No accounts required, totally private, and free.",
    images: ["/og-image.png"], // Same here
    creator: "@shubhamGupta", // Placeholder, user might want to update this
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  category: "technology",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "GiftBound",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google:
      "google-site-verification=kZLsm8vZ527s-_V4Tcjwn85lMqHQH7HgS8vLbfg0vmE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <link rel="icon" href="/favicon.png" sizes="any" />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CSPostHogProvider>
            <JsonLd />
            {children}
            <ToastContainer
              position="top-right"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light" // We might want to make this dynamic or 'colored'
              toastClassName="!bg-background !text-foreground !border !border-border !shadow-lg !rounded-xl !font-sans !text-sm !font-medium"
              progressClassName="!bg-primary"
            />
            <Analytics />
          </CSPostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
