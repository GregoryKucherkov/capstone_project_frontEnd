import Container from "@/shared/ui/container/Container"
import css from "./AddWorkout.module.css"
import { Typography } from "@/shared/ui/typography/Typography"
import { Card } from "@/shared/ui/card/Card"
import { Link, Outlet } from "react-router-dom"


export const AddWorkout = () => {
    return (
        <Container className={css.container}>
            <Typography variant="h2">Add new workout</Typography>
            <Card>
                <Typography variant="h3">Quick Workout</Typography>
                <Typography variant="body">Start unplanned workout now</Typography>
                <Link
                className={css.linkTo}
                to="/add-workout/quick"
                >START
                </Link>
            </Card>
            <Card>
                <Typography variant="h3">Start planned workout now</Typography>
                <Link
                className={css.linkTo}
                to="/add-workout/planned"
                >Pick a day
                </Link>
            </Card>
            <Card>
                <Typography variant="h3">Manage your next workout!</Typography>
                <Link
                className={css.linkTo}
                to="/add-workout/manage"
                >Create
                </Link>
            </Card>
            <Card>
                <Typography variant="h3">Favorite exercises</Typography>
                <Link
                className={css.linkTo}
                to="/add-workout/favorite"
                >Check them
                </Link>
            </Card>

            <Outlet />
        </Container>
    )
}