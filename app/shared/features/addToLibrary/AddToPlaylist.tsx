import { useContext, useState, useRef } from "react";
import { PlaylistButton, IconButton, Wrapper } from "./AddToLibrary.styled";
import UserContext from "~/shared/contexts/userContext";
import { getData, ENDPOINTS, TYPES } from "~/shared/utils/getData";
import { Dropdown } from "~/shared/components";
import type { Playlist, Track } from "~/shared/types/types";

const AddToPlaylist = ({
  albumId,
  albumName,
}: {
  albumId: string;
  albumName: string;
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const { user } = useContext(UserContext);
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = async () => {
    try {
      const { items } = await getData(
        user?.accessToken as string,
        ENDPOINTS.GET_PLAYLISTS
      );
      setPlaylists(items);
      setMenuOpen(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAlbumAdd = async (id: string) => {
    try {
      const { items } = await getData(
        user?.accessToken as string,
        ENDPOINTS.GET_ALBUM_TRACKS(albumId)
      );
      const uris = items.map((item: Track) => item.uri).join(",");
      await getData(
        user?.accessToken as string,
        ENDPOINTS.ADD_TO_PLAYLIST(id, uris),
        TYPES.POST
      );
      setMenuOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrapper ref={ref}>
      <IconButton
        aria-label={`Add ${albumName} to your playlists`}
        onClick={handleClick}
      >
        <PlaylistButton aria-hidden={true} />
      </IconButton>
      {menuOpen && (
        <Dropdown
          items={playlists}
          ref={ref}
          toggle={setMenuOpen}
          action={handleAlbumAdd}
          ariaLabel={`Add ${albumName} to `}
        />
      )}
    </Wrapper>
  );
};

export default AddToPlaylist;
