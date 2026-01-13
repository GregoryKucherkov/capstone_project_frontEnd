import { UserDashboard } from "@/modules/user-dashboard/components/user-dashboard/UserDashboard";
import css from "./Home.module.css"
import { Landing } from "@/modules/landing/Landing";
import { useUser } from "@/shared/hooks/use-user";


const Home = () => {
    const { isLoggedIn } = useUser();
    

    return (
        <div className={css.container}>
            {isLoggedIn ? <UserDashboard /> : <Landing />}
        </div>
    )
}

export default Home;