import { loc, type Localized } from "../lib/i18n";

// -------------------- Types --------------------

export type TravelExerciseTag = "COMPOUND" | "SUPERSET" | "FINISHER";

export type TravelExercise = {
  id: string;
  name: string; // Gym terms stay English (matches existing convention)
  sets: number;
  reps: string;
  rest: Localized<string>;
  rpe?: Localized<string>;
  tag?: TravelExerciseTag;
  note?: Localized<string>;
};

export type TravelDay = {
  key: string;
  title: string; // Short, latinized (PUSH / PULL / LEGS)
  subtitle: Localized<string>;
  focus: Localized<string[]>;
  duration: Localized<string>;
  volumeSummary: Localized<string>;
  exercises: TravelExercise[];
};

export type BonusKey = "arms-delts" | "weak-point" | "light-upper-lower" | "full-ppl";

export type BonusDay = {
  key: BonusKey;
  label: string; // Short tag (A, B, C, D)
  title: Localized<string>;
  tagline: Localized<string>;
  duration: Localized<string>;
  bestWhen: Localized<string>;
  rationale: Localized<string>;
  // Simple exercise list (one group) OR named sub-blocks (multiple)
  blocks: {
    heading?: Localized<string>;
    exercises: TravelExercise[];
  }[];
  volumeNote?: Localized<string>;
};

// -------------------- Research intro --------------------

export const TRAVEL_INTRO = {
  context: loc(
    "2 ay seyahat · haftada 3 gün temel · seans 30-45 dk · fazla vakit varsa bonus günler",
    "2-month trip · base 3 days/week · 30-45 min sessions · bonus days when time allows",
  ),
  researchHeadline: loc(
    "3 gün PPL'in bilimsel gerçekliği",
    "The scientific reality of 3-day PPL",
  ),
  researchBody: loc(
    "Schoenfeld 2016 meta-analizi (10 çalışma) her kasın haftada 2 kez çalıştırılmasının 1 kezden üstün olduğunu gösterdi. 3 gün PPL = her kas 1x/hafta. Fakat Schoenfeld 2019 (25 çalışma) ve Pelland 2026 (67 çalışma) haftalık hacim eşitlendiğinde frekans etkisinin ihmal edilebilir olduğunu buldu. Tek seansı kaçırmazsan çalışır — kaçırırsan o kas 2 hafta hiçbir şey almaz.",
    "Schoenfeld's 2016 meta-analysis (10 studies) showed training a muscle 2x/week beats 1x/week. 3-day PPL = each muscle 1x/week. But Schoenfeld 2019 (25 studies) and Pelland 2026 (67 studies) found frequency effect is negligible when volume is matched. Works if you don't miss a session — if you do, that muscle gets nothing for 2 weeks.",
  ),
  optimizations: loc(
    [
      "Antagonist superset'ler → aynı hacimle %35-60 daha kısa süre (Iversen 2021, Burke 2025)",
      "Her seansta hedef kasa 8-11 direct set → MEV-MAV sweet spot (Pelland 2024)",
      "Küçük kasları (yan delt, biceps) hem Push hem Pull'da serpiştir (Dr. Israetel)",
    ],
    [
      "Antagonist supersets → 35-60% shorter sessions with matched volume (Iversen 2021, Burke 2025)",
      "8-11 direct sets per target muscle per session → MEV-MAV sweet spot (Pelland 2024)",
      "Pepper small muscles (lateral delts, biceps) into both Push and Pull (Dr. Israetel)",
    ],
  ),
};

// -------------------- Shared RPE/rest shortcuts --------------------

const RIR_1_2 = loc("RIR 1-2", "RIR 1-2");
const RIR_1 = loc("RIR 1", "RIR 1");
const RIR_3_4 = loc("RIR 3-4", "RIR 3-4");
const FAILURE = loc("Failure", "Failure");

const REST_LONG = loc("2.5-3 dk", "2.5-3 min");
const REST_MED = loc("2 dk", "2 min");
const REST_SHORT = loc("90 sn", "90 sec");
const REST_TIGHT = loc("60 sn", "60 sec");
const REST_LEG = loc("3 dk", "3 min");

const NOTE_SUPERSET = loc(
  "Set 1 bitince hemen Set 2'ye geç, çift bitince dinlen",
  "Go straight from Set 1 to Set 2, rest after the pair",
);

