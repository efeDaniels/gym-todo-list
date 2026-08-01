import { useMemo } from "react";
import { TopBar } from "./TopBar";
import { ProgressRing } from "./ProgressRing";
import { WaterTracker } from "./WaterTracker";
import { WorkoutDaySection } from "./WorkoutDaySection";
import { MealCard } from "./MealCard";
import {
  AppleIcon,
  DumbbellIcon,
  MoonIcon,
} from "./Icon";
import { NUTRITION_PLAN } from "../data/nutrition";
import { formatDateLong } from "../lib/dateKey";
import {
  getDayByKey,
  getTodayKey,
  type DayKey,
} from "../data/workouts";
import {
  useNutritionState,
  useWater,
  useWorkoutDayState,
} from "../lib/hooks";
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

  const now = useMemo(() => new Date(), []);
  const dateLabel = formatDateLong(now);

  return (
    <div className="flex flex-1 flex-col px-4">
      <TopBar
        title={day.isRest ? "Bugün" : `${day.title ?? "Bugün"}`}
        subtitle={`${day.dayLong} · ${dateLabel}`}
      />

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
              value={nutrition.summary.pct}
              color="var(--color-success)"
              label={`${nutrition.mealsDone}/${nutrition.mealsTotal}`}
              sublabel="Öğün"
              size={92}
            />
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-dim)]">
              <AppleIcon size={14} className="text-[var(--color-success)]" />
              <span>Beslenme</span>
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
        <div className="mb-3 flex items-center gap-2 px-1">
          <AppleIcon size={16} className="text-[var(--color-success)]" />
          <h2 className="text-[13px] font-bold uppercase tracking-widest text-[var(--color-text-mute)]">
            Bugünün Beslenmesi
          </h2>
        </div>
        <div className="space-y-3">
          {NUTRITION_PLAN.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              completed={nutrition.getCompleted(meal)}
              onToggleItem={(i) => nutrition.toggleItem(meal, i)}
              onToggleAll={() => nutrition.toggleAll(meal)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
