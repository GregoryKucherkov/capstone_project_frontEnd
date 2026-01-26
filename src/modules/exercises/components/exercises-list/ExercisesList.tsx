import { ExerciseItem } from "@/modules/exercises/components/exercises-item/ExerciseItem";
import css from "./ExercisesList.module.css";
import { Pagination } from "@/shared/pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import type { CoreExercisesData } from "@/shared/types/api";



export interface ExercisesListProps {
  exercises: CoreExercisesData[];
  totalPages: number;
  currentPage: number;
  onAdd: (exercise: { id: number; title: string }) => void;
}

const ExercisesList = ({
  exercises,
  totalPages,
  currentPage,
  onAdd,
}: ExercisesListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (page: number) => {
    const currentSearch = searchParams.get("search") || "";
    setSearchParams({ search: currentSearch, page: page.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <ul className={css.ulExeList}>
        {exercises.map((exercise) => (
          <li className={css.liExelist} key={exercise.id}>
            <ExerciseItem data={exercise} onAdd={onAdd}/>

          </li>
        ))}
      </ul>

      {totalPages > 0 && (
        <Pagination
          totalPages={totalPages}
          activePage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export { ExercisesList };
