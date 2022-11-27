import { useState, useContext } from "react";
import { ENDPOINTS, getData, TYPES } from "~/shared/utils/getData";
import UserContext from "~/shared/contexts/userContext";
import { EmptyHeart, FullHeart, IconButton } from "./AddToLibrary.styled";
import AlertContext from "~/shared/contexts/alertContext";
import { AlertType } from "~/shared/components/alert/Alert.interface";
import { UserType } from "~/shared/types/types";

const LikeButton = ({
  liked,
  albumId,
  albumName,
}: {
  liked?: boolean;
  albumId: string;
  albumName: string;
}) => {
  const { user } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState(liked || false);
  const { setAlertIsOpen, setAlertText } = useContext(AlertContext);

  const handleClick = async () => {
    try {
      if (isLiked) {
        if (user?.type === UserType.registered) {
          await getData(
            user?.accessToken as string,
            ENDPOINTS.ADD_ALBUM(albumId),
            TYPES.DELETE
          );
        }
        setIsLiked(false);
        setAlertText("Removed from your library");
        setAlertIsOpen(AlertType.SUCCESS);
      } else {
        if (user?.type === UserType.registered) {
          await getData(
            user?.accessToken as string,
            ENDPOINTS.ADD_ALBUM(albumId),
            TYPES.PUT
          );
        }
        setIsLiked(true);
        setAlertText("Added to your library");
        setAlertIsOpen(AlertType.SUCCESS);
      }
    } catch (e) {
      setAlertText("Something went wrong");
      setAlertIsOpen(AlertType.ERROR);
      console.log(e);
    }
  };

  return isLiked ? (
    <IconButton
      onClick={handleClick}
      aria-label={`Remove ${albumName} from your liked songs`}
    >
      <FullHeart $isLiked={isLiked} aria-hidden={true} />
    </IconButton>
  ) : (
    <IconButton
      onClick={handleClick}
      aria-label={`Add ${albumName} to your liked songs`}
    >
      <EmptyHeart $isLiked={isLiked} aria-hidden={true} />
    </IconButton>
  );
};

export default LikeButton;
