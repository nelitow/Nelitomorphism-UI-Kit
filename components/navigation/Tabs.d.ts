export interface TabItem { value: string; label: string; count?: number; }
/** Responsive tab strip; below 900px it scrolls horizontally while preserving the active marker and counts. Coarse pointers use touch-density tabs. */
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: (TabItem | string)[];
  value?: string;
  onChange?: (value: string) => void;
}
export declare function Tabs(props: TabsProps): JSX.Element;
