import { useContext } from "react";
import { Button, Modal } from "~/shared/components";
import { ButtonType } from "~/shared/components/button/button";
import ModalContext from "~/shared/contexts/modalContext";
import { FlexRow } from "~/shared/styles/utils";
import { ModalHeader, ModalTxt } from "../addToLibrary/AddToLibrary.styled";

const ErrorLocationModal = () => {
  const { setIsModalOpen } = useContext(ModalContext);
  return (
    <Modal id="location-error">
      <ModalHeader>Oops!</ModalHeader>
      <ModalTxt>
        Looks like there're no Spotify in this location. Try somewhere else!
      </ModalTxt>
      <FlexRow gap="xs">
        <Button
          type={ButtonType.PRIMARY}
          label="Ok"
          onClick={() => setIsModalOpen(false)}
        />
      </FlexRow>
    </Modal>
  );
};

export default ErrorLocationModal;
