import { Link } from "react-router-dom";
import { Typography } from "@/shared/ui/typography/Typography";
import css from "./Exercises.module.css";
import Container from "@/shared/ui/container/Container";


const Exercises = () => {
    return(
        <section className={css.container}>
            <Container>
                <div className={css.headWrapper}>
                    <Typography variant="h2">Exercises</Typography>
                    <Typography className={css.description} variant="body" >
                        Discover a library of exercises for any purpose
                    </Typography>
                </div>
                <Link to={"/exercises"} className={css.exercises}>
                    <Typography
                        variant="h4"
                        textColor="white"
                        className={css.allExercises}
                    >
                        All Exercises
                    </Typography>
                </Link>
            </Container>
        </section>
    )
}

export {Exercises}