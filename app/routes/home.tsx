import { useReducer } from "react";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { spotifyStrategy } from "~/services/auth.server";
import { ENDPOINTS } from "~/shared/utils/getData";
import type { Album, HomeData } from "~/shared/types/types";
import getFollowedArtists from "~/shared/functions/getFollowedArtists";
import { getRecentReleases } from "~/shared/functions/getRecentReleases";
import { Header, AlbumsTile } from "~/shared/features";
import filtersPanelReducer from "~/shared/features/filtersPanel/filtersPanel.reducer";
import chooseRecentAlbums from "~/shared/functions/chooseRecentAlbums";
import { groupAlbumsByDate } from "~/shared/functions/getRecentReleases";
import FiltersPanel from "~/shared/features/filtersPanel/filtersPanel";
import { HomePageContainer } from "~/shared/features/albumsTile/Tile.styled";

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
  const [state, dispatch] = useReducer(filtersPanelReducer, { period: 7 });

  return (
    <>
      <Header user={user} />
      <FiltersPanel dispatch={dispatch} state={state} />
      <HomePageContainer>
        {user && (
          <AlbumsTile
            releases={groupAlbumsByDate(
              chooseRecentAlbums(releases, state.period)
            )}
          />
        )}
      </HomePageContainer>
    </>
  );
}
