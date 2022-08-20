import type { Album, ReleasesInterface } from "~/shared/types/types";
import { Card } from "~/shared/features";
import { DayList, ReleaseDate } from "./Tile.styled";
import { FlexColumn, FlexRow } from "~/shared/styles/utils";
import { format } from "date-fns";

const AlbumsTile = ({ releases }: { releases: ReleasesInterface }) => {
  const sortedDates = Object.keys(releases).sort(
    (a, b) => Date.parse(b) - Date.parse(a)
  );

  return (
    <FlexColumn>
      {sortedDates.map((date, i) => (
        <FlexRow key={i}>
          <ReleaseDate>{format(new Date(date), "d MMMM")}</ReleaseDate>
          <DayList>
            {releases[date]?.map((release: Album) => (
              <Card release={release} key={release.id} />
            ))}
          </DayList>
        </FlexRow>
      ))}
    </FlexColumn>
  );
};

export default AlbumsTile;
