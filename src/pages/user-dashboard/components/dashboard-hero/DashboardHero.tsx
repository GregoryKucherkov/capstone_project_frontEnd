import { useUser } from "@/shared/hooks/use-user";
import css from "./DashboardHero.module.css";
import { Typography } from "@/shared/ui/typography/Typography";

export const DashboardHero = () => {
  const { user } = useUser();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <section className={css.dashbHero}>
      <Typography variant="body">{today}</Typography>
      <h1>Hello, {user?.name || "Athlete"}! 👋 </h1>
    </section>
  );
};
