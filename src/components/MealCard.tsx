import { CheckIcon } from "./Icon";
import { MacroChip } from "./MacroChip";
import type { Meal, MacroData } from "../data/nutrition";

type Props = {
  meal: Meal;
  completed: boolean[];
  onToggleItem: (itemIndex: number) => void;
  onToggleAll: () => void;
  macros?: MacroData | null;
};

export function MealCard({
  meal,
  completed,
  onToggleItem,
  onToggleAll,
  macros,
}: Props) {
  const doneCount = completed.filter(Boolean).length;
  const total = meal.items.length;
  const allDone = doneCount === total && total > 0;
  const anyDone = doneCount > 0;

  return (
    <article
      className={`
        rounded-2xl border p-4 transition-all duration-200
        ${
          allDone
            ? "border-[var(--color-success)]/30 bg-[var(--color-success)]/[0.03]"
            : "border-[var(--color-border)] bg-[var(--color-surface)]"
        }
      `}
    >
      <header className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`
              flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-2xl
              ${allDone ? "bg-[var(--color-success)]/15" : "bg-[var(--color-surface-2)]"}
            `}
            aria-hidden
          >
            {meal.emoji}
          </div>
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
                {meal.timeShort}
              </span>
              <span className="truncate text-[11px] text-[var(--color-text-mute)]">
                {meal.time}
              </span>
            </div>
            <h3 className="text-[15px] font-semibold leading-tight text-[var(--color-text)]">
              {meal.title}
            </h3>
          </div>
        </div>
        <button
          type="button"
          onClick={onToggleAll}
          aria-pressed={allDone}
          aria-label={allDone ? "Öğünü sıfırla" : "Öğünü tamamla"}
          className={`
            flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-150
            active:scale-95
            ${
              allDone
                ? "bg-[var(--color-success)] text-white shadow-lg shadow-[var(--color-success-glow)]"
                : anyDone
                  ? "border border-[var(--color-accent)]/50 bg-[var(--color-accent-glow)] text-[var(--color-accent)]"
                  : "border border-[var(--color-border-strong)] bg-[var(--color-surface-2)] text-[var(--color-text-mute)]"
            }
          `}
        >
          <CheckIcon size={22} className={allDone ? "anim-pop" : ""} />
        </button>
      </header>

      {macros && (
        <div className="mt-3">
          <MacroChip data={macros} size="sm" />
        </div>
      )}

      <ul className="mt-3 space-y-2">
        {meal.items.map((item, i) => {
          const done = completed[i] ?? false;
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => onToggleItem(i)}
                aria-pressed={done}
                className={`
                  flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left
                  transition-all duration-150 active:scale-[0.99]
                  ${
                    done
                      ? "bg-[var(--color-surface-2)]/50"
                      : "bg-[var(--color-surface-2)] hover:bg-[var(--color-surface-3)]"
                  }
                `}
              >
                <span
                  className={`
                    mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all
                    ${
                      done
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)]"
                        : "border-[var(--color-border-strong)] bg-transparent"
                    }
                  `}
                >
                  {done && (
                    <CheckIcon
                      className="text-white anim-pop"
                      size={14}
                    />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`
                      text-sm leading-snug
                      ${
                        done
                          ? "text-[var(--color-text-mute)] line-through decoration-[var(--color-text-mute)]"
                          : "text-[var(--color-text)]"
                      }
                    `}
                  >
                    {item.text}
                  </p>
                  {item.hint && (
                    <p className="mt-0.5 text-xs text-[var(--color-text-mute)]">
                      {item.hint}
                    </p>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {meal.note && (
        <p className="mt-3 rounded-lg bg-[var(--color-surface-2)] px-3 py-2 text-xs italic text-[var(--color-text-dim)]">
          {meal.note}
        </p>
      )}
    </article>
  );
}
