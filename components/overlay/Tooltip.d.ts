export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  /** Show delay in ms (default 250) */
  delay?: number;
  children: React.ReactNode;
}
export declare function Tooltip(props: TooltipProps): JSX.Element;
