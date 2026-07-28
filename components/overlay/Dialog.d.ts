export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  title?: string;
  /** Action row, e.g. <><Button variant="ghost">Cancel</Button><Button variant="primary">Confirm</Button></> */
  footer?: React.ReactNode;
  onClose?: () => void;
  width?: number;
}
export declare function Dialog(props: DialogProps): JSX.Element;
