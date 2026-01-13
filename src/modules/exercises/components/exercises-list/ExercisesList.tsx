import { ExerciseItem } from "@/modules/exercises/components/exercises-item/ExerciseItem"
import css from "./ExercisesList.module.css"
import { Pagination } from "@/shared/pagination/Pagination"
import { useSearchParams } from "react-router-dom"
// import Container from "@/shared/ui/container/Container"
// import { Typography } from "@/shared/ui/typography/Typography"

export interface ExercisesData {
    title: string,
    muscle_group: string,
    difficulty: string,
    description: string,
    media_url: string,
    calories_burn: number,
    id: number,
    created_at: string
}

export interface ExercisesListProps {
    exercises: ExercisesData[];
    totalPages: number;
    currentPage: number;

}


const ExercisesList = ({exercises, totalPages, currentPage}: ExercisesListProps) => {
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
                        <ExerciseItem data={exercise}/>
                    </li>
                    
                ))}
            </ul>
            
            {totalPages > 1 && (
                <Pagination
                    totalPages={totalPages}
                    activePage={currentPage}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    )
}


export {ExercisesList}