// import { useWorkouts } from "@/modules/workouts/hooks/useSession";
import { Button } from "@/shared/ui/button/Button";
import { Card } from "@/shared/ui/card/Card";
import Container from "@/shared/ui/container/Container";
import { Typography } from "@/shared/ui/typography/Typography";
import css from "./ListWorkoutsSessions.module.css";
// import Loader from "@/shared/ui/loader/Loader";
// import { Pagination } from "swiper/modules";

export const ListWorkoutsSessions = () => {
  // const { workouts, isLoading } = useWorkouts(5, 5);

  // if (isLoading) return <Loader />;

  const mockWorkouts = [
    {
      id: 1000,
      user_id: 200,
      notes: "Full body strength session",
      date: "2026-02-05T21:50:23.378Z",
      duration: 45,
      completed: true,
      created_at: "2026-02-05T21:50:23.378Z",
      updated_at: "2026-02-05T23:20:23.378Z",
    },
    {
      id: 1001,
      user_id: 201,
      notes: "Upper body push day",
      date: "2026-02-04T18:30:00.000Z",
      duration: 60,
      completed: true,
      created_at: "2026-02-04T18:30:00.000Z",
      updated_at: "2026-02-04T19:30:00.000Z",
    },
    {
      id: 1002,
      user_id: 202,
      notes: "Leg day and conditioning",
      date: "2026-02-03T17:00:00.000Z",
      duration: 50,
      completed: true,
      created_at: "2026-02-03T17:00:00.000Z",
      updated_at: "2026-02-03T18:00:00.000Z",
    },
    {
      id: 1003,
      user_id: 203,
      notes: "Core and cardio",
      date: "2026-02-02T16:15:00.000Z",
      duration: 40,
      completed: true,
      created_at: "2026-02-02T16:15:00.000Z",
      updated_at: "2026-02-02T16:55:00.000Z",
    },
    {
      id: 1004,
      user_id: 204,
      notes: "Pull day: back & biceps",
      date: "2026-02-01T15:00:00.000Z",
      duration: 55,
      completed: true,
      created_at: "2026-02-01T15:00:00.000Z",
      updated_at: "2026-02-01T15:55:00.000Z",
    },
  ];

  // const displayData = workouts?.length > 1
  // ? workouts
  // : mockWorkouts;

  const displayData = mockWorkouts;

  //   const handlePageChange = (page: number) => {
  //     console.log(page)

  // };

  return (
    <Container>
      <Card variant="thick" className={css.detailsCard}>
        <Typography variant="h2" className={css.detailsTitle}>
          User's Workout
        </Typography>

        <ul className={css.ulContainer}>
          {displayData.map((workout) => (
            <li key={workout.id} className={css.liWOrkoutItem}>
              <Card variant="pink">
                <p>
                  <strong>Notes:</strong> {workout.notes}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(workout.date).toLocaleString()}
                </p>
                <p>
                  <strong>Duration:</strong> {workout.duration} min
                </p>
                <p>
                  <strong>Completed:</strong> {workout.completed ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(workout.created_at).toLocaleString()}
                </p>
                <p>
                  <strong>Updated At:</strong>{" "}
                  {new Date(workout.updated_at).toLocaleString()}
                </p>

                <Button
                  className={css.wrkDetails}
                  bordered
                  size="small"
                  style={{ margin: "0 auto" }}
                >
                  Details
                </Button>
              </Card>
            </li>
          ))}
        </ul>
      </Card>

      {/* <Pagination
              totalPages={totalCount}
              activePage={currentPage}
              onPageChange={handlePageChange}
            /> */}
    </Container>
  );
};
