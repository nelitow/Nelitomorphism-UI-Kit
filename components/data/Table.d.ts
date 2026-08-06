export interface TableColumn {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  /** Render cell in mono (numbers, ids, timestamps) */
  mono?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}
export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: TableColumn[];
  rows?: Record<string, any>[];
  /** Renders real row structure with scrambling cells */
  loading?: boolean;
  loadingRows?: number;
  /** Column key used as the compact record title; defaults to the first column. */
  primaryKey?: string;
  onRowClick?: (row: any) => void;
}
export declare function Table(props: TableProps): JSX.Element;
