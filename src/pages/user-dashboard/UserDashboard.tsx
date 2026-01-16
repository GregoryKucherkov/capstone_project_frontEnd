import { DashboardHeader } from "@/pages/user-dashboard/components/dashboard-header/DashboardHeader"
import css from "./UserDashboard.module.css"
import { NextWorkout } from "@/modules/workouts/components/next-workout/NextWorkout"
import { WorkoutDetails } from "@/modules/workouts/components/workout-details/WorkoutDetails"
import { Goal } from "@/modules/workouts/components/goals/Goal"
import { Nutrition } from "@/modules/workouts/components/nutrition/Nutrition"


export const UserDashboard = () => {
    return (
    
        <div className={css.container}>
            <DashboardHeader/>
            <Goal/>
            <NextWorkout/>
            <WorkoutDetails/>
            <Nutrition/>
        </div>
        
    )
}