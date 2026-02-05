import Container from "@/shared/ui/container/Container";
import css from "./Comunity.module.css";
import { Card } from "@/shared/ui/card/Card";
import { Typography } from "@/shared/ui/typography/Typography";

export const Comunity = () => {
  return (
    <Container className={css.container}>
      <Card variant="yellow">
        <Typography variant="h1">This page is under construction</Typography>
      </Card>
    </Container>
  );
};
