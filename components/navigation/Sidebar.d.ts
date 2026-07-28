export interface SidebarItem {
  id?: string;
  label?: string;
  icon?: React.ReactNode;
  count?: number;
  badge?: { label: string; tone?: string };
  /** Renders a section divider instead of an item */
  section?: string;
}
export interface SidebarProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  items: SidebarItem[];
  /** Active item id */
  value?: string;
  onChange?: (id: string) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  width?: number;
}
export declare function Sidebar(props: SidebarProps): JSX.Element;
