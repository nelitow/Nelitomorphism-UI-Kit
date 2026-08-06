export interface SwitchProps extends Omit<React.HTMLAttributes<HTMLLabelElement>, "onChange"> {
  /** The full label becomes a 44px touch target; the visual track stays compact. */
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}
export declare function Switch(props: SwitchProps): JSX.Element;
