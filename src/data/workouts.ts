import { loc, type Localized } from "../lib/i18n";

export type DayKey =
  | "pazartesi"
  | "sali"
  | "carsamba"
  | "persembe"
  | "cuma"
  | "cumartesi"
  | "pazar";

export type Exercise = {
  id: string;
  name: string; // gym terms already in English — kept identical across locales
  sets: number;
  reps: string;
  rpe?: string;
  note?: Localized<string>;
  tag?: "BIG 3" | "SUPERSET" | "ISINMA" | "FINISHER";
  cues?: Localized<string[]>;
};

export type WorkoutDay = {
  key: DayKey;
  dayShort: Localized<string>;
  dayLong: Localized<string>;
  title: string | null;
  subtitle: Localized<string> | null;
  focus: Localized<string[]>;
  exercises: Exercise[];
  isRest: boolean;
  restNote?: Localized<string>;
};

// Guray's Hypertrophy Max — source: TikTok @xosrovazari
// Pzt/Cum: PUSH  ·  Sal/Cmt: PULL  ·  Çar: LEGS  ·  Prş/Paz: REST
// Note: "*2 Antrenman Sonunda: 3x10 Cable Crunch / 3x10 Standing Calf Raise"
// → Added as FINISHER on Sal (2nd session end) and Cum (4th session end).

const CUE_NO_REST_BETWEEN = loc(["Arada dinlenme yok"], ["No rest between"]);
const CUE_EVERY_OTHER_WORKOUT = loc(
  ["Her 2 antrenmanda bir"],
  ["Every other workout"],
);

