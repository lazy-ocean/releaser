/* import pkg from "react-spinners"; */
import type { RefObject } from "react";
import { useState } from "react";
/* import { ClipLoader } from "react-spinners"; */
import { Button } from "~/shared/components";
import { ButtonType } from "~/shared/components/button/button";
import { LoaderWrapper } from "../albumsTile/Tile.styled";
import { LibraryAccessType } from "../filtersPanel/filtersPanel.interface";

/* const { ClipLoader } = pkg; */

const Loader = ({
  total,
  libraryAccess,
  count,
  controller,
}: {
  total?: number;
  libraryAccess: LibraryAccessType;
  count: number;
  controller: RefObject<any>;
}) => {
  const [abort, setAbort] = useState(false);

  return (
    <LoaderWrapper>
      {/*    <ClipLoader color="#1ed760" size={100} /> */}
      {abort && (
        <>
          <h3>Stopping everything...</h3>
        </>
      )}
      {!!total && libraryAccess === LibraryAccessType.Songs && (
        <>
          <h3>
            Processed <span>{count}</span> of <span>{total}</span> your liked
            songs
          </h3>
          <Button
            label="Abort mission"
            type={ButtonType.SECONDARY}
            onClick={() => {
              setAbort(true);
              controller?.current.abort();
            }}
          />
        </>
      )}
    </LoaderWrapper>
  );
};

export default Loader;
