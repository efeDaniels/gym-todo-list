import { useEffect, useRef, useState } from "react";
import { TopBar } from "./TopBar";
import { DayChip } from "./DayChip";
import { WorkoutDaySection } from "./WorkoutDaySection";
import {
  DAY_ORDER,
  WORKOUT_PROGRAM,
  getDayByKey,
  getTodayKey,
  type DayKey,
} from "../data/workouts";
import { useWorkoutDayState } from "../lib/hooks";

export function WorkoutView() {
  const todayKey = getTodayKey();
  const [selected, setSelected] = useState<DayKey>(todayKey);
  const day = getDayByKey(selected);
  const { resetAll } = useWorkoutDayState(selected, day);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const activeChipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = activeChipRef.current;
    const scroller = scrollerRef.current;
    if (el && scroller) {
      const target =
        el.offsetLeft - scroller.clientWidth / 2 + el.clientWidth / 2;
      scroller.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const previousSelected = useRef(selected);
  useEffect(() => {
    if (previousSelected.current !== selected) {
      previousSelected.current = selected;
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [selected]);

  const handleReset = () => {
    if (day.isRest) return;
    if (
      window.confirm(
        `${day.dayLong} antrenmanının tüm setlerini sıfırlamak istiyor musun?`,
      )
    ) {
      resetAll();
    }
  };

  return (
    <div className="flex flex-1 flex-col px-4">
      <TopBar
        title="Antrenman"
        subtitle="Haftalık program"
        onReset={day.isRest ? undefined : handleReset}
      />

      {/* Day chips - horizontal scroll */}
      <div
        ref={scrollerRef}
        className="no-scrollbar -mx-4 mt-3 overflow-x-auto px-4"
      >
        <div className="flex gap-2">
          {DAY_ORDER.map((k) => {
            const d = WORKOUT_PROGRAM.find((x) => x.key === k)!;
            const active = selected === k;
            return (
              <div
                key={k}
                ref={active ? activeChipRef : undefined}
                className="shrink-0"
              >
                <DayChip
                  label={d.dayShort}
                  active={active}
                  isToday={k === todayKey}
                  isRest={d.isRest}
                  onClick={() => setSelected(k)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="safe-bottom-nav mt-5 flex-1">
        <WorkoutDaySection dayKey={selected} day={day} showTitle={true} />
      </div>
    </div>
  );
}
