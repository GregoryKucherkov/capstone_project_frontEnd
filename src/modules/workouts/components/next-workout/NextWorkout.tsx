import { Button } from "@/shared/ui/button/Button";
import css from "./NextWorkout.module.css";
import Container from "@/shared/ui/container/Container";
import { Typography } from "@/shared/ui/typography/Typography";
import { Card } from "@/shared/ui/card/Card";
import { useNextWorkout } from "@/modules/workouts/hooks/useNextWorkout";
import Loader from "@/shared/ui/loader/Loader";

interface ExerciseItem {
  core_exercise: {
    calories_burn: number;
  };
}

interface WorkoutSession {
  completed: boolean;
  date: string;
  id: number;
  user_id: number;
}

export const NextWorkout = () => {
  const { workoutData, sessions, isLoading, hasWorkout } = useNextWorkout();

  if (isLoading) return <Loader />;


  // if (!hasWorkout) {
  //     return (
  //         <Container>
  //         <Card className={css.nextWorkout} variant="pink">
  //             <Typography className={css.titleCard} variant="h2"  >No workout planned</Typography>
  //             <Typography variant="body">Keep the momentum going! Schedule your next session in the calendar.</Typography>
  //             <Button variant="pink" size="small" className={css.workoutButton}>Go to Calendar</Button>
  //         </Card>
  //         </Container>
  //     );
  // }

  const caloriesToBurn =
    workoutData?.exercises?.reduce(
      (acc: number, ex: ExerciseItem) =>
        acc + (ex.core_exercise?.calories_burn || 0),
      0,
    ) || 0;

  const startOfWeek = new Date();

  startOfWeek.setDate(
  startOfWeek.getDate() - ((startOfWeek.getDay() + 6) % 7)
  );
  startOfWeek.setHours(0, 0, 0, 0);

  const weeklyDone =
    sessions?.filter(
      (s: WorkoutSession) => s.completed && new Date(s.date) >= startOfWeek,
    ).length || 0;

  return (
    <Container>
      <Card className={css.nextWorkout} variant="pink">
        <Typography variant="body" className={css.nxtWrktLabel}>
          Today's workout:{" "}
        </Typography>
        <Typography variant="h2" className={css.statValue}>
          {workoutData?.title || "Workout Session"}
        </Typography>

        <div className={css.workoutWraper}>
          <Card variant="small">
            <Typography variant="body" className={css.label}>
              Exercises: 
              <span>{workoutData?.exercises?.length || 0}</span>
            </Typography>
          </Card>
          <Card variant="small">
            <Typography variant="body" className={css.label}>
              Callories to burn: 
              <span>{caloriesToBurn}</span>
            </Typography>
          </Card>
          <Card variant="small">
            <Typography variant="body" className={css.label}>
              Done this week: 
              <span>{weeklyDone}</span>
            </Typography>
          </Card>
        </div>

        <Button
          className={css.workoutButton}
          type="button"
          variant="pink"
          size="small"
          fullWidth
        >
          Start Workout
        </Button>
      </Card>
    </Container>
  );
};
