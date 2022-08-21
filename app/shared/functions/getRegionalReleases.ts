import type { ReleasesInterface } from "../types/types";
import { getData, ENDPOINTS } from "../utils/getData";
import { groupAlbumsByDate } from "./getRecentReleases";
import getUserCountry from "./getUserCountry";

const getRegionalReleases = async (
  accessToken: string
): Promise<{ albums: ReleasesInterface; location: string }> => {
  const { country, countryCode } = await getUserCountry();
  const data = await getData(
    accessToken,
    ENDPOINTS.RECENT_RELEASES(countryCode)
  );
  return {
    albums: groupAlbumsByDate(data.albums.items),
    location: country,
  };
};

export default getRegionalReleases;
