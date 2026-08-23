import { useMemo } from "react";
import { TopBar } from "./TopBar";
import { ProgressRing } from "./ProgressRing";
import { WaterTracker } from "./WaterTracker";
import { WorkoutDaySection } from "./WorkoutDaySection";
import { MealCard } from "./MealCard";
import { MacroChip } from "./MacroChip";
import {
  AppleIcon,
  DumbbellIcon,
  MoonIcon,
} from "./Icon";
import {
  NUTRITION_PLAN,
  SCENARIOS,
  getMealMacros,
  getItemKcal,
  computeConsumedKcal,
} from "../data/nutrition";
import { formatDateLong } from "../lib/dateKey";
import {
  DAY_ORDER,
  getDayByKey,
  getTodayKey,
  type DayKey,
} from "../data/workouts";
import {
  useNutritionState,
  useWater,
  useWorkoutDayState,
} from "../lib/hooks";
import { usePersistentState } from "../lib/storage";
import type { Tab } from "./BottomNav";

type Props = {
  onNavigate: (tab: Tab) => void;
};

export function TodayView({ onNavigate }: Props) {
  const todayKey: DayKey = getTodayKey();
  const day = getDayByKey(todayKey);
  const workout = useWorkoutDayState(todayKey, day);
  const nutrition = useNutritionState();
  const water = useWater();
  const [selectedScenarioId] = usePersistentState<string>(
    "nutrition:scenario",
    SCENARIOS[0]!.id,
  );

  const selectedScenario =
    SCENARIOS.find((s) => s.id === selectedScenarioId) ?? SCENARIOS[0]!;
  const consumedKcal = computeConsumedKcal(
    nutrition.state,
    selectedScenarioId,
  );
  const kcalPct = Math.min(consumedKcal / selectedScenario.kcal, 1);

  const now = useMemo(() => new Date(), []);
  const dateLabel = formatDateLong(now);

  return (
    <div className="flex flex-1 flex-col px-4">
      <TopBar
        title={day.isRest ? "Bugün" : `${day.title ?? "Bugün"}`}
        subtitle={`${day.dayLong} · ${dateLabel}`}
      />

      {/* Week overview strip */}
      <WeekStrip todayKey={todayKey} onNavigate={onNavigate} />

      {/* Hero summary — two rings */}
      <section className="mt-4 rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-2)] p-4">
        <div className="flex items-center justify-around">
          <button
            type="button"
            onClick={() => onNavigate("workout")}
            className="flex flex-col items-center gap-1.5 rounded-xl px-2 py-1 transition-transform active:scale-95"
            aria-label="Antrenmana git"
          >
            {day.isRest ? (
              <ProgressRing
                value={1}
                color="var(--color-rest)"
                label=""
                sublabel="Dinlenme"
                size={92}
              />
            ) : (
              <ProgressRing
                value={workout.summary.pct}
                color="var(--color-accent)"
                label={`${workout.summary.done}/${workout.summary.total}`}
                sublabel="SET"
                size={92}
              />
            )}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-dim)]">
              {day.isRest ? (
                <MoonIcon size={14} className="text-[var(--color-rest)]" />
              ) : (
                <DumbbellIcon
                  size={14}
                  className="text-[var(--color-accent)]"
                />
              )}
              <span>Antrenman</span>
            </div>
          </button>

          <div className="h-16 w-px bg-[var(--color-border)]" />

          <button
            type="button"
            onClick={() => onNavigate("nutrition")}
            className="flex flex-col items-center gap-1.5 rounded-xl px-2 py-1 transition-transform active:scale-95"
            aria-label="Beslenmeye git"
          >
            <ProgressRing
              value={kcalPct}
              color="var(--color-success)"
              label={`${consumedKcal}`}
              sublabel="KCAL"
              size={92}
            />
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-dim)]">
              <AppleIcon size={14} className="text-[var(--color-success)]" />
              <span>
                Beslenme · {nutrition.mealsDone}/{nutrition.mealsTotal}
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* Water */}
      <div className="mt-4">
        <WaterTracker glasses={water.glasses} onChange={water.set} />
      </div>

      {/* Today's workout */}
      <div className="mt-6">
        <div className="mb-3 flex items-center gap-2 px-1">
          <DumbbellIcon size={16} className="text-[var(--color-accent)]" />
          <h2 className="text-[13px] font-bold uppercase tracking-widest text-[var(--color-text-mute)]">
            Bugünün Antrenmanı
          </h2>
        </div>
        <WorkoutDaySection dayKey={todayKey} day={day} showTitle={false} />
      </div>

      {/* Today's meals */}
      <div className="safe-bottom-nav mt-6">
        <div className="mb-3 flex items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-2">
            <AppleIcon size={16} className="text-[var(--color-success)]" />
            <h2 className="text-[13px] font-bold uppercase tracking-widest text-[var(--color-text-mute)]">
              Bugünün Beslenmesi
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("nutrition")}
            className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-[11px] font-semibold text-[var(--color-text-dim)] transition-all active:scale-95"
            aria-label={`Senaryo: ${selectedScenario.name}, değiştir`}
          >
            <span className="text-sm">{selectedScenario.emoji}</span>
            <span className="tabular-nums">
              {consumedKcal} / {selectedScenario.kcal} kcal
            </span>
          </button>
        </div>
        <div className="mb-3">
          <MacroChip data={selectedScenario} showKcal={false} size="sm" />
        </div>
        <div className="space-y-3">
          {NUTRITION_PLAN.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              completed={nutrition.getCompleted(meal)}
              onToggleItem={(i) => nutrition.toggleItem(meal, i)}
              onToggleAll={() => nutrition.toggleAll(meal)}
              macros={getMealMacros(meal.id, selectedScenarioId)}
              itemKcals={meal.items.map((_, i) =>
                getItemKcal(meal.id, i, selectedScenarioId),
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------- Week strip --------------------

const DAY_INITIAL: Record<DayKey, string> = {
  pazartesi: "P",
  sali: "S",
  carsamba: "Ç",
  persembe: "P",
  cuma: "C",
  cumartesi: "C",
  pazar: "P",
};

const AMBIGUOUS_TITLE_GLYPH: Record<string, string> = {
  PUSH: "↑",
  PULL: "↓",
};

type WeekStripProps = {
  todayKey: DayKey;
  onNavigate: (tab: Tab) => void;
};

function WeekStrip({ todayKey, onNavigate }: WeekStripProps) {
  return (
    <div className="mt-3 flex gap-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5">
      {DAY_ORDER.map((k) => {
        const d = getDayByKey(k);
        const isToday = k === todayKey;
        const labelChar = d.isRest
          ? null
          : (d.title ? AMBIGUOUS_TITLE_GLYPH[d.title] : undefined) ??
            d.title?.charAt(0) ??
            "•";
        return (
          <button
            key={k}
            type="button"
            onClick={() => onNavigate("workout")}
            aria-current={isToday ? "date" : undefined}
            aria-label={`${d.dayLong}${d.isRest ? " - Dinlenme" : ` - ${d.title}`}`}
            className={`
              relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl py-1.5
              transition-all duration-150 active:scale-95
              ${
                isToday
                  ? "bg-[var(--color-accent-glow)]"
                  : "hover:bg-[var(--color-surface-2)]"
              }
            `}
          >
            <span
              className={`text-[9px] font-bold uppercase tracking-wider ${
                isToday
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-text-mute)]"
              }`}
            >
              {DAY_INITIAL[k]}
            </span>
            {labelChar ? (
              <span
                className={`text-sm font-extrabold leading-none ${
                  isToday
                    ? "text-[var(--color-accent)]"
                    : "text-[var(--color-text)]"
                }`}
              >
                {labelChar}
              </span>
            ) : (
              <MoonIcon
                size={12}
                className={
                  isToday
                    ? "text-[var(--color-accent)]"
                    : "text-[var(--color-rest)]/60"
                }
              />
            )}
            {isToday && (
              <span
                aria-hidden
                className="absolute -bottom-0.5 h-0.5 w-4 rounded-full bg-[var(--color-accent)]"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
