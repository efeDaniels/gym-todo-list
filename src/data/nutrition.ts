import { loc, type Localized } from "../lib/i18n";

export type MealItem = {
  text: Localized<string>;
  hint?: Localized<string>;
};

export type Meal = {
  id: string;
  time: Localized<string>; // e.g. "Uyanır uyanmaz", "12:30", "14–15"
  timeShort: string;
  title: Localized<string>;
  emoji: string;
  items: MealItem[];
  note?: Localized<string>;
};

export const NUTRITION_PLAN: Meal[] = [
  {
    id: "meal-0",
    time: loc("Uyanır uyanmaz", "On waking"),
    timeShort: "06:30",
    title: loc("Sirke & Limon", "Vinegar & Lemon"),
    emoji: "🍋",
    items: [
      {
        text: loc(
          "1 y.k. elma sirkesi + yarım limon suyu",
          "1 tbsp apple cider vinegar + juice of half a lemon",
        ),
        hint: loc(
          "1 bardak suya karıştır, aç karnına iç",
          "Mix into a glass of water, drink on empty stomach",
        ),
      },
    ],
    note: loc(
      "20 dk sonra kahvaltıya geçebilirsin.",
      "You can move on to breakfast after 20 min.",
    ),
  },
  {
    id: "meal-1",
    time: loc("Kahvaltı", "Breakfast"),
    timeShort: "07:00",
    title: loc("Kahvaltı", "Breakfast"),
    emoji: "🍳",
    items: [
      { text: loc("3 tam yumurta", "3 whole eggs") },
      {
        text: loc("3 adet kuru kayısı", "3 dried apricots"),
        hint: loc("Gün kurusu değil", "Not sun-dried"),
      },
    ],
  },
  {
    id: "meal-2",
    time: loc("Ara Öğün", "Snack"),
    timeShort: "10:30",
    title: loc("Sabah Ara Öğün", "Morning Snack"),
    emoji: "🌰",
    items: [{ text: loc("20 g çiğ badem", "20 g raw almonds") }],
  },
  {
    id: "meal-3",
    time: loc("Öğlen", "Lunch"),
    timeShort: "12:30",
    title: loc("Öğle Yemeği", "Lunch"),
    emoji: "🍖",
    items: [
      {
        text: loc(
          "200 g yağsız kıyma / et / tavuk göğsü",
          "200 g lean mince / red meat / chicken breast",
        ),
        hint: loc("Çiğ ölçüsü", "Raw weight"),
      },
      {
        text: loc(
          "40 g haşlanmış bulgur / karabuğday (greçka) / basmati pirinç",
          "40 g boiled bulgur / buckwheat / basmati rice",
        ),
        hint: loc("Çiğ ölçüsü", "Raw weight"),
      },
      {
        text: loc("10 g zeytinyağı", "10 g olive oil"),
        hint: loc("Isıtmadan, soğuk tüket", "Use cold, don't heat"),
      },
      {
        text: loc(
          "Salata veya haşlanmış sebze",
          "Salad or steamed vegetables",
        ),
      },
    ],
  },
  {
    id: "meal-4",
    time: loc("14–15", "14–15"),
    timeShort: "14:30",
    title: loc("Öğleden Sonra", "Afternoon"),
    emoji: "🍌",
    items: [{ text: loc("1 adet muz", "1 banana") }],
  },
  {
    id: "meal-shake",
    time: loc("Antrenman sonrası", "Post-workout"),
    timeShort: "16:30",
    title: loc("Protein Shake", "Protein Shake"),
    emoji: "🥤",
    items: [
      {
        text: loc(
          "1 ölçek whey protein (~30g toz)",
          "1 scoop whey protein (~30 g powder)",
        ),
        hint: loc(
          "300 ml su veya yağsız süt ile",
          "With 300 ml water or skim milk",
        ),
      },
    ],
    note: loc(
      "Antrenman gününde: workout'tan 15–45 dk sonra. Dinlenme gününde aynı saatte al.",
      "Training day: 15–45 min after workout. Rest day: take at the same time.",
    ),
  },
  {
    id: "meal-5",
    time: loc("17–19", "17–19"),
    timeShort: "18:00",
    title: loc("Akşam Yemeği", "Dinner"),
    emoji: "🥩",
    items: [
      {
        text: loc(
          "200 g hindi göğüs veya yağsız kıyma",
          "200 g turkey breast or lean mince",
        ),
        hint: loc("Çiğ ölçüsü", "Raw weight"),
      },
      {
        text: loc(
          "125 g haşlanmış bulgur / greçka",
          "125 g boiled bulgur / buckwheat",
        ),
        hint: loc("Çiğ ölçüsü", "Raw weight"),
      },
      {
        text: loc(
          "Salata veya haşlanmış sebze",
          "Salad or steamed vegetables",
        ),
      },
      {
        text: loc("10 g zeytinyağı", "10 g olive oil"),
        hint: loc("Soğuk tüket", "Use cold"),
      },
    ],
  },
  {
    id: "meal-6",
    time: loc("20–21", "20–21"),
    timeShort: "20:30",
    title: loc("Gece Ara Öğün", "Late-Night Snack"),
    emoji: "🐟",
    items: [
      {
        text: loc(
          "100 g balık / hindi göğüs / tavuk göğüs",
          "100 g fish / turkey breast / chicken breast",
        ),
      },
      {
        text: loc(
          "10 g şekersiz fıstık ezmesi VEYA 5 ceviz VEYA 10 g zeytinyağı",
          "10 g unsweetened peanut butter OR 5 walnuts OR 10 g olive oil",
        ),
        hint: loc("Birini seç", "Pick one"),
      },
    ],
  },
];

