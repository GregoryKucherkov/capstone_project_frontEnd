import { useDailyNutrition } from "@/modules/workouts/hooks/useDailyNutrition";
import { Card } from "@/shared/ui/card/Card";
import Container from "@/shared/ui/container/Container";
import { Typography } from "@/shared/ui/typography/Typography";
import css from "./Nutrition.module.css";
import Loader from "@/shared/ui/loader/Loader";
import { Button } from "@/shared/ui/button/Button";

export const Nutrition = () => {
  const { meals, totalToday, isLoading } = useDailyNutrition();

  if (isLoading) return <Loader />;

  return (
    <Container>
      <Card className={css.nutritionCard} variant="thick">
        <Typography variant="h2" className={css.title}>
          Nutrition
        </Typography>
        <div className={css.totalSection}>
          <Card variant="small" className={css.smallCard}>
            <Typography variant="body" className={css.details}>
              Consumed today:
              <span>{totalToday.toFixed(0)} kcal</span>
            </Typography>
          </Card>
          <Card variant="small" className={css.smallCard}>
            <Typography variant="body" className={css.details}>
              Logged:
              <span className={css.totalValue}>{meals.length} meals</span>
            </Typography>
          </Card>
        </div>
        <Button className={css.nutritionBtn} size="small">
          Log food
        </Button>
      </Card>
    </Container>
  );
};
