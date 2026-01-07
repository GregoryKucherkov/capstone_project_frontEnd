import { ExerciseItem } from "@/modules/exercises/components/exercises-item/ExerciseItem"
import css from "./ExercisesList.module.css"
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
    exercises: ExercisesData[]

}


const ExercisesList = ({exercises}: ExercisesListProps) => {
    return (
        <ul className={css.ulExeList}>
            {exercises.map((exercise) => (
                <li className={css.liExelist} key={exercise.id}>
                    <ExerciseItem data={exercise}/>
                </li>
                
            ))}
        </ul>
    )
}


export {ExercisesList}