import axios from "axios";

export const ENDPOINTS = {
  FOLLOWED_ARTISTS_API: `https://api.spotify.com/v1/me/following?type=artist`,
  ARTISTS_RELEASES: (id: string): string =>
    `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single`,
  RECENT_RELEASES: (country: string = "US"): string =>
    `https://api.spotify.com/v1/browse/new-releases?country=${country}`,
  REQUEST_TOKEN: "https://accounts.spotify.com/api/token",
};

export const getData = async (accessToken: string, url: string) => {
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return data;
};
