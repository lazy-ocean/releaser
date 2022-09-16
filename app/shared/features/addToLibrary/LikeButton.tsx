import { useState, useContext } from "react";
import { ENDPOINTS, getData, TYPES } from "~/shared/utils/getData";
import UserContext from "~/shared/contexts/userContext";
import { EmptyHeart, FullHeart, IconButton } from "./AddToLibrary.styled";

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

  const handleClick = async () => {
    try {
      if (isLiked) {
        await getData(
          user?.accessToken as string,
          ENDPOINTS.ADD_ALBUM(albumId),
          TYPES.DELETE
        );
        setIsLiked(false);
      } else {
        await getData(
          user?.accessToken as string,
          ENDPOINTS.ADD_ALBUM(albumId),
          TYPES.PUT
        );
        setIsLiked(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return isLiked ? (
    <IconButton
      onClick={handleClick}
      aria-label={`Remove ${albumName} from your liked songs`}
    >
      <FullHeart liked={isLiked} aria-hidden={true} />
    </IconButton>
  ) : (
    <IconButton
      onClick={handleClick}
      aria-label={`Add ${albumName} to your liked songs`}
    >
      <EmptyHeart liked={isLiked} aria-hidden={true} />
    </IconButton>
  );
};

export default LikeButton;
