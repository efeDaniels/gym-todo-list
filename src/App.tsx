import { useEffect } from "react";
import { BottomNav, type Tab } from "./components/BottomNav";
import { TodayView } from "./components/TodayView";
import { WorkoutView } from "./components/WorkoutView";
import { NutritionView } from "./components/NutritionView";
import { usePersistentState } from "./lib/storage";
import { t, useLang } from "./lib/i18n";

function App() {
  const [tab, setTab] = usePersistentState<Tab>("tab", "today");
  const [lang] = useLang();

  // scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [tab]);

  // Sync document title with active language so the browser tab reflects the
  // user's choice (the <html lang> attribute is handled inside `useLang`).
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = t("documentTitle", lang);
    }
  }, [lang]);

  return (
    <>
      <main className="flex flex-1 flex-col pb-2">
        {tab === "today" && <TodayView onNavigate={setTab} />}
        {tab === "workout" && <WorkoutView />}
        {tab === "nutrition" && <NutritionView />}
      </main>
      <BottomNav tab={tab} onChange={setTab} />
    </>
  );
}

export default App;
