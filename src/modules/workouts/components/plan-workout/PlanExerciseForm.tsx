import type { PlannedExerciseDraft } from "@/shared/types/api";
import { Card } from "@/shared/ui/card/Card";
import { Input } from "@/shared/ui/input/Input";
import { useId } from "react";
import css from "./PlanExercise.module.css";

export interface PlanExerciseFormProps {
  exercise: PlannedExerciseDraft;
  onChange: (updated: PlannedExerciseDraft) => void;
  onRemove?: () => void;
}

export const PlanExerciseForm = ({
  exercise,
  onChange,
  onRemove,
}: PlanExerciseFormProps) => {
  const { title, sets, reps, rest } = exercise;

  const id = useId();

  return (
    <Card variant="small" className={css.formCard}>
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
      <label htmlFor={`${id}-rest`} style={{ color: "black" }}>
        Rest
      </label>
      <Input
        id={`${id}-rest`}
        type="number"
        placeholder="Rest (sec)"
        value={rest}
        onChange={(e) =>
          onChange({
            ...exercise,
            rest: e.target.value === "" ? "" : Number(e.target.value),
          })
        }
      />
      {onRemove && <button onClick={onRemove}>Remove</button>}
    </Card>
  );
};
