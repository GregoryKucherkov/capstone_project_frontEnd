import type { ExerciseCommon, OwnExercise } from "@/shared/types/api";
import css from "./OwnExeItem.module.css";
import { Button } from "@/shared/ui/button/Button";

export type ExercisesDataProps = {
  data: OwnExercise;
  onAdd: (exercise: ExerciseCommon) => void;
};

export const OwnExeItem = ({ data, onAdd }: ExercisesDataProps) => {
  const exerciseName = data.title;

  const capitalizeWords = (sentence: string) => {
    if (sentence.length === 0) {
      return sentence;
    }
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  };
  const title = capitalizeWords(data.title);

  return (
    <div className={css.itemWraper}>
      <div className={css.thumb}>
        {data && data.media_url ? (
          <img
            src={data.media_url}
            alt={exerciseName}
            className={css.exerciseImage}
            loading="lazy"
          />
        ) : null}
      </div>
      <h4 className={css.label}>{title}</h4>
      <hr />
      <ul>
        <li>Muscle group: {title}</li>
        <li>Calories burn: {data.calories_burn}</li>
      </ul>
      <hr />

      {/* <Button
                variant="light"
                size="medium"
                type="button"
                bordered
                fullWidth
                // className={css.itemBtn}
                onClick={() => navigate(`/?category=${data.id}`)}
            >
                Details
            </Button> */}
      <Button
        style={{ border: "1px solid red" }}
        onClick={() => onAdd({ id: data.id, title: data.title })}
      >
        Add to Workout
      </Button>
    </div>
  );
};
