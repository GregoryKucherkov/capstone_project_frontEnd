import Container from "@/shared/ui/container/Container";
import css from "./WorkoutDetails.module.css";
import { Typography } from "@/shared/ui/typography/Typography";
import { useNextWorkout } from "@/modules/workouts/hooks/useNextWorkout";
import { useDeleteExercise } from "@/modules/workouts/hooks/useDeleteExercise";
import { WorkoutItem } from "@/modules/workouts/components/workout-details/workout-item/WorkoutItem";
import { Card } from "@/shared/ui/card/Card";
import Loader from "@/shared/ui/loader/Loader";
import { Button } from "@/shared/ui/button/Button";

export interface ExerciseDataProps {
  id: number;
  exercise_name: string;
  sets: number;
  reps: string;
  core_exercise?: {
    title: string;
    calories_burn: number;
  };
  custom_exercise?: {
    title: string;
    calories_burn: number;
  };
}

export const WorkoutDetails = () => {
  const { workoutData, isLoading } = useNextWorkout();

  const dayId = workoutData?.id || 0;

  const { mutate: deleteExercise, isPending } = useDeleteExercise(dayId);

  if (isLoading) return <Loader />;

  const mockExercises: ExerciseDataProps[] = [
    {
      id: 999,
      exercise_name: "Bench Press",
      sets: 5,
      reps: "10",
      core_exercise: { title: "Bench Press", calories_burn: 45 },
    },
    {
      id: 998,
      exercise_name: "Incline Bench Press",
      sets: 4,
      reps: "10",
      core_exercise: { title: "Incline Bench Press", calories_burn: 55 },
    },
    {
      id: 997,
      exercise_name: "Cross-over",
      sets: 4,
      reps: "10",
      core_exercise: { title: "Cross-over", calories_burn: 50 },
    },
  ];

  const displayData = workoutData?.exercises?.length
    ? workoutData.exercises
    : mockExercises;

  if (!isLoading && (!displayData || displayData.length === 0)) {
    return (
      <Container>
        <Card variant="pink">
          <Typography variant="body">
            No exercises yet. Add some to start!
          </Typography>
        </Card>
      </Container>
    );
  }

  // Guard clause
  if (!displayData || displayData.length === 0) {
    return null;
  }

  return (
    <Container>
      <Card variant="thick" className={css.detailsCard}>
      <Typography variant="h2" className={css.detailsTitle}>
        Exercises Today{" "}
      </Typography>

      <ul className={css.ulContainer}>
        {displayData.map((exercise: ExerciseDataProps) => (
          <li key={exercise.id} className={css.liExerciseItem}>
            <WorkoutItem
              data={exercise}
              onDeleteExercise={deleteExercise}
              isDeleting={isPending}
            ></WorkoutItem>
          </li>
        ))}
      </ul>
      <Button className={css.wrkDetBtn} size = "small">Add exercises</Button>
      </Card>
    </Container>
  );
};
