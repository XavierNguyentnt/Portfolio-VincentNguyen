import React, { useState, useEffect, useRef } from "react";

interface LazyBackgroundImageProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function LazyBackgroundImage({
  src,
  className = "",
  style = {},
  children,
}: LazyBackgroundImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            // Load image when it enters viewport
            const img = new Image();
            img.onload = () => {
              setImageSrc(src);
              setIsLoaded(true);
            };
            img.src = src;
            observer.disconnect();
          }
        });
      },
      { rootMargin: "50px" } // Start loading 50px before entering viewport
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, isLoaded]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        backgroundImage: imageSrc ? `url(${imageSrc})` : undefined,
        transition: "opacity 0.3s ease-in-out",
        opacity: imageSrc ? 1 : 0.3,
      }}>
      {children}
    </div>
  );
}

