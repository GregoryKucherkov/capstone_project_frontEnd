import css from "./Workouts.module.css";
import { Typography } from "@/shared/ui/typography/Typography";
import { Goal } from "@/modules/workouts/components/goals/Goal";
import { ListWorkoutsSessions } from "@/modules/workouts/components/list-workouts-sessions/ListWorkoutsSessions";

export const Workouts = () => {
  return (
    <div className={css.container}>
      <Typography variant="h1">Your workouts</Typography>
      <Goal />

      <ListWorkoutsSessions />
    </div>
  );
};
