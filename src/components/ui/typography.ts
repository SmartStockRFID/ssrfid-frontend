import { newlandTheme } from "@/constants";

// From <https://ui.shadcn.com/docs/components/typography>
export const Typography = {
  h1: `scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance ${newlandTheme ? "mb-1.5" : ""}`,
  h2: `scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0`, // Removed 'pb-2' and 'border-b'
  h3: `scroll-m-20 text-2xl font-semibold tracking-tight  ${newlandTheme ? "mb-1.5" : ""}`,
  h4: `scroll-m-20 text-xl font-semibold tracking-tight`,
  p: `leading-7 [&:not(:first-child)]:mt-6  ${newlandTheme ? "mb-1" : ""}`,
  large: `text-lg font-semibold`,
  small: `text-sm leading-none font-medium`,
  muted: `text-muted-foreground text-sm`,
};
