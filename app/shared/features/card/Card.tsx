import type { Album } from "~/shared/types/types";
import {
  Card,
  Cover,
  Info,
  AlbumName,
  Artists,
  AdditionalInfo,
} from "./Card.styled";

const AlbumCard = ({ release }: { release: Album }) => {
  const {
    name,
    artists,
    images,
    album_type: type,
    total_tracks: tracksNum,
    external_urls: url,
  } = release;

  const artistsNames = (
    <Artists>
      {artists.map(({ name, external_urls, id }) => (
        <a href={external_urls.spotify} key={id}>
          {name}
        </a>
      ))}
    </Artists>
  );

  return (
    <Card>
      <Cover src={images[1].url} alt={`${name} album cover`} />
      <Info>
        <AlbumName>
          <a href={url.spotify}>{name}</a>
        </AlbumName>
        {artistsNames}
        <AdditionalInfo>
          <p>{type}</p>
          <p>{`${tracksNum} track(s)`}</p>
        </AdditionalInfo>
      </Info>
    </Card>
  );
};

export default AlbumCard;
