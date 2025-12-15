"use client";

import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface ArtImageProps extends Omit<ImageProps, "src"> {
  src: string;
  containerClassName?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

export default function ArtImage({
  src,
  alt,
  className,
  containerClassName,
  objectFit = "cover",
  ...props
}: ArtImageProps) {
  const encodedSrc = encodeURI(src);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <Image
        src={encodedSrc}
        alt={alt}
        className={cn(
          objectFit === "contain" ? "object-contain" : "object-cover",
          className
        )}
        fill
        {...props}
      />
    </div>
  );
}
