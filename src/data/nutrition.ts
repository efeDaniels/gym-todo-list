export type MealItem = {
  text: string;
  hint?: string;
};

export type Meal = {
  id: string;
  time: string; // e.g. "Uyanır uyanmaz", "12:30", "14–15"
  timeShort: string;
  title: string;
  emoji: string;
  items: MealItem[];
  note?: string;
};

export const NUTRITION_PLAN: Meal[] = [
  {
    id: "meal-0",
    time: "Uyanır uyanmaz",
    timeShort: "06:30",
    title: "Sirke & Limon",
    emoji: "🍋",
    items: [
      {
        text: "1 y.k. elma sirkesi + yarım limon suyu",
        hint: "1 bardak suya karıştır, aç karnına iç",
      },
    ],
    note: "20 dk sonra kahvaltıya geçebilirsin.",
  },
  {
    id: "meal-1",
    time: "Kahvaltı",
    timeShort: "07:00",
    title: "Kahvaltı",
    emoji: "🍳",
    items: [
      { text: "3 tam yumurta" },
      { text: "3 adet kuru kayısı", hint: "Gün kurusu değil" },
    ],
  },
  {
    id: "meal-2",
    time: "Ara Öğün",
    timeShort: "10:30",
    title: "Sabah Ara Öğün",
    emoji: "🌰",
    items: [{ text: "20 g çiğ badem" }],
  },
  {
    id: "meal-3",
    time: "Öğlen",
    timeShort: "12:30",
    title: "Öğle Yemeği",
    emoji: "🍖",
    items: [
      { text: "200 g yağsız kıyma / et / tavuk göğsü", hint: "Çiğ ölçüsü" },
      {
        text: "40 g haşlanmış bulgur / karabuğday (greçka) / basmati pirinç",
        hint: "Çiğ ölçüsü",
      },
      { text: "10 g zeytinyağı", hint: "Isıtmadan, soğuk tüket" },
      { text: "Salata veya haşlanmış sebze" },
    ],
  },
  {
    id: "meal-4",
    time: "14–15",
    timeShort: "14:30",
    title: "Öğleden Sonra",
    emoji: "🍌",
    items: [{ text: "1 adet muz" }],
  },
  {
    id: "meal-shake",
    time: "Antrenman sonrası",
    timeShort: "16:30",
    title: "Protein Shake",
    emoji: "🥤",
    items: [
      {
        text: "1 ölçek whey protein (~30g toz)",
        hint: "300 ml su veya yağsız süt ile",
      },
    ],
    note: "Antrenman gününde: workout'tan 15–45 dk sonra. Dinlenme gününde aynı saatte al.",
  },
  {
    id: "meal-5",
    time: "17–19",
    timeShort: "18:00",
    title: "Akşam Yemeği",
    emoji: "🥩",
    items: [
      { text: "200 g hindi göğüs veya yağsız kıyma", hint: "Çiğ ölçüsü" },
      {
        text: "125 g haşlanmış bulgur / greçka",
        hint: "Çiğ ölçüsü",
      },
      { text: "Salata veya haşlanmış sebze" },
      { text: "10 g zeytinyağı", hint: "Soğuk tüket" },
    ],
  },
  {
    id: "meal-6",
    time: "20–21",
    timeShort: "20:30",
    title: "Gece Ara Öğün",
    emoji: "🐟",
    items: [
      { text: "100 g balık / hindi göğüs / tavuk göğüs" },
      {
        text: "10 g şekersiz fıstık ezmesi VEYA 5 ceviz VEYA 10 g zeytinyağı",
        hint: "Birini seç",
      },
    ],
  },
];

export const NUTRITION_RULES = [
  { icon: "⚖️", text: "Öğünler çiğ ölçülerinden tartılmalıdır" },
  { icon: "🧂", text: "Günlük 6 g tuz" },
  { icon: "💧", text: "4.5 litre su" },
  { icon: "🥩", text: "500 g protein kaynağı (200+200+100 g çiğ) + 1 shake" },
];

export const WATER_TARGET_LITERS = 4.5;
export const WATER_STEP_ML = 250; // 250ml per glass
export const WATER_TOTAL_GLASSES = Math.round(
  (WATER_TARGET_LITERS * 1000) / WATER_STEP_ML,
); // 18

