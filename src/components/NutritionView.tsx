import { TopBar } from "./TopBar";
import { MealCard } from "./MealCard";
import { WaterTracker } from "./WaterTracker";
import { ProgressBar } from "./ProgressBar";
import { MacroChip } from "./MacroChip";
import {
  NUTRITION_PLAN,
  NUTRITION_RULES,
  PROTEIN_SOURCES,
  CARB_SOURCES,
  PROTEIN_SHAKE,
  SCENARIOS,
  getMealMacros,
  getItemKcal,
  computeConsumedKcal,
  type MacroInfo,
  type Scenario,
} from "../data/nutrition";
import { useNutritionState, useWater } from "../lib/hooks";
import { usePersistentState } from "../lib/storage";
import { l, t, useLang, type Lang, type UIKey } from "../lib/i18n";

export function NutritionView() {
  const [lang] = useLang();
  const nutrition = useNutritionState();
  const water = useWater();
  const [selectedScenarioId, setSelectedScenarioId] =
    usePersistentState<string>("nutrition:scenario", SCENARIOS[0]!.id);

  const selectedScenario =
    SCENARIOS.find((s) => s.id === selectedScenarioId) ?? SCENARIOS[0]!;
  const consumedKcal = computeConsumedKcal(
    nutrition.state,
    selectedScenarioId,
  );
  const kcalPct = Math.min(consumedKcal / selectedScenario.kcal, 1);

  const handleReset = () => {
    if (window.confirm(t("nutritionResetConfirm", lang))) {
      nutrition.resetAll();
      water.reset();
    }
  };

  return (
    <div className="flex flex-1 flex-col px-4">
      <TopBar
        title={t("nutritionTitle", lang)}
        subtitle={`${nutrition.mealsDone} / ${nutrition.mealsTotal} ${t("nutritionSubtitleMealsWord", lang)} · ${selectedScenario.kcal} kcal ${t("nutritionSubtitleTargetWord", lang)}`}
        onReset={handleReset}
      />

      {/* Summary + target macros for selected scenario */}
      <section className="mt-4 rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-2)] p-4">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-mute)]">
              {t("consumedKcal", lang)}
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold tabular-nums text-[var(--color-accent)]">
                {consumedKcal}
              </span>
              <span className="text-sm font-medium text-[var(--color-text-mute)]">
                / {selectedScenario.kcal} kcal
              </span>
            </div>
          </div>
          <div className="text-right text-xs tabular-nums text-[var(--color-text-dim)]">
            <div>
              <span className="font-semibold text-[var(--color-text)]">
                {nutrition.mealsDone}
              </span>
              <span className="text-[var(--color-text-mute)]">
                {" "}
                / {nutrition.mealsTotal} {t("nutritionSubtitleMealsWord", lang)}
              </span>
            </div>
            <div>
              <span className="font-semibold text-[var(--color-text)]">
                {nutrition.summary.done}
              </span>
              <span className="text-[var(--color-text-mute)]">
                {" "}
                / {nutrition.summary.total} {t("itemsWord", lang)}
              </span>
            </div>
            <div>
              <span className="font-semibold text-[var(--color-text)]">
                {Math.round(kcalPct * 100)}
              </span>
              <span className="text-[var(--color-text-mute)]">
                {t("percentTarget", lang)}
              </span>
            </div>
          </div>
        </div>
        <ProgressBar value={kcalPct} className="mt-3" />

        <div className="mt-4 rounded-xl border border-[var(--color-border)]/60 bg-[var(--color-surface-2)]/60 p-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-mute)]">
                {t("todayTarget", lang)}
              </div>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="text-base">{selectedScenario.emoji}</span>
                <span className="truncate text-sm font-semibold text-[var(--color-text)]">
                  {l(selectedScenario.name, lang)}
                </span>
              </div>
            </div>
          </div>
          <MacroChip data={selectedScenario} size="md" />
        </div>
      </section>

      {/* Water tracker */}
      <div className="mt-4">
        <WaterTracker glasses={water.glasses} onChange={water.set} />
      </div>

      {/* Scenario selector */}
      <div className="mt-5">
        <div className="mb-2 flex items-baseline justify-between px-1">
          <h2 className="text-[13px] font-bold uppercase tracking-widest text-[var(--color-text-mute)]">
            {t("scenariosHeading", lang)}
          </h2>
          <span className="text-[10px] text-[var(--color-text-mute)]">
            {t("scenariosSummary", lang)}
          </span>
        </div>
        <div className="space-y-2">
          {SCENARIOS.map((s) => (
            <ScenarioButton
              key={s.id}
              scenario={s}
              selected={selectedScenarioId === s.id}
              onSelect={() => setSelectedScenarioId(s.id)}
              lang={lang}
            />
          ))}
        </div>
      </div>

      {/* Meals */}
      <div className="mt-5">
        <div className="mb-2 flex items-baseline justify-between px-1">
          <h2 className="text-[13px] font-bold uppercase tracking-widest text-[var(--color-text-mute)]">
            {t("mealTimeline", lang)}
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
              macros={getMealMacros(meal.id, selectedScenarioId)}
              itemKcals={meal.items.map((_, i) =>
                getItemKcal(meal.id, i, selectedScenarioId),
              )}
            />
          ))}
        </div>
      </div>

      {/* Macro reference tables */}
      <div className="mt-5 space-y-3">
        <MacroReference
          title={t("proteinSourcesHeading", lang)}
          subtitle={t("averageMacros", lang)}
          items={PROTEIN_SOURCES}
          accent="var(--color-success)"
          lang={lang}
        />
        <MacroReference
          title={t("carbSourcesHeading", lang)}
          subtitle={t("averageMacros", lang)}
          items={CARB_SOURCES}
          accent="var(--color-water)"
          lang={lang}
        />
        <MacroReference
          title={t("supplementHeading", lang)}
          subtitle={t("wheyProtein", lang)}
          items={[PROTEIN_SHAKE]}
          accent="var(--color-accent)"
          lang={lang}
        />
      </div>

      {/* Rules card */}
      <div className="safe-bottom-nav mt-5">
        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <h2 className="mb-3 text-[13px] font-bold uppercase tracking-widest text-[var(--color-text-mute)]">
            {t("dailyRulesHeading", lang)}
          </h2>
          <ul className="space-y-2">
            {NUTRITION_RULES.map((rule) => {
              const text = l(rule.text, lang);
              return (
                <li
                  key={text}
                  className="flex items-center gap-3 rounded-xl bg-[var(--color-surface-2)] px-3 py-2.5"
                >
                  <span className="text-xl" aria-hidden>
                    {rule.icon}
                  </span>
                  <span className="text-sm text-[var(--color-text)]">
                    {text}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}

// -------------------- Scenario button --------------------

const HIGHLIGHT_LABEL_KEYS: Record<NonNullable<Scenario["highlight"]>, UIKey> = {
  "high-protein": "highlightHighProtein",
  "low-fat": "highlightLowFat",
  balanced: "highlightBalanced",
  "low-cal": "highlightLowCal",
};

type ScenarioProps = {
  scenario: Scenario;
  selected: boolean;
  onSelect: () => void;
  lang: Lang;
};

function ScenarioButton({ scenario, selected, onSelect, lang }: ScenarioProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`
        block w-full rounded-2xl border p-4 text-left transition-all duration-150
        active:scale-[0.995]
        ${
          selected
            ? "border-[var(--color-accent)] bg-[var(--color-accent-glow)]"
            : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)]"
        }
      `}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-2xl ${
            selected
              ? "bg-[var(--color-accent)]/20"
              : "bg-[var(--color-surface-2)]"
          }`}
        >
          {scenario.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <h3 className="text-[15px] font-semibold leading-tight text-[var(--color-text)]">
              {l(scenario.name, lang)}
            </h3>
            {selected && (
              <span className="rounded-md bg-[var(--color-accent)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                {t("scenarioActive", lang)}
              </span>
            )}
            {scenario.highlight && !selected && (
              <span className="rounded-md bg-[var(--color-surface-2)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[var(--color-text-mute)]">
                {t(HIGHLIGHT_LABEL_KEYS[scenario.highlight], lang)}
              </span>
            )}
          </div>
          <p className="mt-1 truncate text-xs text-[var(--color-text-dim)]">
            {l(scenario.proteinSource, lang)}
          </p>
          <p className="truncate text-xs text-[var(--color-text-dim)]">
            + {l(scenario.carbSource, lang)}
          </p>
        </div>
      </div>
      <div className="mt-3">
        <MacroChip data={scenario} size="sm" />
      </div>
      {scenario.note && (
        <p className="mt-2 text-xs italic leading-snug text-[var(--color-text-mute)]">
          {l(scenario.note, lang)}
        </p>
      )}
    </button>
  );
}

// -------------------- Macro reference table --------------------

type MacroRefProps = {
  title: string;
  subtitle?: string;
  items: readonly MacroInfo[];
  accent: string;
  lang: Lang;
};

function MacroReference({ title, subtitle, items, accent, lang }: MacroRefProps) {
  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <div>
          <h3 className="text-[13px] font-bold uppercase tracking-widest text-[var(--color-text-mute)]">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-0.5 text-[11px] text-[var(--color-text-mute)]">
              {subtitle}
            </p>
          )}
        </div>
        <span
          aria-hidden
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: accent }}
        />
      </div>
      <ul className="space-y-2.5">
        {items.map((item) => {
          const name = l(item.name, lang);
          return (
            <li
              key={name}
              className="flex items-start gap-3 rounded-xl bg-[var(--color-surface-2)] p-2.5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-surface-3)] text-lg">
                {item.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-[var(--color-text)]">
                    {name}
                  </span>
                  <span className="shrink-0 text-[10px] font-medium text-[var(--color-text-mute)]">
                    {l(item.unit, lang)}
                  </span>
                </div>
                <div className="mt-1.5">
                  <MacroChip data={item} size="sm" />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
