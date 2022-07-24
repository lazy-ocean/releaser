import type { LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { spotifyStrategy } from "~/services/auth.server";
import axios from "axios";

export const loader: LoaderFunction = async ({ request }) => {
  const userData = await spotifyStrategy.getSession(request);
  let followedArtists = null;
  if (userData?.user) {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/me/following?type=artist`,
      {
        headers: {
          Authorization: `Bearer ${userData?.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    /*     console.log(data); */
    followedArtists = data?.artists;
  }
  const res = {
    user: userData?.user,
    artists: followedArtists,
  };
  return res;
};

interface Artist {
  id: string;
  name: string;
}

interface IndexData {
  user: any;
  artists: { items: Artist[] };
}

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
            <ul>
              {artists?.items.map(({ name, id }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
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
