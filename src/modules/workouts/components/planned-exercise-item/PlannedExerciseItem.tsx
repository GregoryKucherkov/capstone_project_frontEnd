import type { ExerciseCommon } from "@/shared/types/api";
import css from "./PlannedExerciseItem.module.css";

export const PlannedExerciseItem = ({
  exercise,
}: {
  exercise: ExerciseCommon;
}) => {
  const capitalize = (str: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  return (
    <div className={css.itemWraper}>
      {exercise.media_url && (
        <div className={css.thumb}>
          <img
            src={exercise.media_url}
            alt={exercise.title}
            className={css.exerciseImage}
            loading="lazy"
          />
        </div>
      )}
      <h4 className={css.label}>{capitalize(exercise.title)}</h4>
      <hr />
      <ul>
        {exercise.muscle_group && (
          <li>Muscle group: {capitalize(exercise.muscle_group)}</li>
        )}

        {exercise.calories_burn && (
          <li>Calories burn: {exercise.calories_burn}</li>
        )}

        {exercise.description && <li>Descritpion: {exercise.description}</li>}
      </ul>
      <hr />
    </div>
  );
};
