import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ClassNameProp {
  className?: string;
}

export const removeSlahAtEndOfUrl = (url: string) =>
  url.endsWith("/") ? url.substring(0, url.length - 1) : url;
