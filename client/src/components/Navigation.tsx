import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { Menu, X, Mail, Linkedin, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useLocation } from "wouter";

export function Navigation() {
  const { t, language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location, setLocation] = useLocation();
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
    { href: "#about", label: t.nav.about, priority: "high" },
    { href: "#skills", label: t.nav.skills, priority: "high" },
    { href: "#experience", label: t.nav.experience, priority: "high" },
    { href: "#coreValues", label: t.nav.coreValues, priority: "medium" },
    { href: "#education", label: t.nav.education, priority: "high" },
    { href: "#languages", label: t.nav.languages, priority: "medium" },
    { href: "#certificates", label: t.nav.certificates, priority: "medium" },
    { href: "#contact", label: t.nav.contact, priority: "high" },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    // Handle route navigation
    if (href.startsWith("/")) {
      if (isOpen) setIsOpen(false);
      setLocation(href);
      return;
    }

    // Handle anchor links (for Portfolio sections)
    if (href.startsWith("#")) {
      // If we're not on the Portfolio page, navigate to it first with anchor
      if (location !== "/") {
        if (isOpen) setIsOpen(false);
        // Set hash before navigation so ScrollToAnchor can handle it
        window.location.hash = href;
        setLocation("/");
        return;
      }

      // We're on Portfolio page, scroll to section
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
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent",
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-gray-200/50"
            : "bg-transparent"
        )}>
        <div
          className={cn(
            "container mx-auto px-4 sm:px-6 flex items-center justify-between relative transition-all duration-500 overflow-hidden",
            scrolled ? "min-h-[56px] sm:min-h-[64px] py-2 sm:py-3" : "min-h-[64px] sm:min-h-[80px] py-3 sm:py-5"
          )}>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (isOpen) setIsOpen(false);
              setLocation("/");
            }}
            className="text-xl font-bold tracking-tight text-esg-green flex items-center gap-2 h-full shrink-0 z-10 min-w-0 max-w-[200px] sm:max-w-none">
            <div className="w-8 h-8 rounded-lg bg-esg-green text-white flex items-center justify-center font-serif text-lg shrink-0">
              V
            </div>
            <span className="hidden sm:inline-block whitespace-nowrap truncate">
              Vincent Nguyen
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-2 xl:gap-3 2xl:gap-4 h-full flex-1 justify-center max-w-5xl mx-auto px-2 xl:px-4 min-w-0">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={cn(
                  "text-xs xl:text-sm font-semibold text-gray-700 hover:text-esg-green transition-all duration-300 relative group whitespace-nowrap shrink-0",
                  link.priority === "medium" && "hidden 2xl:inline-block"
                )}>
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-esg-green transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            <div className="h-4 w-px bg-gray-300 mx-1 xl:mx-2 shrink-0"></div>

            <a
              href="/esg-learning"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs xl:text-sm font-semibold text-gray-700 hover:text-esg-green transition-all duration-300 relative group flex items-center gap-1.5 xl:gap-2 whitespace-nowrap shrink-0">
              <BookOpen className="w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0" />
              <span className="hidden 2xl:inline">{language === "vi" ? "Học tập ESG" : "ESG Learning"}</span>
              <span className="2xl:hidden">{language === "vi" ? "ESG" : "ESG"}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-esg-green transition-all duration-300 group-hover:w-full"></span>
            </a>

            <div className="h-4 w-px bg-gray-300 mx-1 xl:mx-2 shrink-0"></div>

            <div className="flex items-center gap-2 xl:gap-3 shrink-0">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=vincentnguyentnt@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-esg-green transition-colors shrink-0">
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/vinh-nguyen-viet-276490393/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#0077b5] transition-colors shrink-0">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <div className="h-4 w-px bg-gray-300 mx-1 xl:mx-2 shrink-0"></div>

            <div className="relative flex items-center bg-gray-100 rounded-full p-1 shrink-0">
              <button
                onClick={() => setLanguage("vi")}
                className={cn(
                  "relative z-10 px-3 xl:px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors rounded-full",
                  language === "vi"
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-900"
                )}>
                Vi
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "relative z-10 px-3 xl:px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors rounded-full",
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
          <div className="flex items-center gap-2 sm:gap-4 xl:hidden absolute right-4 sm:right-6 h-full z-20">
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
              className="xl:hidden bg-white border-b border-gray-100 overflow-hidden">
              <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-3 sm:gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-lg font-medium text-gray-600 hover:text-esg-green py-2">
                    {link.label}
                  </a>
                ))}
                <a
                  href="/esg-learning"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-gray-600 hover:text-esg-green py-2 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>
                    {language === "vi" ? "Học tập ESG" : "ESG Learning"}
                  </span>
                </a>
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
