export interface ToastOptions {
  tone?: "ok" | "warn" | "danger" | "accent";
  /** Secondary mono line */
  detail?: string;
  /** Auto-dismiss ms (default 4200) */
  duration?: number;
}
/** Fire a toast from anywhere */
export declare function toast(message: string, opts?: ToastOptions): void;

export interface ToastStackProps extends React.HTMLAttributes<HTMLDivElement> {}
/** Mount once near the app root; the stack respects viewport gutters and safe areas. */
export declare function ToastStack(props: ToastStackProps): JSX.Element;
