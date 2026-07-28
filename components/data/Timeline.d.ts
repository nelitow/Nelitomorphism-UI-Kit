export interface TimelineItem {
  title: string;
  /** Mono metadata (time, date, version) — right-aligned */
  meta?: string;
  detail?: string;
  tone?: "accent" | "accent-2" | "ok" | "warn" | "danger" | "neutral";
}
export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[];
  loading?: boolean;
}
export declare function Timeline(props: TimelineProps): JSX.Element;
