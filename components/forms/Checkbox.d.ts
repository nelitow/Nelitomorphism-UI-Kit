export interface CheckboxProps extends Omit<React.HTMLAttributes<HTMLLabelElement>, "onChange"> {
  /** The full label becomes a 44px touch target while the box stays compact. */
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
