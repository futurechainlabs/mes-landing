import { useConfig } from "../config/ConfigContext";

interface Props {
  /** Key to look up a custom uploaded image in the images store */
  imageKey: string;
  /** Fallback Material Symbols icon name */
  fallback: string;
  /** Extra className for the icon/image */
  className?: string;
  /** Inline style (e.g. fontVariationSettings) */
  style?: React.CSSProperties;
}

/**
 * Renders a custom uploaded image if one exists for `imageKey`,
 * otherwise falls back to a Material Symbols icon.
 */
export default function DynamicIcon({ imageKey, fallback, className = "", style }: Props) {
  const { images } = useConfig();
  const custom = images[imageKey];

  if (custom) {
    return <img src={custom} alt="" className={`object-contain ${className}`} style={style} />;
  }

  return (
    <span className={`material-symbols-outlined ${className}`} style={style}>
      {fallback}
    </span>
  );
}
