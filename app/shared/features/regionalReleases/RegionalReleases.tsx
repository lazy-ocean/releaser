import { AlbumsTile } from "~/shared/features";
import type { ReleasesInterface } from "~/shared/types/types";
import { Container } from "./RegionalReleases.styled";

const RegionalReleases = ({
  releases,
  location = "the USA",
}: {
  releases: ReleasesInterface;
  location: string;
}) => {
  return (
    <Container>
      <h2>New music releases in {location}</h2>
      {!!releases && <AlbumsTile releases={releases} />}
    </Container>
  );
};

export default RegionalReleases;
