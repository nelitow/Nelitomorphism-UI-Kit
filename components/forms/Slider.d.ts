export interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
  /** Suffix on the mono readout, e.g. "%" or "ms" */
  unit?: string;
  /** Dims the control and ignores pointer input; the touch hit strip is 32px. */
  disabled?: boolean;
}
export declare function Slider(props: SliderProps): JSX.Element;
