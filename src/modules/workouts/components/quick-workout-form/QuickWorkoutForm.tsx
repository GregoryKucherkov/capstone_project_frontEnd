import { useId } from "react";
import { Card } from "@/shared/ui/card/Card";
import type { QuickWorkoutExercise } from "@/shared/types/api";

export interface QuickWorkoutFormProps {
  exercise: QuickWorkoutExercise;
  onChange: (updated: QuickWorkoutExercise) => void;
  onRemove?: () => void;
}

export const QuickWorkoutForm = ({
  exercise,
  onChange,
  onRemove,
}: QuickWorkoutFormProps) => {
  const { title, sets, reps, rest } = exercise;
  const id = useId();

  return (
    <Card variant="small">
      <label htmlFor={`${id}-exercise`} style={{ color: "black" }}>
        Exercise
      </label>
      <input
        id={`${id}-exercise`}
        type="text"
        placeholder="Exercise title"
        value={title}
        onChange={(e) => onChange({ ...exercise, title: e.target.value })}
      />

      <label htmlFor={`${id}-sets`} style={{ color: "black" }}>
        Sets
      </label>
      <input
        id={`${id}-sets`}
        type="number"
        placeholder="Sets"
        value={sets}
        onChange={(e) =>
          onChange({
            ...exercise,
            sets: e.target.value === "" ? "" : Number(e.target.value),
          })
        }
      />

      <label htmlFor={`${id}-reps`} style={{ color: "black" }}>
        Reps
      </label>
      <input
        id={`${id}-reps`}
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e) =>
          onChange({
            ...exercise,
            reps: e.target.value === "" ? "" : Number(e.target.value),
          })
        }
      />

      <label htmlFor={`${id}-rest`} style={{ color: "black" }}>
        Rest (sec)
      </label>
      <input
        id={`${id}-rest`}
        type="number"
        placeholder="Rest"
        value={rest}
        onChange={(e) =>
          onChange({
            ...exercise,
            rest: e.target.value === "" ? "" : Number(e.target.value),
          })
        }
      />

      {onRemove && (
        <button type="button" onClick={onRemove}>
          Remove
        </button>
      )}
    </Card>
  );
};
