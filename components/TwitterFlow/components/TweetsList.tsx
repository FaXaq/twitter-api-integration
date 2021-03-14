import { useTweetsList } from "./hooks";
import TweetCard from './TweetCard';

type ITweetListProps = {
  searchTerm: string
}

export default function TweetsList({ searchTerm }: ITweetListProps) {
  const { tweets, users, error, meta, isLoading } = useTweetsList(searchTerm);

  if (searchTerm === '') {
    return <p>Please enter a query of at least two characters</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (meta.result_count === 0) {
    return <p>Oops... no result here :(</p>
  }

  return (
    <ul>
      {tweets.map(tweet => (
        <li key={tweet.id}>
          <TweetCard tweet={tweet} users={users} />
        </li>
      ))}
    </ul>
  )
}