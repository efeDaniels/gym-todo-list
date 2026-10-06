import { useState } from "react";
import { TopBar } from "./TopBar";
import { ChevronDownIcon, InfoIcon, PlaneIcon } from "./Icon";
import {
  BONUS_DAYS,
  DECISION_TABLE,
  DELOAD,
  NUTRITION_MIN,
  PPL_DAYS,
  PROGRESSION,
  SCHEDULE_EXAMPLES,
  SCHEDULE_RULES,
  SUBSTITUTIONS,
  TRAVEL_INTRO,
  type BonusDay,
  type TravelDay,
  type TravelExercise,
} from "../data/travel";
import { l, t, useLang, type Lang } from "../lib/i18n";

export function TravelView() {
  const [lang] = useLang();

  return (
    <div className="flex flex-1 flex-col px-4">
      <TopBar
        title={t("travelTitle", lang)}
        subtitle={t("travelSubtitle", lang)}
      />

      <div className="safe-bottom-nav mt-4 space-y-5">
        <ResearchCard lang={lang} />
        <CoreProgramSection lang={lang} />
        <BonusSection lang={lang} />
        <ScheduleSection lang={lang} />
        <ProgressionSection lang={lang} />
        <RulesSection lang={lang} />
        <SubstitutionsSection lang={lang} />
        <NutritionSection lang={lang} />
      </div>
    </div>
  );
}

