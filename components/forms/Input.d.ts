export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Uppercase mono label above the field */
  label?: string;
  hint?: string;
  /** Error message; turns the field red */
  error?: string;
  /** Mono value (ids, keys, amounts) */
  mono?: boolean;
  size?: "md" | "lg";
  inputStyle?: React.CSSProperties;
}
export declare function Input(props: InputProps): JSX.Element;
