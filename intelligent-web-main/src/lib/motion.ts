/** Shared slow motion defaults for Framer Motion + CSS transitions. */
export const easeOut = [0.22, 1, 0.36, 1] as const;

export const motionSlow = {
  duration: 0.9,
  ease: easeOut,
} as const;

export const motionFade = {
  duration: 0.85,
  ease: easeOut,
} as const;

export const staggerSlow = 0.14;

export const springSlow = {
  type: "spring" as const,
  stiffness: 70,
  damping: 28,
  mass: 1.1,
};

/** Default CSS transition class for interactive chrome. */
export const cssTransitionSlow =
  "transition-[color,background-color,border-color,box-shadow,transform,filter] duration-700 ease-out";
