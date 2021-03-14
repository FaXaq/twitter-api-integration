import { useMemo } from "react";
import useSWR from "swr";
import fetcher from "../../../helpers/fetcher";
import { TwitterAPIResponse, User } from "../../../types/twitter";

export function useTweetsList(searchTerm: string) {
  const url = useMemo(() => {
    // if user has not entered at least two caracters,
    // no response !
    if (searchTerm.length < 2) return null;

    const searchParams = new URLSearchParams({ query: searchTerm }).toString();
    return `/api/twitter?${searchParams}`
  }, [searchTerm]);

  const { data: response, error } = useSWR<TwitterAPIResponse, any>(
    url,
    fetcher,
    // refresh every 10000ms
    { refreshInterval: 10000 }
  );

  // FIXME: hard coded loading state
  if (response === undefined) {
    return { error: undefined, tweets: undefined, users: undefined, meta: undefined, isLoading: true };
  }

  // no results
  if (response.meta.result_count === 0) {
    return {
      error: undefined, tweets: [], users: {}, meta: response.meta, isLoading: false
    }
  }

  // FIXME: we could use normalizr here
  // normalize users
  const users: { [key: string]: User } = {};
  response.includes.users.map(user => {
    users[user.id] = user;
  })

  return { error, tweets: response.data, users, meta: response.meta, isLoading: false };
}