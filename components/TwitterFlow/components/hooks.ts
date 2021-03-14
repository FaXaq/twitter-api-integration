import { useMemo } from "react";
import useSWR from "swr";
import fetcher from "../../../helpers/fetcher";
import { TwitterAPIResponse, User } from "../../../types/twitter";

export function useTweetsList(searchTerm: string) {
  const url = useMemo(() => {
    // if url is null, no fetch will be done
    if (searchTerm === '') return null;

    const searchParams = new URLSearchParams({ query: searchTerm }).toString();
    return `/api/twitter?${searchParams}`
  }, [searchTerm]);

  const { data: response, error } = useSWR<TwitterAPIResponse, any>(url, fetcher);

  // kind of a loading state
  if (response === undefined) {
    return { error: undefined, tweets: undefined, users: undefined, meta: undefined, isLoading: true };
  }

  console.log(response, error);

  // FIXME: we could use normalizr here
  // normalize users
  const users: { [key: string]: User } = {};
  response.includes.users.map(user => {
    users[user.id] = user;
  })

  return { error, tweets: response.data, users, meta: response.meta, isLoading: false };
}