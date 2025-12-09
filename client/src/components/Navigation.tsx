import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { Menu, X, Mail, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

export function Navigation() {
  const { t, language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#skills", label: t.nav.skills },
    { href: "#experience", label: t.nav.experience },
    { href: "#projects", label: t.nav.projects },
    { href: "#education", label: t.nav.education },
    { href: "#languages", label: t.nav.languages },
    { href: "#certificates", label: t.nav.certificates },
    { href: "#contact", label: t.nav.contact },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    const element = document.querySelector(href);
    if (!element) return;

    // If mobile menu is open, close it first and wait for animation
    if (isOpen) {
      setIsOpen(false);
      // Wait for menu close animation to complete (AnimatePresence exit)
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 350); // Slightly longer than animation duration to ensure menu is fully closed
    } else {
      // Desktop: scroll immediately
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent",
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-gray-200/50 py-3"
            : "bg-transparent py-5"
        )}>
        <div className="container mx-auto px-6 flex items-center justify-center relative">
          <a
            href="#"
            onClick={(e) => handleLinkClick(e, "#hero")}
            className="absolute left-6 text-xl font-bold tracking-tight text-esg-green flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-esg-green text-white flex items-center justify-center font-serif text-lg">
              V
            </div>
            <span className="hidden sm:inline-block">Nguyen Viet Vinh</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-semibold text-gray-700 hover:text-esg-green transition-all duration-300 relative group">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-esg-green transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            <div className="h-4 w-px bg-gray-300 mx-2"></div>

            <div className="flex items-center gap-3">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=vincentnguyentnt@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-esg-green transition-colors">
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/vinh-nguyen-viet-276490393/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#0077b5] transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <div className="relative flex items-center bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setLanguage("vi")}
                className={cn(
                  "relative z-10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors rounded-full",
                  language === "vi"
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-900"
                )}>
                Vi
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "relative z-10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors rounded-full",
                  language === "en"
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-900"
                )}>
                En
              </button>
              <motion.div
                className="absolute inset-y-1 rounded-full bg-esg-green shadow-sm"
                initial={false}
                animate={{
                  left: language === "vi" ? "0.25rem" : "50%",
                  width: "calc(50% - 0.25rem)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            </div>
          </nav>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 lg:hidden absolute right-6">
            <div className="relative flex items-center bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setLanguage("vi")}
                className={cn(
                  "relative z-10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors rounded-full",
                  language === "vi"
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-900"
                )}>
                Vi
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "relative z-10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors rounded-full",
                  language === "en"
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-900"
                )}>
                En
              </button>
              <motion.div
                className="absolute inset-y-1 rounded-full bg-esg-green shadow-sm"
                initial={false}
                animate={{
                  left: language === "vi" ? "0.25rem" : "50%",
                  width: "calc(50% - 0.25rem)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-esg-green transition-colors">
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-gray-100 overflow-hidden">
              <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-lg font-medium text-gray-600 hover:text-esg-green py-2">
                    {link.label}
                  </a>
                ))}
                <div className="flex gap-4 pt-4 border-t border-gray-100 mt-2">
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=vincentnguyentnt@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">Email</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/vinh-nguyen-viet-276490393/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600">
                    <Linkedin className="w-5 h-5" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-esg-green origin-left"
          style={{ scaleX }}
        />
      </header>
    </>
  );
}
