// import { RestTimer } from "@/shared/ui/timer/Timer";
import Container from "@/shared/ui/container/Container";
import css from "./PlannedWorkout.module.css";
import { Card } from "@/shared/ui/card/Card";
import { Typography } from "@/shared/ui/typography/Typography";
import { Button } from "@/shared/ui/button/Button";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "@/shared/ui/loader/Loader";
import type {
  PlannedWorkoutProps,
  ProgramExerciseOut,
} from "@/shared/types/api";
import { useProgramSchedule } from "@/modules/workouts/hooks/usePlannedWorkouts";
import {
  useAddExercise,
  useAddSet,
  useCreateSession,
  useFinishSession,
} from "@/modules/workouts/hooks/useSession";
import { useProgramDayExercises } from "@/modules/workouts/hooks/useProgramDay";
import { useNextWorkout } from "@/modules/workouts/hooks/useNextWorkout";
import { PlannedWorkoutExerciseForm } from "@/modules/workouts/components/planned-workout-exercise-form/PlannedWorkoutExerciseForm";

const now = new Date();
const START_ISO = now.toISOString();
const end = new Date(now);
end.setUTCDate(end.getUTCDate() + 30);
const END_ISO = end.toISOString();

export const PlannedWorkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromDashboard = location.state?.fromDashboard || false;
  const { mutateAsync: startSession } = useCreateSession();
  const { mutateAsync: closeSession, isPending: closing } = useFinishSession();
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(() => {
    const saved = localStorage.getItem("workout_start_time");
    return saved ? Number(saved) : null;
  });

  const { workoutData: nextWorkout, isLoading: nextLoading } = useNextWorkout();

  const { mutateAsync: addExercise } = useAddExercise();
  const { mutateAsync: addSet } = useAddSet();

  const [selectedWorkout, setSelectedWorkout] =
    useState<PlannedWorkoutProps | null>(null);

  const [exercise, setExercise] = useState<ProgramExerciseOut | null>(null);

  const { data: schedule, isLoading: scheduleLoading } = useProgramSchedule({
    startDate: START_ISO,
    endDate: END_ISO,
  });

  const activeWorkout = selectedWorkout || (fromDashboard ? nextWorkout : null);

  // const activeDayId =
  //   activeWorkout?.program_day_id || (activeWorkout as any)?.id;
  const activeDayId = activeWorkout
    ? "program_day_id" in activeWorkout
      ? activeWorkout.program_day_id
      : activeWorkout.id
    : null;

  const { data: exercises, isLoading: exercisesLoading } =
    useProgramDayExercises({
      dayId: activeDayId ?? null,
      enabled: !!activeDayId,
    });

  const [currentIndex, setCurrentIndex] = useState(0);
  const activeExercise = exercises?.[currentIndex] ?? null;

  // Timer logic
  // const currentRest = activeExercise?.rest_seconds && activeExercise.rest_seconds > 0
  // ? activeExercise.rest_seconds
  // : 60;
  // const [isResting, setIsResting] = useState(false);
  // const [restDuration, setRestDuration] = useState(currentRest);

  const handleStartSession = async () => {
    if (sessionId) return; // Don't start twice
    try {
      const session = await startSession();
      setSessionId(session.id);
    } catch (err) {
      console.error("Failed to start session:", err);
    }
  };

  if (nextLoading || scheduleLoading) return <Loader />;

  // Move to the next exercise
  const handleNextExercise = () => {
    if (!exercises) return;
    // setCurrentIndex((prev) => Math.min(prev + 1, exercises.length - 1));
    setCurrentIndex((prev) => prev + 1);
  };

  const handleExerciseChange = (updated: ProgramExerciseOut) => {
    setExercise(updated);
  };

  // to submit executed exercise
  const handleSubmitExercise = async (current: ProgramExerciseOut) => {
    try {
      let activeId = sessionId;

      if (!activeId) {
        const session = await startSession();
        activeId = session.id;
        setSessionId(session.id);

        const now = Date.now();
        setStartTime(now);

        localStorage.setItem("workout_start_time", now.toString());
      }

      if (!activeId) return;

      const exerciseRes = await addExercise({
        sessionId: activeId,
        data: {
          name: current.exercise_name!,
          notes: "",
          planned_exercise_id: current.id,
        },
      });

      await addSet({
        exerciseId: exerciseRes.id,
        data: {
          reps: current.reps,
          weight: current.weight ?? 0,
          rest_seconds: current.rest_seconds ?? 0,
          notes: "",
          completed: true,
        },
      });

      // timer logic
      // if (current.rest_seconds) {
      //   setRestDuration(current.rest_seconds);
      // } else {
      //   setRestDuration(60)
      // }

      handleNextExercise();
      setExercise(null); // reset for next
    } catch (err) {
      console.error("Failed to log exercise + sets:", err);
    }
  };

  const handleFinishSession = async () => {
    if (!sessionId || !startTime) return;

    const durationInMinutes = Math.floor((Date.now() - startTime) / 60000);

    try {
      await closeSession({
        sessionId: sessionId,
        data: {
          duration: durationInMinutes,
          notes: "Great workout!",
        },
      });

      // 1. Clear the local state
      setSessionId(null);
      setStartTime(null);
      localStorage.removeItem("workout_start_time");

      // 2. Redirect the user back to the dashboard or a summary page
      navigate("/", { state: { message: "Workout completed!" } });
    } catch (err) {
      console.error("Failed to close session:", err);
    }
  };

  return (
    <Container className={css.container}>
      <Typography variant="h1">Your Planned Workout</Typography>

      {activeWorkout ? (
        <>
          <Typography variant="h2">
            Planned workout:{" "}
            {activeWorkout.scheduled_for
              ? new Date(activeWorkout.scheduled_for).toLocaleDateString()
              : "Active Session"}
          </Typography>

          {/* Timer  */}
          {/* <RestTimer
            duration={restDuration}
            isPlaying={isResting}
            onComplete={() => setIsResting(false)}
          />
          <Button 
            variant="pink" 
            size="small"
            onClick={() => setIsResting(true)}
          >
            Start Rest ({restDuration}s)
          </Button> */}

          {/* GUARD: Only render the form if we have an exercise. Fixes TS error and Runtime crash */}
          {exercisesLoading ? (
            <Loader />
          ) : activeExercise ? (
            <PlannedWorkoutExerciseForm
              exercise={exercise ?? activeExercise}
              onChange={(updated) => handleExerciseChange(updated)}
            />
          ) : (
            <Typography variant="body">Workout Complete!</Typography>
          )}

          <Button
            size="small"
            bordered
            onClick={() => handleSubmitExercise(exercise ?? activeExercise!)}
          >
            Log
          </Button>

          <Button
            size="small"
            bordered
            disabled={closing}
            variant="green"
            onClick={handleFinishSession}
          >
            {closing ? "Saving..." : "Finish & Save"}
          </Button>
        </>
      ) : (
        <Card>
          <Typography variant="body">All scheduled workouts:</Typography>
          {schedule?.map((w) => (
            <Card key={w.id}>
              <Typography>
                {new Date(w.scheduled_for).toLocaleDateString()}
              </Typography>
              <Button
                onClick={() => {
                  setSelectedWorkout(w);
                  handleStartSession();
                  // Setting fromDashboard to true ensures the logic stays in the "Workout View"
                  navigate("/add-workout/planned", {
                    state: { fromDashboard: true },
                  });
                }}
              >
                Start
              </Button>
            </Card>
          ))}
        </Card>
      )}
    </Container>
  );
};
