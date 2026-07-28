export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "accent" | "accent2" | "ok" | "warn" | "danger";
  /** Glowing status dot */
  dot?: boolean;
  /** Pulse the dot (live status) */
  pulse?: boolean;
}
export declare function Badge(props: BadgeProps): JSX.Element;
