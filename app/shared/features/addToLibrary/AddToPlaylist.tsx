import React, { useContext, useState, useRef } from "react";
import { PlaylistButton, IconButton, Wrapper } from "./AddToLibrary.styled";
import UserContext from "~/shared/contexts/userContext";
import { getData, ENDPOINTS, TYPES } from "~/shared/utils/getData";
import { Dropdown } from "~/shared/components";
import type { Playlist, Track } from "~/shared/types/types";
import AlertContext from "~/shared/contexts/alertContext";
import { AlertType } from "~/shared/components/alert/Alert.interface";
import ModalContext from "~/shared/contexts/modalContext";
import PlaylistErrorModal from "./PlaylistErrorModal";

const AddToPlaylist = ({
  albumId,
  albumName,
}: {
  albumId: string;
  albumName: string;
}) => {
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
      const { items } = await getData(
        user?.accessToken as string,
        ENDPOINTS.GET_PLAYLISTS
      );
      setPlaylists(items);
      setAnchorEl(e.target as HTMLButtonElement);
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
      setAnchorEl(null);
      if (ref && ref.current) ref.current.focus();
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
    if (ref && ref.current) ref.current.focus();
  };

  return (
    <Wrapper>
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
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
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
