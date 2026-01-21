import Container from "@/shared/ui/container/Container";
import css from "./QuickWorkout.module.css";
import { Typography } from "@/shared/ui/typography/Typography";

export const QuickWorkout = () => {
  return (
    <Container className={css.container}>
      <Typography variant="h1">Start yor workout</Typography>
    </Container>
  );
};
