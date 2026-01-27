import { NextWorkout } from "@/modules/workouts/components/next-workout/NextWorkout";
import { WorkoutDetails } from "@/modules/workouts/components/workout-details/WorkoutDetails";
import { Goal } from "@/modules/workouts/components/goals/Goal";
import { Nutrition } from "@/modules/workouts/components/nutrition/Nutrition";
import { DashboardHero } from "@/pages/user-dashboard/components/dashboard-hero/DashboardHero";

export const UserDashboard = () => {
  return (
    <>
      <DashboardHero />
      <Goal />
      <NextWorkout />
      <WorkoutDetails />
      <Nutrition />
    </>
  );
};