export const NUTRITION_RULES: { icon: string; text: Localized<string> }[] = [
  {
    icon: "⚖️",
    text: loc(
      "Öğünler çiğ ölçülerinden tartılmalıdır",
      "Weigh meal ingredients raw",
    ),
  },
  { icon: "🧂", text: loc("Günlük 6 g tuz", "6 g salt per day") },
  { icon: "💧", text: loc("4.5 litre su", "4.5 litres of water") },
  {
    icon: "🥩",
    text: loc(
      "500 g protein kaynağı (200+200+100 g çiğ) + 1 shake",
      "500 g protein source (200+200+100 g raw) + 1 shake",
    ),
  },
];

export const WATER_TARGET_LITERS = 4.5;
export const WATER_STEP_ML = 250; // 250ml per glass
export const WATER_TOTAL_GLASSES = Math.round(
  (WATER_TARGET_LITERS * 1000) / WATER_STEP_ML,
); // 18

// -------------------- MACRO REFERENCE --------------------

export type MacroInfo = {
  name: Localized<string>;
  emoji: string;
  unit: Localized<string>; // e.g. "100 g çiğ", "1 ölçek"
  kcal: number;
  protein: number; // g
  carbs: number; // g
  fat: number; // g
};

const UNIT_100G_RAW = loc("100 g çiğ", "100 g raw");

export const PROTEIN_SOURCES: MacroInfo[] = [
  {
    name: loc("Tavuk Göğsü", "Chicken Breast"),
    emoji: "🍗",
    unit: UNIT_100G_RAW,
    kcal: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
  },
  {
    name: loc("Hindi Göğüs", "Turkey Breast"),
    emoji: "🦃",
    unit: UNIT_100G_RAW,
    kcal: 135,
    protein: 30,
    carbs: 0,
    fat: 1,
  },
  {
    name: loc("Yağsız Kıyma (%5)", "Lean Mince (5%)"),
    emoji: "🥩",
    unit: UNIT_100G_RAW,
    kcal: 137,
    protein: 21,
    carbs: 0,
    fat: 5,
  },
  {
    name: loc(
      "Beyaz Balık (Levrek/Çupra)",
      "White Fish (Sea Bass/Bream)",
    ),
    emoji: "🐟",
    unit: UNIT_100G_RAW,
    kcal: 96,
    protein: 20,
    carbs: 0,
    fat: 1.5,
  },
  {
    name: loc("Somon", "Salmon"),
    emoji: "🍣",
    unit: UNIT_100G_RAW,
    kcal: 208,
    protein: 20,
    carbs: 0,
    fat: 13,
  },
];

