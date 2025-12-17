import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import GlobalSkillsTicker from "@/components/GlobalSkillsTicker";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Base URL for production
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://susanchapas.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Susan Chapas | UX Strategist & Marketing Professional",
    template: "%s | Susan Chapas",
  },
  description:
    "The Strategic Architect — bridging design, marketing strategy, and technical implementation. UX Designer, Marketing Strategist, and Full-Stack Developer based in Jersey City.",
  keywords: [
    "UX Design",
    "Marketing Strategy",
    "Full Stack Developer",
    "React",
    "Jersey City",
    "HCI",
    "Portfolio",
    "User Experience",
    "Web Development",
    "Brand Strategy",
  ],
  authors: [{ name: "Susan Chapas", url: baseUrl }],
  creator: "Susan Chapas",
  publisher: "Susan Chapas",
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
    title: "Susan Chapas | UX Strategist & Marketing Professional",
    description:
      "The Strategic Architect — bridging design, marketing strategy, and technical implementation.",
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Susan Chapas Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Susan Chapas | UX Strategist & Marketing Professional",
    description:
      "The Strategic Architect — bridging design, marketing strategy, and technical implementation.",
    creator: "@susanchapas",
  },
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    // Add your verification tokens when available
    // google: "your-google-verification-token",
  },
};

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Susan Chapas",
  jobTitle: "UX Strategist & Marketing Professional",
  description:
    "The Strategic Architect — bridging design, marketing strategy, and technical implementation.",
  url: baseUrl,
  sameAs: [
    "https://linkedin.com/in/susanchapas",
    "https://github.com/susanchapas",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jersey City",
    addressRegion: "NJ",
    addressCountry: "US",
  },
  knowsAbout: [
    "UX Design",
    "Marketing Strategy",
    "Full Stack Development",
    "React",
    "Next.js",
    "Brand Strategy",
    "Accessibility",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-primary text-secondary antialiased" suppressHydrationWarning>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <CustomCursor />
        <Navigation />
        <SmoothScrollProvider>
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <GlobalSkillsTicker />
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
