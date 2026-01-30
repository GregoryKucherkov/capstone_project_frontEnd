import type { PlannedExerciseDraft } from "@/shared/types/api";
import css from "./ReviewWorkoutItem.module.css";
import Trash from "@/assets/icons/trash.svg?react";
import { Card } from "@/shared/ui/card/Card";

interface ReviewWorkoutItemProps {
  exercise: PlannedExerciseDraft;
  onDelete: (tempId: string) => void;
}

export const ReviewWorkoutItem = ({
  exercise,
  onDelete,
}: ReviewWorkoutItemProps) => {
  const capitalizeWords = (sentence: string) => {
    if (sentence.length === 0) {
      return sentence;
    }
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  };
  const title = capitalizeWords(exercise.title);

  return (
    <Card className={css.itemWraper}>
      <div className={css.textWrapper}>
        <h4 className={css.label}>{title}</h4>
        <hr />

        <ul>
          <li>Muscle group: {exercise.muscle_group}</li>
          <li>Calories burn: {exercise.calories_burn}</li>
        </ul>
      </div>

      <button
        type="button"
        className={css.delBtn}
        onClick={() => onDelete(exercise.tempId)}
        aria-label="Delete exercise"
      >
        <Trash width="18px" height="18px" />
      </button>
    </Card>
  );
};
