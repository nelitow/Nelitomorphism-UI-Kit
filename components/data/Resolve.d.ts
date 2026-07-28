/**
 * @startingPoint section="Data" subtitle="Transitional loader — content materializes in place" viewport="700x360"
 */
export interface ResolveProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** While true, glyphs scramble in place at final size. On false, text locks in left-to-right; numbers count up. */
  loading?: boolean;
  /** String or number content */
  children?: string | number;
  /** Optional number formatter, e.g. v => `$${v.toLocaleString()}` */
  format?: (v: number) => string;
  /** Materialize duration in ms (default 900) */
  duration?: number;
}
export declare function Resolve(props: ResolveProps): JSX.Element;

export interface ResolveBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Children render at final size, defocused until loaded */
  loading?: boolean;
}
export declare function ResolveBlock(props: ResolveBlockProps): JSX.Element;
