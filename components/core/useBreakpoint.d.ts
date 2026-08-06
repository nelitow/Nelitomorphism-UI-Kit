export declare const BREAKPOINTS: { tight: 560; compact: 900; wide: 1280 };

/** Subscribe to a media query. */
export declare function useMedia(query: string): boolean;

export interface Breakpoint {
  /** < 560px — phone portrait: everything stacks */
  tight: boolean;
  /** < 900px — phone landscape / small tablet: sidebar becomes a rail, tables stack */
  compact: boolean;
  /** >= 1280px — room for the full two-column composition */
  wide: boolean;
  /** Coarse pointer — 44px hit areas, 16px fields (no iOS zoom on focus) */
  touch: boolean;
}
/** Layout + input-density flags. Components read this instead of guessing at widths. */
export declare function useBreakpoint(): Breakpoint;

export interface Density {
  control: number; controlSm: number; hit: number; chip: number; swatch: number;
  switchW: number; switchH: number; thumb: number; field: number;
}
/** Control geometry for the current input density. */
export declare function density(touch: boolean): Density;
