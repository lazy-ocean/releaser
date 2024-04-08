import React, { useContext, useState, useRef } from "react";
import { PlaylistButton, IconButton, Wrapper } from "./AddToLibrary.styled";
import UserContext from "~/shared/contexts/userContext";
import { getData, ENDPOINTS, TYPES } from "~/shared/utils/getData";
import { Dropdown } from "~/shared/components";
import type { Playlist, Track } from "~/shared/types/types";
import { UserType } from "~/shared/types/types";
import AlertContext from "~/shared/contexts/alertContext";
import { AlertType } from "~/shared/components/alert/Alert.interface";
import ModalContext from "~/shared/contexts/modalContext";
import PlaylistErrorModal from "./PlaylistErrorModal";
import demoPlaylists from "../../../mocks/playlists.json";
import {
  readFromLocalStorage,
  setLocalStorageItem,
} from "~/shared/utils/hooks/useLocalStorage";
import { MenuTrigger, DialogTrigger } from "react-aria-components";

const STORED_PLAYLISTS_KEY = "playlists";

const AddToPlaylist = ({
  albumId,
  albumName,
}: {
  albumId: string;
  albumName: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [songsToAdd, setSongsToAdd] = useState<string[]>([]);
  const [songsInPlaylist, setSongsInPlaylist] = useState<string[]>([]);
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
  const { user } = useContext(UserContext);
  const ref = useRef<HTMLButtonElement>(null);
  const { setAlertIsOpen, setAlertText } = useContext(AlertContext);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (user?.type === UserType.registered) {
        const { items } = await getData(
          user?.accessToken as string,
          ENDPOINTS.GET_PLAYLISTS
        );
        setPlaylists(items);
      } else setPlaylists(demoPlaylists);
      /* setAnchorEl(e.target as HTMLButtonElement); */
      setIsOpen(true);
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
    if (uris) {
      if (user?.type === UserType.registered) {
        try {
          await getData(
            user?.accessToken as string,
            ENDPOINTS.ADD_TO_PLAYLIST(id as string, uris),
            TYPES.POST
          );
          setAlertText(`Added to a playlist ${name}`);
          setAlertIsOpen(AlertType.SUCCESS);
        } catch (e) {
          setAlertText("Something went wrong");
          setAlertIsOpen(AlertType.ERROR);
          console.log(e);
        }
      } else {
        const saved = readFromLocalStorage(STORED_PLAYLISTS_KEY) || {};
        if (saved[id]) {
          if (!saved[id].includes(albumId)) saved[id] = [...saved[id], albumId];
        } else saved[id] = [albumId];
        setLocalStorageItem("playlists", saved);
        setAlertText(`Added to a playlist ${name}`);
        setAlertIsOpen(AlertType.SUCCESS);
      }
    }

    if (isModalOpen) setIsModalOpen(false);
  };

  const handleAlbumAdd = async (id: string, name: string) => {
    setId(id);
    setName(name);
    try {
      const inPlaylist: string[] = [];
      const toAdd: string[] = [];
      if (user?.type === UserType.registered) {
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
      } else {
        const added = readFromLocalStorage(STORED_PLAYLISTS_KEY);
        if (added && added[id] && added[id].includes(albumId)) {
          inPlaylist.push(albumId);
        } else toAdd.push(albumId);
      }
      setSongsInPlaylist(inPlaylist);
      setSongsToAdd(toAdd);
      setAnchorEl(null);
      /*    if (ref && ref.current) ref.current.focus(); */
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

  const handleClose = () => {
    setAnchorEl(null);
    /* if (ref && ref.current) ref.current.focus(); */
  };

  return (
    <Wrapper>
      <DialogTrigger>
        <IconButton
          aria-label={`Add ${albumName} to your playlists`}
          onClick={(e: React.MouseEvent) => handleClick(e)}
          ref={ref}
        >
          <PlaylistButton aria-hidden={true} />
        </IconButton>
        <Dropdown
          items={playlists}
          action={handleAlbumAdd}
          ariaLabel={`Add ${albumName} to `}
          anchorEl={ref}
          handleClose={handleClose}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </DialogTrigger>
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