export const WORKOUT_PROGRAM: WorkoutDay[] = [
  {
    key: "pazartesi",
    dayShort: loc("Pzt", "Mon"),
    dayLong: loc("Pazartesi", "Monday"),
    title: "PUSH",
    subtitle: loc("Göğüs · Omuz · Triceps", "Chest · Shoulders · Triceps"),
    focus: loc(
      ["Göğüs", "Omuz", "Triceps"],
      ["Chest", "Shoulders", "Triceps"],
    ),
    isRest: false,
    exercises: [
      {
        id: "pzt-1",
        name: "Plate Loaded Chest Press",
        sets: 2,
        reps: "5–6",
        rpe: "RIR 1",
      },
      {
        id: "pzt-2",
        name: "Smith Machine Low Incline Press",
        sets: 2,
        reps: "5–6",
        rpe: "RIR 1",
      },
      {
        id: "pzt-3",
        name: "Chest Fly Machine",
        sets: 1,
        reps: "6–8",
        rpe: "Failure",
      },
      {
        id: "pzt-4",
        name: "Shoulder Press Machine",
        sets: 2,
        reps: "6–8",
        rpe: "RIR 1",
      },
      {
        id: "pzt-5",
        name: "Lateral Raise",
        sets: 3,
        reps: "8–10",
        rpe: "Failure",
      },
      {
        id: "pzt-6",
        name: "Triceps Pushdown",
        sets: 2,
        reps: "6–8",
        rpe: "Failure",
      },
      {
        id: "pzt-7",
        name: "Overhead Rope Extension",
        sets: 2,
        reps: "8–10",
        rpe: "Failure",
      },
    ],
  },
  {
    key: "sali",
    dayShort: loc("Sal", "Tue"),
    dayLong: loc("Salı", "Tuesday"),
    title: "PULL",
    subtitle: loc("Sırt · Bicep", "Back · Biceps"),
    focus: loc(["Sırt", "Bicep"], ["Back", "Biceps"]),
    isRest: false,
    exercises: [
      {
        id: "sal-1",
        name: "Lat Pulldown",
        sets: 2,
        reps: "6–8",
        rpe: "RIR 1 – Failure",
      },
      {
        id: "sal-2",
        name: "Plate Loaded Wide Grip Row",
        sets: 3,
        reps: "6–8",
        rpe: "RIR 1 – Failure",
      },
      {
        id: "sal-3",
        name: "Cable Row",
        sets: 1,
        reps: "8–10",
        rpe: "Failure",
      },
      {
        id: "sal-4",
        name: "Incline Dumbbell Curl",
        sets: 2,
        reps: "6–8",
        rpe: "Failure",
      },
      {
        id: "sal-5",
        name: "Cable Curl",
        sets: 2,
        reps: "6–8",
        rpe: "Failure",
      },
      {
        id: "sal-6",
        name: "Hammer Curl + Reverse Barbell Curl",
        sets: 2,
        reps: "8–10 + 8–10",
        rpe: "Failure",
        tag: "SUPERSET",
        cues: CUE_NO_REST_BETWEEN,
      },
      {
        id: "sal-f1",
        name: "Cable Crunch",
        sets: 3,
        reps: "10",
        tag: "FINISHER",
        cues: CUE_EVERY_OTHER_WORKOUT,
      },
      {
        id: "sal-f2",
        name: "Standing Calf Raise",
        sets: 3,
        reps: "10",
        tag: "FINISHER",
        cues: CUE_EVERY_OTHER_WORKOUT,
      },
    ],
  },
  {
    key: "carsamba",
    dayShort: loc("Çar", "Wed"),
    dayLong: loc("Çarşamba", "Wednesday"),
    title: "LEGS",
    subtitle: loc("Quad · Hamstring", "Quads · Hamstrings"),
    focus: loc(["Quad", "Hamstring"], ["Quads", "Hamstrings"]),
    isRest: false,
    exercises: [
      {
        id: "car-1",
        name: "Leg Press",
        sets: 2,
        reps: "6–8",
        rpe: "RIR 1–2",
      },
      {
        id: "car-2",
        name: "Smith Machine Squat",
        sets: 2,
        reps: "6–8",
        rpe: "RIR 1–2",
      },
      {
        id: "car-3",
        name: "Leg Extension",
        sets: 2,
        reps: "8–10",
        rpe: "Failure",
      },
      {
        id: "car-4",
        name: "Seated Leg Curl",
        sets: 3,
        reps: "8–10",
        rpe: "RIR 1",
      },
    ],
  },
  {
    key: "persembe",
    dayShort: loc("Prş", "Thu"),
    dayLong: loc("Perşembe", "Thursday"),
    title: null,
    subtitle: null,
    focus: loc([], []),
    isRest: true,
    restNote: loc(
      "Dinlenme günü. Çar LEGS sonrası toparlanma, Cum PUSH öncesi hazırlık.",
      "Rest day. Recovery after Wed LEGS, prep before Fri PUSH.",
    ),
    exercises: [],
  },
  {
    key: "cuma",
    dayShort: loc("Cum", "Fri"),
    dayLong: loc("Cuma", "Friday"),
    title: "PUSH",
    subtitle: loc("Omuz · Göğüs · Triceps", "Shoulders · Chest · Triceps"),
    focus: loc(
      ["Omuz", "Göğüs", "Triceps"],
      ["Shoulders", "Chest", "Triceps"],
    ),
    isRest: false,
    exercises: [
      {
        id: "cum-1",
        name: "Shoulder Press Machine",
        sets: 2,
        reps: "6–8",
        rpe: "RIR 1",
      },
      {
        id: "cum-2",
        name: "Lateral Raise",
        sets: 3,
        reps: "8–10",
        rpe: "Failure",
      },
      {
        id: "cum-3",
        name: "Smith Machine Low Incline Press",
        sets: 2,
        reps: "5–6",
        rpe: "RIR 1",
      },
      {
        id: "cum-4",
        name: "Chest Fly Machine",
        sets: 2,
        reps: "6–8",
        rpe: "Failure",
      },
      {
        id: "cum-5",
        name: "Cable Rear Delt Fly",
        sets: 2,
        reps: "8–10",
        rpe: "Failure",
      },
      {
        id: "cum-6",
        name: "Triceps Pushdown",
        sets: 2,
        reps: "6–8",
        rpe: "Failure",
      },
      {
        id: "cum-7",
        name: "Overhead Rope Extension",
        sets: 2,
        reps: "8–10",
        rpe: "Failure",
      },
      {
        id: "cum-f1",
        name: "Cable Crunch",
        sets: 3,
        reps: "10",
        tag: "FINISHER",
        cues: CUE_EVERY_OTHER_WORKOUT,
      },
      {
        id: "cum-f2",
        name: "Standing Calf Raise",
        sets: 3,
        reps: "10",
        tag: "FINISHER",
        cues: CUE_EVERY_OTHER_WORKOUT,
      },
    ],
  },
  {
    key: "cumartesi",
    dayShort: loc("Cmt", "Sat"),
    dayLong: loc("Cumartesi", "Saturday"),
    title: "PULL",
    subtitle: loc(
      "Sırt · Bicep · Bacak Arka",
      "Back · Biceps · Hamstrings",
    ),
    focus: loc(
      ["Sırt", "Bicep", "Hamstring"],
      ["Back", "Biceps", "Hamstrings"],
    ),
    isRest: false,
    exercises: [
      {
        id: "cmt-1",
        name: "Plate Loaded Wide Grip Row",
        sets: 3,
        reps: "6–8",
        rpe: "RIR 1 – Failure",
      },
      {
        id: "cmt-2",
        name: "Lat Pulldown",
        sets: 3,
        reps: "6–8",
        rpe: "RIR 1 – Failure",
      },
      {
        id: "cmt-3",
        name: "Romanian Deadlift",
        sets: 2,
        reps: "5–6",
        rpe: "RIR 1–2",
      },
      {
        id: "cmt-4",
        name: "Cable Curl",
        sets: 2,
        reps: "6–8",
        rpe: "Failure",
      },
      {
        id: "cmt-5",
        name: "Hammer Curl + Reverse Barbell Curl",
        sets: 2,
        reps: "8–10 + 8–10",
        rpe: "Failure",
        tag: "SUPERSET",
        cues: CUE_NO_REST_BETWEEN,
      },
      {
        id: "cmt-6",
        name: "Leg Extension",
        sets: 2,
        reps: "6–8",
        rpe: "Failure",
      },
      {
        id: "cmt-7",
        name: "Seated Leg Curl",
        sets: 1,
        reps: "8–10",
        rpe: "Failure",
      },
    ],
  },
  {
    key: "pazar",
    dayShort: loc("Paz", "Sun"),
    dayLong: loc("Pazar", "Sunday"),
    title: null,
    subtitle: null,
    focus: loc([], []),
    isRest: true,
    restNote: loc(
      "Dinlenme günü. Cmt PULL sonrası tam toparlanma, Pzt PUSH öncesi hazırlık.",
      "Rest day. Full recovery after Sat PULL, prep before Mon PUSH.",
    ),
    exercises: [],
  },
];

