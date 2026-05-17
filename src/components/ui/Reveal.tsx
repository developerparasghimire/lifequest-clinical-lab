"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  /** Tailwind / class names applied to the wrapping motion.div */
  className?: string;
  /** Inline styles forwarded to the motion element. */
  style?: CSSProperties;
  /** Animation direction. */
  direction?: Direction;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Duration in seconds (default 0.6). */
  duration?: number;
  /** Distance to translate in px (default 24). */
  distance?: number;
  /** Whether to animate every time it scrolls into view. */
  once?: boolean;
  /** When true, also stagger immediate children (use a "child" Reveal inside). */
  stagger?: boolean;
  /** Stagger gap when `stagger` is true. */
  staggerGap?: number;
  /** Used to render a different element. Defaults to a div. */
  as?: "div" | "section" | "article" | "li" | "ul" | "span" | "header" | "footer" | "aside" | "nav";
}

/**
 * Lightweight Framer Motion scroll-reveal wrapper.
 *
 * Drop it around any block to fade & slide it into view as the user scrolls.
 * Respects `prefers-reduced-motion`.
 */
export default function Reveal({
  children,
  className,
  style,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 24,
  once = true,
  stagger = false,
  staggerGap = 0.08,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();

  const offset =
    direction === "up"    ? { y:  distance, x: 0 } :
    direction === "down"  ? { y: -distance, x: 0 } :
    direction === "left"  ? { x:  distance, y: 0 } :
    direction === "right" ? { x: -distance, y: 0 } :
    { x: 0, y: 0 };

  const variants: Variants = {
    hidden:  { opacity: 0, ...offset },
    visible: {
      opacity: 1, x: 0, y: 0,
      transition: {
        duration: reduce ? 0 : duration,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
        when: stagger ? "beforeChildren" : undefined,
        staggerChildren: stagger ? staggerGap : undefined,
      },
    },
  };

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.18 }}
    >
      {children}
    </MotionTag>
  );
}

/** Convenience child for stagger groups. */
export function RevealItem({
  children,
  className,
  distance = 18,
  direction = "up",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  direction?: Direction;
  as?: RevealProps["as"];
}) {
  const reduce = useReducedMotion();
  const offset =
    direction === "up"    ? { y:  distance } :
    direction === "down"  ? { y: -distance } :
    direction === "left"  ? { x:  distance } :
    direction === "right" ? { x: -distance } :
    {};

  const variants: Variants = {
    hidden:  { opacity: 0, ...offset },
    visible: {
      opacity: 1, x: 0, y: 0,
      transition: { duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const MotionTag = motion[as as "div"] as typeof motion.div;
  return <MotionTag className={className} variants={variants}>{children}</MotionTag>;
}
