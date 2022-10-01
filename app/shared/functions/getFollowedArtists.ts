import type { Artist } from "../types/types";
import { getData } from "../utils/getData";
import type { Session } from "remix-auth-spotify";

const getFollowedArtists = async (
  link: string,
  userData: Session,
  followedArtists: string[] = []
): Promise<string[]> => {
  const data = await getData(userData.accessToken, link);
  followedArtists = [
    ...followedArtists,
    ...data?.artists.items.map((item: Artist) => item.id),
  ];
  if (data.artists.next)
    return await getFollowedArtists(
      data.artists.next,
      userData,
      followedArtists
    );
  return followedArtists;
};

export default getFollowedArtists;