function ResearchCard({ lang }: { lang: Lang }) {
  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-2)] p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
          <PlaneIcon size={22} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold leading-tight text-[var(--color-text)]">
            {l(TRAVEL_INTRO.researchHeadline, lang)}
          </h2>
          <p className="mt-1 text-xs text-[var(--color-text-dim)]">
            {l(TRAVEL_INTRO.context, lang)}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-[var(--color-text)]">
        {l(TRAVEL_INTRO.researchBody, lang)}
      </p>

      <div className="mt-4 rounded-xl border border-[var(--color-border)]/60 bg-[var(--color-surface-2)]/60 p-3">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-mute)]">
          {t("travelOptimHeading", lang)}
        </div>
        <ul className="space-y-1.5">
          {l(TRAVEL_INTRO.optimizations, lang).map((item) => (
            <li
              key={item}
              className="flex gap-2 text-xs leading-snug text-[var(--color-text-dim)]"
            >
              <span
                aria-hidden
                className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CoreProgramSection({ lang }: { lang: Lang }) {
  const [openKey, setOpenKey] = useState<string | null>("push");

  return (
    <section>
      <SectionHeading
        title={t("travelCoreHeading", lang)}
        subtitle={t("travelCoreSubtitle", lang)}
      />
      <div className="space-y-2.5">
        {PPL_DAYS.map((day) => (
          <DayCard
            key={day.key}
            day={day}
            open={openKey === day.key}
            onToggle={() => setOpenKey(openKey === day.key ? null : day.key)}
            lang={lang}
          />
        ))}
      </div>
    </section>
  );
}

function DayCard({
  day,
  open,
  onToggle,
  lang,
}: {
  day: TravelDay;
  open: boolean;
  onToggle: () => void;
  lang: Lang;
}) {
  return (
    <article
      className={`
        overflow-hidden rounded-2xl border transition-colors
        ${
          open
            ? "border-[var(--color-accent)]/40 bg-[var(--color-surface)]"
            : "border-[var(--color-border)] bg-[var(--color-surface)]"
        }
      `}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={open ? t("travelCollapseAria", lang) : t("travelExpandAria", lang)}
        className="flex w-full items-center gap-3 p-4 text-left transition-all active:scale-[0.995]"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-glow)] text-xs font-black tracking-tight text-[var(--color-accent)]">
          {day.title.slice(0, 4)}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold leading-tight text-[var(--color-text)]">
            {day.title}
          </h3>
          <p className="mt-0.5 truncate text-xs text-[var(--color-text-dim)]">
            {l(day.subtitle, lang)}
          </p>
          <p className="mt-1 text-[11px] text-[var(--color-text-mute)]">
            <span className="tabular-nums">{l(day.duration, lang)}</span>
            <span className="mx-1.5">·</span>
            <span>
              {day.exercises.length} {t("travelExercisesSuffix", lang)}
            </span>
          </p>
        </div>
        <ChevronDownIcon
          size={20}
          className={`shrink-0 text-[var(--color-text-mute)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="anim-fade border-t border-[var(--color-border)]/60 bg-[var(--color-surface-2)]/40 p-4">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-mute)]">
            <span className="rounded-md bg-[var(--color-surface-3)] px-2 py-1">
              {t("travelFocusLabel", lang)}: {l(day.focus, lang).join(" · ")}
            </span>
            <span className="rounded-md bg-[var(--color-surface-3)] px-2 py-1">
              {t("travelVolumeLabel", lang)}: {l(day.volumeSummary, lang)}
            </span>
          </div>
          <div className="space-y-2">
            {day.exercises.map((ex, i) => (
              <ExerciseRow key={ex.id} ex={ex} index={i} lang={lang} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function BonusSection({ lang }: { lang: Lang }) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <section>
      <SectionHeading
        title={t("travelBonusHeading", lang)}
        subtitle={t("travelBonusSubtitle", lang)}
      />

      <div className="mb-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div className="mb-2 flex items-center gap-2">
          <InfoIcon size={16} className="text-[var(--color-accent)]" />
          <h3 className="text-[13px] font-bold uppercase tracking-wider text-[var(--color-text-mute)]">
            {t("travelDecisionHeading", lang)}
          </h3>
        </div>
        <ul className="space-y-1">
          {l(DECISION_TABLE, lang).map((row) => (
            <li
              key={row}
              className="font-mono text-[12px] leading-relaxed text-[var(--color-text-dim)]"
            >
              {row}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2.5">
        {BONUS_DAYS.map((bonus) => (
          <BonusCard
            key={bonus.key}
            bonus={bonus}
            open={openKey === bonus.key}
            onToggle={() =>
              setOpenKey(openKey === bonus.key ? null : bonus.key)
            }
            lang={lang}
          />
        ))}
      </div>
    </section>
  );
}

const BONUS_LABEL_COLORS: Record<BonusDay["key"], string> = {
  "arms-delts": "bg-[var(--color-accent-glow)] text-[var(--color-accent)]",
  "weak-point": "bg-[var(--color-fat-glow)] text-[var(--color-fat)]",
  "light-upper-lower": "bg-[var(--color-water-glow)] text-[var(--color-water)]",
  "full-ppl": "bg-[var(--color-success-glow)] text-[var(--color-success)]",
};

function BonusCard({
  bonus,
  open,
  onToggle,
  lang,
}: {
  bonus: BonusDay;
  open: boolean;
  onToggle: () => void;
  lang: Lang;
}) {
  const labelColor = BONUS_LABEL_COLORS[bonus.key];

  return (
    <article
      className={`
        overflow-hidden rounded-2xl border transition-colors
        ${
          open
            ? "border-[var(--color-border-strong)] bg-[var(--color-surface)]"
            : "border-[var(--color-border)] bg-[var(--color-surface)]"
        }
      `}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={open ? t("travelCollapseAria", lang) : t("travelExpandAria", lang)}
        className="flex w-full items-start gap-3 p-4 text-left transition-all active:scale-[0.995]"
      >
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-black ${labelColor}`}
        >
          {bonus.label}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-bold leading-tight text-[var(--color-text)]">
            {l(bonus.title, lang)}
          </h3>
          <p className="mt-0.5 truncate text-xs text-[var(--color-text-dim)]">
            {l(bonus.tagline, lang)}
          </p>
          <p className="mt-1 text-[11px] tabular-nums text-[var(--color-text-mute)]">
            {l(bonus.duration, lang)}
          </p>
        </div>
        <ChevronDownIcon
          size={20}
          className={`mt-1 shrink-0 text-[var(--color-text-mute)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="anim-fade border-t border-[var(--color-border)]/60 bg-[var(--color-surface-2)]/40 p-4">
          <div className="mb-3 space-y-2.5">
            <LabeledLine
              label={t("travelWhenLabel", lang)}
              body={l(bonus.bestWhen, lang)}
            />
            <LabeledLine
              label={t("travelRationaleLabel", lang)}
              body={l(bonus.rationale, lang)}
            />
          </div>

          <div className="space-y-4">
            {bonus.blocks.map((block, bi) => (
              <div key={bi}>
                {block.heading && (
                  <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[var(--color-accent)]">
                    {l(block.heading, lang)}
                  </div>
                )}
                {block.exercises.length === 0 ? null : (
                  <div className="space-y-2">
                    {block.exercises.map((ex, i) => (
                      <ExerciseRow
                        key={ex.id}
                        ex={ex}
                        index={i}
                        lang={lang}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {bonus.volumeNote && (
            <div className="mt-4 rounded-xl border border-[var(--color-border)]/60 bg-[var(--color-surface-3)]/40 p-3 text-[11px] italic leading-snug text-[var(--color-text-dim)]">
              {l(bonus.volumeNote, lang)}
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function LabeledLine({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-mute)]">
        {label}
      </div>
      <p className="mt-0.5 text-sm leading-snug text-[var(--color-text)]">
        {body}
      </p>
    </div>
  );
}

function ExerciseRow({
  ex,
  index,
  lang,
}: {
  ex: TravelExercise;
  index: number;
  lang: Lang;
}) {
  return (
    <div className="rounded-xl border border-[var(--color-border)]/60 bg-[var(--color-surface)] p-3">
      <div className="flex items-start gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[var(--color-surface-3)] text-[11px] font-bold tabular-nums text-[var(--color-text-mute)]">
          {index + 1}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <h4 className="text-sm font-semibold leading-tight text-[var(--color-text)]">
              {ex.name}
            </h4>
            {ex.tag && <TagBadge tag={ex.tag} lang={lang} />}
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] tabular-nums text-[var(--color-text-dim)]">
            <span>
              <span className="font-bold text-[var(--color-accent)]">
                {ex.sets}
              </span>
              <span className="text-[var(--color-text-mute)]"> × </span>
              <span className="font-semibold text-[var(--color-text)]">
                {ex.reps}
              </span>
            </span>
            <span className="text-[var(--color-text-mute)]">
              {t("travelRestLabel", lang)}: {l(ex.rest, lang)}
            </span>
            {ex.rpe && (
              <span className="rounded-md bg-[var(--color-surface-2)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--color-text-dim)]">
                {l(ex.rpe, lang)}
              </span>
            )}
          </div>
          {ex.note && (
            <p className="mt-1.5 text-[11px] italic leading-snug text-[var(--color-text-mute)]">
              {l(ex.note, lang)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const TAG_STYLES: Record<NonNullable<TravelExercise["tag"]>, string> = {
  COMPOUND:
    "bg-[var(--color-success-glow)] text-[var(--color-success)]",
  SUPERSET:
    "bg-[var(--color-accent-glow)] text-[var(--color-accent)]",
  FINISHER: "bg-[var(--color-fat-glow)] text-[var(--color-fat)]",
};

function TagBadge({
  tag,
  lang,
}: {
  tag: NonNullable<TravelExercise["tag"]>;
  lang: Lang;
}) {
  const label =
    tag === "COMPOUND"
      ? t("travelTagCompound", lang)
      : tag === "SUPERSET"
        ? t("travelTagSuperset", lang)
        : tag;

  return (
    <span
      className={`rounded-md px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider ${TAG_STYLES[tag]}`}
    >
      {label}
    </span>
  );
}

function ScheduleSection({ lang }: { lang: Lang }) {
  return (
    <section>
      <SectionHeading title={t("travelScheduleHeading", lang)} />
      <div className="grid gap-2.5">
        {SCHEDULE_EXAMPLES.map((example) => (
          <article
            key={example.daysPerWeek}
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
          >
            <div className="mb-2.5 flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-[var(--color-text)]">
                {l(example.label, lang)}
              </h3>
              <div className="flex items-center gap-1.5">
                <span className="rounded-md bg-[var(--color-surface-2)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--color-accent)]">
                  {example.highlight}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider tabular-nums text-[var(--color-text-mute)]">
                  {example.daysPerWeek} {t("travelDaysPerWeekSuffix", lang)}
                </span>
              </div>
            </div>
            <ul className="space-y-1">
              {l(example.days, lang).map((day) => (
                <li
                  key={day}
                  className="font-mono text-[12px] leading-relaxed text-[var(--color-text-dim)]"
                >
                  {day}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProgressionSection({ lang }: { lang: Lang }) {
  return (
    <section className="space-y-2.5">
      <SectionHeading
        title={t("travelProgressionHeading", lang)}
        subtitle={t("travelProgressionSubtitle", lang)}
      />

      <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <h3 className="text-sm font-bold text-[var(--color-text)]">
          {l(PROGRESSION.method, lang)}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-text-dim)]">
          {l(PROGRESSION.description, lang)}
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl bg-[var(--color-surface-2)] p-3">
          <pre className="font-mono text-[11px] leading-relaxed text-[var(--color-text)]">
            {l(PROGRESSION.example, lang).join("\n")}
          </pre>
        </div>
      </article>

      <article className="rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--color-accent-glow)] p-4">
        <div className="flex items-start gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent)]/20 text-sm font-black tabular-nums text-[var(--color-accent)]">
            {DELOAD.week}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-[var(--color-text)]">
              {l(DELOAD.title, lang)}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-dim)]">
              {l(DELOAD.body, lang)}
            </p>
          </div>
        </div>
        <ul className="mt-3 space-y-1.5">
          {l(DELOAD.rules, lang).map((rule) => (
            <li
              key={rule}
              className="flex gap-2 text-xs leading-snug text-[var(--color-text)]"
            >
              <span
                aria-hidden
                className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]"
              />
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

function RulesSection({ lang }: { lang: Lang }) {
  return (
    <section>
      <SectionHeading title={t("travelRulesHeading", lang)} />
      <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <ul className="space-y-2">
          {l(SCHEDULE_RULES, lang).map((rule, i) => (
            <li
              key={rule}
              className="flex items-start gap-3 rounded-xl bg-[var(--color-surface-2)] px-3 py-2.5"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--color-surface-3)] text-[11px] font-bold tabular-nums text-[var(--color-text-mute)]">
                {i + 1}
              </span>
              <span className="text-sm leading-snug text-[var(--color-text)]">
                {rule}
              </span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

function SubstitutionsSection({ lang }: { lang: Lang }) {
  return (
    <section>
      <SectionHeading
        title={t("travelSubsHeading", lang)}
        subtitle={t("travelSubsSubtitle", lang)}
      />
      <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <ul className="space-y-2.5">
          {l(SUBSTITUTIONS, lang).map((sub) => (
            <li
              key={sub.missing}
              className="rounded-xl bg-[var(--color-surface-2)] p-3"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-mute)]">
                  {t("travelMissingLabel", lang)}
                </span>
                <span className="text-sm font-semibold text-[var(--color-text)]">
                  {sub.missing}
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
                  {t("travelReplaceLabel", lang)}
                </span>
                <span className="text-xs text-[var(--color-text-dim)]">
                  {sub.replace}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

function NutritionSection({ lang }: { lang: Lang }) {
  return (
    <section>
      <SectionHeading title={t("travelNutritionHeading", lang)} />
      <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <ul className="space-y-2">
          {l(NUTRITION_MIN, lang).map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-3 rounded-xl bg-[var(--color-surface-2)] px-3 py-2.5"
            >
              <span className="text-xl" aria-hidden>
                {item.icon}
              </span>
              <span className="text-sm text-[var(--color-text)]">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-2.5 px-1">
      <h2 className="text-[13px] font-bold uppercase tracking-widest text-[var(--color-text-mute)]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-0.5 text-[11px] text-[var(--color-text-mute)]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
