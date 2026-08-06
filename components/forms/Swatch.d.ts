export type SwatchColor = string | [number, number, number];

export interface SwatchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "color"> {
  /** CSS colour string or [r, g, b] */
  color: SwatchColor;
  /** Selected — ring + bloom in the swatch's own colour */
  active?: boolean;
  /** Diameter in px; defaults to the responsive 16px/26px visual size. */
  size?: number;
  disabled?: boolean;
  /** Called with the swatch's own colour value */
  onChange?: (color: SwatchColor) => void;
}
export declare function Swatch(props: SwatchProps): JSX.Element;

export interface SwatchGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Uppercase mono label above the row */
  label?: string;
  colors: SwatchColor[];
  /** Selected colour — compared by resolved CSS value */
  value?: SwatchColor;
  size?: number;
  disabled?: boolean;
  onChange?: (color: SwatchColor) => void;
}
export declare function SwatchGroup(props: SwatchGroupProps): JSX.Element;
