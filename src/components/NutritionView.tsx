import { TopBar } from "./TopBar";
import { MealCard } from "./MealCard";
import { WaterTracker } from "./WaterTracker";
import { ProgressBar } from "./ProgressBar";
import { NUTRITION_PLAN, NUTRITION_RULES } from "../data/nutrition";
import { useNutritionState, useWater } from "../lib/hooks";

export function NutritionView() {
  const nutrition = useNutritionState();
  const water = useWater();

  const handleReset = () => {
    if (
      window.confirm(
        "Bugünkü tüm öğün ve su ilerlemesini sıfırlamak istiyor musun?",
      )
    ) {
      nutrition.resetAll();
      water.reset();
    }
  };

  return (
    <div className="flex flex-1 flex-col px-4">
      <TopBar
        title="Beslenme"
        subtitle={`${nutrition.mealsDone} / ${nutrition.mealsTotal} öğün tamam`}
        onReset={handleReset}
      />

      {/* Summary card */}
      <section className="mt-4 rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-2)] p-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-mute)]">
              Günlük İlerleme
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold tabular-nums text-[var(--color-accent)]">
                {Math.round(nutrition.summary.pct * 100)}
              </span>
              <span className="text-sm font-medium text-[var(--color-text-mute)]">
                %
              </span>
            </div>
          </div>
          <div className="text-right text-xs tabular-nums text-[var(--color-text-dim)]">
            <div>
              <span className="font-semibold text-[var(--color-text)]">
                {nutrition.summary.done}
              </span>
              <span className="text-[var(--color-text-mute)]">
                {" "}
                / {nutrition.summary.total} kalem
              </span>
            </div>
            <div>
              <span className="font-semibold text-[var(--color-text)]">
                {nutrition.mealsDone}
              </span>
              <span className="text-[var(--color-text-mute)]">
                {" "}
                / {nutrition.mealsTotal} öğün
              </span>
            </div>
          </div>
        </div>
        <ProgressBar value={nutrition.summary.pct} className="mt-3" />
      </section>

      {/* Water tracker */}
      <div className="mt-4">
        <WaterTracker glasses={water.glasses} onChange={water.set} />
      </div>

      {/* Meals */}
      <div className="mt-5">
        <div className="mb-2 flex items-baseline justify-between px-1">
          <h2 className="text-[13px] font-bold uppercase tracking-widest text-[var(--color-text-mute)]">
            Öğün Zaman Çizelgesi
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

      {/* Rules card */}
      <div className="safe-bottom-nav mt-5">
        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h2 className="mb-3 text-[13px] font-bold uppercase tracking-widest text-[var(--color-text-mute)]">
            Günlük Kurallar
          </h2>
          <ul className="space-y-2">
            {NUTRITION_RULES.map((rule) => (
              <li
                key={rule.text}
                className="flex items-center gap-3 rounded-xl bg-[var(--color-surface-2)] px-3 py-2.5"
              >
                <span className="text-xl" aria-hidden>
                  {rule.icon}
                </span>
                <span className="text-sm text-[var(--color-text)]">
                  {rule.text}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
