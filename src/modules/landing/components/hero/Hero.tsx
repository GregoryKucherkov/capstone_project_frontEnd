import { Typography } from "@/shared/ui/typography/Typography"
import css from "./Hero.module.css"
import { Button } from "@/shared/ui/button/Button"

export const Hero = () => {

    return (
        <section className={css.container}>
            <div className={css.heroSection}>
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
                        size="medium"
                       
                        // onClick={handleClick}
                    >
                        Sign In / Sign Up
                    </Button>
                </div>
            </div>
        </section>
    )
}