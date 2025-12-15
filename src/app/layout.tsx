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
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Susan Chapas | UX Strategist & Marketing Professional",
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
  ],
  authors: [{ name: "Susan Chapas" }],
  openGraph: {
    title: "Susan Chapas | UX Strategist & Marketing Professional",
    description:
      "The Strategic Architect — bridging design, marketing strategy, and technical implementation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
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
