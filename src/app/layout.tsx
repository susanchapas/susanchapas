import type { Metadata } from "next";
import { Instrument_Sans, Hanken_Grotesk, Geist_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import LazyCustomCursor from "@/components/LazyCustomCursor";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import SiteChrome from "@/components/SiteChrome";
import { baseOpenGraph, siteDescription, siteName, siteTitle } from "@/lib/metadata";


const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  preload: false,
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "800"],
  preload: false,
});

const baseUrl = "https://susanchapas.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  authors: [{ name: siteName, url: baseUrl }],
  creator: siteName,
  publisher: siteName,
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
  openGraph: {
    ...baseOpenGraph,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "./",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteName,
  jobTitle: "UX Researcher & Designer",
  description: siteDescription,
  url: baseUrl,
  sameAs: ["https://linkedin.com/in/susan-chapas", "https://github.com/susanchapas"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jersey City",
    addressRegion: "NJ",
    addressCountry: "US",
  },
  knowsAbout: [
    "UX Research",
    "UX Design",
    "Human-Computer Interaction",
    "Accessibility",
    "Usability Testing",
    "Heuristic Evaluation",
    "Prototyping",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${hankenGrotesk.variable} ${geistMono.variable} ${dmSans.variable}`}
    >
      <head>
        <link rel="dns-prefetch" href="https://linkedin.com" />
        <link rel="dns-prefetch" href="https://github.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-primary text-secondary antialiased" suppressHydrationWarning>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <LazyCustomCursor />
        <Navigation />
        <SmoothScrollProvider>
          <div className="nav-content">
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <SiteChrome />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
