import type { Album } from "~/shared/types/types";
import { formatDistanceToNowStrict } from "date-fns";
import { ReleaseType } from "../features/filtersPanel/filtersPanel.interface";
import { ENDPOINTS, getData } from "../utils/getData";

const chooseRecentReleases = async (
  albums: Album[],
  range = 10,
  type: ReleaseType = ReleaseType.Both,
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
  const ids = recent.map(({ id }) => id);

  if (user) {
    const liked = await getData(
      user,
      ENDPOINTS.IF_ALBUM_IN_LIBRARY(encodeURIComponent(ids.join(",")))
    );
    recent = recent.map((album, i) => ({ ...album, liked: liked[i] }));
  }

  return recent;
};

export default chooseRecentReleases;
