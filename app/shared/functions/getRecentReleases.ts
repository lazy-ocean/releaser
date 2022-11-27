import type { Session } from "remix-auth-spotify";
import { ReleaseType } from "../features/filtersPanel/filtersPanel.interface";
import type { Album, ReleasesInterface } from "../types/types";
import { getData, ENDPOINTS, TYPES } from "../utils/getData";

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
  userData: Session,
  controller?: AbortController,
  type?: ReleaseType
) => {
  let recentReleases = new Map();
  const releaseType = type === ReleaseType.Both ? `album,single` : type;
  try {
    await Promise.all(
      artists.map(async (id) => {
        const albums: { items: Album[] } = await getData(
          userData.accessToken,
          ENDPOINTS.ARTISTS_RELEASES(id, releaseType),
          TYPES.GET,
          controller
        );
        albums?.items.forEach((album) => {
          const a = recentReleases.get(album.name);
          if (!a) {
            recentReleases.set(album.name, album);
          } else if (
            a.release_date !== album.release_date &&
            album.total_tracks !== a.total_tracks
          ) {
            recentReleases.set(`${album.name}_${album.id}`, album);
          }
        });
      })
    );
  } catch (e) {
    Promise.reject(new Error("Something went wrong"));
    controller?.abort();
    console.log(e);
  }

  return Array.from(recentReleases.values());
};
