import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
  delay?: number;
}

export function Section({ id, className, children, delay = 0 }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-20 md:py-32 scroll-mt-32 md:scroll-mt-40", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay }}
        className="container mx-auto px-6">
        {children}
      </motion.div>
    </section>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 relative inline-block tracking-tight",
        className
      )}
      style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)' }}>
      {children}
    </h2>
  );
}
