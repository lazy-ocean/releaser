import { useContext, useState, useRef } from "react";
import { PlaylistButton, IconButton, Wrapper } from "./AddToLibrary.styled";
import UserContext from "~/shared/contexts/userContext";
import { getData, ENDPOINTS, TYPES } from "~/shared/utils/getData";
import { Dropdown } from "~/shared/components";
import type { Playlist, Track } from "~/shared/types/types";
import AlertContext from "~/shared/contexts/alertContext";
import { AlertType } from "~/shared/components/alert/Alert.interface";
import ModalContext from "~/shared/contexts/modalContext";
import PlaylistErrorModal from "./PlaylistErrorModal";
import useKeyboard from "~/shared/utils/hooks/useKeyboard";

const AddToPlaylist = ({
  albumId,
  albumName,
}: {
  albumId: string;
  albumName: string;
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [songsToAdd, setSongsToAdd] = useState<string[]>([]);
  const [songsInPlaylist, setSongsInPlaylist] = useState<string[]>([]);
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
  const { user } = useContext(UserContext);
  const ref = useRef<HTMLDivElement>(null);
  const { setAlertIsOpen, setAlertText } = useContext(AlertContext);

  const handleClick = async () => {
    try {
      const { items } = await getData(
        user?.accessToken as string,
        ENDPOINTS.GET_PLAYLISTS
      );
      setPlaylists(items);
      setMenuOpen(true);
    } catch (e) {
      setAlertText("Something went wrong");
      setAlertIsOpen(AlertType.ERROR);
      console.log(e);
    }
  };

  const addSongsToPlaylist = async (
    songs: string[],
    id: string,
    name: string
  ) => {
    const uris = songs.join(",");
    if (uris)
      try {
        await getData(
          user?.accessToken as string,
          ENDPOINTS.ADD_TO_PLAYLIST(id as string, uris),
          TYPES.POST
        );
      } catch (e) {
        setAlertText("Something went wrong");
        setAlertIsOpen(AlertType.ERROR);
        console.log(e);
      }
    setAlertText(`Added to a playlist ${name}`);
    setAlertIsOpen(AlertType.SUCCESS);
    if (isModalOpen) setIsModalOpen(false);
  };

  const handleAlbumAdd = async (id: string, name: string) => {
    setId(id);
    setName(name);
    try {
      const inPlaylist: string[] = [];
      const toAdd: string[] = [];
      const { items } = await getData(
        user?.accessToken as string,
        ENDPOINTS.GET_ALBUM_TRACKS(albumId)
      );
      const playlistItems = await getData(
        user?.accessToken as string,
        ENDPOINTS.GET_PLAYLIST_TRACKS(id)
      );
      const playlistIds = playlistItems.items.map(
        (item: { track: Track }) => item.track.id
      );
      items.forEach((item: Track) => {
        playlistIds.includes(item.id)
          ? inPlaylist.push(item.uri)
          : toAdd.push(item.uri);
      });

      setSongsInPlaylist(inPlaylist);
      setSongsToAdd(toAdd);
      setMenuOpen(false);
      if (inPlaylist.length) {
        setIsModalOpen(id);
      } else {
        addSongsToPlaylist(toAdd, id, name);
      }
    } catch (e) {
      setAlertText("Something went wrong");
      setAlertIsOpen(AlertType.ERROR);
      console.log(e);
    }
  };

  useKeyboard({ escape: () => setMenuOpen(false) });

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
      <PlaylistErrorModal
        id={id}
        onAccept={() =>
          addSongsToPlaylist([...songsToAdd, ...songsInPlaylist], id, name)
        }
        onSkip={() => addSongsToPlaylist(songsToAdd, id, name)}
      />
    </Wrapper>
  );
};

export default AddToPlaylist;
