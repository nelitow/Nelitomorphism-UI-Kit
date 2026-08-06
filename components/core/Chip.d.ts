/** Responsive mono control: 22px on fine pointers and 30px for coarse pointers. */
export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Selected state — accent border, accent text, accent wash + glow */
  active?: boolean;
  /** accent (primary) or accent2 (secondary/data) */
  tone?: "accent" | "accent2";
  disabled?: boolean;
}
export declare function Chip(props: ChipProps): JSX.Element;