// -------------------- MACRO REFERENCE --------------------

export type MacroInfo = {
  name: string;
  emoji: string;
  unit: string; // e.g. "100 g çiğ", "1 ölçek"
  kcal: number;
  protein: number; // g
  carbs: number; // g
  fat: number; // g
};

export const PROTEIN_SOURCES: MacroInfo[] = [
  {
    name: "Tavuk Göğsü",
    emoji: "🍗",
    unit: "100 g çiğ",
    kcal: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
  },
  {
    name: "Hindi Göğüs",
    emoji: "🦃",
    unit: "100 g çiğ",
    kcal: 135,
    protein: 30,
    carbs: 0,
    fat: 1,
  },
  {
    name: "Yağsız Kıyma (%5)",
    emoji: "🥩",
    unit: "100 g çiğ",
    kcal: 137,
    protein: 21,
    carbs: 0,
    fat: 5,
  },
  {
    name: "Beyaz Balık (Levrek/Çupra)",
    emoji: "🐟",
    unit: "100 g çiğ",
    kcal: 96,
    protein: 20,
    carbs: 0,
    fat: 1.5,
  },
  {
    name: "Somon",
    emoji: "🍣",
    unit: "100 g çiğ",
    kcal: 208,
    protein: 20,
    carbs: 0,
    fat: 13,
  },
];

export const CARB_SOURCES: MacroInfo[] = [
  {
    name: "Basmati Pirinç",
    emoji: "🍚",
    unit: "100 g çiğ",
    kcal: 355,
    protein: 7,
    carbs: 78,
    fat: 0.5,
  },
  {
    name: "Makarna",
    emoji: "🍝",
    unit: "100 g çiğ",
    kcal: 371,
    protein: 13,
    carbs: 74,
    fat: 1.5,
  },
  {
    name: "Patates",
    emoji: "🥔",
    unit: "100 g çiğ",
    kcal: 77,
    protein: 2,
    carbs: 17,
    fat: 0.1,
  },
  {
    name: "Bulgur",
    emoji: "🌾",
    unit: "100 g çiğ",
    kcal: 342,
    protein: 12,
    carbs: 76,
    fat: 1.3,
  },
  {
    name: "Karabuğday (Greçka)",
    emoji: "🌰",
    unit: "100 g çiğ",
    kcal: 343,
    protein: 13,
    carbs: 71,
    fat: 3.4,
  },
];

export const PROTEIN_SHAKE: MacroInfo = {
  name: "Whey Protein",
  emoji: "🥤",
  unit: "1 ölçek (~30 g toz)",
  kcal: 120,
  protein: 24,
  carbs: 2,
  fat: 1.5,
};

// -------------------- DAILY SCENARIOS --------------------

export type Scenario = {
  id: string;
  name: string;
  emoji: string;
  proteinSource: string;
  carbSource: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  highlight?: "high-protein" | "low-fat" | "balanced" | "low-cal";
  note?: string;
};

// Toplam ham protein kaynağı: 200 + 200 + 100 = 500 g çiğ et/tavuk/balık
export const DAILY_PROTEIN_SOURCE_GRAMS = 500;
// Toplam ham karbonhidrat: 40 + 125 = 165 g çiğ tahıl/nişasta
export const DAILY_CARB_SOURCE_GRAMS = 165;

// Sabit öğünler (senaryodan bağımsız):
// Kahvaltı 3 yumurta + 3 kayısı  → 287 kcal, 19P, 20C, 15F
// 20g badem                       → 116 kcal,  4P,  4C, 10F
// 1 muz                           → 105 kcal,  1P, 27C,  0F
// 20g zeytinyağı (öğle+akşam)     → 180 kcal,  0P,  0C, 20F
// Salata × 2                      →  60 kcal,  2P, 10C,  0F
// Gece yağ opsiyonu (10g PB)      →  60 kcal,  2.5P, 2C, 5F
// Protein shake (1 ölçek whey)    → 120 kcal, 24P,  2C, 1.5F
// = TOPLAM SABIT: 928 kcal, ~53P, 65C, ~52F
export const BASE_MEALS_MACROS = {
  kcal: 928,
  protein: 53,
  carbs: 65,
  fat: 52,
  label: "Sabit öğünler",
  note: "Kahvaltı, badem, muz, zeytinyağı, salatalar, gece yağı ve shake dahil.",
};

