import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import css from "./ExerciseItem.module.css";
import { Button } from "@/shared/ui/button/Button";
import type { CoreExercisesData, ExerciseCommon } from "@/shared/types/api";
import {
  useAddFavorite,
  useDelExeFromFavorite,
} from "@/shared/hooks/useAddFavorite";
import toast from "react-hot-toast";

type ExercisesDataProps = {
  data: CoreExercisesData;
  onAdd?: (exercise: ExerciseCommon) => void;
  isFavorited?: boolean;
};

const ExerciseItem = ({ data, onAdd, isFavorited }: ExercisesDataProps) => {
  const { pathname } = useLocation();
  const exerciseName = data.title;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { mutate: addFavorite, isPending: isAdding } = useAddFavorite();
  const { mutate: removeFavorite, isPending: isRemoving } =
    useDelExeFromFavorite();

  const isPending = isAdding || isRemoving;
  const isPlanningMode = Boolean(onAdd);

  const [, setSearchParams] = useSearchParams();

  const capitalizeWords = (sentence: string) => {
    if (sentence.length === 0) {
      return sentence;
    }
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  };
  const title = capitalizeWords(data.title);

  const favorited = Boolean(isFavorited);

  const handleFavoriteClick = () => {
    if (!token) {
      navigate(
        `${pathname}?modal=signin&redirect=${encodeURIComponent(pathname)}`,
        { replace: true },
      );
      return;
    }

    if (favorited) {
      removeFavorite(data.id, {
        onSuccess: () => toast.success(`${data.title} removed from favorites!`),
        onError: (err) => alert(`Error: ${err.message}`),
      });
    } else {
      addFavorite(data.id, {
        onSuccess: () => toast.success(`${data.title} added to favorites!`),
        onError: (err) => alert(`Error: ${err.message}`),
      });
    }
  };

  return (
    <div className={css.itemWraper}>
      <div className={css.thumb}>
        <img
          src={data.media_url ?? undefined}
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

      {isPlanningMode && onAdd ? (
        <Button
          variant="light"
          size="small"
          bordered
          fullWidth
          onClick={() => onAdd({ ...data })}
        >
          Add to Workout
        </Button>
      ) : (
        <Button
          variant="light"
          size="small"
          bordered
          fullWidth
          disabled={isPending}
          onClick={handleFavoriteClick}
        >
          {isPending
            ? "Processing..."
            : favorited
              ? "Remove from Favorites"
              : "Add to Favorites"}
        </Button>
      )}

      <Button
        variant="light"
        size="small"
        type="button"
        bordered
        fullWidth
        onClick={() =>
          setSearchParams({
            modal: "exercise",
            id: String(data.id),
          })
        }
      >
        Details
      </Button>
    </div>
  );
};

export { ExerciseItem };
