import { ResetIcon } from "./Icon";

type Props = {
  title: string;
  subtitle?: string;
  onReset?: () => void;
  resetLabel?: string;
};

export function TopBar({
  title,
  subtitle,
  onReset,
  resetLabel = "Sıfırla",
}: Props) {
  return (
    <header className="safe-top sticky top-0 z-30 -mx-4 border-b border-[var(--color-border)]/60 bg-[var(--color-bg)]/85 px-4 pb-3 pt-2 backdrop-blur-md">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold leading-tight tracking-tight text-[var(--color-text)]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-0.5 truncate text-xs text-[var(--color-text-dim)]">
              {subtitle}
            </p>
          )}
        </div>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            aria-label={resetLabel}
            className="flex h-10 items-center gap-1.5 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 text-xs font-semibold text-[var(--color-text-dim)] transition-all active:scale-95"
          >
            <ResetIcon size={16} />
            <span>{resetLabel}</span>
          </button>
        )}
      </div>
    </header>
  );
}
