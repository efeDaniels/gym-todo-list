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
];

export const WATER_TARGET_LITERS = 4.5;
export const WATER_STEP_ML = 250; // 250ml per glass
export const WATER_TOTAL_GLASSES = Math.round(
  (WATER_TARGET_LITERS * 1000) / WATER_STEP_ML,
); // 18
