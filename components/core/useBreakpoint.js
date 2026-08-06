import React from "react";

/** Layout breakpoints in px. Below `tight` is a phone; below `compact` is a phone landscape / small tablet. */
export const BREAKPOINTS = { tight: 560, compact: 900, wide: 1280 };

/** Subscribe to a media query. Returns false where matchMedia is unavailable. */
export function useMedia(query) {
  const [match, setMatch] = React.useState(
    () => (typeof window !== "undefined" && window.matchMedia ? window.matchMedia(query).matches : false)
  );
  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(query);
    const on = (e) => setMatch(e.matches);
    setMatch(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

/**
 * The flags every component reads before it lays itself out.
 * `touch` is input density, not width — a 27" touchscreen still gets 44px controls.
 */
export function useBreakpoint() {
  const tight = useMedia("(max-width: " + (BREAKPOINTS.tight - 1) + "px)");
  const compact = useMedia("(max-width: " + (BREAKPOINTS.compact - 1) + "px)");
  const wide = useMedia("(min-width: " + BREAKPOINTS.wide + "px)");
  const touch = useMedia("(pointer: coarse)");
  return { tight, compact, wide, touch };
}

/** Control geometry for the current input density. Single source of truth for hit areas. */
export function density(touch) {
  return touch
    ? { control: 44, controlSm: 36, hit: 32, chip: 30, swatch: 26, switchW: 44, switchH: 26, thumb: 20, field: 16 }
    : { control: 30, controlSm: 26, hit: 20, chip: 22, swatch: 16, switchW: 32, switchH: 18, thumb: 14, field: 13.5 };
}
