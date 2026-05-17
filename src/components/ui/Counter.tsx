"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  value: number;
  /** e.g. "+", "K+", "%". Numbers >= 1000 auto display as e.g. 50K when `compact`. */
  suffix?: string;
  /** Whether to use 1K / 1.2K compact format above 1000. */
  compact?: boolean;
  /** Animation duration in ms. */
  duration?: number;
  /** className passed to the wrapping span. */
  className?: string;
}

/** Smooth animated number counter that starts when scrolled into view. */
export default function Counter({
  value,
  suffix = "",
  compact = false,
  duration = 1600,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      // ease-out-quart
      const eased = 1 - Math.pow(1 - p, 4);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  let display: string;
  if (compact && value >= 1000) {
    const k = n / 1000;
    display = `${k >= 10 ? Math.floor(k) : k.toFixed(1).replace(/\.0$/, "")}K`;
  } else {
    display = Math.floor(n).toLocaleString();
  }

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
