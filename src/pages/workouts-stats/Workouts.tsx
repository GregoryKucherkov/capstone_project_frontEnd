import Container from "@/shared/ui/container/Container";
import css from "./Workouts.module.css";
import { Typography } from "@/shared/ui/typography/Typography";
import { Card } from "@/shared/ui/card/Card";
import { Goal } from "@/modules/workouts/components/goals/Goal";
import { ListWorkoutsSessions } from "@/modules/workouts/components/list-workouts-sessions/ListWorkoutsSessions";

export const Workouts = () => {
  return (
    <Container className={css.container}>
      <Typography variant="h1">Your workouts</Typography>
      <Goal />
      <Card>
        <Typography variant="body">User's workouts</Typography>

        <ListWorkoutsSessions />
      </Card>
    </Container>
  );
};
