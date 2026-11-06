import type { Transition, Variants } from "motion/react";

// Shared motion recipes. Durations stay short (150–300ms) so the admin feels responsive;
// MotionConfig reducedMotion="user" in AppProviders turns them off for users who ask.

export const Easing = {
  out: [0.22, 1, 0.36, 1] as const,
};

/** Page enter: a 6px rise with a fade, matching the reference panel. */
export const pageTransition = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, ease: Easing.out } satisfies Transition,
};

/** Parent that reveals its children one after another. */
export const staggerContainer = (stagger = 0.06, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: Easing.out } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.22, ease: Easing.out } },
};

/** Table rows: a quick fade with a 2px nudge. */
export const rowReveal: Variants = {
  hidden: { opacity: 0, y: 2 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: Easing.out } },
};

/** Card hover: a 2px lift. */
export const hoverLift = {
  whileHover: { y: -2 },
  transition: { type: "spring", stiffness: 380, damping: 28 } satisfies Transition,
};

export const springSnappy: Transition = { type: "spring", stiffness: 500, damping: 38 };
