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
import {
  LibraryAccessType,
  ReleaseType,
} from "~/shared/features/filtersPanel/filtersPanel.interface";
import { readFromLocalStorage } from "~/shared/utils/hooks/useLocalStorage";
import { ClipLoader } from "react-spinners";
import UserContext from "~/shared/contexts/userContext";
import AlertContext from "~/shared/contexts/alertContext";
import type { AlertType } from "~/shared/components/alert/Alert.interface";
import { Alert } from "~/shared/components";
import ModalContext from "~/shared/contexts/modalContext";
import getArtistsFromLikedSongs from "~/shared/functions/getArtistsFromLikedSongs";

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
  const [libraryAccess, setLibraryAccess] = useState<LibraryAccessType>(
    LibraryAccessType.Artists
  );
  const [type, setType] = useState(ReleaseType.Both);
  const [alertIsOpen, setAlertIsOpen] = useState<AlertType | false>(false);
  const [alertText, setAlertText] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<string | false>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const period = readFromLocalStorage("period");
    setPeriod(Number(period) || 7);
    const type = readFromLocalStorage("type");
    if (type) setType(type);
    const library = readFromLocalStorage("library");
    if (library) setLibraryAccess(library);
  }, []);

  useEffect(() => {
    if (period && user) {
      const getAlbums = async () => {
        let allReleases = releases;
        if (libraryAccess === LibraryAccessType.Songs) {
          setIsLoading(true);
          const likedArtists = await getArtistsFromLikedSongs(
            user?.accessToken,
            setCount,
            total,
            setTotal
          );
          allReleases = await getRecentReleases(likedArtists, user);
        }
        const data = await chooseRecentReleases(
          allReleases,
          period,
          type,
          user?.accessToken
        );
        setIsLoading(false);
        setAlbums(data);
      };
      getAlbums();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, type, libraryAccess]);

  return (
    <UserContext.Provider value={{ user }}>
      <AlertContext.Provider
        value={{ alertIsOpen, setAlertIsOpen, alertText, setAlertText }}
      >
        <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
          <>
            <Header user={user?.user} />
            <main style={{ position: "relative" }}>
              {period && (
                <FiltersPanel
                  type={type}
                  setType={setType}
                  period={period}
                  setPeriod={setPeriod}
                  libraryAccess={libraryAccess}
                  setLibraryAccess={setLibraryAccess}
                />
              )}
              {isLoading ? (
                <LoaderWrapper>
                  <ClipLoader color="#1ed760" size={100} />
                  {!!total && libraryAccess === LibraryAccessType.Songs && (
                    <h3>
                      Processed <span>{count}</span> of <span>{total}</span>{" "}
                      your liked songs
                    </h3>
                  )}
                </LoaderWrapper>
              ) : (
                albums && (
                  <HomePageContainer>
                    {user && (
                      <AlbumsTile releases={groupAlbumsByDate(albums)} />
                    )}
                  </HomePageContainer>
                )
              )}
              <Alert />
            </main>
            <Footer />
          </>
        </ModalContext.Provider>
      </AlertContext.Provider>
    </UserContext.Provider>
  );
}
