export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0–max. Omit for indeterminate sweep. */
  value?: number;
  max?: number;
  /** Uppercase mono label above the track */
  label?: string;
  tone?: "accent" | "accent2" | "ok" | "warn" | "danger";
  showValue?: boolean;
}
export declare function Progress(props: ProgressProps): JSX.Element;
