import type { LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { spotifyStrategy } from "~/services/auth.server";
import { getData, ENDPOINTS } from "~/shared/utils/getData";
import type { Album, Artist, IndexData } from "~/shared/types/types";

export const loader: LoaderFunction = async ({ request }) => {
  const userData = await spotifyStrategy.getSession(request);
  let followedArtists: Artist[] | [] = [];

  const getFollowedArtists = async (link: string) => {
    const data = await getData(userData, link);
    followedArtists = [...followedArtists, ...data?.artists.items];
    if (data.artists.next) await getFollowedArtists(data.artists.next);
  };

  if (userData?.user) {
    await getFollowedArtists(ENDPOINTS.FOLLOWED_ARTISTS_API);
    const albums: { items: Album[] } = await getData(
      userData,
      ENDPOINTS.ARTISTS_RELEASES(followedArtists[0].id)
    );
    console.log(albums);
  }

  const res = {
    user: userData?.user,
    artists: followedArtists,
  };
  return res;
};

export default function Index() {
  const data = useLoaderData<IndexData>();
  const { user = null, artists } = data;
  return (
    <div>
      {user ? (
        <>
          <p>You are logged in as: {user?.email}</p>
          <div>
            <p>Followed artists:</p>
            <ol>
              {artists?.map(({ name, id }) => (
                <li key={id}>{name}</li>
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
  );
}
