import type { NextApiRequest, NextApiResponse } from 'next';
import { API_KEY_BEARER } from '../../env';

// Additional fields returned byb the API to enriching the tweet
const TWEET_FIELDS = ['created_at'];
// Additional fields returned byb the API to enriching the user
const USER_FIELDS = ['url', 'name', 'username', 'profile_image_url', 'verified'];
const EXPANSIONS = ['author_id', 'entities.mentions.username'];
const MAX_RESULTS = '10';

async function searchTwitter(query: string) {
  const url = new URL('https://api.twitter.com/2/tweets/search/recent');
  url.search = new URLSearchParams({
    query,
    max_results: MAX_RESULTS,
    "tweet.fields": TWEET_FIELDS.join(','),
    "user.fields": USER_FIELDS.join(','),
    expansions: EXPANSIONS.join(','),
  }).toString();

  const TWITTER_RESPONSE = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${API_KEY_BEARER}`
    }
  });

  return await TWITTER_RESPONSE.json();
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // FIXME: We should have at least a few things checking security
  let query = req.query.query;

  // sanitize query parameter
  if (query instanceof Array) {
    query = query.join(',');
  }

  const body = await searchTwitter(query);

  res.send(body);
}
