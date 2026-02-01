import Container from "@/shared/ui/container/Container";
import css from "./PlannedWorkout.module.css";
import { Card } from "@/shared/ui/card/Card";
import { Typography } from "@/shared/ui/typography/Typography";
import { Button } from "@/shared/ui/button/Button";
import { RestTimer } from "@/shared/ui/timer/Timer";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "@/shared/ui/loader/Loader";
import type {
  ActiveExerciseUI,
  ActiveSetUI,
  PlannedWorkoutProps,
  ProgramDayExercise,
  ProgramExerciseOut,
} from "@/shared/types/api";
import { useProgramSchedule } from "@/modules/workouts/hooks/usePlannedWorkouts";
import {
  useAddExercise,
  useAddSet,
  useCreateSession,
} from "@/modules/workouts/hooks/useSession";
import {
  useProgramDay,
  useProgramDayExercises,
} from "@/modules/workouts/hooks/useProgramDay";
import { QuickWorkoutExerciseForm } from "@/modules/workouts/components/quick-workout-form/QuickWorkoutForm";
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

  const activeDayId =
    activeWorkout?.program_day_id || (activeWorkout as any)?.id;

  const { data: exercises, isLoading: exercisesLoading } =
    useProgramDayExercises({
      // dayId: activeWorkout?.program_day_id ?? null,
      // enabled: !!activeWorkout?.program_day_id,
      dayId: activeDayId ?? null,
      enabled: !!activeDayId,
    });

  console.log("exercises", exercises);

  const [currentIndex, setCurrentIndex] = useState(0);
  const activeExercise = exercises?.[currentIndex] ?? null;

  if (nextLoading || scheduleLoading) return <Loader />;

  // Move to the next exercise
  const handleNextExercise = () => {
    if (!exercises) return;
    setCurrentIndex((prev) => Math.min(prev + 1, exercises.length - 1));
  };

  const handleExerciseChange = (updated: ProgramExerciseOut) => {
    setExercise(updated);
  };

  // const [isResting, setIsResting] = useState(false);
  // const [restDuration, setRestDuration] = useState(60);

  // const { mutateAsync: startSession } = useCreateSession();
  // const { mutateAsync: closeSession, isPending: closing } = useFinishSession();

  // to submit executed exercise
  const handleSubmitExercise = async (current: ProgramExerciseOut) => {
    if (!sessionId) return;

    try {
      const exerciseRes = await addExercise({
        sessionId,
        data: {
          name: current.exercise_name!,
          notes: "",
          planned_exercise_id: current.id, // now optional but you have it
        },
      });

      await addSet({
        exerciseId: exerciseRes.id,
        data: {
          reps: current.reps,
          weight: 0,
          rest_seconds: current.rest_seconds ?? 0,
          notes: "",
          completed: true,
        },
      });

      // if (exercise.rest_seconds) {
      //   setRestDuration(exercise.rest_seconds);
      //   setIsResting(true);
      // }

      handleNextExercise();
      setExercise(null); // reset for next
    } catch (err) {
      console.error("Failed to log exercise + sets:", err);
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

          {/* GUARD: Only render the form if we have an exercise. Fixes TS error and Runtime crash */}
          {exercisesLoading ? (
            <Loader />
          ) : activeExercise ? (
            <PlannedWorkoutExerciseForm
              exercise={exercise ?? activeExercise}
              onChange={(updated) => handleExerciseChange(updated)}
            />
          ) : (
            <Typography variant="body">
              No exercises found for this day.
            </Typography>
          )}

          <Button
            size="small"
            bordered
            onClick={() => handleSubmitExercise(exercise ?? activeExercise!)}
          >
            Log
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

//   const [exerciseUI, setExerciseUI] = useState<ActiveExerciseUI>({ name: "", notes: "" });
//   const [setUI, setSetUI] = useState<ActiveSetUI>({ reps: "", weight: 0, rest_seconds: 0 });
//
//   const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
//   const [activeSessionId, setActiveSessionId] = useState<number | null>(null);

//   const { mutateAsync: startSession } = useCreateSession();
//   const { mutateAsync: addExercise } = useAddExercise();
// const { mutateAsync: addSet } = useAddSet();

// return (
// <div className={css.container}>
//       <h1 style={{ fontSize: "32px" }}>Your Planned Workout</h1>

//       {/* Logic Fix: If we have a selected workout, show the workout/start UI */}
//       {selectedWorkout ? (
//         <>
//           {!activeSessionId ? (
//             <div>
//               <p style={{ fontSize: "18px" }}>
//                 Starting workout: {new Date(selectedWorkout.scheduled_for).toLocaleDateString()}
//               </p>
//               <button onClick={handleBeginWorkout}>Start Now</button>
//             </div>
//           ) : (
//             <div className="active-workout">
//               <h2 style={{ fontSize: "24px" }}>{exerciseUI.name}</h2>
//               <div style={{ padding: "20px", border: "1px solid #eee" }}>
//                 <p style={{ fontSize: "14px" }}>{exerciseUI.notes}</p>

//                 <input
//                   type="number"
//                   value={setUI.weight}
//                   onChange={(e) => setSetUI({...setUI, weight: Number(e.target.value)})}
//                   placeholder="Weight"
//                 />
//                 <input
//                   type="text"
//                   value={setUI.reps}
//                   onChange={(e) => setSetUI({...setUI, reps: e.target.value})}
//                   placeholder="Reps"
//                 />

//                 <button onClick={handleSubmitExercise} style={{ display: "block", marginTop: "10px" }}>
//                   Confirm & Log
//                 </button>
//               </div>

//               <RestTimer
//                 duration={restDuration}
//                 isPlaying={isResting}
//                 onComplete={() => setIsResting(false)}
//               />
//             </div>
//           )}
//         </>
//       ) : (
//         /* 2nd Way: Menu Selection */
//         <div className="selection-menu">
//           <p style={{ fontSize: "18px" }}>All scheduled workouts:</p>
//           {schedule?.map(w => (
//             <div key={w.id} style={{ padding: "15px", border: "1px solid #ccc", marginBottom: "10px" }}>
//               <p style={{ fontSize: "16px" }}>{new Date(w.scheduled_for).toLocaleDateString()}</p>
//               <button onClick={() => setSelectedWorkout(w)}>
//                 Choose Workout
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
// </div>
// );

//   return (
//     <Container className={css.container}>
//       <Typography variant="h1">Your Planned Workout</Typography>

//       {fromDashboard && selectedWorkout ? (
//         <>
//           <Typography variant="h2">
//             Today’s workout: {new Date(selectedWorkout.scheduled_for).toLocaleDateString()}
//           </Typography>

//           <Card>
//             <Typography>{exerciseUI.name}</Typography>
//             <Button onClick={handleSubmitExercise}>Confirm Exercise</Button>
//           </Card>

//           <RestTimer
//             duration={restDuration}
//             isPlaying={isResting}
//             onComplete={() => {
//               setIsResting(false);
//               setSetUI(prev => ({ ...prev, rest_seconds: restDuration }));
//             }}
//           />
//         </>
//       ) : (
//         <Card>
//           <Typography variant="body">All scheduled workouts:</Typography>
//           {plannedWorkouts.map(w => (
//             <Card key={w.id}>
//               <Typography>{new Date(w.scheduled_for).toLocaleDateString()}</Typography>
//               <Button
//                 onClick={() => {
//                   setSelectedWorkout(w);
//                   navigate("/planned-workout", { state: { fromDashboard: true } });
//                 }}
//               >
//                 Start
//               </Button>
//             </Card>
//           ))}
//         </Card>
//       )}
//     </Container>
//   );
// };
