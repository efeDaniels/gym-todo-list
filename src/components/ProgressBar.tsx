type Props = {
  value: number; // 0..1
  color?: string; // css color var
  height?: string;
  className?: string;
};

export function ProgressBar({
  value,
  color = "var(--color-accent)",
  height = "6px",
  className = "",
}: Props) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <div
      className={`w-full overflow-hidden rounded-full bg-[var(--color-surface-3)] ${className}`}
      style={{ height }}
    >
      <div
        className="h-full rounded-full transition-all duration-300 ease-out"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}
