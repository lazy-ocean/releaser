import { useEffect, useReducer } from "react";
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
import filtersPanelReducer from "~/shared/features/filtersPanel/filtersPanel.reducer";
import {
  HomePageContainer,
  LoaderWrapper,
} from "~/shared/features/albumsTile/Tile.styled";
import {
  FilterActions,
  ReleaseType,
} from "~/shared/features/filtersPanel/filtersPanel.interface";
import { readFromLocalStorage } from "~/shared/utils/hooks/useLocalStorage";
import { ClipLoader } from "react-spinners";

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
    user: userData?.user,
    releases: recentReleases,
  };
  return res;
};

export default function HomePage() {
  const data = useLoaderData<HomeData>();
  const { user = null, releases } = data;
  const [state, dispatch] = useReducer(filtersPanelReducer, {
    period: null,
    type: ReleaseType.Both,
  });

  useEffect(() => {
    const period = readFromLocalStorage("period");
    dispatch({ type: FilterActions.ChangePeriod, value: Number(period) || 7 });
    const type = readFromLocalStorage("type");
    dispatch({
      type: FilterActions.ChangeType,
      value: type || ReleaseType.Both,
    });
  }, []);

  return (
    <>
      <Header user={user} />
      <main>
        {!state.period ? (
          <LoaderWrapper>
            <ClipLoader color="#1ed760" size={100} />
          </LoaderWrapper>
        ) : (
          <>
            <FiltersPanel dispatch={dispatch} state={state} />
            <HomePageContainer>
              {user && (
                <AlbumsTile
                  releases={groupAlbumsByDate(
                    chooseRecentReleases(releases, state.period, state.type)
                  )}
                />
              )}
            </HomePageContainer>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
