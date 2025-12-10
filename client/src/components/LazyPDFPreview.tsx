import React, { useState, useRef, useEffect } from "react";

interface LazyPDFPreviewProps {
  file: string;
  className?: string;
  alt?: string;
}

export function LazyPDFPreview({ file, className = "", alt = "PDF preview" }: LazyPDFPreviewProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoad) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "100px" } // Start loading 100px before entering viewport
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad ? (
        <object
          data={`${file}#page=1&view=FitH`}
          type="application/pdf"
          className="w-full h-full"
          aria-label={alt}>
          <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
            PDF preview unavailable
          </div>
        </object>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
          Loading preview...
        </div>
      )}
    </div>
  );
}

