import React, { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProtectedPDFPreview } from "./ProtectedPDFPreview";
import { LazyPDFPreview } from "./LazyPDFPreview";
import { cn } from "@/lib/utils";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: {
    name: string;
    issuer: string;
    file?: string;
    protected?: boolean;
    url?: string;
    date?: string;
  } | null;
}

export function CertificateModal({
  isOpen,
  onClose,
  certificate,
}: CertificateModalProps) {
  // Close on ESC key and protect content
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    // Protection handlers for protected certificates - GLOBAL BLOCKING
    const handleContextMenu = (e: MouseEvent) => {
      if (certificate?.protected) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!certificate?.protected) return;

      // Block Ctrl+S (Save)
      if (e.ctrlKey && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }

      // Block Ctrl+Shift+S (Save As in some browsers)
      if (e.ctrlKey && e.shiftKey && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }

      // Block Ctrl+P (Print) - CRITICAL
      if (e.ctrlKey && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }

      // Block Ctrl+A (Select All)
      if (e.ctrlKey && (e.key === "a" || e.key === "A")) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }

      // Block Ctrl+C (Copy)
      if (e.ctrlKey && (e.key === "c" || e.key === "C")) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }

      // Block Ctrl+V (Paste - might be used to save)
      if (e.ctrlKey && (e.key === "v" || e.key === "V")) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }

      // Block Ctrl+X (Cut)
      if (e.ctrlKey && (e.key === "x" || e.key === "X")) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }

      // Block Print Screen
      if (e.key === "PrintScreen" || e.keyCode === 44) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }

      // Block F12 (DevTools)
      if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }

      // Block Ctrl+Shift+I (DevTools)
      if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i")) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }

      // Block Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && (e.key === "J" || e.key === "j")) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }

      // Block Ctrl+Shift+C (Inspect)
      if (e.ctrlKey && e.shiftKey && (e.key === "C" || e.key === "c")) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }

      // Block Ctrl+U (View Source)
      if (e.ctrlKey && (e.key === "u" || e.key === "U")) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    };

    const handleSelectStart = (e: Event) => {
      if (certificate?.protected) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const handleCopy = (e: ClipboardEvent) => {
      if (certificate?.protected) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const handleDragStart = (e: DragEvent) => {
      if (certificate?.protected) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      if (certificate?.protected) {
        // Mark body as protected view
        document.body.setAttribute("data-protected-view", "true");

        // Use capture phase and high priority to block all events
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
        document.addEventListener("copy", handleCopy, {
          capture: true,
          passive: false,
        });
        document.addEventListener("cut", handleCopy, {
          capture: true,
          passive: false,
        });
        document.addEventListener("dragstart", handleDragStart, {
          capture: true,
          passive: false,
        });

        // Block print events
        const handleBeforePrint = (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          window.print = () => {
            console.warn("Printing is disabled for protected documents");
          };
          return false;
        };

        document.addEventListener("beforeprint", handleBeforePrint, {
          capture: true,
          passive: false,
        });
        window.addEventListener("beforeprint", handleBeforePrint);

        // Disable print function completely
        const originalPrint = window.print;
        Object.defineProperty(window, "print", {
          value: () => {
            console.warn("Printing is disabled for protected documents");
          },
          writable: false,
          configurable: false,
        });

        // Store original for cleanup
        (window as any).__originalPrint = originalPrint;
      }
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      if (certificate?.protected) {
        document.body.removeAttribute("data-protected-view");
        document.removeEventListener("contextmenu", handleContextMenu, {
          capture: true,
        } as any);
        document.removeEventListener("keydown", handleKeyDown, {
          capture: true,
        } as any);
        document.removeEventListener("selectstart", handleSelectStart, {
          capture: true,
        } as any);
        document.removeEventListener("copy", handleCopy, {
          capture: true,
        } as any);
        document.removeEventListener("cut", handleCopy, {
          capture: true,
        } as any);
        document.removeEventListener("dragstart", handleDragStart, {
          capture: true,
        } as any);
        // Restore print function
        if ((window as any).__originalPrint) {
          Object.defineProperty(window, "print", {
            value: (window as any).__originalPrint,
            writable: true,
            configurable: true,
          });
        }
      }
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, certificate]);

  if (!certificate || !isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && certificate && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4"
            onClick={(e) => {
              // Close when clicking outside the modal content
              if (e.target === e.currentTarget) {
                onClose();
              }
            }}>
            <div
              className="relative w-full max-w-7xl h-[95vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
              style={{
                userSelect: certificate?.protected ? "none" : "auto",
                WebkitUserSelect: certificate?.protected ? "none" : "auto",
                MozUserSelect: certificate?.protected ? "none" : "auto",
                msUserSelect: certificate?.protected ? "none" : "auto",
                WebkitTouchCallout: certificate?.protected ? "none" : "auto",
              }}
              onContextMenu={(e) => {
                if (certificate?.protected) {
                  e.preventDefault();
                  return false;
                }
              }}
              onDragStart={(e) => {
                if (certificate?.protected) {
                  e.preventDefault();
                  return false;
                }
              }}
              onSelectStart={(e) => {
                if (certificate?.protected) {
                  e.preventDefault();
                  return false;
                }
              }}>
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-white flex-shrink-0">
                <div className="flex-1 min-w-0 pr-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                    {certificate.name}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">
                    {certificate.issuer}
                  </p>
                  {certificate.date && (
                    <p className="text-xs text-gray-500 mt-1">
                      {certificate.date}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors shadow-sm border border-gray-200"
                  aria-label="Close">
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </button>
              </div>

              {/* PDF Viewer */}
              <div
                className="flex-1 overflow-auto bg-gray-50 min-h-0 relative"
                style={{
                  userSelect: certificate?.protected ? "none" : "auto",
                  WebkitUserSelect: certificate?.protected ? "none" : "auto",
                  MozUserSelect: certificate?.protected ? "none" : "auto",
                  msUserSelect: certificate?.protected ? "none" : "auto",
                  WebkitTouchCallout: certificate?.protected ? "none" : "auto",
                }}
                onContextMenu={(e) => {
                  if (certificate?.protected) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    return false;
                  }
                }}
                onDragStart={(e) => {
                  if (certificate?.protected) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                  }
                }}
                onSelectStart={(e) => {
                  if (certificate?.protected) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                  }
                }}>
                {/* Protection Overlay for protected documents */}
                {certificate?.protected && (
                  <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                      background: "transparent",
                      userSelect: "none",
                      WebkitUserSelect: "none",
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      return false;
                    }}
                  />
                )}
                {certificate.file ? (
                  <div
                    className="w-full h-full min-h-[600px]"
                    style={{
                      userSelect: certificate?.protected ? "none" : "auto",
                      WebkitUserSelect: certificate?.protected
                        ? "none"
                        : "auto",
                      MozUserSelect: certificate?.protected ? "none" : "auto",
                      msUserSelect: certificate?.protected ? "none" : "auto",
                    }}>
                    {certificate.protected ? (
                      <ProtectedPDFPreview
                        file={certificate.file}
                        className="w-full h-full"
                        alt={certificate.name}
                      />
                    ) : (
                      <LazyPDFPreview
                        file={certificate.file}
                        className="w-full h-full"
                        alt={certificate.name}
                      />
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No preview available
                  </div>
                )}
              </div>

              {/* Footer */}
              {certificate.url && (
                <div className="p-4 sm:p-6 border-t border-gray-200 bg-white flex-shrink-0">
                  <a
                    href={certificate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 bg-esg-green text-white font-semibold rounded-lg hover:bg-esg-green/90 transition-colors shadow-sm">
                    View Certificate Online
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
