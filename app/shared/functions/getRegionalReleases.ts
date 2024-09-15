import type { ReleasesInterface } from "../types/types";
import { getData, ENDPOINTS } from "../utils/getData";
import { groupAlbumsByDate } from "./getRecentReleases";

const getRegionalReleases = async (
  accessToken: string
): Promise<{ albums: ReleasesInterface }> => {
  const data = await getData(accessToken, ENDPOINTS.RECENT_RELEASES());
  return {
    albums: groupAlbumsByDate(data.albums.items),
  };
};

export default getRegionalReleases;
