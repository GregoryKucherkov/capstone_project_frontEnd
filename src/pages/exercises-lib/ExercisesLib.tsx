import Container from "@/shared/ui/container/Container"
import css from "./ExercisesLib.module.css"
import { ExercisesList } from "@/modules/exercises/components/exercises-list/ExercisesList"
import { useExercises } from "@/modules/exercises/hooks/useExercises";
import { ErrorBoundary } from "@/shared/ui/error/Error";
import { useState } from "react";
import { ExercisesCategories } from "@/modules/exercises/components/exercises-categories/ExercisesCategories";
import { useSearchParams } from "react-router-dom";



const ExercisesLib = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentSearch = searchParams.get("search") || "";
    const [inputValue, setInputValue] = useState(currentSearch);
    

    const { data = [], isLoading, isError, error } = useExercises(currentSearch);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchParams({ search: inputValue });
        setInputValue("");
    };


    return (
        <main>
            <Container className={css.container}>
                <h1>Exercises Library</h1>

                <ExercisesCategories
                    searchValue={inputValue}
                    onSearchChange={setInputValue}
                    onSearchSubmit={handleSearchSubmit}
                    />

                {isLoading && <p>Loading your workouts...</p>}
                {isError && <p>Error: {error instanceof Error ? error.message : "Fetch failed"}</p>}


                <ErrorBoundary fallback={<p>Failed to load the list. Try refreshing.</p>}>
                
                {Array.isArray(data) && data.length > 0 ? (
                        <ExercisesList exercises={data} />
                    ) : (
                        !isLoading && <p>No exercises found.</p>
                    )}
                
                </ErrorBoundary>


            </Container>
        </main>
    )
}

export default ExercisesLib