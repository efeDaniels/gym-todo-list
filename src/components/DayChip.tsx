import { MoonIcon } from "./Icon";

type Props = {
  label: string;
  active: boolean;
  isToday: boolean;
  isRest: boolean;
  onClick: () => void;
};

export function DayChip({ label, active, isToday, isRest, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`
        relative flex h-14 min-w-[3.5rem] flex-col items-center justify-center gap-0.5
        rounded-xl border px-2 transition-all duration-150 active:scale-95
        ${
          active
            ? "border-[var(--color-accent)] bg-[var(--color-accent-glow)] text-[var(--color-accent)]"
            : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-dim)] hover:border-[var(--color-border-strong)]"
        }
      `}
    >
      <span className="text-xs font-bold uppercase tracking-wider">
        {label}
      </span>
      {isRest ? (
        <MoonIcon size={14} className="opacity-70" />
      ) : (
        <span
          className={`h-1 w-1 rounded-full ${active ? "bg-[var(--color-accent)]" : "bg-[var(--color-text-mute)]"}`}
        />
      )}
      {isToday && (
        <span
          aria-hidden
          className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center"
        >
          <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-[var(--color-accent)] opacity-50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
        </span>
      )}
    </button>
  );
}
