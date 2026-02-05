import { Typography } from "@/shared/ui/typography/Typography";
import css from "./Social.module.css";
import Container from "@/shared/ui/container/Container";

export const Social = () => {
  return (
    <section>
      <Container>
        <div className={css.textWrapper}>
          <Typography variant="h2">Social</Typography>
          <Typography variant="body" className={css.description}>
            The motivation of a crew.
          </Typography>
        </div>

        <div className={css.cardsWrapper}>
          <Typography variant="h3" className={css.cardTitle}>
            Feed
          </Typography>
          <ul className={css.socialFeed}>
            <li className={css.feedItem}>
              <div className={css.feedHeader}>
                <span className={css.userName}>
                  <span role="img" aria-label="person">
                    🧑{" "}
                  </span>
                  Alex
                </span>
              </div>

              <div className={css.feedAction}>
                <span>Completed Chest Day</span>
              </div>

              <div className={css.feedMeta}>
                <span>55 min </span>
                <span> • </span>
                <span>3 exercises</span>
              </div>

              <div className={css.feedStats}>
                <span>❤️ 12 </span>
                <span> 💬 3 </span>
              </div>
            </li>

            <li className={css.feedItem}>
              <div className={css.feedHeader}>
                <span className={css.userName}>
                  <span role="img" aria-label="person">
                    🧑{" "}
                  </span>
                  Maria
                </span>
              </div>

              <div className={css.feedAction}>
                <span>Finished Leg Day</span>
              </div>

              <div className={css.feedMeta}>
                <span>62 min</span>
                <span> • </span>
                <span>4 exercises</span>
              </div>

              <div className={css.feedStats}>
                <span>❤️ 20</span>
                <span> 💬 5</span>
              </div>
            </li>

            <li className={css.feedItem}>
              <div className={css.feedHeader}>
                <span className={css.userName}>
                  <span role="img" aria-label="person">
                    🧑{" "}
                  </span>
                  John
                </span>
              </div>

              <div className={css.feedAction}>
                <span>Started Push Day</span>
              </div>

              <div className={css.feedMeta}>
                <span>just now</span>
              </div>

              <div className={css.feedStats}>
                <span>❤️ 4</span>
              </div>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
};
