import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { spotifyStrategy } from "~/services/auth.server";
import type { IndexData } from "~/shared/types/types";
import { Footer, Header, LoginForm, RegionalReleases } from "~/shared/features";
import {
  requestClientCredentials,
  getRegionalReleases,
} from "~/shared/functions";
import { useContext, useEffect, useState } from "react";
import ErrorLocationModal from "~/shared/features/regionalReleases/ErrorLocationModal";
import ModalContext from "~/shared/contexts/modalContext";

export const loader: LoaderFunction = async ({ request }) => {
  const userData = await spotifyStrategy.getSession(request);
  let releases = null;

  const baseAccessToken = await requestClientCredentials();
  if (baseAccessToken) {
    releases = await getRegionalReleases(baseAccessToken);
  }

  return { user: userData?.user, releases, baseAccessToken };
};

export default function Index() {
  const data = useLoaderData<IndexData>();
  const { user = null, releases, baseAccessToken } = data;
  const [regionalReleases, setRegionalReleases] = useState(releases);
  const { setIsModalOpen } = useContext(ModalContext);

  useEffect(() => {
    const getReleases = async () => {
      try {
        const chosenReleases = await getRegionalReleases(baseAccessToken);
        setRegionalReleases(chosenReleases);
      } catch (e) {
        setIsModalOpen("location-error");
      }
    };
    getReleases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseAccessToken]);

  return (
    <>
      <Header user={user} />
      <LoginForm user={user} />
      <RegionalReleases releases={regionalReleases.albums} />
      <ErrorLocationModal />
      <Footer />
    </>
  );
}
