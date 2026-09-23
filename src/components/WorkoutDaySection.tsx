import { useMemo } from "react";
import { ExerciseCard } from "./ExerciseCard";
import { ProgressBar } from "./ProgressBar";
import { MoonIcon } from "./Icon";
import type { DayKey, WorkoutDay } from "../data/workouts";
import { useWorkoutDayState } from "../lib/hooks";
import { l, t, useLang } from "../lib/i18n";

type Props = {
  dayKey: DayKey;
  day: WorkoutDay;
  showTitle?: boolean;
};

export function WorkoutDaySection({ dayKey, day, showTitle = true }: Props) {
  const [lang] = useLang();
  const { getCompleted, toggleSet, summary } = useWorkoutDayState(dayKey, day);

  const focusLine = useMemo(
    () => l(day.focus, lang).join(" · "),
    [day.focus, lang],
  );

  if (day.isRest) {
    return (
      <section className="anim-fade">
        {showTitle && (
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-rest)]/15 text-[var(--color-rest)]">
              <MoonIcon size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--color-text)]">
                {t("restDayHeading", lang)}
              </h2>
              <p className="text-xs text-[var(--color-text-dim)]">
                {l(day.dayLong, lang)}
              </p>
            </div>
          </div>
        )}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-rest)]/10 text-[var(--color-rest)]">
            <MoonIcon size={32} />
          </div>
          <h3 className="text-base font-semibold text-[var(--color-text)]">
            {t("restToday", lang)}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-text-dim)]">
            {day.restNote ? l(day.restNote, lang) : t("restDefaultNote", lang)}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="anim-fade">
      {showTitle && (
        <>
          <div className="mb-3 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-mute)]">
                {l(day.dayLong, lang)}
              </div>
              <h2 className="mt-0.5 text-2xl font-extrabold leading-tight tracking-tight text-[var(--color-text)]">
                {day.title}
              </h2>
              {focusLine && (
                <p className="mt-0.5 truncate text-xs text-[var(--color-text-dim)]">
                  {focusLine}
                </p>
              )}
            </div>
            <div className="shrink-0 text-right">
              <div className="text-2xl font-bold tabular-nums leading-none text-[var(--color-accent)]">
                {Math.round(summary.pct * 100)}
                <span className="text-sm text-[var(--color-text-mute)]">%</span>
              </div>
              <div className="mt-0.5 text-[10px] font-medium tabular-nums text-[var(--color-text-mute)]">
                {summary.done} / {summary.total} {t("setUnit", lang)}
              </div>
            </div>
          </div>
          <ProgressBar value={summary.pct} className="mb-5" />
        </>
      )}

      <div className="space-y-3">
        {day.exercises.map((ex, i) => (
          <ExerciseCard
            key={ex.id}
            exercise={ex}
            completed={getCompleted(ex.id, ex.sets)}
            onToggleSet={(idx) => toggleSet(ex.id, ex.sets, idx)}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
