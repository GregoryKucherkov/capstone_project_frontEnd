import Home from "@/pages/Home/Home";
import "./App.css";
import { SharedLayout } from "@/shared/components/layout/SharedLayout";
import { Route, Routes } from "react-router-dom";
import ExercisesLib from "@/pages/exercises-lib/ExercisesLib";
import { ErrorBoundary } from "@/shared/ui/error/Error";
import { useUser } from "@/shared/hooks/use-user";
import { PrivateRoute } from "@/shared/components/private-route";
import { UserPage } from "@/pages/user-page/UserPage";
import { AddWorkout } from "@/pages/add-workout/AddWorkout";
import { QuickWorkout } from "@/pages/add-workout/quick-workout/QuickWorkout";
import { PlannedWorkout } from "@/pages/add-workout/planned-workout/PlannedWorkout";
import { ManageWorkouts } from "@/pages/add-workout/manage-workouts/ManageWorkouts";
import { FavoriteExercises } from "@/pages/add-workout/favorite-exercises/FavoriteExercises";
import { Workouts } from "@/pages/workouts-stats/Workouts";
import Loader from "@/shared/ui/loader/Loader";

import { Comunity } from "@/pages/comunity/Comunity";
import { ErrorMessage } from "@/shared/ui/error-message/ErrorMessage";
import { Card } from "@/shared/ui/card/Card";
import { NotFound } from "@/pages/not-found/NotFound";

function App() {
  const { isError, isLoading } = useUser();

  if (isLoading) return <Loader />;

  if (isError)
    return (
      <Card variant="pink">
        Server Connection Error. Please try again later.
      </Card>
    );

  return (
    <ErrorBoundary fallback={<ErrorMessage />}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />

          <Route
            path="/user/:id"
            element={
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>
            }
          />

          {/* ADD WORKOUT PAGES */}
          <Route
            path="/add-workout"
            element={
              <PrivateRoute>
                <AddWorkout />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-workout/quick"
            element={
              <PrivateRoute>
                <QuickWorkout />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-workout/planned"
            element={
              <PrivateRoute>
                <PlannedWorkout />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-workout/manage"
            element={
              <PrivateRoute>
                <ManageWorkouts />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-workout/favorite"
            element={
              <PrivateRoute>
                <FavoriteExercises />
              </PrivateRoute>
            }
          />

          <Route
            path="/workouts"
            element={
              <PrivateRoute>
                <Workouts />
              </PrivateRoute>
            }
          />

          {/* COMMUNITY PAGE */}
          <Route
            path="/community"
            element={
              <PrivateRoute>
                <Comunity />
              </PrivateRoute>
            }
          />

          <Route path="/exercises" element={<ExercisesLib />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
