export interface CheckboxProps extends Omit<React.HTMLAttributes<HTMLLabelElement>, "onChange"> {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
