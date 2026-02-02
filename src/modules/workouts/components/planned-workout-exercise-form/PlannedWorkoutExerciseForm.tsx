import type { ProgramExerciseOut } from "@/shared/types/api";
import Container from "@/shared/ui/container/Container";
import css from "./PlannedWorkoutExerciseForm.module.css";
import { useId } from "react";
import { Input } from "@/shared/ui/input/Input";
import { Card } from "@/shared/ui/card/Card";

interface PlannedWorkoutExerciseFormProps {
  exercise: ProgramExerciseOut;
  onChange: (updated: ProgramExerciseOut) => void;
}

export const PlannedWorkoutExerciseForm = ({
  exercise,
  onChange,
}: PlannedWorkoutExerciseFormProps) => {
  const id = useId();

  return (
    <Container className={css.container}>
      <label htmlFor={`${id}-exercise`}>Exercise</label>
      <Input
        id={`${id}-exercise`}
        type="text"
        placeholder="Exercise title"
        value={exercise.exercise_name || ""}
        onChange={(e) =>
          onChange({ ...exercise, exercise_name: e.target.value })
        }
      />

      <label htmlFor={`${id}-sets`}>Sets</label>
      <Input
        id={`${id}-sets`}
        type="number"
        placeholder="Sets"
        value={exercise.sets || ""}
        onChange={(e) =>
          onChange({
            ...exercise,
            sets: e.target.value === "" ? 0 : Number(e.target.value),
          })
        }
      />

      <label htmlFor={`${id}-reps`}>Reps</label>
      <Input
        id={`${id}-reps`}
        type="text"
        placeholder="Reps"
        value={exercise.reps || ""}
        onChange={(e) => onChange({ ...exercise, reps: e.target.value })}
      />

      <label htmlFor={`${id}-weight`}>Weight</label>
      <Input
        id={`${id}-weight`}
        placeholder="Weight"
        type="number"
        value={exercise.weight ?? ""}
        onChange={(e) => onChange({ ...exercise, weight: parseFloat(e.target.value) || 0 })}
        />

      <label htmlFor={`${id}-rest`}>Rest (sec)</label>
      <Input
        id={`${id}-rest`}
        type="number"
        placeholder="Rest"
        value={exercise.rest_seconds || ""}
        onChange={(e) =>
          onChange({
            ...exercise,
            rest_seconds: e.target.value === "" ? 0 : Number(e.target.value),
          })
        }
      />

      {exercise.core_exercise && (
        <Card variant="pink">Core: {exercise.core_exercise.title}</Card>
      )}

      {exercise.custom_exercise && (
        <Card variant="pink">Custom: {exercise.custom_exercise.title}</Card>
      )}
    </Container>
  );
};
