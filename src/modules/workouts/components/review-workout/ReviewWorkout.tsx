import type { PlannedExerciseDraft } from "@/shared/types/api";
import css from "./ReviewWorkout.module.css";
import { ReviewWorkoutItem } from "@/modules/workouts/components/review-workout/review-workout-item/ReviewWorkoutItem";

interface ReviewWorkoutProps {
  workout: PlannedExerciseDraft[];
  onDelete: (tempId: string) => void;
}

export const ReviewWorkout = ({ workout, onDelete }: ReviewWorkoutProps) => {
  return (
    <>
      <ul className={css.ulExeList}>
        {workout.map((exercise) => (
          <li className={css.liExelist} key={exercise.tempId}>
            <ReviewWorkoutItem exercise={exercise} onDelete={onDelete} />
          </li>
        ))}
      </ul>
    </>
  );
};
