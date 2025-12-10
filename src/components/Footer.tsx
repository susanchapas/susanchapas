"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <footer className="bg-primary border-accent-blue/20 relative border-t py-16 lg:pl-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="container mx-auto px-6 lg:px-12"
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <Link href="/" className="inline-block">
              <h2 className="font-display text-accent-lime mb-4 text-3xl font-bold">
                Susan Chapas
              </h2>
            </Link>
            <p className="text-secondary/70 font-body max-w-xs">
              The Strategic Architect — bridging design, marketing strategy, and technical
              implementation.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="font-display text-secondary mb-4 text-lg font-semibold">
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {[
                  { name: "Home", href: "/" },
                  { name: "About", href: "/about" },
                  { name: "Projects", href: "/projects" },
                  { name: "Gallery", href: "/gallery" },
                  { name: "Contact", href: "/contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-secondary/70 hover:text-accent-lime font-body transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Contact & Social */}
          <motion.div variants={itemVariants}>
            <h3 className="font-display text-secondary mb-4 text-lg font-semibold">
              Let&apos;s Connect
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:susanchapas39@gmail.com"
                className="text-secondary/70 hover:text-accent-lime font-body block transition-colors"
              >
                susanchapas39@gmail.com
              </a>

              <div className="flex gap-4 pt-2">
                <a
                  href="https://linkedin.com/in/susanchapas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent-blue/10 text-secondary hover:bg-accent-lime hover:text-primary flex h-10 w-10 items-center justify-center rounded-full transition-all"
                  aria-label="LinkedIn profile"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/susanchapas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent-blue/10 text-secondary hover:bg-accent-lime hover:text-primary flex h-10 w-10 items-center justify-center rounded-full transition-all"
                  aria-label="GitHub profile"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="border-accent-blue/10 mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row"
        >
          <p className="text-secondary/50 font-body text-sm">
            © {currentYear} Susan Chapas. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-secondary/50 font-body text-sm">
            <MapPin className="h-4 w-4" />
            <span>Jersey City</span>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
