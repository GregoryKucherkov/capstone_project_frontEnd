import { useWorkouts } from "@/modules/workouts/hooks/useSession";
import Container from "@/shared/ui/container/Container";

export const ListWorkoutsSessions = () => {
  const { workouts, isLoading, isError } = useWorkouts();

  return (
    <Container>
      <></>
    </Container>
  );
};
