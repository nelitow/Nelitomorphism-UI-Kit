export interface SectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  meta?: string;
  /** Hairline rule filling the space between label and meta */
  rule?: boolean;
}
export declare function SectionLabel(props: SectionLabelProps): JSX.Element;
