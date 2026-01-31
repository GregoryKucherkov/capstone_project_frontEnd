import Container from "@/shared/ui/container/Container";
import css from "./FavoriteExercises.module.css";
import { Typography } from "@/shared/ui/typography/Typography";
import { useGetfavorite } from "@/shared/hooks/useAddFavorite";
import { ExercisesList } from "@/modules/exercises/components/exercises-list/ExercisesList";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "@/shared/ui/loader/Loader";
import { Card } from "@/shared/ui/card/Card";
import { Button } from "@/shared/ui/button/Button";

export const FavoriteExercises = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = 10;

  const { exercises, totalCount, isLoading, isError } = useGetfavorite(
    currentPage,
    limit,
  );

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <Container className={css.container}>
      <Typography variant="h1" className={css.title}>
        Your favorite exercises
      </Typography>
      <Card variant="yellow" className={css.exeCard}>
        {isLoading && <Loader />}

        {isError && (
          <div className={css.errorContainer}>
            <p>Failed to load your favorites. Please try again later.</p>
          </div>
        )}

        {!isLoading &&
          !isError &&
          (exercises.length > 0 ? (
            <ExercisesList
              exercises={exercises}
              totalPages={totalPages}
              currentPage={currentPage}
              favoriteIds={exercises.map((e) => e.id)}
            />
          ) : (
            <>
              <Typography variant="h2" className={css.subtitle}>
                No exercises found. Find your Favorite exercises right now!
              </Typography>
              <Button
                variant="light"
                size="large"
                className={css.favoriteBtn}
                onClick={() => {
                  navigate("/exercises");
                }}
              >
                Find!
              </Button>
            </>
          ))}
      </Card>
    </Container>
  );
};
