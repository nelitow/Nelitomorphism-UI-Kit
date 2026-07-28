/**
 * @startingPoint section="Core" subtitle="Surface card — optional WebGL material + scanlines" viewport="700x420"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Uppercase mono header label */
  title?: string;
  /** Right-aligned mono metadata, e.g. "synced 4s ago" */
  meta?: string;
  /** WebGL iridescent layer + scanline texture — for hero cards */
  material?: boolean;
  /** Accent glow ring on hover */
  glow?: boolean;
  padding?: string;
}
export declare function Card(props: CardProps): JSX.Element;
