export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
  /** Applied when value is a number (count-up + format) */
  format?: (v: number) => string;
  delta?: string;
  up?: boolean;
  hint?: string;
  loading?: boolean;
  glow?: boolean;
}
export declare function Stat(props: StatProps): JSX.Element;
