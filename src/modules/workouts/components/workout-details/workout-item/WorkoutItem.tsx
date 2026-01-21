import { Card } from "@/shared/ui/card/Card";
import css from "./WorkoutItem.module.css";
import { Typography } from "@/shared/ui/typography/Typography";
import Trash from "@/assets/icons/trash.svg?react";
import type { ExerciseDataProps } from "@/modules/workouts/components/workout-details/WorkoutDetails";

interface WorkoutItemProps {
  data: ExerciseDataProps;
  onDeleteExercise: (id: number) => void;
  isDeleting: boolean;
}

export const WorkoutItem = ({
  data,
  onDeleteExercise,
  isDeleting,
}: WorkoutItemProps) => {
  const title =
    data.core_exercise?.title ||
    data.custom_exercise?.title ||
    data.exercise_name;
  const calories =
    data.core_exercise?.calories_burn ||
    data.custom_exercise?.calories_burn ||
    0;

  return (
    <Card>
      <div className={css.workoutWraper}>
        <Card variant="small" className={css.smallCardDetails}>
          <Typography variant="h4" className={css.label}>
            {title}
          </Typography>
          <Typography variant="body" className={css.label}>
            {data.sets} sets ╳ {data.reps} reps
          </Typography>
          <Typography variant="body" className={css.label}>
            🔥 {calories || 0} Cal
          </Typography>

          <button
            type="button"
            className={css.delBtn}
            onClick={() => onDeleteExercise(data.id)}
            disabled={isDeleting}
            aria-label="Delete exercise"
          >
            <Trash />
          </button>
        </Card>
      </div>
    </Card>
  );
};
