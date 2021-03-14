import { Tweet, User } from "../../../types/twitter"

type ITweetProps = {
  tweet: Tweet,
  users: {[key: string]: User},
}

export default function TweetCard({ tweet, users }: ITweetProps) {
  return <div>
    {tweet.text}
  </div>
}