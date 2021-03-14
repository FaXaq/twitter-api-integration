import { Tweet, User } from "../../../types/twitter"
import { DateTime } from 'luxon';
import styles from './TweetCard.module.css'
import { formatDuration } from "../../../helpers/duration";
import TweetContent from "./TweetContent";

type ITweetProps = {
  tweet: Tweet,
  users: {[key: string]: User},
}

export default function TweetCard({ tweet, users }: ITweetProps) {
  const author = users[tweet.author_id];

  const tweetDate = DateTime.fromISO(tweet.created_at);

  const diff = tweetDate.diffNow().toMillis();

  return <div className={styles.container}>
    <div>
      <img
        src={author.profile_image_url}
        className={styles.authorProfilePic}
        aria-label={`${author.username} profile pic`}
        alt={`${author.username} profile pic`}/>
    </div>
    <div className={styles.tweet}>
      <div className={styles.tweetHeader}>
        <a
          href={`https://twitter.com/${author.username}`}
          className={styles.tweetAuthor}
        >
          {author.name}
          <span className={styles.tweetAuthorUsername}> @{author.username}</span>
        </a>
        <p className={styles.tweetDuration}>{formatDuration(diff)}</p>
      </div>
      <div className={styles.tweetContent}>
        <TweetContent tweet={tweet} />
      </div>
    </div>
  </div>
}