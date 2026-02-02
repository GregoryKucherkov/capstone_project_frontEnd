import Container from "@/shared/ui/container/Container";
import css from "./QuickWorkout.module.css";
import { Typography } from "@/shared/ui/typography/Typography";
import { Card } from "@/shared/ui/card/Card";
import {
  useAddExercise,
  useAddSet,
  useCreateSession,
  useDeleteSession,
  useFinishSession,
} from "@/modules/workouts/hooks/useSession";
import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button/Button";
import { useNavigate } from "react-router-dom";
import Loader from "@/shared/ui/loader/Loader";
import { QuickWorkoutExerciseForm } from "@/modules/workouts/components/quick-workout-form/QuickWorkoutForm";
import type { QuickWorkoutExercise } from "@/shared/types/api";
import { RestTimer } from "@/shared/ui/timer/Timer";

const workoutStartTime = Date.now();

export const QuickWorkout = () => {
  const { mutateAsync: startSession, isPending: starting } = useCreateSession();
  const { mutateAsync: closeSession, isPending: closing } = useFinishSession();
  const { mutateAsync: cancelSession, isPending: cancelling } =
    useDeleteSession();
  const { mutateAsync: addExercise } = useAddExercise();
  const { mutateAsync: addSet } = useAddSet();

  const [isResting, setIsResting] = useState(false);
  const [restDuration, setRestDuration] = useState(60);

  // to count exercises
  const [count, setCount] = useState(0);

  const [sessionId, setSessionId] = useState<number | null>(null);
  const [exercise, setExercise] = useState<QuickWorkoutExercise>({
    title: "",
    sets: "",
    reps: "",
    weight: "",
    rest: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      try {
        const session = await startSession();
        console.log("Session started:", session);
        setSessionId(session.id);
      } catch (err) {
        console.error("Failed to start session:", err);
      }
    };

    run();
  }, [startSession]);

  if (!sessionId || starting) {
    return <Loader />;
  }

  const emptyExercise: QuickWorkoutExercise = {
    title: "",
    sets: "",
    reps: "",
    weight: "",
    rest: "",
  };

  const handleClearExercise = () => {
    setExercise(emptyExercise);
  };

  const handleExerciseChange = (updated: QuickWorkoutExercise) => {
    setExercise(updated);
  };

  const handleSubmitExercise = async (exercise: QuickWorkoutExercise) => {
    if (!sessionId) return;

    try {
      // 1. Create exercise
      const exerciseRes = await addExercise({
        sessionId,
        data: { name: exercise.title, notes: "" },
      });

      // 2. add sets
      await addSet({
        exerciseId: exerciseRes.id,
        data: {
          reps: exercise.reps.toString(),
          weight: exercise.weight ? Number(exercise.rest) : 0,
          rest_seconds: exercise.rest ? Number(exercise.rest) : 0,
          notes: "",
          completed: false,
        },
      });

      if (exercise.rest) {
        setRestDuration(Number(exercise.rest));
        setIsResting(true);
      }

      setCount((prev) => prev + 1);

      // 3. Reset card for next exercise
      setExercise({
        title: "",
        sets: "",
        reps: "",
        weight: "",
        rest: exercise.rest,
      });
    } catch (err) {
      console.error("Failed to log exercise + sets:", err);
    }
  };

  const handleCloseSession = async () => {
    if (!sessionId) return;

    const durationMs = Date.now() - workoutStartTime;
    const durationMinutes = Math.floor(durationMs / 60000);

    try {
      await closeSession({
        sessionId,
        data: {
          duration: durationMinutes,
          notes: `Completed ${count} exercises`,
        },
      });
      navigate("/add-workout");
    } catch (err) {
      console.error("Failed to close session:", err);
    }
  };

  const handleCancel = async () => {
    if (!sessionId) return;

    await cancelSession(sessionId);
    navigate("/add-workout");
  };

  const handleRestToggle = () => {
    setIsResting((prev) => !prev);
  };

  return (
    <Container className={css.container}>
      <Typography variant="h1" className={css.title}>
        Start your workout
      </Typography>

      <Card variant="thick" className={css.subTitleCard}>
        <Typography variant="h2" className={css.subTitle}>
          Add exercise
        </Typography>
        <Card variant="small" className={css.smallCard}>
          <Typography variant="body" className={css.details}>
            Exercise added:
            <span>{count}</span>
          </Typography>
        </Card>
      </Card>

      <div className={css.timerWraper}>
        <RestTimer
          duration={restDuration}
          isPlaying={isResting}
          onComplete={() => {
            // 1. Stop timer
            setIsResting(false);

            // 2. Update the rest input in the form
            handleExerciseChange({
              ...exercise,
              rest: restDuration, // final rest duration from timer
            });
          }}
        />
        <Button
          type="button"
          onClick={handleRestToggle}
          bordered
          className={css.timerBtn}
        >
          {isResting ? "Stop rest" : "Start rest"}
        </Button>
      </div>

      <Card variant="green" className={css.formCard}>
        <QuickWorkoutExerciseForm
          exercise={exercise}
          onChange={(updated) => handleExerciseChange(updated)}
        />
        <Button
          type="button"
          onClick={handleClearExercise}
          bordered
          className={css.formBtn}
        >
          Clear form
        </Button>
      </Card>

      <Button
        disabled={!exercise.title || !exercise.reps}
        onClick={() => handleSubmitExercise(exercise)}
        bordered
        size="medium"
        className={css.submitBtn}
      >
        Submit Exercise
      </Button>

      <Button
        onClick={handleCloseSession}
        disabled={closing || !sessionId}
        bordered
        size="medium"
        className={css.closeSessionBtn}
      >
        {closing ? "Closing..." : "Close session"}
      </Button>

      <Button
        onClick={handleCancel}
        disabled={cancelling}
        bordered
        size="medium"
        className={css.cancelBtn}
      >
        Cancel session
      </Button>
    </Container>
  );
};
