import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
  delay?: number;
}

export function Section({ id, className, children, delay = 0 }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-32 scroll-mt-20", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay }}
        className="container mx-auto px-6"
      >
        {children}
      </motion.div>
    </section>
  );
}

export function SectionTitle({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <h2 className={cn("text-3xl md:text-4xl font-bold text-gray-900 mb-12 relative inline-block", className)}>
      {children}
      <span className="absolute -bottom-3 left-0 w-1/3 h-1 bg-esg-green rounded-full"></span>
    </h2>
  );
}