export const CARB_SOURCES: MacroInfo[] = [
  {
    name: loc("Basmati Pirinç", "Basmati Rice"),
    emoji: "🍚",
    unit: UNIT_100G_RAW,
    kcal: 355,
    protein: 7,
    carbs: 78,
    fat: 0.5,
  },
  {
    name: loc("Makarna", "Pasta"),
    emoji: "🍝",
    unit: UNIT_100G_RAW,
    kcal: 371,
    protein: 13,
    carbs: 74,
    fat: 1.5,
  },
  {
    name: loc("Patates", "Potato"),
    emoji: "🥔",
    unit: UNIT_100G_RAW,
    kcal: 77,
    protein: 2,
    carbs: 17,
    fat: 0.1,
  },
  {
    name: loc("Bulgur", "Bulgur"),
    emoji: "🌾",
    unit: UNIT_100G_RAW,
    kcal: 342,
    protein: 12,
    carbs: 76,
    fat: 1.3,
  },
  {
    name: loc("Karabuğday (Greçka)", "Buckwheat"),
    emoji: "🌰",
    unit: UNIT_100G_RAW,
    kcal: 343,
    protein: 13,
    carbs: 71,
    fat: 3.4,
  },
];

export const PROTEIN_SHAKE: MacroInfo = {
  name: loc("Whey Protein", "Whey Protein"),
  emoji: "🥤",
  unit: loc("1 ölçek (~30 g toz)", "1 scoop (~30 g powder)"),
  kcal: 120,
  protein: 24,
  carbs: 2,
  fat: 1.5,
};

// -------------------- DAILY SCENARIOS --------------------

export type Scenario = {
  id: string;
  name: Localized<string>;
  emoji: string;
  proteinSource: Localized<string>;
  carbSource: Localized<string>;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  highlight?: "high-protein" | "low-fat" | "balanced" | "low-cal";
  note?: Localized<string>;
};

// Total raw protein source: 200 + 200 + 100 = 500 g raw meat/poultry/fish
export const DAILY_PROTEIN_SOURCE_GRAMS = 500;
// Total raw carbs: 40 + 125 = 165 g raw grains/starches
export const DAILY_CARB_SOURCE_GRAMS = 165;

// Fixed meals (scenario-independent):
// Breakfast 3 eggs + 3 apricots  → 287 kcal, 19P, 20C, 15F
// 20g almonds                     → 116 kcal,  4P,  4C, 10F
// 1 banana                        → 105 kcal,  1P, 27C,  0F
// 20g olive oil (lunch+dinner)    → 180 kcal,  0P,  0C, 20F
// Salad × 2                       →  60 kcal,  2P, 10C,  0F
// Late-night fat option (10g PB)  →  60 kcal,  2.5P, 2C, 5F
// Protein shake (1 scoop whey)    → 120 kcal, 24P,  2C, 1.5F
// = TOTAL FIXED: 928 kcal, ~53P, 65C, ~52F
export const BASE_MEALS_MACROS = {
  kcal: 928,
  protein: 53,
  carbs: 65,
  fat: 52,
  label: loc("Sabit öğünler", "Fixed meals"),
  note: loc(
    "Kahvaltı, badem, muz, zeytinyağı, salatalar, gece yağı ve shake dahil.",
    "Includes breakfast, almonds, banana, olive oil, salads, late-night fat and shake.",
  ),
};

