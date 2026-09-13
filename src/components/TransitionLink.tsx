"use client";

import Link, { type LinkProps } from "next/link";
import { type AnchorHTMLAttributes, type MouseEvent, useCallback } from "react";
import { usePageTransition } from "./PageTransition";

type Props = LinkProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>;

export default function TransitionLink({ href, onClick, children, ...rest }: Props) {
  const ctx = usePageTransition();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (
        e.defaultPrevented ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.button !== 0 ||
        rest.target === "_blank"
      )
        return;

      const resolved = typeof href === "string" ? href : href.pathname ?? "/";
      if (ctx) {
        e.preventDefault();
        ctx.triggerTransition(resolved);
      }
    },
    [href, onClick, ctx, rest.target],
  );

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
