export interface ChartSeries {
  data: number[];
  tone?: "accent" | "accent2" | "ok" | "warn" | "danger";
}
export interface ChartProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  /** Single series shorthand */
  data?: number[];
  /** Multiple series */
  series?: ChartSeries[];
  type?: "line" | "area" | "bars";
  height?: number;
  /** While true, draws live noise waves in place; real data morphs in when it flips false */
  loading?: boolean;
  grid?: boolean;
  /** X-axis tick labels, one per data point (auto-thinned) */
  labels?: (string | number)[];
}
export declare function Chart(props: ChartProps): JSX.Element;
