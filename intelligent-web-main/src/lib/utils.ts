import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Focus ring that stays inside the control (never clipped by overflow parents). */
export const fieldFocusClass =
  "outline-none focus-visible:outline-none focus-visible:border-orange-500 focus-visible:shadow-[inset_0_0_0_2px_rgba(242,106,19,0.9)]";
