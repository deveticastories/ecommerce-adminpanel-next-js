"use client";

import { useEffect, useRef } from "react";
import { animate, useReducedMotion } from "motion/react";

/** Counts up from 0 to `value` on mount and eases between later values. */
export default function AnimatedNumber({
  value,
  format = (n) => String(Math.round(n)),
  duration = 0.8,
}: {
  value: number;
  format?: (n: number) => string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const from = useRef(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = format(value);
      return;
    }
    const controls = animate(from.current, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (n) => {
        el.textContent = format(n);
      },
    });
    from.current = value;
    return () => controls.stop();
  }, [value, format, duration, reduce]);

  // Render the start value; the effect writes each animated frame straight to the DOM.
  return <span ref={ref}>{format(reduce ? value : 0)}</span>;
}
