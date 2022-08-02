import axios from "axios";
import type { Session } from "remix-auth-spotify";

export const ENDPOINTS = {
  FOLLOWED_ARTISTS_API: `https://api.spotify.com/v1/me/following?type=artist`,
  ARTISTS_RELEASES: (id: string): string =>
    `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single`,
};

export const getData = async (userData: Session | null, url: string) => {
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${userData?.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return data;
};
