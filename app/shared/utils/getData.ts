import axios from "axios";

export const ENDPOINTS = {
  FOLLOWED_ARTISTS_API: `https://api.spotify.com/v1/me/following?type=artist`,
  ARTISTS_RELEASES: (id: string, type?: string): string =>
    `https://api.spotify.com/v1/artists/${id}/albums?include_groups=${
      type ? type : "album,single"
    }`,
  RECENT_RELEASES: (): string =>
    `https://api.spotify.com/v1/browse/new-releases?limit=10`,
  REQUEST_TOKEN: "https://accounts.spotify.com/api/token",
  IF_ALBUM_IN_LIBRARY: (id: string) =>
    `https://api.spotify.com/v1/me/albums/contains?ids=${id}`,
  ADD_ALBUM: (id: string) => `https://api.spotify.com/v1/me/albums?ids=${id}`,
  GET_PLAYLISTS: "https://api.spotify.com/v1/me/playlists",
  GET_PLAYLIST_TRACKS: (
    id: string
  ) => `https://api.spotify.com/v1/playlists/${id}/tracks
  `,
  GET_ALBUM_TRACKS: (id: string) =>
    `https://api.spotify.com/v1/albums/${id}/tracks?limit=50`,
  ADD_TO_PLAYLIST: (id: string, uris: string) =>
    `https://api.spotify.com/v1/playlists/${id}/tracks?uris=${uris}`,
  GET_SAVED_TRACKS: `https://api.spotify.com/v1/me/tracks?limit=50`,
};

export enum TYPES {
  GET = "get",
  PUT = "put",
  DELETE = "delete",
  POST = "post",
}

export const getData = async (
  accessToken: string,
  url: string,
  type: TYPES = TYPES.GET,
  controller?: AbortController
) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  let data = null;
  try {
    switch (type) {
      case TYPES.GET:
        data = await axios.get(url, {
          headers,
          signal: controller?.signal,
        });
        break;
      case TYPES.PUT:
        data = await axios.put(url, null, {
          headers,
          signal: controller?.signal,
        });
        break;
      case TYPES.DELETE:
        data = await axios.delete(url, {
          headers,
          signal: controller?.signal,
        });
        break;
      case TYPES.POST:
        data = await axios.post(url, null, {
          headers,
          signal: controller?.signal,
        });
        break;
      default:
        break;
    }
  } catch (e) {
    controller && controller.abort();
  }

  return data?.data;
};
