import type { PlannedExerciseForm } from "@/shared/types/api";
import css from "./ReviewWorkout.module.css"
import { ReviewWorkoutItem } from "@/modules/workouts/components/review-workout/review-workout-item/ReviewWorkoutItem";


interface ReviewWorkoutProps {
    workout: PlannedExerciseForm[];
}

export const ReviewWorkout = ({workout}: ReviewWorkoutProps) => {
    return (
        <>
            <ul className={css.ulExeList}>
                {workout.map((exercise) => (
                    <li className={css.liExelist} key={exercise.id}>
                        <ReviewWorkoutItem exercise={exercise}/>

                    </li>
                ))}
            </ul>

        </>
    )
}