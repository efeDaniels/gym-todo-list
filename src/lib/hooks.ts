import { useCallback, useMemo } from "react";
import { useDailyState } from "./storage";
import type { DayKey, WorkoutDay } from "../data/workouts";
import { NUTRITION_PLAN, type Meal } from "../data/nutrition";

// -------------------- WORKOUT --------------------

export type WorkoutState = Record<string, boolean[]>; // exerciseId -> booleans per set

export function useWorkoutDayState(dayKey: DayKey, day: WorkoutDay) {
  const [state, setState] = useDailyState<WorkoutState>(
    `workout:${dayKey}`,
    {},
  );

  const getCompleted = useCallback(
    (exerciseId: string, sets: number): boolean[] => {
      const arr = state[exerciseId];
      if (!arr || arr.length !== sets) {
        return Array.from({ length: sets }, () => false);
      }
      return arr;
    },
    [state],
  );

  const toggleSet = useCallback(
    (exerciseId: string, sets: number, setIndex: number) => {
      setState((prev) => {
        const arr =
          prev[exerciseId] && prev[exerciseId]!.length === sets
            ? [...prev[exerciseId]!]
            : Array.from({ length: sets }, () => false);
        arr[setIndex] = !arr[setIndex];
        return { ...prev, [exerciseId]: arr };
      });
    },
    [setState],
  );

  const resetAll = useCallback(() => setState({}), [setState]);

  const summary = useMemo(() => {
    let done = 0;
    let total = 0;
    for (const ex of day.exercises) {
      total += ex.sets;
      const arr = state[ex.id];
      if (arr) done += arr.filter(Boolean).length;
    }
    return { done, total, pct: total === 0 ? 0 : done / total };
  }, [state, day.exercises]);

  return { state, getCompleted, toggleSet, resetAll, summary };
}

// -------------------- NUTRITION --------------------

export type NutritionState = Record<string, boolean[]>; // mealId -> booleans per item

export function useNutritionState() {
  const [state, setState] = useDailyState<NutritionState>("nutrition", {});

  const getCompleted = useCallback(
    (meal: Meal): boolean[] => {
      const arr = state[meal.id];
      if (!arr || arr.length !== meal.items.length) {
        return Array.from({ length: meal.items.length }, () => false);
      }
      return arr;
    },
    [state],
  );

  const toggleItem = useCallback(
    (meal: Meal, itemIndex: number) => {
      setState((prev) => {
        const arr =
          prev[meal.id] && prev[meal.id]!.length === meal.items.length
            ? [...prev[meal.id]!]
            : Array.from({ length: meal.items.length }, () => false);
        arr[itemIndex] = !arr[itemIndex];
        return { ...prev, [meal.id]: arr };
      });
    },
    [setState],
  );

  const toggleAll = useCallback(
    (meal: Meal) => {
      setState((prev) => {
        const arr = prev[meal.id];
        const allDone =
          arr && arr.length === meal.items.length && arr.every(Boolean);
        const next = Array.from(
          { length: meal.items.length },
          () => !allDone,
        );
        return { ...prev, [meal.id]: next };
      });
    },
    [setState],
  );

  const resetAll = useCallback(() => setState({}), [setState]);

  const summary = useMemo(() => {
    let done = 0;
    let total = 0;
    for (const meal of NUTRITION_PLAN) {
      total += meal.items.length;
      const arr = state[meal.id];
      if (arr) done += arr.filter(Boolean).length;
    }
    return { done, total, pct: total === 0 ? 0 : done / total };
  }, [state]);

  const mealsDone = useMemo(() => {
    let count = 0;
    for (const meal of NUTRITION_PLAN) {
      const arr = state[meal.id];
      if (arr && arr.length === meal.items.length && arr.every(Boolean)) {
        count += 1;
      }
    }
    return count;
  }, [state]);

  return {
    state,
    getCompleted,
    toggleItem,
    toggleAll,
    resetAll,
    summary,
    mealsDone,
    mealsTotal: NUTRITION_PLAN.length,
  };
}

// -------------------- WATER --------------------

export function useWater() {
  const [glasses, setGlasses] = useDailyState<number>("water", 0);
  const set = useCallback(
    (n: number) => setGlasses(Math.max(0, Math.round(n))),
    [setGlasses],
  );
  const reset = useCallback(() => setGlasses(0), [setGlasses]);
  return { glasses, set, reset };
}
