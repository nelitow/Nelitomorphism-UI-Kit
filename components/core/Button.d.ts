/**
 * @startingPoint section="Core" subtitle="Buttons — WebGL primary, secondary, ghost, danger" viewport="700x420"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary renders the WebGL iridescent material behind the label */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  /** Responsive control size: 26/30/38px for fine pointers; touch scales from the shared density. */
  size?: "sm" | "md" | "lg";
  /** Keeps structure; label dims and a light sweep runs along the bottom edge */
  loading?: boolean;
}
export declare function Button(props: ButtonProps): JSX.Element;
