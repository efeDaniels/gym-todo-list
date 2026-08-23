import { useState } from "react";
import { CheckIcon } from "./Icon";
import { getExerciseImageUrl, type Exercise } from "../data/workouts";

type Props = {
  exercise: Exercise;
  completed: boolean[]; // per-set
  onToggleSet: (setIndex: number) => void;
  index: number;
};

const TAG_STYLE: Record<
  NonNullable<Exercise["tag"]>,
  { label: string; className: string }
> = {
  "BIG 3": {
    label: "BIG 3",
    className: "bg-[var(--color-accent-glow)] text-[var(--color-accent)]",
  },
  SUPERSET: {
    label: "SUPERSET",
    className: "bg-[var(--color-rest)]/15 text-[var(--color-rest)]",
  },
  ISINMA: {
    label: "ISINMA",
    className: "bg-[var(--color-water-glow)] text-[var(--color-water)]",
  },
  FINISHER: {
    label: "FINISHER",
    className: "bg-[var(--color-success-glow)] text-[var(--color-success)]",
  },
};

export function ExerciseCard({
  exercise,
  completed,
  onToggleSet,
  index,
}: Props) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const doneCount = completed.filter(Boolean).length;
  const allDone = doneCount === exercise.sets && exercise.sets > 0;
  const tag = exercise.tag ? TAG_STYLE[exercise.tag] : null;
  const imageUrl = getExerciseImageUrl(exercise.id);

  return (
    <article
      className={`
        overflow-hidden rounded-2xl border border-[var(--color-border)]
        bg-[var(--color-surface)]
        transition-all duration-200
        ${allDone ? "opacity-70" : ""}
      `}
    >
      {imageUrl && !imgError && (
        <div
          className={`
            relative flex h-56 w-full items-center justify-center
            bg-[var(--color-surface-2)]
            ${imgLoaded ? "" : "animate-pulse"}
          `}
        >
          <img
            src={imageUrl}
            alt={exercise.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`h-full w-full object-contain transition-opacity duration-200 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          />
        </div>
      )}

      <div className="p-4">
        <header className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <span className="text-xs font-medium tabular-nums text-[var(--color-text-mute)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              {tag && (
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-wider ${tag.className}`}
                >
                  {tag.label}
                </span>
              )}
            </div>
            <h3
              className={`text-[15px] font-semibold leading-tight text-[var(--color-text)] ${allDone ? "line-through decoration-[var(--color-text-mute)]" : ""}`}
            >
              {exercise.name}
            </h3>
          </div>
          <div className="flex shrink-0 items-baseline gap-1 rounded-lg bg-[var(--color-surface-2)] px-2.5 py-1">
            <span className="text-lg font-bold tabular-nums text-[var(--color-text)]">
              {exercise.sets}
            </span>
            <span className="text-[10px] font-medium text-[var(--color-text-mute)]">
              SET
            </span>
          </div>
        </header>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="text-[var(--color-text-dim)]">
            <span className="text-[var(--color-text-mute)]">Tekrar:</span>{" "}
            <span className="font-semibold text-[var(--color-text)]">
              {exercise.reps}
            </span>
          </span>
          {exercise.rpe && (
            <span className="text-[var(--color-text-dim)]">
              <span className="text-[var(--color-text-mute)]">RPE:</span>{" "}
              <span className="font-semibold text-[var(--color-text)]">
                {exercise.rpe}
              </span>
            </span>
          )}
        </div>

        {exercise.cues && exercise.cues.length > 0 && (
          <ul className="mt-2 space-y-1">
            {exercise.cues.map((cue, i) => (
              <li
                key={i}
                className="text-xs leading-relaxed text-[var(--color-text-dim)]"
              >
                <span className="text-[var(--color-text-mute)]">·</span> {cue}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--color-text-mute)]">
              Setler
            </span>
            <span className="text-xs font-semibold tabular-nums text-[var(--color-text-dim)]">
              {doneCount} / {exercise.sets}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: exercise.sets }, (_, i) => {
              const done = completed[i] ?? false;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => onToggleSet(i)}
                  aria-pressed={done}
                  aria-label={`Set ${i + 1}`}
                  className={`
                    relative flex h-12 w-12 items-center justify-center rounded-xl
                    text-base font-bold tabular-nums transition-all duration-150
                    active:scale-95
                    ${
                      done
                        ? "bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent-glow)]"
                        : "border border-[var(--color-border-strong)] bg-[var(--color-surface-2)] text-[var(--color-text-dim)] hover:border-[var(--color-accent)] hover:text-[var(--color-text)]"
                    }
                  `}
                >
                  {done ? (
                    <CheckIcon className="anim-pop" size={20} />
                  ) : (
                    i + 1
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}
