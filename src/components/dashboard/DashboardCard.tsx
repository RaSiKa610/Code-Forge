"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function DashboardCard({
  title,
  children,
  className = "",
}: DashboardCardProps) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      className={`
        group
        rounded-3xl
        border
        border-[var(--border)]
        bg-[var(--card)]
        p-6
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[var(--accent)]/40
        hover:shadow-2xl
        ${className}
      `}
    >
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <h3
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[var(--muted)]
          "
        >
          {title}
        </h3>

        <div
          className="
            ml-4
            h-px
            flex-1
            bg-gradient-to-r
            from-[var(--border)]
            to-transparent
          "
        />
      </div>

      {/* Content */}

      <div>{children}</div>
    </motion.section>
  );
}