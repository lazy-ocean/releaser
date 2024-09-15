import { AlbumsTile } from "~/shared/features";
import type { ReleasesInterface } from "~/shared/types/types";
import { Container } from "./RegionalReleases.styled";

const RegionalReleases = ({ releases }: { releases: ReleasesInterface }) => {
  return (
    <Container id="main">
      <h2>
        <label htmlFor="region-selector">New releases everywhere</label>
      </h2>
      {!!releases && <AlbumsTile releases={releases} />}
    </Container>
  );
};

export default RegionalReleases;
