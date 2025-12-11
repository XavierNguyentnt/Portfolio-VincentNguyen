import React, { useState, useRef, useEffect } from "react";

interface ProtectedPDFPreviewProps {
  file: string;
  className?: string;
  alt?: string;
}

export function ProtectedPDFPreview({
  file,
  className = "",
  alt = "PDF preview",
}: ProtectedPDFPreviewProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Convert public path to API path for protected files
  const getProtectedPath = (filePath: string) => {
    const fileName = filePath.split("/").pop() || "";
    return `/api/protected-pdf?file=${encodeURIComponent(fileName)}`;
  };

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
      { rootMargin: "100px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [shouldLoad]);

  // Block right-click and other interactions - STRICT PROTECTION
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleContextMenu = (e: MouseEvent) => {
      // Block ALL context menus when viewing protected content
      if (container.contains(e.target as Node)) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    };

    // Block common keyboard shortcuts (only when focused on protected content)
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (!container.contains(target)) return;

      // Block F12 (DevTools)
      if (e.key === "F12") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Block Ctrl+Shift+I (DevTools)
      if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i")) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Block Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && (e.key === "J" || e.key === "j")) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Block Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && (e.key === "C" || e.key === "c")) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Block Ctrl+U (View Source)
      if (e.ctrlKey && (e.key === "u" || e.key === "U")) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Block Ctrl+S (Save) - only when viewing protected content
      if (e.ctrlKey && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Block Ctrl+P (Print) - CRITICAL
      if (e.ctrlKey && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        // Disable print function
        window.print = () => {
          console.warn("Printing is disabled for protected documents");
        };
        return false;
      }

      // Block Print Screen
      if (e.key === "PrintScreen") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Block text selection
    const handleSelectStart = (e: Event) => {
      if (container.contains(e.target as Node)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Block drag
    const handleDragStart = (e: DragEvent) => {
      if (container.contains(e.target as Node)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Block copy
    const handleCopy = (e: ClipboardEvent) => {
      if (container.contains(e.target as Node)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Use capture phase with highest priority
    document.addEventListener("contextmenu", handleContextMenu, {
      capture: true,
      passive: false,
    });
    document.addEventListener("keydown", handleKeyDown, {
      capture: true,
      passive: false,
    });
    document.addEventListener("selectstart", handleSelectStart, {
      capture: true,
      passive: false,
    });
    document.addEventListener("dragstart", handleDragStart, {
      capture: true,
      passive: false,
    });
    document.addEventListener("copy", handleCopy, {
      capture: true,
      passive: false,
    });
    document.addEventListener("cut", handleCopy, {
      capture: true,
      passive: false,
    });

    // Block print
    const handleBeforePrint = () => {
      window.print = () => {
        console.warn("Printing is disabled for protected documents");
      };
    };
    window.addEventListener("beforeprint", handleBeforePrint);
    document.addEventListener("beforeprint", handleBeforePrint);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu, {
        capture: true,
      } as any);
      document.removeEventListener("keydown", handleKeyDown, {
        capture: true,
      } as any);
      document.removeEventListener("selectstart", handleSelectStart, {
        capture: true,
      } as any);
      document.removeEventListener("dragstart", handleDragStart, {
        capture: true,
      } as any);
      document.removeEventListener("copy", handleCopy, {
        capture: true,
      } as any);
      document.removeEventListener("cut", handleCopy, { capture: true } as any);
      window.removeEventListener("beforeprint", handleBeforePrint);
      document.removeEventListener("beforeprint", handleBeforePrint);
    };
  }, []);

  // Handle embed load and error
  useEffect(() => {
    if (!iframeRef.current || !shouldLoad) return;

    const embed = iframeRef.current as HTMLEmbedElement;

    const handleError = () => {
      setError("Failed to load PDF preview");
    };

    const handleLoad = () => {
      setError(null);
      try {
        // Try to access the embed document (for PDF viewers)
        const embedDoc =
          (embed as any).contentDocument ||
          (embed as any).contentWindow?.document;
        if (embedDoc) {
          // Block right-click in embed document
          embedDoc.addEventListener("contextmenu", (e: Event) => {
            e.preventDefault();
            return false;
          });

          // Block text selection in embed document
          embedDoc.addEventListener("selectstart", (e: Event) => {
            e.preventDefault();
            return false;
          });

          // Add CSS to prevent selection and right-click
          const style = embedDoc.createElement("style");
          style.textContent = `
            * {
              -webkit-user-select: none !important;
              -moz-user-select: none !important;
              -ms-user-select: none !important;
              user-select: none !important;
              -webkit-touch-callout: none !important;
              -webkit-tap-highlight-color: transparent !important;
            }
          `;
          if (embedDoc.head) {
            embedDoc.head.appendChild(style);
          }
        }
      } catch (e) {
        // Cross-origin restrictions may prevent access
        // This is expected and acceptable for PDF embeds
      }
    };

    embed.addEventListener("error", handleError);
    embed.addEventListener("load", handleLoad);

    // Set timeout to check if PDF loaded
    const timeout = setTimeout(() => {
      if (embed.offsetHeight === 0) {
        // Don't set error immediately, PDF might still be loading
        console.log(
          `[ProtectedPDFPreview] Checking PDF load status for: ${file}`
        );
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
      embed.removeEventListener("error", handleError);
      embed.removeEventListener("load", handleLoad);
    };
  }, [shouldLoad, file]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        WebkitTouchCallout: "none",
      }}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}>
      {shouldLoad ? (
        error ? (
          <div className="w-full h-full flex items-center justify-center text-sm text-gray-500 bg-gray-50">
            {error}
          </div>
        ) : (
          <embed
            ref={iframeRef as any}
            src={`${getProtectedPath(
              file
            )}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
            type="application/pdf"
            className="w-full h-full border-0"
            title={alt}
            style={{
              pointerEvents: "auto",
            }}
            onError={() => {
              console.error(
                `[ProtectedPDFPreview] Failed to load PDF: ${file}`
              );
              setError("Failed to load PDF preview");
            }}
            onLoad={() => {
              console.log(`[ProtectedPDFPreview] PDF loaded: ${file}`);
              setError(null);
            }}
          />
        )
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
          Loading preview...
        </div>
      )}
    </div>
  );
}
