import { Button, Modal } from "~/shared/components";
import { ButtonType } from "~/shared/components/button/button";
import { FlexRow } from "~/shared/styles/utils";
import { ModalHeader, ModalTxt } from "../addToLibrary/AddToLibrary.styled";

const LikedSongsWarningModal = ({
  onSkip,
  onAccept,
}: {
  onSkip: () => void;
  onAccept: () => void;
}) => {
  return (
    <Modal id="liked-warning">
      <ModalHeader>Warning!</ModalHeader>
      <ModalTxt>
        This feature is highly experimental. If you have more than 5000 liked
        songs, you may encounter issues and/or incorrect data in liked status.
        Want to proceed anyway?
      </ModalTxt>
      <FlexRow gap="xs">
        <Button
          type={ButtonType.SECONDARY}
          label="Get me back"
          onClick={onSkip}
        />
        <Button
          type={ButtonType.PRIMARY}
          label="Let's go!"
          onClick={onAccept}
        />
      </FlexRow>
    </Modal>
  );
};

export default LikedSongsWarningModal;
