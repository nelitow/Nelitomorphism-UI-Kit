/** Sticky glass bar; below 900px the center occupies a second row, and below 560px only the current breadcrumb remains. Coarse pointers use touch-density rows. */
export interface TopbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Breadcrumb segments, e.g. ["acme", "prod", "overview"] */
  path?: string[];
  /** Center slot (search trigger, status); moves to its own compact row below the path/actions row. */
  center?: React.ReactNode;
  /** Right-aligned actions */
  actions?: React.ReactNode;
}
export declare function Topbar(props: TopbarProps): JSX.Element;
