/**
 * Deterministic typing engine.
 * Given progress (0-1) and full text, returns the substring to display.
 * No state, no effects - pure calculation.
 */

interface TypingEngineProps {
  text: string;
  progress: number; // 0 to 1
  active: boolean;
}

export default function TypingEngine({ text, progress, active }: TypingEngineProps) {
  if (!active) return null;

  const charCount = Math.floor(progress * text.length);
  const displayText = text.slice(0, charCount);
  const showCursor = progress < 1;

  return (
    <span className="whitespace-pre-wrap italic">
      {displayText}
      {showCursor && (
        <span className="cursor-blink inline-block w-[2px] h-[1.1em] bg-primary ml-[1px] align-text-bottom" />
      )}
    </span>
  );
}
