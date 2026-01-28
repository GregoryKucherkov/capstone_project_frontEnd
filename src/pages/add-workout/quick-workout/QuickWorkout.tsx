import Container from "@/shared/ui/container/Container";
import css from "./QuickWorkout.module.css";
import { Typography } from "@/shared/ui/typography/Typography";
import { Card } from "@/shared/ui/card/Card";
import {
  useAddExercise,
  useAddSet,
  useAddSetBulk,
  useCreateSession,
  useDeleteSession,
} from "@/modules/workouts/hooks/useSession";
import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button/Button";
import { useNavigate } from "react-router-dom";
import Loader from "@/shared/ui/loader/Loader";
import { QuickWorkoutForm } from "@/modules/workouts/components/quick-workout-form/QuickWorkoutForm";
import type { QuickWorkoutExercise } from "@/shared/types/api";

export const QuickWorkout = () => {
  const { mutateAsync: startSession, isPending: starting } = useCreateSession();
  const { mutateAsync: cancelSession, isPending: cancelling } =
    useDeleteSession();
  const { mutateAsync: addExercise } = useAddExercise();
  const { mutateAsync: addSet } = useAddSet();
  const { mutateAsync: addSetBulk } = useAddSetBulk();

  const [sessionId, setSessionId] = useState<number | null>(null);
  const [exercises, setExercises] = useState<QuickWorkoutExercise[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const start = async () => {
      const session = await startSession();
      setSessionId(session.id);
    };

    start();
  }, [startSession]);

  if (!sessionId || starting) {
    return <Loader />;
  }

  const handleAddExerciseCard = () => {
    setExercises((prev) => [
      ...prev,
      { title: "", sets: "", reps: "", rest: "" },
    ]);
  };

  const handleExerciseChange = (
    index: number,
    updated: QuickWorkoutExercise,
  ) => {
    setExercises((prev) => prev.map((ex, i) => (i === index ? updated : ex)));
  };

  const handleExerciseRemove = (index: number) => {
    setExercises((prev) => prev.filter((_, i) => i !== index));
  };

  // const handleSubmitExercise = async (exercise: QuickWorkoutExercise) => {
  //   if (!sessionId) return;

  //   // 1. Create exercise
  //   const exerciseRes = await addExercise({
  //     sessionId,
  //     data: { name: exercise.title, notes: "" },
  //   });

  //   // 2. Add sets if defined
  //   if (exercise.sets && exercise.reps) {
  //     await addSet({
  //       exerciseId: exerciseRes.id,
  //       data: {
  //         reps: exercise.reps.toString(),
  //         weight: 0,
  //         rest_seconds: exercise.rest ? Number(exercise.rest) : 0,
  //         notes: "",
  //         completed: false,
  //       },
  //     });
  //   }
  // };

  const handleSubmitExercise = async (exercise: QuickWorkoutExercise) => {
    if (!sessionId) return;

    try {
      // 1. Create exercise
      const exerciseRes = await addExercise({
        sessionId,
        data: { name: exercise.title, notes: "" },
      });

      // 2. Prepare sets array (even if only 1 set)
      const setsData = [
        {
          reps: exercise.reps.toString(),
          weight: 0,
          rest_seconds: exercise.rest ? Number(exercise.rest) : 0,
          notes: "",
          completed: false,
        },
      ];

      // 3. Bulk add sets
      await addSetBulk({ exerciseId: exerciseRes.id, data: setsData });

      // 4. Reset card for next exercise
      setExercises([{ title: "", sets: "", reps: "", rest: "" }]);
    } catch (err) {
      console.error("Failed to log exercise + sets:", err);
      // Card stays visible, user can retry
    }
  };

  const handleCancel = async () => {
    if (!sessionId) return;

    await cancelSession(sessionId);
    navigate("/add-workout");
  };

  return (
    <Container className={css.container}>
      <Typography variant="h1">Start your workout</Typography>

      <Card>
        <Typography variant="h2">Add exercise</Typography>
      </Card>

      {exercises.map((exercise, index) => (
        <QuickWorkoutForm
          key={index}
          exercise={exercise}
          onChange={(updated) => handleExerciseChange(index, updated)}
          onRemove={() => handleExerciseRemove(index)}
        />
      ))}

      <Button onClick={handleAddExerciseCard}>+ Add Exercise</Button>

      {exercises.map((exercise) => (
        <Button
          key={exercise.title + exercise.sets}
          onClick={() => handleSubmitExercise(exercise)}
        >
          Submit Exercise
        </Button>
      ))}

      <Button
        onClick={handleCancel}
        disabled={cancelling}
        style={{ border: "red 1px solid" }}
      >
        Cancel session
      </Button>
    </Container>
  );
};
