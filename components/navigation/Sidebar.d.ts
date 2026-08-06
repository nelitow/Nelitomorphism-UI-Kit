export interface SidebarItem {
  id?: string;
  label?: string;
  icon?: React.ReactNode;
  count?: number;
  badge?: { label: string; tone?: string };
  /** Renders a section divider instead of an item */
  section?: string;
}
/** Desktop sidebar that becomes a horizontally scrollable top rail below 900px; controls reach touch density on coarse pointers. */
export interface SidebarProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  items: SidebarItem[];
  /** Active item id */
  value?: string;
  onChange?: (id: string) => void;
  header?: React.ReactNode;
  /** Decorative metadata, hidden in compact rail mode. */
  footer?: React.ReactNode;
  width?: number;
}
export declare function Sidebar(props: SidebarProps): JSX.Element;
