import { useState, useContext } from "react";
import { AddToLibraryPanel } from "./AddToLibrary.styled";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { ENDPOINTS, getData, TYPES } from "~/shared/utils/getData";
import UserContext from "~/shared/contexts/userContext";

const AddToLibrary = ({
  liked,
  albumId,
}: {
  liked?: boolean;
  albumId: string;
}) => {
  const { user } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState(liked);

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

  return (
    <AddToLibraryPanel liked={isLiked}>
      {isLiked ? (
        <HiHeart onClick={handleClick} />
      ) : (
        <HiOutlineHeart onClick={handleClick} />
      )}
    </AddToLibraryPanel>
  );
};

export default AddToLibrary;
