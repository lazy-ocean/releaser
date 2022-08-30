import type { Album } from "~/shared/types/types";
import { formatDistanceToNowStrict } from "date-fns";
import { ReleaseType } from "../features/filtersPanel/filtersPanel.interface";

const chooseRecentReleases = (
  albums: Album[],
  range = 10,
  type: ReleaseType = ReleaseType.Both
) =>
  albums.filter(({ release_date, album_type }) => {
    const releaseDaysFromNow = formatDistanceToNowStrict(
      new Date(release_date),
      { unit: "day" }
    );
    const [n] = releaseDaysFromNow.split(" ");

    return (
      Number(n) <= range && (album_type === type || type === ReleaseType.Both)
    );
  });

export default chooseRecentReleases;
