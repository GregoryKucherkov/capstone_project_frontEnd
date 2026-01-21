import { UserDashboard } from "@/pages/user-dashboard/UserDashboard";
import css from "./Home.module.css";
import { Landing } from "@/modules/landing/Landing";
import { useUser } from "@/shared/hooks/use-user";

const Home = () => {
  const { isLoggedIn, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={css.container}>
      {isLoggedIn ? <UserDashboard /> : <Landing />}
    </div>
  );
};

export default Home;
