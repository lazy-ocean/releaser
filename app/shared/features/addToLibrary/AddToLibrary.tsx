import { AddToLibraryPanel } from "./AddToLibrary.styled";
import AddToPlaylist from "./AddToPlaylist";
import LikeButton from "./LikeButton";

const AddToLibrary = ({
  liked,
  albumId,
  albumName,
}: {
  liked?: boolean;
  albumId: string;
  albumName: string;
}) => {
  return (
    <AddToLibraryPanel>
      <LikeButton albumId={albumId} liked={liked} albumName={albumName} />
      <AddToPlaylist albumId={albumId} albumName={albumName} />
    </AddToLibraryPanel>
  );
};

export default AddToLibrary;
