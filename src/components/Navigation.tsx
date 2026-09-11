"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { projects } from "@/lib/projects";

const navIcons = [
  { name: "Home", href: "/", icon: "/home-icon.svg" },
  { name: "About", href: "/about", icon: "/about-icon.svg" },
  { name: "Projects", href: "/projects", icon: "/project-icon.svg" },
  { name: "Gallery", href: "/gallery", icon: "/gallery-icon.svg" },
  { name: "Contact", href: "/contact", icon: "/contact-icon.svg" },
];

const projectChildren = projects
  .filter((p) => !p.inactive && p.href !== "#")
  .map((p) => ({ name: p.href.split("/").pop()!, path: p.href }));

function SocialLinks({ vertical = false, size = "sm" }: { vertical?: boolean; size?: "sm" | "md" }) {
  const iconClass = size === "md" ? "h-6 w-6" : "h-5 w-5";
  return (
    <div className={`flex ${vertical ? "flex-col" : ""} gap-4`}>
      <a
        href="https://linkedin.com/in/susan-chapas"
        target="_blank"
        rel="noopener noreferrer"
        className="text-secondary hover:text-accent-lime transition-colors"
        aria-label="LinkedIn profile"
      >
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
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
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      </a>
    </div>
  );
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [animating, setAnimating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: close menu on navigation
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname.startsWith("/projects")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: auto-expand on project pages
      setProjectsOpen(true);
    }
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--nav-width",
      expanded ? "260px" : "80px",
    );
  }, [expanded]);

  const displayPath = pathname === "/" ? "~/" : "~" + pathname;

  const isIconActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  const menuVariants = {
    closed: {
      x: "100%",
      transition: { type: "spring" as const, stiffness: 400, damping: 40 },
    },
    open: {
      x: 0,
      transition: { type: "spring" as const, stiffness: 400, damping: 40 },
    },
  };

  const linkVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.08,
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    }),
  };

  const FolderChevron = ({ open, size = 10 }: { open: boolean; size?: number }) => (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="none"
      animate={{ rotate: open ? 90 : 0 }}
      transition={{ duration: 0.15 }}
    >
      <path
        d="M3 1L7 5L3 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );

  return (
    <>
      {/* Desktop Side Navigation */}
      <motion.nav
        initial={{ x: -100, opacity: 0, width: 260 }}
        animate={{ x: 0, opacity: 1, width: expanded ? 260 : 80 }}
        transition={{
          x: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          width: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
        }}
        onAnimationStart={() => setAnimating(true)}
        onAnimationComplete={() => setAnimating(false)}
        className={`fixed top-0 left-0 z-50 hidden h-dvh flex-col lg:flex ${animating ? "overflow-hidden" : ""}`}
        style={{ backgroundColor: "#102f5d" }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className={`flex shrink-0 items-center py-5 ${
            expanded ? "justify-between px-5" : "flex-col gap-3"
          }`}
        >
          <Link
            href="/"
            className="shrink-0 transition-transform hover:scale-110"
            aria-label="Susan Chapas - Home"
          >
            <Image
              src="/assets/misc/navbar-favicon.png"
              alt="Susan Chapas logo"
              width={40}
              height={40}
              quality={90}
            />
          </Link>
          <button
            onClick={() => setExpanded(!expanded)}
            className="group relative text-secondary/50 hover:text-accent-lime transition-colors"
            aria-label={expanded ? "Collapse menu" : "Expand menu"}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
              <line x1="6" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              {!expanded && (
                <line x1="10" y1="6" x2="10" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              )}
            </svg>
            <span className="bg-primary text-secondary pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 rounded px-3 py-1 text-xs font-medium whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
              {expanded ? "Collapse Menu" : "Expand Menu"}
            </span>
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <AnimatePresence mode="wait" initial={false}>
            {expanded ? (
              <motion.div
                key="tree"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex min-h-0 flex-1 flex-col px-3"
              >
                <div className="font-body text-accent-lime/60 mb-3 truncate px-1 text-xs">
                  {displayPath}
                </div>
                <div className="bg-accent-blue/10 mb-3 h-px" />
                <ul className="flex-1 space-y-1 overflow-y-auto">
                  {navIcons.map((item) => {
                    const isProjects = item.href === "/projects";
                    const active = isProjects
                      ? pathname === "/projects" ||
                        pathname.startsWith("/projects/")
                      : pathname === item.href;

                    return (
                      <li key={item.name}>
                        {isProjects ? (
                          <>
                            <div
                              className={`flex items-center rounded-r border-l-[3px] transition-colors ${
                                active
                                  ? "border-accent-lime bg-accent-lime/10"
                                  : "border-transparent hover:bg-accent-blue/10"
                              }`}
                            >
                              <Link
                                href="/projects"
                                className={`flex flex-1 items-center gap-3 py-2 pl-3 transition-colors ${
                                  active
                                    ? "text-accent-lime"
                                    : "text-secondary/70 hover:text-secondary"
                                }`}
                                aria-current={
                                  pathname === "/projects"
                                    ? "page"
                                    : undefined
                                }
                              >
                                <div className="relative h-[18px] w-[18px] shrink-0">
                                  <Image
                                    src={item.icon}
                                    alt=""
                                    fill
                                    className={`object-contain ${active ? "" : "opacity-50"}`}
                                  />
                                </div>
                                <span className="font-body text-[15px]">
                                  /projects
                                </span>
                              </Link>
                              <button
                                onClick={() =>
                                  setProjectsOpen(!projectsOpen)
                                }
                                className="text-secondary/40 hover:text-secondary ml-auto flex h-9 w-7 shrink-0 items-center justify-center pr-2 transition-colors"
                                aria-label={
                                  projectsOpen
                                    ? "Collapse projects"
                                    : "Expand projects"
                                }
                                aria-expanded={projectsOpen}
                              >
                                <FolderChevron open={projectsOpen} />
                              </button>
                            </div>
                            <AnimatePresence>
                              {projectsOpen && (
                                <motion.ul
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{
                                    height: "auto",
                                    opacity: 1,
                                  }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{
                                    duration: 0.2,
                                    ease: [0.22, 1, 0.36, 1],
                                  }}
                                  className="overflow-hidden"
                                >
                                  {projectChildren.map((child) => {
                                    const childActive =
                                      pathname === child.path;
                                    return (
                                      <li key={child.path}>
                                        <Link
                                          href={child.path}
                                          className={`flex items-center rounded-r border-l-[3px] py-1.5 pl-12 pr-3 font-body text-[15px] transition-colors ${
                                            childActive
                                              ? "border-accent-lime bg-accent-lime/10 text-accent-lime"
                                              : "border-transparent text-secondary/50 hover:bg-accent-blue/10 hover:text-secondary/70"
                                          }`}
                                          aria-current={
                                            childActive
                                              ? "page"
                                              : undefined
                                          }
                                        >
                                          {child.name}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            href={item.href}
                            className={`flex items-center gap-3 rounded-r border-l-[3px] py-2 pl-3 pr-3 transition-colors ${
                              active
                                ? "border-accent-lime bg-accent-lime/10 text-accent-lime"
                                : "border-transparent text-secondary/70 hover:bg-accent-blue/10 hover:text-secondary"
                            }`}
                            aria-current={
                              pathname === item.href ? "page" : undefined
                            }
                          >
                            <div className="relative h-[18px] w-[18px] shrink-0">
                              <Image
                                src={item.icon}
                                alt=""
                                fill
                                className={`object-contain ${active ? "" : "opacity-50"}`}
                              />
                            </div>
                            <span className="font-body text-[15px]">
                              {item.href === "/" ? "/" : item.href}
                            </span>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ) : (
              <motion.div
                key="icons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex flex-1 flex-col items-center justify-center"
              >
                <ul className="flex flex-col gap-3 lg:gap-6">
                  {navIcons.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                          isIconActive(item.href)
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
                              isIconActive(item.href) ? "brightness-0" : ""
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className={`flex shrink-0 flex-col gap-3 pb-5 ${
            expanded ? "items-start px-5" : "items-center"
          }`}
        >
          <SocialLinks vertical={!expanded} />
        </div>
      </motion.nav>

      {/* Mobile Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between px-6 transition-all duration-300 lg:hidden ${
          scrolled ? "glass" : "border-b border-transparent bg-transparent"
        }`}
      >
        <Link href="/" aria-label="Susan Chapas - Home">
          <Image
            src="/assets/misc/navbar-favicon.png"
            alt="Susan Chapas logo"
            width={32}
            height={32}
            quality={90}
          />
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-secondary hover:text-accent-lime relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[6px] transition-colors"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <span
            className="block h-[2px] w-5 rounded-full bg-current transition-transform duration-300"
            style={
              mobileOpen
                ? { transform: "translateY(8px) rotate(45deg)" }
                : undefined
            }
          />
          <span
            className="block h-[2px] w-5 rounded-full bg-current transition-opacity duration-300"
            style={mobileOpen ? { opacity: 0 } : undefined}
          />
          <span
            className="block h-[2px] w-5 rounded-full bg-current transition-transform duration-300"
            style={
              mobileOpen
                ? { transform: "translateY(-8px) rotate(-45deg)" }
                : undefined
            }
          />
        </button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 flex flex-col lg:hidden"
            style={{ backgroundColor: "#102f5d" }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex flex-1 flex-col items-start justify-center px-10">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="font-body text-accent-lime/60 mb-6 text-sm"
              >
                {displayPath}
              </motion.div>

              <nav>
                <ul className="space-y-2">
                  {[
                    { name: "/", path: "/" },
                    { name: "/about", path: "/about" },
                    { name: "/projects", path: "/projects", isFolder: true },
                    { name: "/gallery", path: "/gallery" },
                    { name: "/contact", path: "/contact" },
                  ].map((item, i) => (
                    <motion.li key={item.path} custom={i} variants={linkVariants}>
                      {"isFolder" in item ? (
                        <>
                          <div className="flex items-center gap-2">
                            <Link
                              href="/projects"
                              className={`font-body text-2xl font-bold transition-colors ${
                                pathname.startsWith("/projects")
                                  ? "text-accent-lime"
                                  : "text-secondary hover:text-accent-lime"
                              }`}
                              onClick={() => setMobileOpen(false)}
                              aria-current={pathname === "/projects" ? "page" : undefined}
                            >
                              /projects
                            </Link>
                            <button
                              onClick={() => setProjectsOpen(!projectsOpen)}
                              className="text-secondary/40 hover:text-secondary transition-colors"
                              aria-expanded={projectsOpen}
                              aria-label={
                                projectsOpen ? "Collapse projects" : "Expand projects"
                              }
                            >
                              <FolderChevron open={projectsOpen} size={14} />
                            </button>
                          </div>
                          <AnimatePresence>
                            {projectsOpen && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-8 mt-1 space-y-1 overflow-hidden"
                              >
                                {projectChildren.map((child) => (
                                  <li key={child.path}>
                                    <Link
                                      href={child.path}
                                      className={`font-body text-lg transition-colors ${
                                        pathname === child.path
                                          ? "text-accent-lime"
                                          : "text-secondary/60 hover:text-secondary"
                                      }`}
                                      onClick={() => setMobileOpen(false)}
                                      aria-current={
                                        pathname === child.path ? "page" : undefined
                                      }
                                    >
                                      {child.name}
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.path}
                          className={`font-body text-2xl font-bold transition-colors ${
                            pathname === item.path
                              ? "text-accent-lime"
                              : "text-secondary hover:text-accent-lime"
                          }`}
                          onClick={() => setMobileOpen(false)}
                          aria-current={pathname === item.path ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 left-10"
            >
              <SocialLinks size="md" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
