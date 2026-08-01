type Props = {
  value: number; // 0..1
  size?: number;
  stroke?: number;
  color?: string;
  trackColor?: string;
  label?: string;
  sublabel?: string;
};

export function ProgressRing({
  value,
  size = 88,
  stroke = 8,
  color = "var(--color-accent)",
  trackColor = "var(--color-surface-3)",
  label,
  sublabel,
}: Props) {
  const pct = Math.max(0, Math.min(1, value));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct);

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={trackColor}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 400ms ease-out" }}
        />
      </svg>
      {(label || sublabel) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {label && (
            <span className="text-xl font-bold tabular-nums leading-none text-[var(--color-text)]">
              {label}
            </span>
          )}
          {sublabel && (
            <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--color-text-mute)]">
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