// -------------------- 3-Day Core PPL --------------------

export const PPL_DAYS: TravelDay[] = [
  {
    key: "push",
    title: "PUSH",
    subtitle: loc("Göğüs · Omuz · Triceps", "Chest · Shoulders · Triceps"),
    focus: loc(
      ["Göğüs", "Omuz", "Triceps"],
      ["Chest", "Shoulders", "Triceps"],
    ),
    duration: loc("~38-42 dk", "~38-42 min"),
    volumeSummary: loc(
      "Göğüs 9 · Omuz 6 (+ fractional) · Triceps 5 (+ fractional)",
      "Chest 9 · Shoulders 6 (+ fractional) · Triceps 5 (+ fractional)",
    ),
    exercises: [
      {
        id: "trv-push-a1",
        name: "Barbell Bench Press",
        sets: 4,
        reps: "6-8",
        rest: REST_LONG,
        rpe: RIR_1_2,
        tag: "COMPOUND",
        note: loc(
          "Alternatif: Dumbbell Bench Press veya Machine Chest Press",
          "Alternative: Dumbbell Bench Press or Machine Chest Press",
        ),
      },
      {
        id: "trv-push-b1",
        name: "Incline Dumbbell Press",
        sets: 3,
        reps: "8-10",
        rest: REST_MED,
        rpe: RIR_1,
      },
      {
        id: "trv-push-c1",
        name: "Seated Dumbbell Shoulder Press",
        sets: 3,
        reps: "10-12",
        rest: REST_SHORT,
        tag: "SUPERSET",
        note: NOTE_SUPERSET,
      },
      {
        id: "trv-push-c2",
        name: "Cable Lateral Raise",
        sets: 3,
        reps: "12-15",
        rest: REST_SHORT,
        tag: "SUPERSET",
        rpe: FAILURE,
      },
      {
        id: "trv-push-d1",
        name: "Cable Chest Fly",
        sets: 2,
        reps: "12-15",
        rest: REST_TIGHT,
        tag: "SUPERSET",
        note: NOTE_SUPERSET,
      },
      {
        id: "trv-push-d2",
        name: "Triceps Rope Pushdown",
        sets: 2,
        reps: "12-15",
        rest: REST_TIGHT,
        tag: "SUPERSET",
        rpe: FAILURE,
      },
    ],
  },
  {
    key: "pull",
    title: "PULL",
    subtitle: loc("Sırt · Biceps · Arka Delt", "Back · Biceps · Rear Delts"),
    focus: loc(
      ["Sırt", "Biceps", "Arka delt"],
      ["Back", "Biceps", "Rear delts"],
    ),
    duration: loc("~38-42 dk", "~38-42 min"),
    volumeSummary: loc(
      "Sırt 10 · Biceps 6 (+ fractional) · Arka delt 3",
      "Back 10 · Biceps 6 (+ fractional) · Rear delts 3",
    ),
    exercises: [
      {
        id: "trv-pull-a1",
        name: "Pull-up (or Lat Pulldown)",
        sets: 4,
        reps: "6-10",
        rest: REST_LONG,
        rpe: RIR_1_2,
        tag: "COMPOUND",
        note: loc(
          "Varsa Pull-up'ı seç. Yetersizse Lat Pulldown.",
          "Prefer Pull-up when possible. Otherwise Lat Pulldown.",
        ),
      },
      {
        id: "trv-pull-b1",
        name: "Barbell Row",
        sets: 3,
        reps: "8-10",
        rest: REST_MED,
        rpe: RIR_1,
        note: loc(
          "Alternatif: Chest-supported Row (bel ağrısı varsa)",
          "Alternative: Chest-supported Row (if lower back issues)",
        ),
      },
      {
        id: "trv-pull-c1",
        name: "Seated Cable Row",
        sets: 3,
        reps: "10-12",
        rest: REST_SHORT,
        tag: "SUPERSET",
        note: NOTE_SUPERSET,
      },
      {
        id: "trv-pull-c2",
        name: "Face Pull",
        sets: 3,
        reps: "12-15",
        rest: REST_SHORT,
        tag: "SUPERSET",
        rpe: FAILURE,
      },
      {
        id: "trv-pull-d1",
        name: "Incline Dumbbell Curl",
        sets: 3,
        reps: "10-12",
        rest: REST_TIGHT,
        tag: "SUPERSET",
        note: NOTE_SUPERSET,
      },
      {
        id: "trv-pull-d2",
        name: "Hammer Curl",
        sets: 3,
        reps: "10-12",
        rest: REST_TIGHT,
        tag: "SUPERSET",
      },
    ],
  },
  {
    key: "legs",
    title: "LEGS",
    subtitle: loc("Quads · Hams · Baldır", "Quads · Hams · Calves"),
    focus: loc(["Quads", "Hams", "Baldır"], ["Quads", "Hams", "Calves"]),
    duration: loc("~40-45 dk", "~40-45 min"),
    volumeSummary: loc(
      "Quads 7 · Hams 6 · Baldır 3",
      "Quads 7 · Hams 6 · Calves 3",
    ),
    exercises: [
      {
        id: "trv-leg-a1",
        name: "Back Squat",
        sets: 4,
        reps: "6-8",
        rest: REST_LEG,
        rpe: RIR_1_2,
        tag: "COMPOUND",
        note: loc(
          "Alternatif: Hack Squat / Leg Press / Goblet Squat",
          "Alternative: Hack Squat / Leg Press / Goblet Squat",
        ),
      },
      {
        id: "trv-leg-b1",
        name: "Romanian Deadlift",
        sets: 3,
        reps: "8-10",
        rest: REST_MED,
        rpe: RIR_1,
        note: loc(
          "Bacak gününde ağır bileşik hareketleri superset'leme — form bozulur.",
          "Don't superset heavy compounds on leg day — form breaks down.",
        ),
      },
      {
        id: "trv-leg-c1",
        name: "Leg Press",
        sets: 3,
        reps: "10-12",
        rest: REST_SHORT,
        note: loc(
          "Ayaklar daha aşağıda = quad vurgu",
          "Lower foot placement = more quad emphasis",
        ),
      },
      {
        id: "trv-leg-d1",
        name: "Lying Leg Curl (or Seated)",
        sets: 3,
        reps: "10-12",
        rest: REST_TIGHT,
        tag: "SUPERSET",
        note: NOTE_SUPERSET,
      },
      {
        id: "trv-leg-d2",
        name: "Standing Calf Raise",
        sets: 3,
        reps: "12-15",
        rest: REST_TIGHT,
        tag: "SUPERSET",
        rpe: FAILURE,
      },
    ],
  },
];

