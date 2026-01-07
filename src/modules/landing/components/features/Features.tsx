import { Typography } from "@/shared/ui/typography/Typography";
import css from "./Features.module.css";
import Container from "@/shared/ui/container/Container";

import plannerImg from '@/assets/images/features/planner.jpg';
import statsImg from '@/assets/images/features/logging.png';
import socialMockup from '@/assets/images/features/feed-mockup.png';

// Planning: "Build your perfect week." (Screenshot of the planner).

// Tracking: "Watch the numbers go up." (Image of a progress chart).

// Social: "The motivation of a crew." (Small avatars/bubbles showing "John just finished Leg Day!").



export const Features = () => {
    return (
        <section className={css.container}>
            <Container className={css.container__extra}>
                <Typography variant="h2">Features</Typography>

                {/* --- Planning Section --- */}
                    <div className={css.textWrapper}>
                        <Typography variant="h3">Planning</Typography>
                        <Typography className={css.description} variant="body">"Build your perfect workout week."</Typography>
                    </div>
                    <div className={css.imageWrapper}>
                        <img 
                        src={plannerImg} 
                        alt="Workout Planner"
                        width="400" 
                        height="300"
                        loading="lazy" 
                        />
                    </div>
    

            {/* --- Tracking Section --- */}
                
                    <div className={css.textWrapper}>
                        <Typography variant="h2">Tracking</Typography>
                        <Typography variant="body">
                            Watch the numbers go up.
                        </Typography>
                    </div>
                    <div className={css.imageWrapper}>
                        <img 
                            src={statsImg} 
                            alt="Progress tracking charts"
                            width="200" 
                            height="200"
                            loading="lazy" 
                        />
                    </div>

            {/* --- SOCIAL --- */}

                    <div className={css.textWrapper}>
                        <Typography variant="h2">Social</Typography>
                        <Typography variant="body">
                            The motivation of a crew.
                        </Typography>
                    </div>
                    <div className={css.imageWrapper}>
                        <img 
                            src={socialMockup} 
                            alt="Community activity feed"
                            width="200" 
                            height="200"
                            loading="lazy" 
                        />
                    </div>

            </Container>
        </section>
    )
}