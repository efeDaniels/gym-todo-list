import { useCallback, useEffect } from "react";
import { usePersistentState } from "./storage";

// -------------------- types --------------------

export type Lang = "tr" | "en";

export type Localized<T> = { tr: T; en: T };

export const LANGS: Lang[] = ["tr", "en"];

// -------------------- lang detection --------------------

function detectInitialLang(): Lang {
  if (typeof navigator === "undefined") return "tr";
  const first = (navigator.languages?.[0] ?? navigator.language ?? "").toLowerCase();
  return first.startsWith("en") ? "en" : "tr";
}

const INITIAL_LANG: Lang = detectInitialLang();

// -------------------- hook --------------------

export function useLang(): [Lang, (next: Lang) => void] {
  const [lang, setLang] = usePersistentState<Lang>("lang", INITIAL_LANG);

  // Reflect the current language on the <html> element for accessibility
  // and correct browser hyphenation / voice-over behaviour.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const set = useCallback(
    (next: Lang) => setLang(next),
    [setLang],
  );

  return [lang, set];
}

// -------------------- helpers --------------------

/**
 * Pick a language-specific value from a `Localized<T>` record.
 * Small helper to keep call sites terse: `l(meal.title, lang)`.
 */
export function l<T>(value: Localized<T>, lang: Lang): T {
  return value[lang];
}

/**
 * Turn a plain bilingual pair into a `Localized<T>` — useful when defining
 * data files inline without importing the type each time.
 */
export function loc<T>(tr: T, en: T): Localized<T> {
  return { tr, en };
}

// -------------------- UI dictionary --------------------
// Keep this table alphabetized within groups. Every key must have both
// `tr` and `en` — the type below enforces that at compile time.

export const UI = {
  // ---- Navigation
  navToday: loc("Bugün", "Today"),
  navWorkout: loc("Antrenman", "Workout"),
  navNutrition: loc("Beslenme", "Nutrition"),
  navAria: loc("Ana navigasyon", "Main navigation"),

  // ---- TopBar
  reset: loc("Sıfırla", "Reset"),
  toggleLangAria: loc("Dili değiştir", "Change language"),

  // ---- TodayView
  todayWorkoutHeading: loc("Bugünün Antrenmanı", "Today's Workout"),
  todayNutritionHeading: loc("Bugünün Beslenmesi", "Today's Nutrition"),
  goToWorkout: loc("Antrenmana git", "Go to workout"),
  goToNutrition: loc("Beslenmeye git", "Go to nutrition"),
  scenarioAria: loc("Senaryo", "Scenario"),
  scenarioChangeSuffix: loc("değiştir", "change"),
  ringWorkoutLabel: loc("Antrenman", "Workout"),
  ringNutritionLabel: loc("Beslenme", "Nutrition"),
  restLabel: loc("Dinlenme", "Rest"),
  setUnit: loc("SET", "SET"),
  kcalUnit: loc("KCAL", "KCAL"),

  // ---- WorkoutView
  workoutTitle: loc("Antrenman", "Workout"),
  workoutSubtitle: loc("Haftalık program", "Weekly program"),
  workoutResetConfirm: loc(
    "antrenmanının tüm setlerini sıfırlamak istiyor musun?",
    "workout — reset all sets for the day?",
  ),

  // ---- WorkoutDaySection
  restDayHeading: loc("Dinlenme Günü", "Rest Day"),
  restToday: loc("Bugün dinlenme", "Rest day today"),
  restDefaultNote: loc(
    "Bugün antrenman yok. İyi dinlen.",
    "No workout today. Rest well.",
  ),

  // ---- ExerciseCard
  reps: loc("Tekrar", "Reps"),
  intensity: loc("Şiddet", "Intensity"),
  setsHeading: loc("Setler", "Sets"),
  setAria: loc("Set", "Set"),
  tagBig3: loc("BIG 3", "BIG 3"),
  tagSuperset: loc("SUPERSET", "SUPERSET"),
  tagWarmup: loc("ISINMA", "WARM-UP"),
  tagFinisher: loc("FINISHER", "FINISHER"),

  // ---- NutritionView
  nutritionTitle: loc("Beslenme", "Nutrition"),
  nutritionSubtitleMealsWord: loc("öğün", "meals"),
  nutritionSubtitleTargetWord: loc("hedef", "target"),
  nutritionResetConfirm: loc(
    "Bugünkü tüm öğün ve su ilerlemesini sıfırlamak istiyor musun?",
    "Reset today's meal and water progress?",
  ),
  consumedKcal: loc("Alınan Kalori", "Consumed Calories"),
  itemsWord: loc("kalem", "items"),
  percentTarget: loc("% hedef", "% target"),
  todayTarget: loc("Bugünkü Hedef", "Today's Target"),
  scenariosHeading: loc("Senaryolar", "Scenarios"),
  scenariosSummary: loc(
    "500 g protein + 165 g karb + shake",
    "500 g protein + 165 g carbs + shake",
  ),
  mealTimeline: loc("Öğün Zaman Çizelgesi", "Meal Timeline"),
  proteinSourcesHeading: loc("Protein Kaynakları", "Protein Sources"),
  carbSourcesHeading: loc("Karbonhidrat Kaynakları", "Carb Sources"),
  supplementHeading: loc("Takviye", "Supplements"),
  wheyProtein: loc("Whey protein", "Whey protein"),
  averageMacros: loc(
    "Ortalama makrolar (100 g çiğ)",
    "Average macros (100 g raw)",
  ),
  dailyRulesHeading: loc("Günlük Kurallar", "Daily Rules"),
  scenarioActive: loc("Aktif", "Active"),
  highlightHighProtein: loc("Yüksek Protein", "High Protein"),
  highlightLowFat: loc("Düşük Yağ", "Low Fat"),
  highlightBalanced: loc("Dengeli", "Balanced"),
  highlightLowCal: loc("Düşük Kalori", "Low Calorie"),

  // ---- MealCard
  mealResetAria: loc("Öğünü sıfırla", "Reset meal"),
  mealCompleteAria: loc("Öğünü tamamla", "Complete meal"),

  // ---- WaterTracker
  waterHeading: loc("Su Takibi", "Water Tracking"),
  waterTargetPrefix: loc("Hedef", "Target"),
  waterGlassesWord: loc("bardak", "glasses"),
  waterGlassSingularWord: loc("bardak", "glass"),
  waterGlassAriaSuffix: loc(". bardak", ". glass"),
  waterDecAria: loc("Bardak azalt", "Remove glass"),
  waterIncAria: loc("Bardak ekle", "Add glass"),
  waterButton: loc("Bardak", "Glass"),
  waterLitreUnit: loc("L", "L"),

  // ---- Macro chip units
  macroKcal: loc("kcal", "kcal"),
  macroGP: loc("gP", "gP"),
  macroGC: loc("gC", "gC"),
  macroGY: loc("gY", "gF"),

  // ---- HTML/document
  documentTitle: loc("Gym & Beslenme", "Gym & Nutrition"),
} as const satisfies Record<string, Localized<string>>;

export type UIKey = keyof typeof UI;

export function t(key: UIKey, lang: Lang): string {
  return UI[key][lang];
}
