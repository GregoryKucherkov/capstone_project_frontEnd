import { Typography } from "@/shared/ui/typography/Typography";
import css from "./Goal.module.css";
import { Card } from "@/shared/ui/card/Card";
import { useGoals } from "@/modules/workouts/hooks/useGoals";
import Container from "@/shared/ui/container/Container";
import Loader from "@/shared/ui/loader/Loader";
import { Button } from "@/shared/ui/button/Button";

export const Goal = () => {
  const { goals, isLoading } = useGoals();

  if (isLoading) return <Loader />;


  // MOCK DATA for MVP
  const mockGoal = {
    goal_type: "Weight Loss",
    current_value: "5",
    target_value: "10",
    deadline: "2026-03-01T00:00:00.000Z"
  };
  const mainGoal = (goals && goals.length > 0) ? goals[0] : mockGoal;


    // real code, not mock
  // const mainGoal = [...goals].sort(
  //   (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
  // )[0];



  if (!mainGoal) {
    return (
      <Container>
        <Card className={css.emptyGoal}>
        <Typography variant="h2" className={css.title}>Ready for a new challenge?</Typography>
        <Button variant="pink" size="small" className={css.emtyBtn}>Set a Goal</Button>
        </Card>
      </Container>
      
    );
  }

  const progress = Math.min(
    Math.round((parseFloat(mainGoal.current_value) / parseFloat(mainGoal.target_value)) * 100), 
    100
  );

  return (
    <section>
      <Container>
        <Card variant="thick" className={css.goalCard}>
          <Typography variant="h2" className={css.title}>
            Goal: {mainGoal.goal_type}!
          </Typography>
          <span className={css.deadlineBadge}>
            Ends: {new Date(mainGoal.deadline).toLocaleDateString()}
          </span>

          <div className={css.progressWrapper}>
          <div className={css.stats}>
            <Typography variant="body">Current: <strong>{mainGoal.current_value}kg</strong></Typography>
            <Typography variant="body">Target: <strong>{mainGoal.target_value}kg</strong></Typography>
          </div>

          {/* Progress Bar */}
          <div className={css.progressBarBg}>
            <div 
              className={css.progressBarFill} 
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className={css.percentageText}>{progress}% Completed</p>
        </div>

        <Button variant="light" size="small" className={css.emtyBtn}>Update Progress</Button>

        

        </Card>
      </Container>
    </section>
  );
};
