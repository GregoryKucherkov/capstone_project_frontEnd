import Container from "@/shared/ui/container/Container";
import css from "./PlannedWorkout.module.css";
import { Card } from "@/shared/ui/card/Card";
import { Typography } from "@/shared/ui/typography/Typography";
import { Button } from "@/shared/ui/button/Button";
import { RestTimer } from "@/shared/ui/timer/Timer";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "@/shared/ui/loader/Loader";
import type {
  ActiveExerciseUI,
  ActiveSetUI,
  PlannedWorkoutProps,
  ProgramDayExercise,
} from "@/shared/types/api";
import { useProgramSchedule } from "@/modules/workouts/hooks/usePlannedWorkouts";
import {
  useAddExercise,
  useAddSet,
  useCreateSession,
} from "@/modules/workouts/hooks/useSession";
import { useProgramDay } from "@/modules/workouts/hooks/useProgramDay";

const HARDCODED_START = "2026-01-29T00:00:00.000Z";
const HARDCODED_END = "2026-02-05T23:59:59.000Z";

export const PlannedWorkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromDashboard = location.state?.fromDashboard || false;
  const [isResting, setIsResting] = useState(false);
  const [restDuration, setRestDuration] = useState(60);

  const { mutateAsync: startSession } = useCreateSession();

  const { data: programDay, isLoading: exercisesLoading } = useProgramDay({
    dayId: selectedWorkout?.program_day_id ?? 0,
    enabled: Boolean(selectedWorkout),
  });

  return (
    <div className={css.container}>
      <Typography variant="h1">Your Planned Workout</Typography>
    </div>
  );
};

//   const [exerciseUI, setExerciseUI] = useState<ActiveExerciseUI>({ name: "", notes: "" });
//   const [setUI, setSetUI] = useState<ActiveSetUI>({ reps: "", weight: 0, rest_seconds: 0 });
//   const [selectedWorkout, setSelectedWorkout] = useState<PlannedWorkoutProps | null>(null);
//   const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
//   const [activeSessionId, setActiveSessionId] = useState<number | null>(null);

//   const { data: schedule, isLoading: scheduleLoading } = useProgramSchedule({
//     startDate: HARDCODED_START,
//     endDate: HARDCODED_END
//   });

//   const { mutateAsync: startSession } = useCreateSession();
//   const { mutateAsync: addExercise } = useAddExercise();
//   const { mutateAsync: addSet } = useAddSet();

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

// //   return (
// //     <Container className={css.container}>
// //       <Typography variant="h1">Your Planned Workout</Typography>

// //       {fromDashboard && selectedWorkout ? (
// //         <>
// //           <Typography variant="h2">
// //             Today’s workout: {new Date(selectedWorkout.scheduled_for).toLocaleDateString()}
// //           </Typography>

// //           <Card>
// //             <Typography>{exerciseUI.name}</Typography>
// //             <Button onClick={handleSubmitExercise}>Confirm Exercise</Button>
// //           </Card>

// //           <RestTimer
// //             duration={restDuration}
// //             isPlaying={isResting}
// //             onComplete={() => {
// //               setIsResting(false);
// //               setSetUI(prev => ({ ...prev, rest_seconds: restDuration }));
// //             }}
// //           />
// //         </>
// //       ) : (
// //         <Card>
// //           <Typography variant="body">All scheduled workouts:</Typography>
// //           {plannedWorkouts.map(w => (
// //             <Card key={w.id}>
// //               <Typography>{new Date(w.scheduled_for).toLocaleDateString()}</Typography>
// //               <Button
// //                 onClick={() => {
// //                   setSelectedWorkout(w);
// //                   navigate("/planned-workout", { state: { fromDashboard: true } });
// //                 }}
// //               >
// //                 Start
// //               </Button>
// //             </Card>
// //           ))}
// //         </Card>
// //       )}
// //     </Container>
// //   );
// };
