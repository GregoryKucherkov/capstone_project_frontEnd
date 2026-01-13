import css from "./FeedComponent.module.css"

<li className={css.feedItem}>
  {/* Header */}
  <div className={css.feedHeader}>
    <div className={css.userInfo}>
      <span className={css.avatar}>🧑</span>
      <span className={css.userName}>Maria</span>
    </div>
    <span className={css.timestamp}>2h ago</span>
  </div>

  {/* Body */}
  <div className={css.feedBody}>
    <p className={css.actionText}>finished Leg Day</p>
    <p className={css.metaText}>62 min • 4 exercises</p>
  </div>

  {/* Footer */}
  <div className={css.feedFooter}>
    <button type="button">❤️ Like</button>
    <button type="button">💬 Comment</button>
  </div>

  {/* Collapsible comments (later) */}
  {/* <div className={css.comments}>...</div> */}
</li>
