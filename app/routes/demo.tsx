import { useEffect, useState, useRef } from "react";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Album, HomeData } from "~/shared/types/types";
import { UserType } from "~/shared/types/types";
import { chooseRecentReleases, groupAlbumsByDate } from "~/shared/functions";
import {
  Header,
  AlbumsTile,
  FiltersPanel,
  Footer,
  AnchorButton,
} from "~/shared/features";
import {
  HomePageContainer,
  LoaderWrapper,
} from "~/shared/features/albumsTile/Tile.styled";
import {
  LibraryAccessType,
  ReleaseType,
} from "~/shared/features/filtersPanel/filtersPanel.interface";
import { readFromLocalStorage } from "~/shared/utils/hooks/useLocalStorage";
import UserContext from "~/shared/contexts/userContext";
import AlertContext from "~/shared/contexts/alertContext";
import type { AlertType } from "~/shared/components/alert/Alert.interface";
import { Alert } from "~/shared/components";
import Loader from "~/shared/features/loader/Loader";
import newReleases from "../mocks/releases.json";

export const loader: LoaderFunction = async ({ request }) => {
  let recentReleases: Album[] = [];

  recentReleases = newReleases;

  const res = {
    user: { type: UserType.demo },
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
  const [isLoading, setIsLoading] = useState(false);
  const songsControllerRef = useRef<AbortController | null>(null);
  const releasesControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const period = readFromLocalStorage("period");
    setPeriod(Number(period) || 7);
    const type = readFromLocalStorage("type");
    if (type) setType(type);
    const library = readFromLocalStorage("library");
    if (library) setLibraryAccess(library);
    songsControllerRef.current = new AbortController();
    releasesControllerRef.current = new AbortController();
  }, []);

  useEffect(() => {
    if (period) {
      setIsLoading(true);
      const getAlbums = async () => {
        let allReleases = releases;
        if (libraryAccess === LibraryAccessType.Songs) {
          songsControllerRef.current = new AbortController();
        }
        const data = await chooseRecentReleases(
          allReleases,
          period,
          type,
          libraryAccess,
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
        <Header user={user?.user} />
        <main style={{ position: "relative" }}>
          <AnchorButton />
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
            <Loader
              total={0}
              libraryAccess={libraryAccess}
              count={0}
              controller={songsControllerRef}
            />
          ) : albums.length ? (
            <HomePageContainer id="main">
              <AlbumsTile releases={groupAlbumsByDate(albums)} />
            </HomePageContainer>
          ) : (
            <LoaderWrapper>
              <h3>
                Looks like there's nothing there 🤔
                <br />
                Try adjusting filters or go like more of your favourite artists
                on Spotify!
              </h3>
            </LoaderWrapper>
          )}
          <Alert />
        </main>
        <Footer />
      </AlertContext.Provider>
    </UserContext.Provider>
  );
}
