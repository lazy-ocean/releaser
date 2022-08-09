import type { Album, ReleasesInterface } from "~/shared/types/types";
import { Card } from "~/shared/features";
import { DayList, ReleaseDate } from "./Tile.styled";
import { FlexColumn } from "~/shared/styles/utils";
import { format } from "date-fns";

const AlbumsTile = ({ releases }: { releases: ReleasesInterface }) => {
  const sortedDates = Object.keys(releases).sort(
    (a, b) => Date.parse(b) - Date.parse(a)
  );

  return (
    <FlexColumn>
      {sortedDates.map((date, i) => (
        <DayList key={i}>
          <ReleaseDate>{format(new Date(date), "d MMMM")}</ReleaseDate>
          <DayList>
            {releases[date]?.map((release: Album) => (
              <Card release={release} key={release.id} />
            ))}
          </DayList>
        </DayList>
      ))}
    </FlexColumn>
  );
};

export default AlbumsTile;
