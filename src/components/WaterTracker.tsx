import { DropletIcon, MinusIcon, PlusIcon } from "./Icon";
import {
  WATER_STEP_ML,
  WATER_TARGET_LITERS,
  WATER_TOTAL_GLASSES,
} from "../data/nutrition";
import { t, useLang } from "../lib/i18n";

type Props = {
  glasses: number;
  onChange: (next: number) => void;
};

export function WaterTracker({ glasses, onChange }: Props) {
  const [lang] = useLang();
  const clamped = Math.max(0, Math.min(WATER_TOTAL_GLASSES, glasses));
  const liters = (clamped * WATER_STEP_ML) / 1000;
  const pct = Math.min(1, clamped / WATER_TOTAL_GLASSES);

  const dec = () => onChange(Math.max(0, clamped - 1));
  const inc = () => onChange(Math.min(WATER_TOTAL_GLASSES, clamped + 1));

  // Turkish uses "," as decimal separator; English uses ".".
  const litresStr =
    lang === "tr"
      ? liters.toFixed(2).replace(".", ",")
      : liters.toFixed(2);

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <header className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-water-glow)] text-[var(--color-water)]">
          <DropletIcon size={22} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">
            {t("waterHeading", lang)}
          </h3>
          <p className="text-xs text-[var(--color-text-mute)]">
            {t("waterTargetPrefix", lang)} {WATER_TARGET_LITERS} L /{" "}
            {WATER_TOTAL_GLASSES} {t("waterGlassesWord", lang)}
          </p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold tabular-nums text-[var(--color-water)]">
            {litresStr}
            <span className="ml-0.5 text-xs font-medium text-[var(--color-text-mute)]">
              {t("waterLitreUnit", lang)}
            </span>
          </div>
          <div className="text-[10px] text-[var(--color-text-mute)]">
            {clamped} / {WATER_TOTAL_GLASSES}
          </div>
        </div>
      </header>

      {/* Glass grid — tap any glass to fill up to that count */}
      <div className="mt-3 grid grid-cols-9 gap-1.5">
        {Array.from({ length: WATER_TOTAL_GLASSES }, (_, i) => {
          const filled = i < clamped;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onChange(filled && i + 1 === clamped ? i : i + 1)}
              aria-label={`${i + 1}${t("waterGlassAriaSuffix", lang)}`}
              className={`
                aspect-[3/4] rounded-md transition-all duration-150 active:scale-90
                ${
                  filled
                    ? "bg-[var(--color-water)] shadow-sm shadow-[var(--color-water-glow)]"
                    : "border border-[var(--color-border-strong)] bg-[var(--color-surface-2)]"
                }
              `}
            />
          );
        })}
      </div>

      {/* progress bar */}
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-surface-3)]">
        <div
          className="h-full rounded-full bg-[var(--color-water)] transition-all duration-300"
          style={{ width: `${pct * 100}%` }}
        />
      </div>

      {/* Adjust buttons */}
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={dec}
          disabled={clamped === 0}
          aria-label={t("waterDecAria", lang)}
          className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface-2)] font-semibold text-[var(--color-text-dim)] transition-all active:scale-95 disabled:opacity-40"
        >
          <MinusIcon size={18} />
          <span className="text-sm">{t("waterButton", lang)}</span>
        </button>
        <button
          type="button"
          onClick={inc}
          disabled={clamped === WATER_TOTAL_GLASSES}
          aria-label={t("waterIncAria", lang)}
          className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[var(--color-water)] font-semibold text-[#062733] transition-all active:scale-95 disabled:opacity-40"
        >
          <PlusIcon size={18} />
          <span className="text-sm">{t("waterButton", lang)}</span>
        </button>
      </div>
    </section>
  );
}