// -------------------- Bonus Days --------------------

export const BONUS_DAYS: BonusDay[] = [
  {
    key: "arms-delts",
    label: "A",
    title: loc("Arms & Delts Bonus Günü", "Arms & Delts Bonus Day"),
    tagline: loc("En yüksek ROI · küçük kaslar", "Highest ROI · small muscles"),
    duration: loc("25-30 dk", "25-30 min"),
    bestWhen: loc(
      "Push ve Pull yapıldıktan sonra ara güne (en az 24 sa sonra)",
      "On an off-day after Push and Pull are done (at least 24h later)",
    ),
    rationale: loc(
      "Küçük kaslar (lateral delt, biceps, triceps) daha hızlı toparlanır ve ekstra frekansa en iyi yanıt verir. Big 3'ü (göğüs/sırt/bacak) rahatsız etmez. Dr. Milo Wolf: 'küçük kasları serpiştir, büyükleri koruma'.",
      "Small muscles (lateral delts, biceps, triceps) recover faster and respond best to extra frequency. Doesn't disturb the big three (chest/back/legs). Dr. Milo Wolf: 'pepper small muscles, protect big ones'.",
    ),
    blocks: [
      {
        exercises: [
          {
            id: "trv-bonus-a-a1",
            name: "Cable Lateral Raise",
            sets: 4,
            reps: "12-15",
            rest: REST_TIGHT,
            tag: "SUPERSET",
            note: NOTE_SUPERSET,
          },
          {
            id: "trv-bonus-a-a2",
            name: "Face Pull",
            sets: 4,
            reps: "12-15",
            rest: REST_TIGHT,
            tag: "SUPERSET",
          },
          {
            id: "trv-bonus-a-b1",
            name: "Incline Dumbbell Curl",
            sets: 3,
            reps: "10-12",
            rest: REST_TIGHT,
            tag: "SUPERSET",
            note: NOTE_SUPERSET,
          },
          {
            id: "trv-bonus-a-b2",
            name: "Overhead Rope Triceps Extension",
            sets: 3,
            reps: "10-12",
            rest: REST_TIGHT,
            tag: "SUPERSET",
          },
          {
            id: "trv-bonus-a-c1",
            name: "Cable Rope Hammer Curl",
            sets: 3,
            reps: "10-12",
            rest: REST_TIGHT,
            tag: "SUPERSET",
            note: NOTE_SUPERSET,
          },
          {
            id: "trv-bonus-a-c2",
            name: "Rope Triceps Pushdown",
            sets: 3,
            reps: "10-12",
            rest: REST_TIGHT,
            tag: "SUPERSET",
          },
          {
            id: "trv-bonus-a-d",
            name: "Standing Calf Raise",
            sets: 3,
            reps: "12-15",
            rest: REST_TIGHT,
            rpe: FAILURE,
          },
        ],
      },
    ],
    volumeNote: loc(
      "Ekstra set: Lateral delt +4 · Arka delt +4 · Biceps +6 · Triceps +6 · Baldır +3",
      "Extra sets: Lateral delt +4 · Rear delt +4 · Biceps +6 · Triceps +6 · Calves +3",
    ),
  },
  {
    key: "weak-point",
    label: "B",
    title: loc("Zayıf Nokta Günü", "Weak Point Day"),
    tagline: loc("Hedefli izolasyon", "Targeted isolation"),
    duration: loc("20-30 dk", "20-30 min"),
    bestWhen: loc(
      "Bir kas grubu belirgin şekilde geride kaldıysa (göğüs/sırt/omuz)",
      "When a muscle group is visibly lagging (chest/back/shoulders)",
    ),
    rationale: loc(
      "Hedef kasa 6-10 ekstra izolasyon seti. Compound hareket koyma — ana seansların performansı düşer. Sadece pump/izolasyon.",
      "6-10 extra isolation sets for target muscle. No compound work — it hurts main session performance. Pump/isolation only.",
    ),
    blocks: [
      {
        heading: loc("Örnek — Göğüs zayıf", "Example — Chest lagging"),
        exercises: [
          {
            id: "trv-bonus-b-chest-1",
            name: "Cable Chest Fly (high-to-low)",
            sets: 4,
            reps: "12-15",
            rest: REST_SHORT,
          },
          {
            id: "trv-bonus-b-chest-2",
            name: "Pec Deck Machine",
            sets: 3,
            reps: "12-15",
            rest: REST_SHORT,
          },
          {
            id: "trv-bonus-b-chest-3",
            name: "Cable Chest Fly (low-to-mid)",
            sets: 3,
            reps: "15-20",
            rest: REST_SHORT,
            rpe: FAILURE,
          },
        ],
      },
      {
        heading: loc(
          "Örnek — Üst sırt / arka delt zayıf",
          "Example — Upper back / rear delts lagging",
        ),
        exercises: [
          {
            id: "trv-bonus-b-back-1",
            name: "Chest-supported DB Row",
            sets: 4,
            reps: "10-12",
            rest: REST_SHORT,
          },
          {
            id: "trv-bonus-b-back-2",
            name: "Reverse Pec Deck",
            sets: 3,
            reps: "12-15",
            rest: REST_SHORT,
          },
          {
            id: "trv-bonus-b-back-3",
            name: "Face Pull",
            sets: 3,
            reps: "15-20",
            rest: REST_SHORT,
            rpe: FAILURE,
          },
        ],
      },
    ],
  },
  {
    key: "light-upper-lower",
    label: "C",
    title: loc("Hafif Üst/Alt Repeat", "Light Upper/Lower Repeat"),
    tagline: loc("Düşük yorgunluk pump", "Low-fatigue pump"),
    duration: loc("30-35 dk", "30-35 min"),
    bestWhen: loc(
      "Haftada 5 gün çıkabildiğinde, Opsiyon A'ya ek olarak",
      "When training 5 days/week, in addition to Option A",
    ),
    rationale: loc(
      "Büyük kaslara da ek frekans ver — ama hafif, 3-4 RIR, pump odaklı. Ana seansların performansını bozmayacak dozda. Ana Legs gününden 48+ saat sonra.",
      "Add frequency to big muscles — but light, 3-4 RIR, pump-focused. Dose that won't hurt main session performance. 48+ hours after main Legs day.",
    ),
    blocks: [
      {
        heading: loc("Hafif Üst Beden", "Light Upper Body"),
        exercises: [
          {
            id: "trv-bonus-c-up-1",
            name: "Machine Chest Press",
            sets: 3,
            reps: "10-12",
            rest: REST_SHORT,
            rpe: RIR_3_4,
            note: loc("Pompa odaklı", "Pump focus"),
          },
          {
            id: "trv-bonus-c-up-2",
            name: "Chest-supported Row",
            sets: 3,
            reps: "10-12",
            rest: REST_SHORT,
            rpe: RIR_3_4,
          },
          {
            id: "trv-bonus-c-up-3",
            name: "Cable Lateral Raise",
            sets: 3,
            reps: "12-15",
            rest: REST_TIGHT,
            rpe: FAILURE,
          },
          {
            id: "trv-bonus-c-up-4",
            name: "Cable Curl",
            sets: 2,
            reps: "12-15",
            rest: REST_TIGHT,
          },
          {
            id: "trv-bonus-c-up-5",
            name: "Rope Pushdown",
            sets: 2,
            reps: "12-15",
            rest: REST_TIGHT,
          },
        ],
      },
      {
        heading: loc("Hafif Alt Beden", "Light Lower Body"),
        exercises: [
          {
            id: "trv-bonus-c-lo-1",
            name: "Leg Press",
            sets: 3,
            reps: "12-15",
            rest: REST_SHORT,
            rpe: RIR_3_4,
            note: loc("Yüksek rep, pump", "High reps, pump"),
          },
          {
            id: "trv-bonus-c-lo-2",
            name: "Leg Curl",
            sets: 3,
            reps: "10-12",
            rest: REST_SHORT,
            rpe: loc("RIR 2", "RIR 2"),
          },
          {
            id: "trv-bonus-c-lo-3",
            name: "Walking Lunge",
            sets: 2,
            reps: "10/leg",
            rest: REST_SHORT,
          },
          {
            id: "trv-bonus-c-lo-4",
            name: "Standing Calf Raise",
            sets: 3,
            reps: "12-15",
            rest: REST_TIGHT,
          },
          {
            id: "trv-bonus-c-lo-5",
            name: "Hanging Leg Raise",
            sets: 2,
            reps: "10-15",
            rest: REST_TIGHT,
            note: loc("Core bonus", "Core bonus"),
          },
        ],
      },
    ],
  },
  {
    key: "full-ppl",
    label: "D",
    title: loc("6 Gün Full PPL", "6-Day Full PPL"),
    tagline: loc("Altın standart · 2x/hafta frekans", "Gold standard · 2x/week frequency"),
    duration: loc("35-45 dk/seans", "35-45 min/session"),
    bestWhen: loc(
      "6 gün tutarlı çıkabildiğinde — araştırmaya göre PPL'in ideal frekansı",
      "When training 6 days consistently — PPL's ideal frequency per research",
    ),
    rationale: loc(
      "Schoenfeld 2016 ve Pelland 2026: 2x/hafta frekansı 1x'e üstün. 1x/hafta programını 6 güne kopyalama — hacim junk'a döner. A/B varyantları ile her kası iki seansa yay.",
      "Schoenfeld 2016 and Pelland 2026: 2x/week frequency beats 1x/week. Don't copy the 1x/week program to 6 days — volume becomes junk. Use A/B variants to spread each muscle over two sessions.",
    ),
    blocks: [
      {
        heading: loc("Rotasyon", "Rotation"),
        exercises: [],
      },
      {
        heading: loc("Push A (ağır / düşük tekrar)", "Push A (heavy / low rep)"),
        exercises: [
          { id: "trv-bonus-d-pa-1", name: "Barbell Bench Press", sets: 4, reps: "5-7", rest: REST_LONG, rpe: RIR_1 },
          { id: "trv-bonus-d-pa-2", name: "Seated DB Shoulder Press", sets: 3, reps: "6-8", rest: REST_MED, rpe: RIR_1 },
          { id: "trv-bonus-d-pa-3", name: "Incline DB Press", sets: 2, reps: "8-10", rest: REST_MED },
          { id: "trv-bonus-d-pa-4", name: "Cable Lateral Raise", sets: 3, reps: "10-12", rest: REST_TIGHT },
          { id: "trv-bonus-d-pa-5", name: "Rope Pushdown", sets: 2, reps: "10-12", rest: REST_TIGHT, rpe: FAILURE },
        ],
      },
      {
        heading: loc("Push B (hafif / yüksek tekrar)", "Push B (light / high rep)"),
        exercises: [
          { id: "trv-bonus-d-pb-1", name: "Incline Bench Press", sets: 3, reps: "8-10", rest: REST_MED, rpe: RIR_1 },
          { id: "trv-bonus-d-pb-2", name: "Machine Chest Press", sets: 3, reps: "10-12", rest: REST_SHORT },
          { id: "trv-bonus-d-pb-3", name: "Cable Lateral Raise", sets: 4, reps: "12-15", rest: REST_TIGHT, rpe: FAILURE },
          { id: "trv-bonus-d-pb-4", name: "Overhead Rope Extension", sets: 3, reps: "10-12", rest: REST_TIGHT },
          { id: "trv-bonus-d-pb-5", name: "Cable Fly", sets: 2, reps: "12-15", rest: REST_TIGHT, rpe: FAILURE },
        ],
      },
      {
        heading: loc("Pull A (ağır)", "Pull A (heavy)"),
        exercises: [
          { id: "trv-bonus-d-la-1", name: "Pull-up (weighted if possible)", sets: 4, reps: "5-7", rest: REST_LONG, rpe: RIR_1 },
          { id: "trv-bonus-d-la-2", name: "Barbell Row", sets: 3, reps: "6-8", rest: REST_MED, rpe: RIR_1 },
          { id: "trv-bonus-d-la-3", name: "Face Pull", sets: 3, reps: "12-15", rest: REST_TIGHT },
          { id: "trv-bonus-d-la-4", name: "Barbell Curl", sets: 3, reps: "6-8", rest: REST_TIGHT, rpe: RIR_1 },
        ],
      },
      {
        heading: loc("Pull B (hafif)", "Pull B (light)"),
        exercises: [
          { id: "trv-bonus-d-lb-1", name: "Lat Pulldown (varied grip)", sets: 3, reps: "10-12", rest: REST_SHORT },
          { id: "trv-bonus-d-lb-2", name: "Seated Cable Row", sets: 3, reps: "10-12", rest: REST_SHORT },
          { id: "trv-bonus-d-lb-3", name: "Reverse Pec Deck", sets: 3, reps: "12-15", rest: REST_TIGHT },
          { id: "trv-bonus-d-lb-4", name: "Incline DB Curl", sets: 3, reps: "10-12", rest: REST_TIGHT },
          { id: "trv-bonus-d-lb-5", name: "Hammer Curl", sets: 2, reps: "10-12", rest: REST_TIGHT, rpe: FAILURE },
        ],
      },
      {
        heading: loc("Legs A (quad odaklı)", "Legs A (quad-focused)"),
        exercises: [
          { id: "trv-bonus-d-ga-1", name: "Back Squat", sets: 4, reps: "5-7", rest: REST_LEG, rpe: RIR_1 },
          { id: "trv-bonus-d-ga-2", name: "Leg Press", sets: 3, reps: "8-10", rest: REST_MED },
          { id: "trv-bonus-d-ga-3", name: "Leg Extension", sets: 2, reps: "12-15", rest: REST_TIGHT, rpe: FAILURE },
          { id: "trv-bonus-d-ga-4", name: "Standing Calf Raise", sets: 3, reps: "10-12", rest: REST_TIGHT },
        ],
      },
      {
        heading: loc("Legs B (ham/glute odaklı)", "Legs B (ham/glute-focused)"),
        exercises: [
          { id: "trv-bonus-d-gb-1", name: "Romanian Deadlift", sets: 3, reps: "6-8", rest: REST_MED, rpe: RIR_1 },
          { id: "trv-bonus-d-gb-2", name: "Hip Thrust (or Hack Squat)", sets: 3, reps: "8-10", rest: REST_MED },
          { id: "trv-bonus-d-gb-3", name: "Lying Leg Curl", sets: 3, reps: "10-12", rest: REST_TIGHT },
          { id: "trv-bonus-d-gb-4", name: "Seated Calf Raise", sets: 3, reps: "12-15", rest: REST_TIGHT, rpe: FAILURE },
        ],
      },
    ],
    volumeNote: loc(
      "Haftalık toplam (örn. göğüs): Push A'da 6 + Push B'de 5 = 11 set — Pelland 2024 MEV-MAV sweet spot",
      "Weekly total (e.g. chest): 6 in Push A + 5 in Push B = 11 sets — Pelland 2024 MEV-MAV sweet spot",
    ),
  },
];

