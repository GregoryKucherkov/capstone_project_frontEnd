import { UserDashboard } from "@/pages/user-dashboard/UserDashboard";
import { Landing } from "@/modules/landing/Landing";
import { useUser } from "@/shared/hooks/use-user";
import Loader from "@/shared/ui/loader/Loader";

const Home = () => {
  const { isLoggedIn, isLoading } = useUser();

  if (isLoading) return <Loader />;

  return <>{isLoggedIn ? <UserDashboard /> : <Landing />}</>;
};

export default Home;
