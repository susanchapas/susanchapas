"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import Link from "next/link";
const MotionLink = motion(Link);
import { forwardRef, ReactNode } from "react";

interface BaseProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

interface ButtonProps extends BaseProps, Omit<HTMLMotionProps<"button">, keyof BaseProps> {
  href?: never;
}

interface LinkProps extends BaseProps {
  href: string;
  external?: boolean;
}

type AccessibleButtonProps = ButtonProps | LinkProps;

const baseStyles =
  "inline-flex items-center justify-center font-display font-semibold rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-2 focus-visible:ring-offset-primary disabled:opacity-50 disabled:pointer-events-none";

const variantStyles = {
  primary:
    "bg-accent-lime text-primary hover:bg-accent-lime/90 active:scale-[0.98]",
  secondary:
    "bg-accent-blue/20 text-secondary hover:bg-accent-blue/30 active:scale-[0.98]",
  outline:
    "border-2 border-accent-lime text-accent-lime hover:bg-accent-lime hover:text-primary active:scale-[0.98]",
  ghost:
    "text-secondary hover:text-accent-lime hover:bg-accent-blue/10 active:scale-[0.98]",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm gap-2",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-lg gap-3",
};

function isLinkProps(props: AccessibleButtonProps): props is LinkProps {
  return "href" in props && typeof props.href === "string";
}

const AccessibleButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  AccessibleButtonProps
>((props, ref) => {
  const {
    children,
    variant = "primary",
    size = "md",
    className = "",
    ...rest
  } = props;

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (isLinkProps(props)) {
    const { href, external, ...linkRest } = props;

    if (external) {
      return (
        <motion.a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClassName}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          {...(linkRest as HTMLMotionProps<"a">)}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <MotionLink
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={combinedClassName}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...(linkRest as HTMLMotionProps<"a">)}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={combinedClassName}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...(rest as HTMLMotionProps<"button">)}
    >
      {children}
    </motion.button>
  );
});

AccessibleButton.displayName = "AccessibleButton";

export default AccessibleButton;

// Accessible Link Component
interface AccessibleLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}

export function AccessibleLink({
  href,
  children,
  external = false,
  className = "",
}: AccessibleLinkProps) {
  const linkClass = `text-accent-lime hover:text-accent-lime/80 underline underline-offset-4 decoration-accent-lime/30 hover:decoration-accent-lime transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {children}
        <span className="sr-only"> (opens in new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
}
