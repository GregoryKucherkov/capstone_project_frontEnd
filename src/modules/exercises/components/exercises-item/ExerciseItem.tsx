import { useNavigate } from "react-router-dom";
import css from "./ExerciseItem.module.css";
import { Button } from "@/shared/ui/button/Button";
import type { CoreExercisesData } from "@/shared/types/api";


type ExercisesDataProps = {
  data: CoreExercisesData;
  onAdd: (exercise: { id: number; title: string }) => void;
};

const ExerciseItem = ({ data, onAdd }: ExercisesDataProps) => {
  const exerciseName = data.title;
  const navigate = useNavigate();

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
        <img
          src={data.media_url}
          alt={exerciseName}
          className={css.exerciseImage}
          loading="lazy"
        />
      </div>
      <h4 className={css.label}>{title}</h4>
      <hr />
      <ul>
        <li>Muscle group: {title}</li>
        <li>Calories burn: {data.calories_burn}</li>
      </ul>
      <hr />

      <Button
        variant="light"
        size="medium"
        type="button"
        bordered
        fullWidth
        // className={css.itemBtn}
        onClick={() => navigate(`/?category=${data.id}`)}
      >
        Details
      </Button>
      <Button
        style={{ border: '1px solid red' }}
        onClick={() => onAdd({ id: data.id, title: data.title })}
      >
        Add to Workout
      </Button>
    </div>
  );
};

export { ExerciseItem };
