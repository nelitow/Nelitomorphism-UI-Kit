export interface NeliMaterialProps {
  /** First hue in degrees (default 195, cyan) */
  hue?: number;
  /** Second hue in degrees (default 305, violet) */
  hue2?: number;
  /** Brightness multiplier 0–2 (default 1) */
  intensity?: number;
  /** Animation speed multiplier (default 1) */
  speed?: number;
  style?: React.CSSProperties;
}
export declare function NeliMaterial(props: NeliMaterialProps): JSX.Element;