// -------------------- Decision table (bonus day routing) --------------------

export const DECISION_TABLE = loc(
  [
    "3 gün → Ana PPL (bonus yok)",
    "4 gün → PPL + Opsiyon A",
    "5 gün → PPL + A + C",
    "6 gün → Full PPL (Opsiyon D)",
  ],
  [
    "3 days → Core PPL (no bonus)",
    "4 days → PPL + Option A",
    "5 days → PPL + A + C",
    "6 days → Full PPL (Option D)",
  ],
);

// -------------------- Schedule examples --------------------

export const SCHEDULE_EXAMPLES = [
  {
    daysPerWeek: 4,
    label: loc("4 Gün Örnek Hafta", "4-Day Example Week"),
    days: loc(
      [
        "Pzt — Push (40 dk)",
        "Çar — Pull (40 dk)",
        "Per — Arms & Delts bonus (25 dk)",
        "Cum — Legs (45 dk)",
      ],
      [
        "Mon — Push (40 min)",
        "Wed — Pull (40 min)",
        "Thu — Arms & Delts bonus (25 min)",
        "Fri — Legs (45 min)",
      ],
    ),
    highlight: "A" as const,
  },
  {
    daysPerWeek: 5,
    label: loc("5 Gün Örnek Hafta", "5-Day Example Week"),
    days: loc(
      [
        "Pzt — Push (40 dk)",
        "Sal — Light Upper bonus (30 dk)",
        "Çar — Pull (40 dk)",
        "Per — Arms & Delts bonus (25 dk)",
        "Cum — Legs (45 dk)",
      ],
      [
        "Mon — Push (40 min)",
        "Tue — Light Upper bonus (30 min)",
        "Wed — Pull (40 min)",
        "Thu — Arms & Delts bonus (25 min)",
        "Fri — Legs (45 min)",
      ],
    ),
    highlight: "C" as const,
  },
  {
    daysPerWeek: 6,
    label: loc("6 Gün Full PPL", "6-Day Full PPL"),
    days: loc(
      [
        "Pzt — Push A",
        "Sal — Pull A",
        "Çar — Legs A",
        "Per — Push B",
        "Cum — Pull B",
        "Cmt — Legs B",
      ],
      [
        "Mon — Push A",
        "Tue — Pull A",
        "Wed — Legs A",
        "Thu — Push B",
        "Fri — Pull B",
        "Sat — Legs B",
      ],
    ),
    highlight: "D" as const,
  },
];

