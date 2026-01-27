import { Typography } from "@/shared/ui/typography/Typography";
import css from "./Features.module.css";
import Container from "@/shared/ui/container/Container";
import ArrFwd from "@/assets/icons/arrow-frwd.svg?react";
import Run from "@/assets/icons/running.svg?react";
import { Button } from "@/shared/ui/button/Button";
import { FcCalendar } from "react-icons/fc";
import clsx from "clsx";

// Social: "The motivation of a crew." (Small avatars/bubbles showing "John just finished Leg Day!").

export const Features = () => {
  return (
    <section>
      <Container className={css.container}>
        {/* --- Planning Section --- */}
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

        {/* --- Tracking Section --- */}
        <div className={css.textWrapper}>
          <Typography variant="h2">Tracking</Typography>
          <Typography variant="body" className={css.description}>
            Watch the numbers go up.
          </Typography>
        </div>

        <div className={clsx(css.cardsWrapper, css.tracking)}>
          <Typography variant="h3" className={css.cardTitle}>
            When: This week
          </Typography>

          <ul className={css.ulTracking}>
            <li className={css.liTracking}>
              <div className={css.trackingDetails}>
                <Typography variant="h4">Chest Day</Typography>
              </div>
              {/* Stats row */}
              <div className={css.cardStats}>
                <div className={css.statBox}>
                  <span className={css.statLabel}>Date: </span>
                  <span className={css.statValue}>Monday, Jan 11 </span>
                </div>

                <div className={css.statBox}>
                  <span className={css.statLabel}>Duration: </span>
                  <span className={css.statValue}>55 min </span>
                </div>

                <div className={css.statBox}>
                  <span className={css.statLabel}>Status: </span>
                  <span className={css.statValue}>✔ Done </span>
                </div>
              </div>
              {/* Action */}

              <Button
                className={css.trackinButton}
                type="button"
                variant="pink"
                size="small"
              >
                View details
              </Button>
            </li>

            <li className={css.liTracking}>
              <div className={css.trackingDetails}>
                <h3>Arms</h3>
              </div>
              {/* Stats row */}
              <div className={css.cardStats}>
                <div className={css.statBox}>
                  <span className={css.statLabel}>Date:</span>
                  <span className={css.statValue}>Wednesday, Jan 13</span>
                </div>

                <div className={css.statBox}>
                  <span className={css.statLabel}>Duration: </span>
                  <span className={css.statValue}>60 min</span>
                </div>

                <div className={css.statBox}>
                  <span className={css.statLabel}>Status:</span>
                  <span className={css.statValue}>✔ Done</span>
                </div>
              </div>
              {/* Action */}

              <Button
                className={css.trackinButton}
                type="button"
                variant="pink"
                size="small"
              >
                View details
              </Button>
            </li>

            <li className={css.liTracking}>
              <div className={css.trackingDetails}>
                <h3>Arms</h3>
              </div>
              {/* Stats row */}
              <div className={css.cardStats}>
                <div className={css.statBox}>
                  <span className={css.statLabel}>Date:</span>
                  <span className={css.statValue}>Friday, Jan 15</span>
                </div>

                <div className={css.statBox}>
                  <span className={css.statLabel}>Duration: </span>
                  <span className={css.statValue}>60 min</span>
                </div>

                <div className={css.statBox}>
                  <span className={css.statLabel}>Status:</span>
                  <span className={css.statValue}>✔ Planned</span>
                </div>
              </div>
              {/* Action */}

              <Button
                className={css.trackinButton}
                type="button"
                variant="pink"
                size="small"
              >
                View details
              </Button>
            </li>
          </ul>
        </div>

        {/* --- SOCIAL --- */}

        <div className={css.textWrapper}>
          <Typography variant="h2">Social</Typography>
          <Typography variant="body" className={css.description}>
            The motivation of a crew.
          </Typography>
        </div>

        <div className={css.cardsWrapper}>
          <Typography variant="h3" className={css.cardTitle}>
            Feed
          </Typography>
          <ul className={css.socialFeed}>
            <li className={css.feedItem}>
              <div className={css.feedHeader}>
                <span className={css.userName}>
                  <span role="img" aria-label="person">
                    🧑{" "}
                  </span>
                  Alex
                </span>
              </div>

              <div className={css.feedAction}>
                <span>Completed Chest Day</span>
              </div>

              <div className={css.feedMeta}>
                <span>55 min </span>
                <span> • </span>
                <span>3 exercises</span>
              </div>

              <div className={css.feedStats}>
                <span>❤️ 12 </span>
                <span> 💬 3 </span>
              </div>
            </li>

            <li className={css.feedItem}>
              <div className={css.feedHeader}>
                <span className={css.userName}>
                  <span role="img" aria-label="person">
                    🧑{" "}
                  </span>
                  Maria
                </span>
              </div>

              <div className={css.feedAction}>
                <span>Finished Leg Day</span>
              </div>

              <div className={css.feedMeta}>
                <span>62 min</span>
                <span> • </span>
                <span>4 exercises</span>
              </div>

              <div className={css.feedStats}>
                <span>❤️ 20</span>
                <span> 💬 5</span>
              </div>
            </li>

            <li className={css.feedItem}>
              <div className={css.feedHeader}>
                <span className={css.userName}>
                  <span role="img" aria-label="person">
                    🧑{" "}
                  </span>
                  John
                </span>
              </div>

              <div className={css.feedAction}>
                <span>Started Push Day</span>
              </div>

              <div className={css.feedMeta}>
                <span>just now</span>
              </div>

              <div className={css.feedStats}>
                <span>❤️ 4</span>
              </div>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
};
