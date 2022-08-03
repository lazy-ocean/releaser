import type { Artist } from "../types/types";
import { getData } from "../utils/getData";
import type { Session } from "remix-auth-spotify";

const getFollowedArtists = async (
  link: string,
  userData: Session,
  followedArtists: Artist[] = []
): Promise<Artist[]> => {
  const data = await getData(userData, link);
  followedArtists = [...followedArtists, ...data?.artists.items];
  if (data.artists.next)
    return await getFollowedArtists(
      data.artists.next,
      userData,
      followedArtists
    );
  return followedArtists;
};

export default getFollowedArtists;
