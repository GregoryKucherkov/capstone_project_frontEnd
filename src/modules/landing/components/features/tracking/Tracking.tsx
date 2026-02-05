import Container from "@/shared/ui/container/Container";
import css from "./Tacking.module.css";
import { Button } from "@/shared/ui/button/Button";
import { Typography } from "@/shared/ui/typography/Typography";
import clsx from "clsx";

export const Tracking = () => {
  return (
    <section>
      <Container>
        <div className={css.textWrapper}>
          <Typography variant="h2">Tracking</Typography>
          <Typography variant="body" className={css.description}>
            Watch the numbers go up.
          </Typography>
        </div>

        <div className={clsx(css.cardsWrapper, css.tracking)}>
          <Typography variant="h3" className={css.cardTitle}>
            When: This week
          </Typography>

          <ul className={css.ulTracking}>
            <li className={css.liTracking}>
              <div className={css.trackingDetails}>
                <Typography variant="h4">Chest Day</Typography>
              </div>
              {/* Stats row */}
              <div className={css.cardStats}>
                <div className={css.statBox}>
                  <span className={css.statLabel}>Date: </span>
                  <span className={css.statValue}>Monday, Jan 11 </span>
                </div>

                <div className={css.statBox}>
                  <span className={css.statLabel}>Duration: </span>
                  <span className={css.statValue}>55 min </span>
                </div>

                <div className={css.statBox}>
                  <span className={css.statLabel}>Status: </span>
                  <span className={css.statValue}>✔ Done </span>
                </div>
              </div>
              {/* Action */}

              <Button
                className={css.trackinButton}
                type="button"
                variant="pink"
                size="small"
              >
                View details
              </Button>
            </li>

            <li className={css.liTracking}>
              <div className={css.trackingDetails}>
                <Typography variant="h4">Arms</Typography>
              </div>
              {/* Stats row */}
              <div className={css.cardStats}>
                <div className={css.statBox}>
                  <span className={css.statLabel}>Date:</span>
                  <span className={css.statValue}>Wednesday, Jan 13</span>
                </div>

                <div className={css.statBox}>
                  <span className={css.statLabel}>Duration: </span>
                  <span className={css.statValue}>60 min</span>
                </div>

                <div className={css.statBox}>
                  <span className={css.statLabel}>Status:</span>
                  <span className={css.statValue}>✔ Done</span>
                </div>
              </div>
              {/* Action */}

              <Button
                className={css.trackinButton}
                type="button"
                variant="pink"
                size="small"
              >
                View details
              </Button>
            </li>

            <li className={css.liTracking}>
              <div className={css.trackingDetails}>
                <Typography variant="h4">Legs</Typography>
              </div>
              {/* Stats row */}
              <div className={css.cardStats}>
                <div className={css.statBox}>
                  <span className={css.statLabel}>Date:</span>
                  <span className={css.statValue}>Friday, Jan 15</span>
                </div>

                <div className={css.statBox}>
                  <span className={css.statLabel}>Duration: </span>
                  <span className={css.statValue}>60 min</span>
                </div>

                <div className={css.statBox}>
                  <span className={css.statLabel}>Status:</span>
                  <span className={css.statValue}>✔ Planned</span>
                </div>
              </div>
              {/* Action */}

              <Button
                className={css.trackinButton}
                type="button"
                variant="pink"
                size="small"
              >
                View details
              </Button>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
};
