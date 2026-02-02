import { useId } from "react";
import type { QuickWorkoutExercise } from "@/shared/types/api";
import { Input } from "@/shared/ui/input/Input";

export interface QuickWorkoutExerciseFormProps {
  exercise: QuickWorkoutExercise;
  onChange: (updated: QuickWorkoutExercise) => void;
}

export const QuickWorkoutExerciseForm = ({
  exercise,
  onChange,
}: QuickWorkoutExerciseFormProps) => {
  const { title, sets, reps, rest } = exercise;
  const id = useId();

  return (
    <>
      <label htmlFor={`${id}-exercise`} style={{ color: "black" }}>
        Exercise
      </label>
      <Input
        id={`${id}-exercise`}
        type="text"
        placeholder="Exercise title"
        value={title}
        onChange={(e) => onChange({ ...exercise, title: e.target.value })}
      />

      <label htmlFor={`${id}-sets`} style={{ color: "black" }}>
        Sets
      </label>
      <Input
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
      <Input
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

      <label htmlFor={`${id}-weight`} style={{ color: "black" }}>Weight</label>
      <Input
        id={`${id}-weight`}
        placeholder="Weight"
        type="number"
        value={exercise.weight ?? ""}
        onChange={(e) => onChange({ ...exercise, weight: parseFloat(e.target.value) || 0 })}
        />

      <label htmlFor={`${id}-rest`} style={{ color: "black" }}>
        Rest (sec)
      </label>
      <Input
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
    </>
  );
};