export const SCENARIOS: Scenario[] = [
  {
    id: "sc-a",
    name: loc("Tavuk + Pirinç", "Chicken + Rice"),
    emoji: "🍗",
    proteinSource: loc("500 g tavuk göğsü", "500 g chicken breast"),
    carbSource: loc("165 g basmati pirinç", "165 g basmati rice"),
    kcal: 2339,
    protein: 219,
    carbs: 194,
    fat: 70,
    highlight: "high-protein",
    note: loc(
      "En yüksek protein, en yağsız et seçimi. Standart bulking baz.",
      "Highest protein, leanest meat option. Standard bulking base.",
    ),
  },
  {
    id: "sc-b",
    name: loc("Kıyma + Makarna", "Mince + Pasta"),
    emoji: "🥩",
    proteinSource: loc("500 g yağsız kıyma (%5)", "500 g lean mince (5%)"),
    carbSource: loc("165 g makarna", "165 g pasta"),
    kcal: 2225,
    protein: 179,
    carbs: 187,
    fat: 79,
    highlight: "balanced",
    note: loc(
      "Dengeli protein/yağ. Kıymadan gelen doğal yağ tokluk artırır.",
      "Balanced protein/fat. Natural fat from mince improves satiety.",
    ),
  },
  {
    id: "sc-c",
    name: loc("Balık + Patates", "Fish + Potato"),
    emoji: "🐟",
    proteinSource: loc("500 g beyaz balık", "500 g white fish"),
    carbSource: loc("165 g patates", "165 g potato"),
    kcal: 1535,
    protein: 156,
    carbs: 93,
    fat: 59,
    highlight: "low-cal",
    note: loc(
      "Kalorisi düşük, cutting/deficit için. Aynı karbonhidrat için ~750 g patates gerekir.",
      "Low calorie, for cutting/deficit. ~750 g potato needed for the same carbs.",
    ),
  },
  {
    id: "sc-d",
    name: loc("Karma (Orijinal)", "Mixed (Original)"),
    emoji: "🍽️",
    proteinSource: loc(
      "200 g tavuk + 200 g hindi + 100 g balık",
      "200 g chicken + 200 g turkey + 100 g fish",
    ),
    carbSource: loc(
      "40 g basmati + 125 g bulgur",
      "40 g basmati + 125 g bulgur",
    ),
    kcal: 2194,
    protein: 212,
    carbs: 191,
    fat: 64,
    highlight: "balanced",
    note: loc(
      "Orijinal plan. Protein çeşitliliği yüksek, mikronütrient dağılımı iyi.",
      "Original plan. High protein variety, good micronutrient spread.",
    ),
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

// -------------------- PER-ITEM KCAL --------------------
// Item order matches each meal.items array in NUTRITION_PLAN 1:1.

const FIXED_ITEM_KCALS: Record<string, number[]> = {
  "meal-0": [5],
  "meal-1": [215, 72],
  "meal-2": [116],
  "meal-4": [105],
  "meal-shake": [120],
};

const SCENARIO_ITEM_KCALS: Record<string, Record<string, number[]>> = {
  "meal-3": {
    "sc-a": [330, 142, 88, 30],
    "sc-b": [274, 148, 88, 30],
    "sc-c": [192, 31, 88, 30],
    "sc-d": [330, 142, 88, 30],
  },
  "meal-5": {
    "sc-a": [330, 444, 30, 88],
    "sc-b": [274, 464, 30, 88],
    "sc-c": [192, 96, 30, 88],
    "sc-d": [270, 428, 30, 88],
  },
  "meal-6": {
    "sc-a": [165, 60],
    "sc-b": [137, 60],
    "sc-c": [96, 60],
    "sc-d": [96, 60],
  },
};

export function getItemKcal(
  mealId: string,
  itemIndex: number,
  scenarioId: string,
): number | null {
  const fixed = FIXED_ITEM_KCALS[mealId];
  if (fixed) return fixed[itemIndex] ?? null;
  return SCENARIO_ITEM_KCALS[mealId]?.[scenarioId]?.[itemIndex] ?? null;
}

export function computeConsumedKcal(
  state: Record<string, boolean[]>,
  scenarioId: string,
): number {
  let total = 0;
  for (const meal of NUTRITION_PLAN) {
    const completed = state[meal.id];
    if (!completed) continue;
    for (let i = 0; i < completed.length; i++) {
      if (completed[i]) {
        const kcal = getItemKcal(meal.id, i, scenarioId);
        if (kcal !== null) total += kcal;
      }
    }
  }
  return total;
}
