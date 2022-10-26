import { AlbumsTile } from "~/shared/features";
import type { ReleasesInterface } from "~/shared/types/types";
import { Container, CountriesSelect } from "./RegionalReleases.styled";

const RegionalReleases = ({
  releases,
  location,
  setUserCountry,
}: {
  releases: ReleasesInterface;
  location: string;
  setUserCountry: (arg0: string) => void;
}) => {
  return (
    <Container>
      <h2>
        New releases for{" "}
        <CountriesSelect
          onChange={(val: string) => setUserCountry(val)}
          value={location}
          valueType="short"
          defaultOptionLabel="everywhere"
        />
      </h2>
      {!!releases && <AlbumsTile releases={releases} />}
    </Container>
  );
};

export default RegionalReleases;