// -------------------- Progression & Deload --------------------

export const PROGRESSION = {
  method: loc("Double Progression", "Double Progression"),
  description: loc(
    "Her seansta aynı ağırlıkla rep aralığının üstüne çıkmaya çalış. Üst sınırı yakalayınca ağırlığı artır, rep sayısı aralığın alt ucuna düşsün.",
    "On each session, push same weight toward the top of rep range. Hit upper bound → increase weight, reps drop to lower bound.",
  ),
  example: loc(
    [
      "Hafta 1: 70kg x 6, 6, 6, 5  (1-2 RIR)",
      "Hafta 2: 70kg x 7, 7, 6, 6",
      "Hafta 3: 70kg x 8, 8, 7, 7",
      "Hafta 4: 72.5kg x 6, 6, 6, 6  (ağırlık arttı)",
      "Hafta 5: 72.5kg x 7, 7, 7, 6",
      "Hafta 6: DELOAD  (%60, -1 set, 3-4 RIR)",
      "Hafta 7: 72.5kg x 8, 8, 7, 7  (deload sonrası)",
      "Hafta 8: 75kg x 6, 6, 6, 5",
    ],
    [
      "Week 1: 70kg x 6, 6, 6, 5  (1-2 RIR)",
      "Week 2: 70kg x 7, 7, 6, 6",
      "Week 3: 70kg x 8, 8, 7, 7",
      "Week 4: 72.5kg x 6, 6, 6, 6  (weight up)",
      "Week 5: 72.5kg x 7, 7, 7, 6",
      "Week 6: DELOAD  (60%, -1 set, 3-4 RIR)",
      "Week 7: 72.5kg x 8, 8, 7, 7  (after deload)",
      "Week 8: 75kg x 6, 6, 6, 5",
    ],
  ),
};

