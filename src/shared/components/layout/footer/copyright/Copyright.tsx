import { Typography } from "@/shared/ui/typography/Typography";
import css from "./Copyright.module.css";
import { useBreakpoint } from "@/shared/hooks/useBreakpoint";

export const Copyright = () => {
  const year = new Date().getFullYear();
  const breakpoint = useBreakpoint();

  return (
    <Typography
      variant={breakpoint === "mobile" ? "bodyS" : "body"}
      className={css.wrapper}
    >
      &copy; {year}, Record. All rights reserved
    </Typography>
  );
};
