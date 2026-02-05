import Container from "@/shared/ui/container/Container";
import css from "./ExercisesLib.module.css";
import { ExercisesList } from "@/modules/exercises/components/exercises-list/ExercisesList";
import { useExercises } from "@/modules/exercises/hooks/useExercises";
import { useState } from "react";
import { ExercisesCategories } from "@/modules/exercises/components/exercises-categories/ExercisesCategories";
import { useSearchParams } from "react-router-dom";
import Loader from "@/shared/ui/loader/Loader";
import { useFavoriteIds } from "@/shared/hooks/useAddFavorite";
import { Typography } from "@/shared/ui/typography/Typography";
import { useBreakpoint } from "@/shared/hooks/useBreakpoint";

const LIMIT_MAP = {
  desktop: 12,
  tabletHd: 9,
  tablet: 8,
  mobile: 6,
  "small-mobile": 4,
};

const ExercisesLib = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const breakpoint = useBreakpoint();
  const currentLimit = LIMIT_MAP[breakpoint];

  const currentSearch = searchParams.get("search") || "";

  const currentPage = Number(searchParams.get("page")) || 1;

  const [inputValue, setInputValue] = useState(currentSearch);

  const { data, isLoading, isError, error } = useExercises(
    currentSearch,
    currentPage,
    currentLimit,
  );

  const currentPageExercises = data?.exercises || [];
  const skip = (currentPage - 1) * currentLimit;

  const { data: favoriteIds = [] } = useFavoriteIds(
    currentPageExercises?.map((e) => e.id),
    skip,
    currentLimit,
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ search: inputValue, page: "1" });
    setInputValue("");
  };

  return (
    <Container className={css.container}>
      <section className={css.librarySearchSection}>
        <Typography variant="h1" className={css.libraryTitle}>
          Exercises Library
        </Typography>

        <ExercisesCategories
          searchValue={inputValue}
          onSearchChange={setInputValue}
          onSearchSubmit={handleSearchSubmit}
        />
      </section>

      {isLoading && <Loader />}
      {isError && (
        <p style={{ color: "red", fontSize: "16px" }}>
          Error: {error instanceof Error ? error.message : "Fetch failed"}
        </p>
      )}

      {data?.exercises && data.exercises.length > 0 && favoriteIds ? (
        <ExercisesList
          exercises={data.exercises}
          totalPages={data.total}
          currentPage={currentPage}
          favoriteIds={favoriteIds}
        />
      ) : (
        !isLoading && <p>No exercises found.</p>
      )}
    </Container>
  );
};

export default ExercisesLib;