export const DELOAD = {
  week: 6,
  title: loc("Hafta 6 Deload (zorunlu)", "Week 6 Deload (mandatory)"),
  body: loc(
    "2 ay boyunca deload yapmazsan hafta 7-8'de performans düşer (Pelland 2024, fatigue accumulation).",
    "If you skip deload over 2 months, performance drops in weeks 7-8 (Pelland 2024, fatigue accumulation).",
  ),
  rules: loc(
    [
      "Ağırlık: normalin %60'ı",
      "Set sayısı: her hareket için -1 set",
      "Yoğunluk: patlamadan 3-4 rep uzak kal",
      "Compound'larda tek üst set + 2 light da olur",
    ],
    [
      "Weight: 60% of normal working load",
      "Set count: -1 set per exercise",
      "Intensity: stay 3-4 reps away from failure",
      "Alternative: 1 top set + 2 light for compounds",
    ],
  ),
};

// -------------------- Scheduling rules --------------------

export const SCHEDULE_RULES = loc(
  [
    "Aynı kası arka arkaya 2 gün çalışma (MPS 48-72 saat yükselir)",
    "Bonus günde ağır bileşik koyma — ana PPL'nin performansını bozar",
    "Bonus vazgeçilebilir olmalı — seyahatte kaçırırsan sorun yok",
    "1-2 RIR'da kal, ana seansları koru",
    "Haftada 1 tam dinlenme günü bırak",
  ],
  [
    "Don't train the same muscle 2 days in a row (MPS elevated for 48-72h)",
    "No heavy compounds on bonus days — hurts main PPL performance",
    "Bonus must be optional — missing it mid-travel is fine",
    "Stay at 1-2 RIR, protect main sessions",
    "Keep 1 full rest day per week",
  ],
);

