import { useUser } from "@/shared/hooks/use-user";
import css from "./DashboardHeader.module.css"


export const DashboardHeader = () => {

    const { user } = useUser();

    const today = new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
    });

    return (
        <header className={css.dashbHeader}>
            <p>{today}</p>
            <h1>Hello, {user?.name || "Athlete"}! 👋</h1>
        </header>
        
    )
}