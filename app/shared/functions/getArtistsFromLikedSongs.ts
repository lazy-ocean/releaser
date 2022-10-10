import { ENDPOINTS, getData, TYPES } from "../utils/getData";
import type { Artist } from "../types/types";

interface Track {
  artists: Artist[];
}

const API_LIMIT = 9000;

const getArtistsFromLikedSongs = async (
  userData: string,
  setCount: (arg: number) => void,
  total: number,
  setTotal: (arg: number) => void,
  signal: AbortSignal
): Promise<string[]> => {
  let limit = 0;
  let artists = new Set<string>();

  const getLikedSongs = async (link: string): Promise<void> => {
    limit += 50;
    setCount(limit);
    const data = await getData(userData, link, TYPES.GET);
    if (total !== data.total) setTotal(data.total);
    const tracks = data.items;
    tracks.forEach((track: { track: Track }) => {
      const artistsList = track.track.artists;
      artistsList.forEach((arttist: Artist) => artists.add(arttist.id));
    });

    if (data.next && limit < API_LIMIT && !signal.aborted)
      return await getLikedSongs(data.next);
  };

  await getLikedSongs(ENDPOINTS.GET_SAVED_TRACKS);
  return Array.from(artists);
};

export default getArtistsFromLikedSongs;
