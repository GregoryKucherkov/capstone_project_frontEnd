import { useNavigate } from "react-router-dom";
import css from "./ExerciseItem.module.css";
import { Button } from "@/shared/ui/button/Button";
import type { ExercisesData } from "@/modules/exercises/components/exercises-list/ExercisesList";

export type ExercisesDataProps = {
  data: ExercisesData;
};

const ExerciseItem = ({ data }: ExercisesDataProps) => {
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
    </div>
  );
};

export { ExerciseItem };
