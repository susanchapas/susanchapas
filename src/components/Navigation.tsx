"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "/", icon: "/home-icon.svg" },
  { name: "About", href: "/about", icon: "/about-icon.svg" },
  { name: "Projects", href: "/projects", icon: "/project-icon.svg" },
  { name: "Gallery", href: "/gallery", icon: "/gallery-icon.svg" },
  { name: "Contact", href: "/contact", icon: "/contact-icon.svg" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change - this is intentional behavior
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: close menu on navigation
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const linkVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    }),
  };

  return (
    <>
      {/* Desktop Side Navigation */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="bg-primary fixed top-0 left-0 z-50 hidden h-dvh w-20 flex-col items-center justify-between py-4 lg:flex lg:py-6"
        role="navigation"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-accent-lime font-display text-2xl font-bold transition-transform hover:scale-110"
          aria-label="Susan Chapas - Home"
        >
          SC
        </Link>

        <ul className="flex flex-col gap-3 lg:gap-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                  pathname === item.href
                    ? "bg-accent-lime text-primary"
                    : "text-secondary hover:bg-accent-blue/20"
                }`}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                <div className="relative h-5 w-5">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    fill
                    className={`object-contain transition-colors ${
                      pathname === item.href ? "brightness-0" : ""
                    }`}
                  />
                </div>
                <span className="bg-primary text-secondary pointer-events-none absolute left-14 rounded px-3 py-1 text-sm font-medium whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-4">
          <a
            href="https://linkedin.com/in/susanchapas"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-accent-lime transition-colors"
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
            className="text-secondary hover:text-accent-lime transition-colors"
            aria-label="GitHub profile"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </motion.nav>

      {/* Mobile Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between px-6 transition-all duration-300 lg:hidden ${
          scrolled ? "glass" : "bg-transparent"
        }`}
      >
        <Link
          href="/"
          className="text-accent-lime font-display text-2xl font-bold"
          aria-label="Susan Chapas - Home"
        >
          SC
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-secondary hover:text-accent-lime relative z-50 flex h-10 w-10 items-center justify-center transition-colors"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="bg-primary fixed inset-0 z-40 flex flex-col items-center justify-center lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <nav>
              <ul className="flex flex-col items-center gap-8">
                {navItems.map((item, i) => (
                  <motion.li key={item.name} custom={i} variants={linkVariants}>
                    <Link
                      href={item.href}
                      className={`font-display text-4xl font-bold transition-colors ${
                        pathname === item.href
                          ? "text-accent-lime"
                          : "text-secondary hover:text-accent-lime"
                      }`}
                      onClick={() => setIsOpen(false)}
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 flex gap-8"
            >
              <a
                href="https://linkedin.com/in/susanchapas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-accent-lime transition-colors"
                aria-label="LinkedIn profile"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/susanchapas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-accent-lime transition-colors"
                aria-label="GitHub profile"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
