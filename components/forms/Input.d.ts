export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Uppercase mono label above the field */
  label?: string;
  hint?: string;
  /** Error message; turns the field red */
  error?: string;
  /** Mono value (ids, keys, amounts) */
  mono?: boolean;
  /** `md` is 30px on fine pointers and 44px on touch; `lg` preserves an 8px step. */
  size?: "md" | "lg";
  inputStyle?: React.CSSProperties;
}
export declare function Input(props: InputProps): JSX.Element;
