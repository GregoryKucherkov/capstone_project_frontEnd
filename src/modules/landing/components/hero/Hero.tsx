import { Typography } from "@/shared/ui/typography/Typography";
import css from "./Hero.module.css";
import { Button } from "@/shared/ui/button/Button";
import { useSearchParams } from "react-router-dom";

export const Hero = () => {
  const [, setSearchParams] = useSearchParams();

  const handleClick = () => {
    setSearchParams({ modal: "signup" });
  };

  return (
    <section className={css.heroSection}>
        <div className={css.heroTextWrapper}>
          <Typography className={css.heroTitle} variant="h1">
            Build a better yourself
          </Typography>
          <Typography className={css.heroSubtitle} variant="body">
            Personal tool to plan and execute your workouts!
          </Typography>
          <Button
            bordered
            variant="pink"
            size="large"
            className={css.heroBtn}
            onClick={handleClick}
          >
            Get Started
          </Button>
        </div>
    </section>
  );
};
