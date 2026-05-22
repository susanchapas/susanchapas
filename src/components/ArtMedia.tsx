"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import ArtImage from "./ArtImage";

interface ArtMediaProps {
  src: string;
  alt: string;
  type: "image" | "video";
  className?: string;
  containerClassName?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

function ArtVideo({
  src,
  alt,
  className,
  containerClassName,
  autoPlay,
  loop,
  muted,
  playsInline,
}: Omit<ArtMediaProps, "type" | "objectFit">) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !autoPlay) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.preload !== "auto") video.preload = "auto";
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [autoPlay]);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <video
        ref={ref}
        src={encodeURI(src)}
        className={cn("h-full w-full object-cover", className)}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        aria-label={alt}
        preload="metadata"
      />
    </div>
  );
}

export default function ArtMedia({
  src,
  alt,
  type,
  className,
  containerClassName,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  objectFit = "cover",
}: ArtMediaProps) {
  if (type === "video") {
    return (
      <ArtVideo
        src={src}
        alt={alt}
        className={className}
        containerClassName={containerClassName}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
      />
    );
  }

  return (
    <ArtImage
      src={src}
      alt={alt}
      className={className}
      containerClassName={containerClassName}
      objectFit={objectFit}
      loading="lazy"
    />
  );
}
