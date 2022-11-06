import type { Album, ReleasesInterface } from "~/shared/types/types";
import { Card } from "~/shared/features";
import {
  DayList,
  ReleaseDate,
  ReleasesPanel,
  ReleasesRow,
} from "./Tile.styled";
import { format } from "date-fns";

const AlbumsTile = ({ releases }: { releases: ReleasesInterface }) => {
  const sortedDates = Object.keys(releases).sort(
    (a, b) => Date.parse(b) - Date.parse(a)
  );

  return (
    <ReleasesPanel>
      {sortedDates.map((date, i) => (
        <ReleasesRow key={i} as="section">
          <ReleaseDate tabIndex={0}>
            {format(new Date(date), "d MMMM")}
          </ReleaseDate>
          <DayList as="ul">
            {releases[date]?.map((release: Album) => (
              <Card release={release} key={release.id} />
            ))}
          </DayList>
        </ReleasesRow>
      ))}
    </ReleasesPanel>
  );
};

export default AlbumsTile;
