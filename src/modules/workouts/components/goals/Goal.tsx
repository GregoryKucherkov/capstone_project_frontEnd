import { Typography } from "@/shared/ui/typography/Typography";
import css from "./Goal.module.css";
import { Card } from "@/shared/ui/card/Card";
import { useGoals } from "@/modules/workouts/hooks/useGoals";
import Container from "@/shared/ui/container/Container";

export const Goal = () => {
  const { goals, isLoading } = useGoals();

  if (isLoading)
    return (
      <Container>
        <Card>Loading Goal...</Card>
      </Container>
    );

  const mainGoal = [...goals].sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
  )[0];

  const goalTitle = mainGoal?.goal_type || "Choose your goal";
  const formattedDate = mainGoal
    ? new Date(mainGoal.deadline).toLocaleDateString()
    : "Set up a deadline";

  return (
    <Container>
      <Card>
        <Typography variant="h3" className={css.label}>
          {goalTitle}!
        </Typography>
        <Typography variant="h4" className={css.label}>
          Deadline: {formattedDate}{" "}
        </Typography>
      </Card>
    </Container>
  );
};
