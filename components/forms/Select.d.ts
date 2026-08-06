/** Custom select with a touch-scrollable, viewport-clamped popover. */
export interface SelectOption { value: string; label: string; }
export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?: string;
  options: (SelectOption | string)[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}
export declare function Select(props: SelectProps): JSX.Element;
