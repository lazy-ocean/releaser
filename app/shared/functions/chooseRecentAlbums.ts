import type { Album } from "~/shared/types/types";
import { formatDistanceToNowStrict } from "date-fns";
import {
  LibraryAccessType,
  ReleaseType,
} from "../features/filtersPanel/filtersPanel.interface";
import { ENDPOINTS, getData } from "../utils/getData";

const LIMIT = 49;

const chooseRecentReleases = async (
  albums: Album[],
  range = 10,
  type: ReleaseType = ReleaseType.Both,
  libraryAccess: LibraryAccessType,
  user?: string
): Promise<Album[]> => {
  let recent = albums.filter(({ release_date, album_type }) => {
    const releaseDaysFromNow = formatDistanceToNowStrict(
      new Date(release_date),
      { unit: "day" }
    );
    const [n] = releaseDaysFromNow.split(" ");

    return (
      Number(n) <= range && (album_type === type || type === ReleaseType.Both)
    );
  });

  let releases: Album[] = [];

  if (user && libraryAccess !== LibraryAccessType.Songs) {
    while (recent.length) {
      let curr = recent.slice(0, LIMIT);
      let ids = curr.map(({ id }) => id);
      const liked = await getData(
        user,
        ENDPOINTS.IF_ALBUM_IN_LIBRARY(encodeURIComponent(ids.join(",")))
      );
      curr = curr.map((album, i) => ({ ...album, liked: liked[i] }));
      releases = [...releases, ...curr];
      recent = recent.slice(LIMIT);
    }
  } else releases = recent;

  return releases;
};

export default chooseRecentReleases;
