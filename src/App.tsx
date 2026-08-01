import { useEffect } from "react";
import { BottomNav, type Tab } from "./components/BottomNav";
import { TodayView } from "./components/TodayView";
import { WorkoutView } from "./components/WorkoutView";
import { NutritionView } from "./components/NutritionView";
import { usePersistentState } from "./lib/storage";

function App() {
  const [tab, setTab] = usePersistentState<Tab>("tab", "today");

  // scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [tab]);

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
