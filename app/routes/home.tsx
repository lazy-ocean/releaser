import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { spotifyStrategy } from "~/services/auth.server";
import { ENDPOINTS } from "~/shared/utils/getData";
import type { ReleasesInterface, HomeData } from "~/shared/types/types";
import getFollowedArtists from "~/shared/functions/getFollowedArtists";
import { getRecentReleases } from "~/shared/functions/getRecentReleases";
import { Header, AlbumsTile } from "~/shared/features";

export const loader: LoaderFunction = async ({ request }) => {
  const userData = await spotifyStrategy.getSession(request);
  let recentReleases: ReleasesInterface = {};

  if (userData?.user) {
    const followedArtists = await getFollowedArtists(
      ENDPOINTS.FOLLOWED_ARTISTS_API,
      userData
    );
    recentReleases = await getRecentReleases(followedArtists, userData);
  }

  const res = {
    user: userData?.user,
    releases: recentReleases,
  };
  return res;
};

export default function HomePage() {
  const data = useLoaderData<HomeData>();
  const { user = null, releases } = data;

  return (
    <>
      <Header user={user} />
      <div>{user && <AlbumsTile releases={releases} />}</div>
    </>
  );
}
