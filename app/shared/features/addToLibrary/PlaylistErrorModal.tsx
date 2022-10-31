import FocusTrap from "focus-trap-react";
import { useContext } from "react";
import { Button, Modal } from "~/shared/components";
import { ButtonType } from "~/shared/components/button/button";
import ModalContext from "~/shared/contexts/modalContext";
import { FlexRow } from "~/shared/styles/utils";
import useKeyboard from "~/shared/utils/hooks/useKeyboard";
import { ModalHeader, ModalTxt } from "./AddToLibrary.styled";

const PlaylistErrorModal = ({
  id,
  onSkip,
  onAccept,
}: {
  id: string;
  onSkip: () => void;
  onAccept: () => void;
}) => {
  const { setIsModalOpen } = useContext(ModalContext);

  useKeyboard({
    escape: () => setIsModalOpen(false),
  });

  return (
    <Modal id={id}>
      <FocusTrap>
        <div>
          <ModalHeader>Already added</ModalHeader>
          <ModalTxt>Some songs are already in this playlist</ModalTxt>
          <FlexRow gap="xs">
            <Button type={ButtonType.SECONDARY} label="Skip" onClick={onSkip} />
            <Button
              type={ButtonType.PRIMARY}
              label="Add anyway"
              onClick={onAccept}
            />
          </FlexRow>
        </div>
      </FocusTrap>
    </Modal>
  );
};

export default PlaylistErrorModal;
