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
  name: string;
  sets: number;
  reps: string;
  rpe?: string;
  note?: string;
  tag?: "BIG 3" | "SUPERSET" | "ISINMA" | "FINISHER";
  cues?: string[];
};

export type WorkoutDay = {
  key: DayKey;
  dayShort: string;
  dayLong: string;
  title: string | null;
  subtitle: string | null;
  focus: string[];
  exercises: Exercise[];
  isRest: boolean;
  restNote?: string;
};

export const WORKOUT_PROGRAM: WorkoutDay[] = [
  {
    key: "pazartesi",
    dayShort: "Pzt",
    dayLong: "Pazartesi",
    title: "PUSH",
    subtitle: "Göğüs · Omuz · Triceps",
    focus: ["Göğüs", "Omuz", "Triceps"],
    isRest: false,
    exercises: [
      {
        id: "p-1",
        name: "Flat Barbell Bench Press",
        sets: 5,
        reps: "3–5",
        rpe: "8–9",
        tag: "BIG 3",
        cues: [
          "Orta tutuş, göğse tam temas",
          "Setler arası 3 dk+ dinlenme",
        ],
      },
      {
        id: "p-2",
        name: "Incline Barbell Press",
        sets: 2,
        reps: "6–8",
        rpe: "8",
        cues: ["Üst göğüs, ağır tut", "İniş yavaş, çıkış patlayıcı"],
      },
      {
        id: "p-3",
        name: "Flat Dumbbell Press",
        sets: 2,
        reps: "10–12",
        rpe: "7–8",
        cues: ["Orta göğüs, tam açılma", "Altta tam gerin, yukarıda sık"],
      },
      {
        id: "p-4",
        name: "Seated Dumbbell Shoulder Press",
        sets: 3,
        reps: "6–8",
        rpe: "8",
        cues: ["Omuz primer, ağır tut", "Dirsekler hafif öne"],
      },
      {
        id: "p-5",
        name: "Lateral Raise Superset (DB + Cable)",
        sets: 3,
        reps: "12 + 12",
        rpe: "7–8",
        tag: "SUPERSET",
        cues: [
          "DB ile başla, yorulunca kabloyla bitir",
          "Arada dinlenme yok",
        ],
      },
      {
        id: "p-6",
        name: "Cable Serratus Punch",
        sets: 2,
        reps: "15–20",
        rpe: "6–7",
        cues: ["Yan kanat kasları", "İleri uzatırken omuz kanadı açılır"],
      },
      {
        id: "p-7",
        name: "Tricep Pushdown + Overhead Extension Superset",
        sets: 3,
        reps: "15 + 12",
        rpe: "7",
        tag: "SUPERSET",
        cues: ["Tricep finisher", "Arada dinlenme yok"],
      },
    ],
  },
  {
    key: "sali",
    dayShort: "Sal",
    dayLong: "Salı",
    title: null,
    subtitle: null,
    focus: [],
    isRest: true,
    restNote: "Dinlenme günü. Pzt Push sonrası toparlanma, Çar LEGS öncesi hazırlık.",
    exercises: [],
  },
  {
    key: "carsamba",
    dayShort: "Çar",
    dayLong: "Çarşamba",
    title: "LEGS",
    subtitle: "Quad · Hamstring · Glute · Baldır",
    focus: ["Quad", "Hamstring", "Glute", "Baldır"],
    isRest: false,
    exercises: [
      {
        id: "lg-0",
        name: "Leg Extension (Isınma)",
        sets: 2,
        reps: "15",
        tag: "ISINMA",
        cues: ["Diz ve quad ısınması", "Hafif ağırlık, kontrollü"],
      },
      {
        id: "lg-1",
        name: "Barbell Back Squat",
        sets: 4,
        reps: "4–6",
        rpe: "8–9",
        tag: "BIG 3",
        cues: [
          "Orta-geniş duruş, paralelin altı",
          "Setler arası 3 dk+ dinlenme",
        ],
      },
      {
        id: "lg-2",
        name: "45° Back Extension (Hyperextension)",
        sets: 3,
        reps: "10–12",
        rpe: "8",
        cues: [
          "Hamstring + kalça, düşük spinal yük",
          "Göğüste plaka tut, kalçadan hinge",
          "Tepede kalçayı sık, hiperekstansiyon yapma",
        ],
      },
      {
        id: "lg-3",
        name: "Hack Squat veya Leg Press",
        sets: 2,
        reps: "10–12",
        rpe: "7–8",
        cues: ["Quad tamamlayıcı", "Squat sonrası bel dostu"],
      },
      {
        id: "lg-4",
        name: "Hip Thrust (Barbell)",
        sets: 3,
        reps: "8–12",
        rpe: "8",
        cues: [
          "Kalça primer bileşik",
          "Belden değil kalçadan it, tepede 1 sn sık",
        ],
      },
      {
        id: "lg-5",
        name: "Lying Leg Curl",
        sets: 2,
        reps: "12–15",
        rpe: "7–8",
        cues: [
          "Hamstring izolasyon",
          "Ayak içe = alt hamstring, dışa = üst hamstring",
        ],
      },
      {
        id: "lg-6",
        name: "Leg Extension (Finisher)",
        sets: 2,
        reps: "15–20",
        rpe: "8",
        tag: "FINISHER",
        cues: [
          "Quad yakma, programdaki tek quad izolasyonu",
          "Son sette ağırlığı yarıya indir, devam et (drop set)",
        ],
      },
      {
        id: "lg-7",
        name: "Cable Kickback veya Abductor Makinesi",
        sets: 2,
        reps: "15–20",
        rpe: "7",
        cues: ["Kalça izolasyon", "Tepede 1 sn tut"],
      },
      {
        id: "lg-8",
        name: "Standing + Seated Calf Raise Superset",
        sets: 3,
        reps: "15–20 + 15–20",
        rpe: "7–8",
        tag: "SUPERSET",
        cues: [
          "Ayakta = gastrocnemius, oturarak = soleus",
          "Standing önce, arada dinlenme yok",
          "Tam aşağı in, topuktan kalk",
        ],
      },
    ],
  },
  {
    key: "persembe",
    dayShort: "Prş",
    dayLong: "Perşembe",
    title: null,
    subtitle: null,
    focus: [],
    isRest: true,
    restNote: "Dinlenme günü. Bacak toparlanması. Hafif yürüyüş veya esneme yapılabilir.",
    exercises: [],
  },
  {
    key: "cuma",
    dayShort: "Cum",
    dayLong: "Cuma",
    title: "UPPER",
    subtitle: "Göğüs · Sırt · Bis/Tris",
    focus: ["Göğüs", "Sırt", "Bicep", "Triceps"],
    isRest: false,
    exercises: [
      {
        id: "u-1",
        name: "Low-to-High Cable Fly",
        sets: 3,
        reps: "12–15",
        rpe: "7",
        cues: ["Alt göğüs", "Tepede 1 sn tut"],
      },
      {
        id: "u-2",
        name: "Weighted Pull-up veya Pulldown",
        sets: 3,
        reps: "6–10",
        rpe: "8",
        cues: ["Lat", "İniş yavaş"],
      },
      {
        id: "u-3",
        name: "Seated Cable Row (Dar Tutuş)",
        sets: 3,
        reps: "10–12",
        rpe: "7–8",
        cues: ["Sırt kalınlığı, orta hat", "Tam açıl, bitişte sık"],
      },
      {
        id: "u-4",
        name: "Cable Lateral Raise",
        sets: 3,
        reps: "15–20",
        rpe: "7",
        cues: ["Yan delt", "Kontrol, sallama yok"],
      },
      {
        id: "u-5",
        name: "EZ Bar Curl",
        sets: 3,
        reps: "8–10",
        rpe: "7–8",
        cues: ["Bicep güç seti", "Dirsek sabit, bilek nötr"],
      },
      {
        id: "u-6",
        name: "Close Grip Bench Press",
        sets: 3,
        reps: "8–10",
        rpe: "7–8",
        cues: ["Tricep güç seti", "Dirsekler dar, bilek nötr"],
      },
      {
        id: "u-7",
        name: "Cable Pullover",
        sets: 2,
        reps: "12–15",
        rpe: "7",
        cues: ["Lat", "Uzun açıdan kasılma"],
      },
    ],
  },
  {
    key: "cumartesi",
    dayShort: "Cmt",
    dayLong: "Cumartesi",
    title: null,
    subtitle: null,
    focus: [],
    isRest: true,
    restNote: "Dinlenme günü. Cuma Upper sonrası toparlanma, Paz PULL (deadlift) öncesi hazırlık.",
    exercises: [],
  },
  {
    key: "pazar",
    dayShort: "Paz",
    dayLong: "Pazar",
    title: "PULL",
    subtitle: "Deadlift · Sırt · Bicep",
    focus: ["Sırt", "Bicep", "Deadlift"],
    isRest: false,
    exercises: [
      {
        id: "pl-1",
        name: "Conventional Deadlift",
        sets: 4,
        reps: "3–5",
        rpe: "8–9",
        tag: "BIG 3",
        cues: [
          "Nötr bel, bar vücuda yakın",
          "Her tekrarda bar yere tam bırak",
        ],
      },
      {
        id: "pl-2",
        name: "Wide Grip Pulldown",
        sets: 3,
        reps: "8–10",
        rpe: "8",
        cues: ["Lat genişliği, tam açılma zorunlu", "Dirsekleri lata doğru çek"],
      },
      {
        id: "pl-3",
        name: "T-Bar Row veya Makine Row",
        sets: 3,
        reps: "8–10",
        rpe: "7–8",
        cues: ["Sırt kalınlığı", "Deadlift sonrası bel dostu"],
      },
      {
        id: "pl-4",
        name: "Straight Arm Pushdown",
        sets: 2,
        reps: "15–18",
        rpe: "7",
        cues: ["Lat izolasyon", "Kol düz kalır"],
      },
      {
        id: "pl-5",
        name: "Face Pull (Rope)",
        sets: 3,
        reps: "20",
        rpe: "6",
        cues: ["Arka omuz", "Omuz sağlığı için şart"],
      },
      {
        id: "pl-6",
        name: "Incline Dumbbell Curl",
        sets: 3,
        reps: "10–12",
        rpe: "7",
        cues: ["Bicep", "Yukarıda bileği döndür"],
      },
      {
        id: "pl-7",
        name: "Hammer Curl",
        sets: 2,
        reps: "12–15",
        rpe: "7",
        cues: ["Ön kol + bicep"],
      },
    ],
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

// -------------------- EXERCISE IMAGES --------------------
// Source: https://github.com/yuhonas/free-exercise-db (MIT lisanslı)

const EXERCISE_IMAGE_BASE =
  "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises";

const EXERCISE_IMAGE_SLUGS: Record<string, string> = {
  // PUSH (pazartesi)
  "p-1": "Barbell_Bench_Press_-_Medium_Grip",
  "p-2": "Barbell_Incline_Bench_Press_-_Medium_Grip",
  "p-3": "Dumbbell_Bench_Press",
  "p-4": "Dumbbell_Shoulder_Press",
  "p-5": "Side_Lateral_Raise",
  // p-6 (Cable Serratus Punch): free-exercise-db'de karşılığı yok
  "p-7": "Triceps_Pushdown",

  // LEGS (carsamba)
  "lg-0": "Leg_Extensions",
  "lg-1": "Barbell_Squat",
  "lg-2": "Hyperextensions_Back_Extensions",
  "lg-3": "Hack_Squat",
  "lg-4": "Barbell_Hip_Thrust",
  "lg-5": "Lying_Leg_Curls",
  "lg-6": "Leg_Extensions",
  "lg-7": "One-Legged_Cable_Kickback",
  "lg-8": "Standing_Calf_Raises",

  // UPPER (cuma)
  "u-1": "Incline_Cable_Flye",
  "u-2": "Weighted_Pull_Ups",
  "u-3": "Seated_Cable_Rows",
  "u-4": "Cable_Seated_Lateral_Raise",
  "u-5": "EZ-Bar_Curl",
  "u-6": "Close-Grip_Barbell_Bench_Press",
  "u-7": "Straight-Arm_Pulldown",

  // PULL (pazar)
  "pl-1": "Barbell_Deadlift",
  "pl-2": "Wide-Grip_Lat_Pulldown",
  "pl-3": "T-Bar_Row_with_Handle",
  "pl-4": "Straight-Arm_Pulldown",
  "pl-5": "Face_Pull",
  "pl-6": "Incline_Dumbbell_Curl",
  "pl-7": "Hammer_Curls",
};

export function getExerciseImageUrl(exerciseId: string): string | null {
  const slug = EXERCISE_IMAGE_SLUGS[exerciseId];
  if (!slug) return null;
  return `${EXERCISE_IMAGE_BASE}/${slug}/0.jpg`;
}
