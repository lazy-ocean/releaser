import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { spotifyStrategy } from "~/services/auth.server";
import type { IndexData } from "~/shared/types/types";
import { Footer, Header, LoginForm, RegionalReleases } from "~/shared/features";
import {
  requestClientCredentials,
  getRegionalReleases,
} from "~/shared/functions";

export const loader: LoaderFunction = async ({ request }) => {
  const userData = await spotifyStrategy.getSession(request);
  let releases = null;

  const baseAccessToken = await requestClientCredentials();
  if (baseAccessToken) {
    releases = await getRegionalReleases(baseAccessToken);
  }

  return { user: userData?.user, releases };
};

export default function Index() {
  const data = useLoaderData<IndexData>();
  const { user = null, releases } = data;

  return (
    <>
      <Header user={user} />
      <LoginForm user={user} />
      <RegionalReleases
        releases={releases.albums}
        location={releases.location}
      />
      <Footer />
    </>
  );
}
