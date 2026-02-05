import { Typography } from "@/shared/ui/typography/Typography";
import css from "./Planning.module.css";
import Container from "@/shared/ui/container/Container";
import { FcCalendar } from "react-icons/fc";
import ArrFwd from "@/assets/icons/arrow-frwd.svg?react";
import Run from "@/assets/icons/running.svg?react";

export const Planning = () => {
  return (
    <section>
      <Container>
        <div className={css.textWrapper}>
          <Typography variant="h2">Planning</Typography>
          <Typography className={css.description} variant="body">
            "Build your perfect workout week."
          </Typography>
        </div>

        <div className={css.cardsWrapper}>
          <Typography variant="h3" className={css.cardTitle}>
            <FcCalendar
              style={{ marginRight: "10px", verticalAlign: "middle" }}
            />
            Chest day
          </Typography>

          <ul className={css.ulWorkout}>
            <li className={css.liExerciseCard}>
              <div className={css.cardHeader}>
                <span className={css.exercisesNameTag}>Workout</span>
                <button type="button" className={css.exercisesNameBtn}>
                  Start
                </button>
                <ArrFwd width={18} height={18} />
              </div>
              <div className={css.exerciseInfo}>
                <div className={css.exersizeIcon}>
                  <Run width={24} height={24} />
                </div>
                <h3 className={css.exerciseName}>Bench Press</h3>
              </div>
              <div className={css.workoutDetails}>
                <span>Weight: 70 kg</span>
                <span>Sets: 4</span>
                <span>Reps: 10</span>
              </div>
            </li>

            <li className={css.liExerciseCard}>
              <div className={css.cardHeader}>
                <span className={css.exercisesNameTag}>Workout</span>
                <button type="button" className={css.exercisesNameBtn}>
                  Start
                </button>
                <ArrFwd width={18} height={18} />
              </div>
              <div className={css.exerciseInfo}>
                <div className={css.exersizeIcon}>
                  <Run width={24} height={24} />
                </div>
                <h3 className={css.exerciseName}>Incline Bench Press</h3>
              </div>
              <div className={css.workoutDetails}>
                <span>Weight: 50 kg</span>
                <span>Sets: 4</span>
                <span>Reps: 10</span>
              </div>
            </li>

            <li className={css.liExerciseCard}>
              <div className={css.cardHeader}>
                <span className={css.exercisesNameTag}>Workout</span>
                <button type="button" className={css.exercisesNameBtn}>
                  Start
                </button>
                <ArrFwd width={18} height={18} />
              </div>
              <div className={css.exerciseInfo}>
                <div className={css.exersizeIcon}>
                  <Run width={24} height={24} />
                </div>
                <h3 className={css.exerciseName}>Crossover</h3>
              </div>
              <div className={css.workoutDetails}>
                <span>Weight: 50 kg</span>
                <span>Sets: 4</span>
                <span>Reps: 15</span>
              </div>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
};
