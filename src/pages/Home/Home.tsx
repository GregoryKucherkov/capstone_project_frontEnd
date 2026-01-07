import { UserDashboard } from "@/modules/user-dashboard/components/user-dashboard/UserDashboard";
import css from "./Home.module.css"
import { Landing } from "@/modules/landing/Landing";


interface HomeProps {
  isLoggedIn: boolean;
}

const Home = ({ isLoggedIn }: HomeProps) => {
    

    return (
        <div className={css.container}>
            {isLoggedIn ? <UserDashboard /> : <Landing />}
        </div>
    )
}

export default Home;