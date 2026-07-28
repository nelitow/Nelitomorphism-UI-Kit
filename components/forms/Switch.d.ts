export interface SwitchProps extends Omit<React.HTMLAttributes<HTMLLabelElement>, "onChange"> {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}
export declare function Switch(props: SwitchProps): JSX.Element;
