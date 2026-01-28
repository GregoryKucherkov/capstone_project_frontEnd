import { Modal } from "@/shared/ui/modal/Modal";
import css from "./ExerciseDetails.module.css";
import { Typography } from "@/shared/ui/typography/Typography";
import { useSearchParams } from "react-router-dom";
import { useExerciseId } from "@/modules/exercises/hooks/useExercises";
import Loader from "@/shared/ui/loader/Loader";

export const ExerciseDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const exerciseIdParam = searchParams.get("id");
  const activeModal = searchParams.get("modal");

  const closeModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("modal");
    params.delete("id");
    setSearchParams(params.toString());
  };

  const exerciseId = exerciseIdParam ? Number(exerciseIdParam) : undefined;

  const {
    data: exerciseDetails,
    isPending,
    isLoading,
  } = useExerciseId(exerciseId ?? 0);

  const isOpen = activeModal === "exercise" && !!exerciseId;

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      {isLoading || isPending ? (
        <Loader />
      ) : exerciseDetails ? (
        <div className={css.itemWraper}>
          <div className={css.thumb}>
            <img
              src={exerciseDetails.media_url ?? undefined}
              alt={exerciseDetails.title}
              className={css.exerciseImage}
              loading="lazy"
            />
          </div>
          <h4 className={css.label}>{exerciseDetails.title}</h4>
          <hr />
          <ul>
            <li>Muscle group: {exerciseDetails.muscle_group}</li>
            <li>Calories burn: {exerciseDetails.calories_burn}</li>
          </ul>
          <Typography variant="body">{exerciseDetails.description}</Typography>
        </div>
      ) : (
        <div>Exercise not found</div>
      )}
    </Modal>
  );
};
