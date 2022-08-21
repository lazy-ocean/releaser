import { AlbumsTile } from "~/shared/features";
import type { ReleasesInterface } from "~/shared/types/types";
import { Container } from "./RegionalReleases.styled";

const RegionalReleases = ({
  releases,
  location,
}: {
  releases: ReleasesInterface;
  location: string;
}) => {
  return (
    <Container>
      <h2>Recent music releases in {location}</h2>
      {!!releases && <AlbumsTile releases={releases} />}
    </Container>
  );
};

export default RegionalReleases;
