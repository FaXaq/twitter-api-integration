export type Mention = {
  start: number,
  end: number,
  username: string
};

export type User = {
  id: string,
  name: string,
  url: string,
  username: string,
  verified: boolean,
  profile_image_url: string
}

export type Tweet = {
  id: string,
  author_id: string,
  text: string,
  entities?: {
    mentions?: Array<Mention>
  },
  referenced_tweets?: Array<{
    type: string,
    id: string,
  }>
}

export type TwitterAPIResponse = {
  data: Array<Tweet>,
  includes: {
    users: Array<User>
  },
  meta: {
    newest_id: string,
    oldest_id: string,
    result_count: number,
    next_token: string,
  }
}