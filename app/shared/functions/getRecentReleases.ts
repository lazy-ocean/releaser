import type { Session } from "remix-auth-spotify";
import type { Album, ReleasesInterface } from "../types/types";
import { getData, ENDPOINTS } from "../utils/getData";

export const groupAlbumsByDate = (albums: Album[]) =>
  albums.reduce((acc, release) => {
    const { release_date } = release;
    acc[release_date] = acc[release_date]
      ? [...acc[release_date], release]
      : [release];
    return acc;
  }, {} as ReleasesInterface);

export const getRecentReleases = async (
  artists: string[],
  userData: Session
) => {
  let recentReleases: Album[] = [];
  try {
    await Promise.all(
      artists.map(async (id) => {
        const albums: { items: Album[] } = await getData(
          userData.accessToken,
          ENDPOINTS.ARTISTS_RELEASES(id)
        );
        recentReleases = [...recentReleases, ...albums.items];
      })
    );
    recentReleases = [
      ...new Map(recentReleases.map((v) => [v.id, v])).values(),
    ];
  } catch (e) {
    console.log(e);
  }

  return recentReleases;
};
