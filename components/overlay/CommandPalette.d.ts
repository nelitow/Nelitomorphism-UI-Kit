export interface Command {
  id?: string;
  label: string;
  /** Uppercase mono group prefix */
  group?: string;
  /** Keyboard hint chip, e.g. "⌘D" */
  hint?: string;
  action?: () => void;
}
export interface CommandPaletteProps extends React.HTMLAttributes<HTMLDivElement> {
  commands: Command[];
  /** Controlled open state; omit to let ⌘K manage it */
  open?: boolean;
  onClose?: () => void;
  /** Fallback handler when a command has no action */
  onRun?: (cmd: Command) => void;
  /** Key combined with ⌘/Ctrl (default "k") */
  hotkey?: string;
  placeholder?: string;
}
export declare function CommandPalette(props: CommandPaletteProps): JSX.Element;
