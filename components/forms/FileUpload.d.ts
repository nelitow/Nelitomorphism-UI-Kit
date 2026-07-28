export interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  hint?: string;
  accept?: string;
  multiple?: boolean;
  /** Receives the FileList on drop/browse */
  onFiles?: (files: FileList) => void;
}
export declare function FileUpload(props: FileUploadProps): JSX.Element;
