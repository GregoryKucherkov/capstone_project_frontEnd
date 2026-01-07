import { useNavigate } from "react-router-dom";
import css from "./ExerciseItem.module.css"
import { Button } from "@/shared/ui/button/Button";
import type { ExercisesData } from "@/modules/exercises/components/exercises-list/ExercisesList";


export type ExercisesDataProps = {
    data: ExercisesData;
}


const ExerciseItem = ({data}:ExercisesDataProps ) => {
    const exerciseName = data.title;
    const navigate = useNavigate();


    return (
        <div className={css.thumb}>
            <div className={css.wrapper}>
                {/* <p className={css.label}>{data.title}</p> */}
                <img 
                    src={data.media_url} 
                    alt={exerciseName} 
                    className={css.exerciseImage} 
                    loading="lazy" 
                />
                <Button
                variant="transparent"
                size="medium"
                type="button"
                onClick={() => navigate(`/?category=${data.id}`)}
                >
                    {exerciseName}
                </Button>
            </div>
    </div>
    )
}

export {ExerciseItem}