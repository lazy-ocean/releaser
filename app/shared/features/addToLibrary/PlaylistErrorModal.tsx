import { Button, Modal } from "~/shared/components";
import { ButtonType } from "~/shared/components/button/button";
import { FlexRow } from "~/shared/styles/utils";
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
  return (
    <Modal id={id}>
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
    </Modal>
  );
};

export default PlaylistErrorModal;
