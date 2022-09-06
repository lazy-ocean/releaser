import { useEffect, useState } from "react";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { spotifyStrategy } from "~/services/auth.server";
import { ENDPOINTS } from "~/shared/utils/getData";
import type { Album, HomeData } from "~/shared/types/types";
import {
  getFollowedArtists,
  getRecentReleases,
  chooseRecentReleases,
  groupAlbumsByDate,
} from "~/shared/functions";
import { Header, AlbumsTile, FiltersPanel, Footer } from "~/shared/features";
import {
  HomePageContainer,
  LoaderWrapper,
} from "~/shared/features/albumsTile/Tile.styled";
import { ReleaseType } from "~/shared/features/filtersPanel/filtersPanel.interface";
import { readFromLocalStorage } from "~/shared/utils/hooks/useLocalStorage";
import { ClipLoader } from "react-spinners";
import UserContext from "~/shared/contexts/userContext";

export const loader: LoaderFunction = async ({ request }) => {
  const userData = await spotifyStrategy.getSession(request);
  let recentReleases: Album[] = [];

  if (userData?.user) {
    const followedArtists = await getFollowedArtists(
      ENDPOINTS.FOLLOWED_ARTISTS_API,
      userData
    );
    recentReleases = await getRecentReleases(followedArtists, userData);
  }

  const res = {
    user: userData,
    releases: recentReleases,
  };
  return res;
};

export default function HomePage() {
  const data = useLoaderData<HomeData>();
  const { user = null, releases } = data;
  const [albums, setAlbums] = useState<Album[] | []>([]);
  const [period, setPeriod] = useState<number | null>(null);
  const [type, setType] = useState(ReleaseType.Both);

  useEffect(() => {
    const period = readFromLocalStorage("period");
    setPeriod(Number(period) || 7);
    const type = readFromLocalStorage("type");
    if (type) setType(type);
  }, []);

  useEffect(() => {
    if (period) {
      const getAlbums = async () => {
        const data = await chooseRecentReleases(
          releases,
          period,
          type,
          user?.accessToken
        );
        setAlbums(data);
      };
      getAlbums();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, type, releases]);

  return (
    <UserContext.Provider value={{ user }}>
      <>
        <Header user={user?.user} />
        <main>
          {!period ? (
            <LoaderWrapper>
              <ClipLoader color="#1ed760" size={100} />
            </LoaderWrapper>
          ) : (
            albums && (
              <>
                <FiltersPanel
                  type={type}
                  setType={setType}
                  period={period}
                  setPeriod={setPeriod}
                />
                <HomePageContainer>
                  {user && <AlbumsTile releases={groupAlbumsByDate(albums)} />}
                </HomePageContainer>
              </>
            )
          )}
        </main>
        <Footer />
      </>
    </UserContext.Provider>
  );
}
