import { useContext } from "react";
import type { Album } from "~/shared/types/types";
import {
  Card,
  Cover,
  Info,
  AlbumName,
  Artists,
  AdditionalInfo,
} from "./Card.styled";
import AddToLibrary from "../addToLibrary/AddToLibrary";
import UserContext from "~/shared/contexts/userContext";

const AlbumCard = ({ release }: { release: Album }) => {
  const { user } = useContext(UserContext);
  const {
    name,
    artists,
    images,
    album_type: type,
    total_tracks: tracksNum,
    liked,
    id,
    uri,
  } = release;

  const artistsNames = (
    <Artists>
      {artists.map(({ name, uri, id }) => (
        <a href={uri} key={id}>
          {name}
        </a>
      ))}
    </Artists>
  );

  return (
    <Card>
      <a href={uri}>
        <Cover src={images[1].url} alt={`${name} album cover`} />
      </a>
      <Info>
        <AlbumName>
          <a href={uri}>{name}</a>
        </AlbumName>
        {artistsNames}
        <AdditionalInfo>
          <p>{type}</p>
          <p>{`${tracksNum} track(s)`}</p>
        </AdditionalInfo>
      </Info>
      {user && <AddToLibrary liked={liked} albumId={id} albumName={name} />}
    </Card>
  );
};

export default AlbumCard;
