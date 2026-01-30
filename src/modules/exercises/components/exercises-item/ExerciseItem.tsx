import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import css from "./ExerciseItem.module.css";
import { Button } from "@/shared/ui/button/Button";
import type { CoreExercisesData, ExerciseCommon } from "@/shared/types/api";
import { useAddFavorite } from "@/shared/hooks/useAddFavorite";
import toast from "react-hot-toast";

type ExercisesDataProps = {
  data: CoreExercisesData;
  onAdd?: (exercise: ExerciseCommon) => void;
};

const ExerciseItem = ({ data, onAdd }: ExercisesDataProps) => {
  const { pathname } = useLocation();
  const exerciseName = data.title;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { mutate: addFavorite, isPending } = useAddFavorite();

  const isPlanningMode =
    pathname.includes("/add-workout") || pathname.includes("/manage");
  const isLibraryMode = pathname.includes("/exercises");

  const [, setSearchParams] = useSearchParams();

  const capitalizeWords = (sentence: string) => {
    if (sentence.length === 0) {
      return sentence;
    }
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  };
  const title = capitalizeWords(data.title);

  const handleFavoriteClick = () => {
    if (!token) {
      navigate(
        `${pathname}?modal=signin&redirect=${encodeURIComponent(pathname)}`,
        { replace: true },
      );
      return;
    }
    addFavorite(data.id, {
      onSuccess: () => {
        toast.success(`${data.title} added to favorites!`);
      },
      onError: (error) => {
        alert(`Error: ${error.message}`);
      },
    });
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

      {isPlanningMode && onAdd && (
        <Button
          variant="light"
          size="small"
          type="button"
          bordered
          fullWidth
          onClick={() =>
            onAdd({
              id: data.id,
              title: data.title,
              description: data.description,
            })
          }
        >
          Add to Workout
        </Button>
      )}

      {isLibraryMode && (
        <Button
          variant="light"
          size="small"
          type="button"
          bordered
          fullWidth
          disabled={isPending}
          onClick={handleFavoriteClick}
        >
          {isPending ? "Adding..." : "Add to Favorites"}
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
