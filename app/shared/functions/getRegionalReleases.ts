import type { ReleasesInterface } from "../types/types";
import { getData, ENDPOINTS } from "../utils/getData";
import { groupAlbumsByDate } from "./getRecentReleases";

const getRegionalReleases = async (
  accessToken: string
): Promise<{ albums: ReleasesInterface; location: string }> => {
  const data = await getData(accessToken, ENDPOINTS.RECENT_RELEASES("GB"));
  return {
    albums: groupAlbumsByDate(data.albums.items),
    location: "the UK",
  };
};

export default getRegionalReleases;
