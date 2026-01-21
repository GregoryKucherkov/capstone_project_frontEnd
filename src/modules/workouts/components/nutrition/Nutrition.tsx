import { useDailyNutrition } from "@/modules/workouts/hooks/useDailyNutrition";
import { Card } from "@/shared/ui/card/Card";
import Container from "@/shared/ui/container/Container";
import { Typography } from "@/shared/ui/typography/Typography";
import css from "./Nutrition.module.css";

export const Nutrition = () => {
  const { totalToday, isLoading } = useDailyNutrition();

  if (isLoading) {
    return (
      <Container>
        <Card>
          <Typography variant="body">Loading...</Typography>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <Typography variant="h3">Nutrition</Typography>
        <div className={css.totalSection}>
          <Card variant="small">
            <Typography variant="h3" className={css.totalValue}>
              {totalToday.toFixed(0)}
            </Typography>
          </Card>
          <Card variant="small">
            <Typography variant="body" className={css.label}>
              kcal consumed today
            </Typography>
          </Card>
        </div>
      </Card>
    </Container>
  );
};