export const DAY_ORDER: DayKey[] = [
  "pazartesi",
  "sali",
  "carsamba",
  "persembe",
  "cuma",
  "cumartesi",
  "pazar",
];

export function getDayByKey(key: DayKey): WorkoutDay {
  const day = WORKOUT_PROGRAM.find((d) => d.key === key);
  if (!day) throw new Error(`Unknown day: ${key}`);
  return day;
}

// JS getDay(): 0=Sunday, 1=Monday, ..., 6=Saturday
export function getTodayKey(date: Date = new Date()): DayKey {
  const jsDay = date.getDay();
  const map: Record<number, DayKey> = {
    1: "pazartesi",
    2: "sali",
    3: "carsamba",
    4: "persembe",
    5: "cuma",
    6: "cumartesi",
    0: "pazar",
  };
  return map[jsDay]!;
}

// -------------------- EXERCISE GIFS --------------------
// Source: https://github.com/JahelCuadrado/ExerciseGymGifsDB (360×360 GIF, jsDelivr).
// Pinned version (v1.1.0) for cache-safe hotlink.

const EXERCISE_GIF_BASE =
  "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0";

const EXERCISE_GIF_SLUGS: Record<string, string> = {
  // PAZARTESİ — PUSH
  "pzt-1": "pectorals/lever-chest-press.gif",
  "pzt-2": "pectorals/smith-incline-bench-press.gif",
  "pzt-3": "pectorals/lever-seated-fly.gif",
  "pzt-4": "delts/lever-shoulder-press.gif",
  "pzt-5": "delts/dumbbell-lateral-raise.gif",
  "pzt-6": "triceps/cable-pushdown.gif",
  "pzt-7": "triceps/cable-overhead-triceps-extension-rope-attachment.gif",

  // SALI — PULL
  "sal-1": "lats/cable-pulldown.gif",
  "sal-2": "upper-back/lever-t-bar-row.gif",
  "sal-3": "upper-back/cable-seated-row.gif",
  "sal-4": "biceps/dumbbell-incline-curl.gif",
  "sal-5": "biceps/cable-curl.gif",
  "sal-6": "biceps/dumbbell-hammer-curl.gif",
  "sal-f1": "abs/cable-kneeling-crunch.gif",
  "sal-f2": "calves/lever-standing-calf-raise.gif",

  // ÇARŞAMBA — LEGS
  "car-1": "glutes/sled-45-leg-press.gif",
  "car-2": "glutes/smith-squat.gif",
  "car-3": "quads/lever-leg-extension.gif",
  "car-4": "hamstrings/lever-seated-leg-curl.gif",

  // CUMA — PUSH (shoulder-focused)
  "cum-1": "delts/lever-shoulder-press.gif",
  "cum-2": "delts/dumbbell-lateral-raise.gif",
  "cum-3": "pectorals/smith-incline-bench-press.gif",
  "cum-4": "pectorals/lever-seated-fly.gif",
  "cum-5": "delts/cable-seated-rear-lateral-raise.gif",
  "cum-6": "triceps/cable-pushdown.gif",
  "cum-7": "triceps/cable-overhead-triceps-extension-rope-attachment.gif",
  "cum-f1": "abs/cable-kneeling-crunch.gif",
  "cum-f2": "calves/lever-standing-calf-raise.gif",

  // CUMARTESİ — PULL (back + hamstring)
  "cmt-1": "upper-back/lever-t-bar-row.gif",
  "cmt-2": "lats/cable-pulldown.gif",
  "cmt-3": "glutes/barbell-romanian-deadlift.gif",
  "cmt-4": "biceps/cable-curl.gif",
  "cmt-5": "biceps/dumbbell-hammer-curl.gif",
  "cmt-6": "quads/lever-leg-extension.gif",
  "cmt-7": "hamstrings/lever-seated-leg-curl.gif",
};

export function getExerciseGifUrl(exerciseId: string): string | null {
  const slug = EXERCISE_GIF_SLUGS[exerciseId];
  if (!slug) return null;
  return `${EXERCISE_GIF_BASE}/${slug}`;
}