export const SCENARIOS: Scenario[] = [
  {
    id: "sc-a",
    name: "Tavuk + Pirinç",
    emoji: "🍗",
    proteinSource: "500 g tavuk göğsü",
    carbSource: "165 g basmati pirinç",
    kcal: 2339,
    protein: 219,
    carbs: 194,
    fat: 70,
    highlight: "high-protein",
    note: "En yüksek protein, en yağsız et seçimi. Standart bulking baz.",
  },
  {
    id: "sc-b",
    name: "Kıyma + Makarna",
    emoji: "🥩",
    proteinSource: "500 g yağsız kıyma (%5)",
    carbSource: "165 g makarna",
    kcal: 2225,
    protein: 179,
    carbs: 187,
    fat: 79,
    highlight: "balanced",
    note: "Dengeli protein/yağ. Kıymadan gelen doğal yağ tokluk artırır.",
  },
  {
    id: "sc-c",
    name: "Balık + Patates",
    emoji: "🐟",
    proteinSource: "500 g beyaz balık",
    carbSource: "165 g patates",
    kcal: 1535,
    protein: 156,
    carbs: 93,
    fat: 59,
    highlight: "low-cal",
    note: "Kalorisi düşük, cutting/deficit için. Aynı karbonhidrat için ~750 g patates gerekir.",
  },
  {
    id: "sc-d",
    name: "Karma (Orijinal)",
    emoji: "🍽️",
    proteinSource: "200 g tavuk + 200 g hindi + 100 g balık",
    carbSource: "40 g basmati + 125 g bulgur",
    kcal: 2194,
    protein: 212,
    carbs: 191,
    fat: 64,
    highlight: "balanced",
    note: "Orijinal plan. Protein çeşitliliği yüksek, mikronütrient dağılımı iyi.",
  },
];

// -------------------- PER-MEAL MACROS --------------------

export type MacroData = {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

const FIXED_MEAL_MACROS: Record<string, MacroData> = {
  "meal-0": { kcal: 5, protein: 0, carbs: 1, fat: 0 },
  "meal-1": { kcal: 287, protein: 19, carbs: 20, fat: 15 },
  "meal-2": { kcal: 116, protein: 4, carbs: 4, fat: 10 },
  "meal-4": { kcal: 105, protein: 1, carbs: 27, fat: 0 },
  "meal-shake": { kcal: 120, protein: 24, carbs: 2, fat: 1.5 },
};

const SCENARIO_MEAL_MACROS: Record<string, Record<string, MacroData>> = {
  "meal-3": {
    "sc-a": { kcal: 590, protein: 66, carbs: 36, fat: 17 },
    "sc-b": { kcal: 540, protein: 48, carbs: 35, fat: 21 },
    "sc-c": { kcal: 341, protein: 42, carbs: 12, fat: 13 },
    "sc-d": { kcal: 590, protein: 66, carbs: 36, fat: 17 },
  },
  "meal-5": {
    "sc-a": { kcal: 892, protein: 72, carbs: 103, fat: 18 },
    "sc-b": { kcal: 856, protein: 59, carbs: 98, fat: 22 },
    "sc-c": { kcal: 406, protein: 44, carbs: 26, fat: 13 },
    "sc-d": { kcal: 816, protein: 76, carbs: 100, fat: 14 },
  },
  "meal-6": {
    "sc-a": { kcal: 225, protein: 34, carbs: 2, fat: 9 },
    "sc-b": { kcal: 197, protein: 24, carbs: 2, fat: 10 },
    "sc-c": { kcal: 156, protein: 23, carbs: 2, fat: 7 },
    "sc-d": { kcal: 156, protein: 23, carbs: 2, fat: 7 },
  },
};

export function getMealMacros(
  mealId: string,
  scenarioId: string,
): MacroData | null {
  const fixed = FIXED_MEAL_MACROS[mealId];
  if (fixed) return fixed;
  return SCENARIO_MEAL_MACROS[mealId]?.[scenarioId] ?? null;
}
