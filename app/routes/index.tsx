import type { LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { spotifyStrategy } from "~/services/auth.server";
import { ENDPOINTS } from "~/shared/utils/getData";
import type { ReleasesInterface, IndexData } from "~/shared/types/types";
import getFollowedArtists from "~/shared/functions/getFollowedArtists";
import getRecentReleases from "~/shared/functions/getRecentReleases";
import { Card, Header } from "~/shared/features";

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

export default function Index() {
  const data = useLoaderData<IndexData>();
  const { user = null, releases } = data;

  return (
    <>
      <Header user={user} />
      <div>
        {user ? (
          <>
            <div>
              <p>Releases:</p>
              <ol>
                {Object.entries(releases).map(([key, values]) => (
                  <>
                    <p>{key}</p>
                    {values?.map((release) => (
                      <Card release={release} key={release.id} />
                    ))}
                  </>
                ))}
              </ol>
            </div>
          </>
        ) : (
          <p>You are not logged in yet!</p>
        )}
        <Form action={user ? "/logout" : "/auth/spotify"} method="post">
          <button>{user ? "Logout" : "Log in with Spotify"}</button>
        </Form>
      </div>
    </>
  );
}
