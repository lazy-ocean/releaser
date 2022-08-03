import type { Session } from "remix-auth-spotify";
import type { Album, Artist } from "../types/types";
import { getData, ENDPOINTS } from "../utils/getData";
import chooseRecentAlbums from "./chooseRecentAlbums";

const getRecentReleases = async (
  artists: Artist[],
  userData: Session
): Promise<Album[]> => {
  let recentReleases: Album[] = [];
  await Promise.all(
    artists.map(async ({ id }) => {
      const albums: { items: Album[] } = await getData(
        userData,
        ENDPOINTS.ARTISTS_RELEASES(id)
      );
      recentReleases = [...recentReleases, ...chooseRecentAlbums(albums.items)];
    })
  );
  recentReleases = [...new Map(recentReleases.map((v) => [v.id, v])).values()];
  return recentReleases;
};

export default getRecentReleases;