// -------------------- Travel adaptation --------------------

export const SUBSTITUTIONS = loc(
  [
    { missing: "Barbell Bench", replace: "DB Bench · Machine Chest Press · Weighted Push-up" },
    { missing: "Barbell Row", replace: "DB Row · Seated Row · Cable Row · Chest-supported Row" },
    { missing: "Back Squat", replace: "Hack Squat · Leg Press · Goblet Squat · Bulgarian Split Squat" },
    { missing: "RDL", replace: "Single-leg RDL · Good Morning · 45° Hyperextension" },
    { missing: "Pull-up", replace: "Lat Pulldown · Assisted Pull-up · Inverted Row" },
  ],
  [
    { missing: "Barbell Bench", replace: "DB Bench · Machine Chest Press · Weighted Push-up" },
    { missing: "Barbell Row", replace: "DB Row · Seated Row · Cable Row · Chest-supported Row" },
    { missing: "Back Squat", replace: "Hack Squat · Leg Press · Goblet Squat · Bulgarian Split Squat" },
    { missing: "RDL", replace: "Single-leg RDL · Good Morning · 45° Hyperextension" },
    { missing: "Pull-up", replace: "Lat Pulldown · Assisted Pull-up · Inverted Row" },
  ],
);

// -------------------- Nutrition minimum --------------------

export const NUTRITION_MIN = loc(
  [
    { icon: "🥩", label: "Protein: 1.6-2.2 g/kg/gün (Phillips 2018)" },
    { icon: "😴", label: "Uyku: 7-9 saat (deload'u kurtaran değişken)" },
    { icon: "🔥", label: "Kalori: bulk +300 · maintain · cut -400" },
  ],
  [
    { icon: "🥩", label: "Protein: 1.6-2.2 g/kg/day (Phillips 2018)" },
    { icon: "😴", label: "Sleep: 7-9 hours (what saves the deload)" },
    { icon: "🔥", label: "Calories: bulk +300 · maintain · cut -400" },
  ],
);
