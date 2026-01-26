import type { PlannedExerciseForm } from "@/shared/types/api";
import css from "./ReviewWorkoutItem.module.css"


interface ReviewWorkoutItemProps {
    exercise: PlannedExerciseForm;
}

export const ReviewWorkoutItem = ({exercise}: ReviewWorkoutItemProps) => {

    const exerciseName = exercise.title;

    const capitalizeWords = (sentence: string) => {
        if (sentence.length === 0) {
        return sentence;
        }
        return sentence.charAt(0).toUpperCase() + sentence.slice(1);
    };
    const title = capitalizeWords(exercise.title);

    return (
        <div className={css.itemWraper}>
            <div className={css.thumb}>
                {exercise && exercise.media_url ? (
                    <img
                        src={exercise.media_url}
                        alt={exerciseName}
                        className={css.exerciseImage}
                        loading="lazy"
                    />
                    ) : null}
                
            </div>
            <h4 className={css.label}>{title}</h4>
            <hr />
            <ul>
                <li>Muscle group: {title}</li>
                <li>Calories burn: {exercise.calories_burn}</li>
            </ul>
            <hr />
        </div>
    )
}