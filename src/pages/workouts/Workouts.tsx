import Container from "@/shared/ui/container/Container";
import css from "./Workouts.module.css";
import { Typography } from "@/shared/ui/typography/Typography";
import { Card } from "@/shared/ui/card/Card";

export const Workouts = () => {
  return (
    <Container className={css.container}>
      <Typography variant="h1">Your workouts</Typography>
      <Card>
        <Typography variant="body">Users Progress list</Typography>
      </Card>
      <Card>
        <Typography variant="body">User's workouts</Typography>
      </Card>
    </Container>
  );
};
