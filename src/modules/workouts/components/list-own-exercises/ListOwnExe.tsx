import { OwnExeItem } from "@/modules/workouts/components/own-exercise-item/OwnExeItem";
import css from "./ListOwnExe.module.css";
import type { ExerciseCommon, OwnExercise } from "@/shared/types/api";
import { Pagination } from "@/shared/pagination/Pagination";

interface ListOwnExeProps {
  exercises: OwnExercise[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onAdd: (exercise: ExerciseCommon) => void;
}

export const ListOwnExe = ({
  exercises,
  totalPages,
  currentPage,
  onPageChange,
  onAdd,
}: ListOwnExeProps) => {
  return (
    <>
      <ul className={css.ulExeList}>
        {exercises.map((exercise) => (
          <li className={css.liExelist} key={exercise.id}>
            <OwnExeItem data={exercise} onAdd={onAdd} />
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          activePage={currentPage}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};
