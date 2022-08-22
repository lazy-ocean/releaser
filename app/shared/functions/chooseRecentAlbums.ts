import type { Album } from "~/shared/types/types";
import { formatDistanceToNowStrict } from "date-fns";

const chooseRecentAlbums = (albums: Album[], range = 10) =>
  albums.filter(({ release_date }) => {
    const releaseDaysFromNow = formatDistanceToNowStrict(
      new Date(release_date),
      { unit: "day" }
    );
    const [n] = releaseDaysFromNow.split(" ");
    return Number(n) <= range;
  });

export default chooseRecentAlbums;
