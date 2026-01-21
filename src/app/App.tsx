// import { useState } from 'react'
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
import { Workouts } from "@/pages/workouts/Workouts";

// move filterMap to backend enum mirror

// add infinite query

// prefetch next filter on hover

// sync filters to URL

function App() {
  const { isError } = useUser();

  // if (isLoading) return <h1>LOADING APP...</h1>;

  if (isError)
    return <div>Server Connection Error. Please try again later.</div>;

  return (
    <ErrorBoundary
      fallback={
        <div style={{ color: "red", padding: "50px" }}>
          CRITICAL APP CRASH: Check dependencies or imports.
        </div>
      }
    >
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

          <Route path="/exercises" element={<ExercisesLib />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
