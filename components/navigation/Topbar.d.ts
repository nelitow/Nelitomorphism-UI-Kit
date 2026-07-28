export interface TopbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Breadcrumb segments, e.g. ["acme", "prod", "overview"] */
  path?: string[];
  /** Center slot (search trigger, status) */
  center?: React.ReactNode;
  /** Right-aligned actions */
  actions?: React.ReactNode;
}
export declare function Topbar(props: TopbarProps): JSX.Element;
