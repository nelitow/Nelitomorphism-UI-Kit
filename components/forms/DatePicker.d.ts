export interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?: string;
  value?: Date;
  onChange?: (date: Date) => void;
}
export declare function DatePicker(props: DatePickerProps): JSX.Element;
