import { AppleIcon, DumbbellIcon, TodayIcon } from "./Icon";
import { t, useLang, type UIKey } from "../lib/i18n";

export type Tab = "today" | "workout" | "nutrition";

type Props = {
  tab: Tab;
  onChange: (tab: Tab) => void;
};

const TABS: {
  key: Tab;
  labelKey: UIKey;
  Icon: typeof TodayIcon;
}[] = [
  { key: "today", labelKey: "navToday", Icon: TodayIcon },
  { key: "workout", labelKey: "navWorkout", Icon: DumbbellIcon },
  { key: "nutrition", labelKey: "navNutrition", Icon: AppleIcon },
];

export function BottomNav({ tab, onChange }: Props) {
  const [lang] = useLang();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-[720px] justify-center"
      aria-label={t("navAria", lang)}
    >
      <div className="nav-safe-bottom w-full border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 px-2 pt-1.5 backdrop-blur-md">
        <div className="flex items-stretch justify-between gap-1">
          {TABS.map(({ key, labelKey, Icon }) => {
            const active = tab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onChange(key)}
                aria-current={active ? "page" : undefined}
                className={`
                  relative flex flex-1 flex-col items-center justify-center gap-0.5
                  rounded-xl py-2 transition-all duration-150 active:scale-95
                  ${active ? "text-[var(--color-accent)]" : "text-[var(--color-text-mute)]"}
                `}
              >
                <Icon size={24} />
                <span
                  className={`text-[11px] font-semibold ${active ? "" : "font-medium"}`}
                >
                  {t(labelKey, lang)}
                </span>
                {active && (
                  <span
                    aria-hidden
                    className="absolute -top-1.5 h-1 w-8 rounded-full bg-[var(--color-accent)]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
