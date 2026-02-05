import Container from "@/shared/ui/container/Container";
import css from "./NotFound.module.css";
import { Card } from "@/shared/ui/card/Card";
import { Typography } from "@/shared/ui/typography/Typography";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <Container className={css.container}>
      <Card variant="pink">
        <Typography variant="h1" className={css.title}>
          The page does not exist!
        </Typography>
      </Card>
      <Card variant="yellow">
        <Typography variant="h2">Try other page</Typography>
      </Card>
      <Card variant="green">
        <Link to="/" className={css.navigation}>
          Click here!
        </Link>
      </Card>
    </Container>
  );
};
