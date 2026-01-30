import Container from "@/shared/ui/container/Container";
import css from "./AddWorkout.module.css";
import { Typography } from "@/shared/ui/typography/Typography";
import { Card } from "@/shared/ui/card/Card";
import { Link } from "react-router-dom";
import clsx from "clsx";

export const AddWorkout = () => {
  return (
    <Container className={css.container}>
      <Typography variant="h1" className={css.title}>
        Add new workout
      </Typography>
      <Card variant="green" className={css.card}>
        <Typography variant="h2" className={css.subTitle}>
          Quick Workout
        </Typography>
        <Link className={clsx(css.linkTo, css.pink)} to="/add-workout/quick">
          START
        </Link>
      </Card>
      <Card variant="pink" className={css.card}>
        <Typography variant="h2" className={css.subTitle}>
          Start planned workout now
        </Typography>
        <Link
          className={clsx(css.linkTo, css.green)}
          to="/add-workout/planned"
          state={{ fromDashboard: false }}
        >
          Pick a day
        </Link>
      </Card>
      <Card variant="green" className={css.card}>
        <Typography variant="h2" className={css.subTitle}>
          Manage your next workout!
        </Typography>
        <Link className={clsx(css.linkTo, css.pink)} to="/add-workout/manage">
          Create
        </Link>
      </Card>
      <Card variant="pink" className={css.card}>
        <Typography variant="h2" className={css.subTitle}>
          Favorite exercises
        </Typography>
        <Link
          className={clsx(css.linkTo, css.green)}
          to="/add-workout/favorite"
        >
          Check
        </Link>
      </Card>
    </Container>
  );
};
