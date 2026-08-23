export type MacroData = {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

type Props = {
  data: MacroData;
  showKcal?: boolean;
  size?: "sm" | "md";
};

export function MacroChip({ data, showKcal = true, size = "sm" }: Props) {
  const padX = size === "md" ? "px-2.5" : "px-2";
  const padY = size === "md" ? "py-1.5" : "py-1";
  const textNum = size === "md" ? "text-xs" : "text-[11px]";
  const textUnit = size === "md" ? "text-[10px]" : "text-[9px]";

  return (
    <div className="flex flex-wrap items-center gap-1.5 tabular-nums">
      {showKcal && (
        <div
          className={`flex items-baseline gap-1 rounded-md bg-[var(--color-accent-glow)] ${padX} ${padY}`}
        >
          <span
            className={`font-bold text-[var(--color-accent)] ${textNum}`}
          >
            {formatNum(data.kcal)}
          </span>
          <span
            className={`font-medium uppercase tracking-wider text-[var(--color-accent)]/70 ${textUnit}`}
          >
            kcal
          </span>
        </div>
      )}
      <div
        className={`flex items-baseline gap-0.5 rounded-md bg-[var(--color-success-glow)] ${padX} ${padY}`}
      >
        <span className={`font-bold text-[var(--color-success)] ${textNum}`}>
          {formatNum(data.protein)}
        </span>
        <span
          className={`font-medium uppercase tracking-wider text-[var(--color-success)]/70 ${textUnit}`}
        >
          gP
        </span>
      </div>
      <div
        className={`flex items-baseline gap-0.5 rounded-md bg-[var(--color-water-glow)] ${padX} ${padY}`}
      >
        <span className={`font-bold text-[var(--color-water)] ${textNum}`}>
          {formatNum(data.carbs)}
        </span>
        <span
          className={`font-medium uppercase tracking-wider text-[var(--color-water)]/70 ${textUnit}`}
        >
          gC
        </span>
      </div>
      <div
        className={`flex items-baseline gap-0.5 rounded-md bg-[var(--color-fat-glow)] ${padX} ${padY}`}
      >
        <span className={`font-bold text-[var(--color-fat)] ${textNum}`}>
          {formatNum(data.fat)}
        </span>
        <span
          className={`font-medium uppercase tracking-wider text-[var(--color-fat)]/70 ${textUnit}`}
        >
          gY
        </span>
      </div>
    </div>
  );
}

function formatNum(n: number): string {
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(1);
}
