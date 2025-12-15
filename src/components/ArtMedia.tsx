"use client";

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
      <div className={cn("relative overflow-hidden", containerClassName)}>
        <video
          src={src}
          className={cn("h-full w-full object-cover", className)}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          aria-label={alt}
        />
      </div>
    );
  }

  return (
    <ArtImage
      src={src}
      alt={alt}
      className={className}
      containerClassName={containerClassName}
      objectFit={objectFit}
    />
  );
}
