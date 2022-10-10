import { useContext } from "react";
import ReactModal from "react-modal";
import ModalContext from "~/shared/contexts/modalContext";
import { ModalStyles } from "./Modal.styled";

const Modal = ({ children, id }: { children: any; id: string }) => {
  const { isModalOpen } = useContext(ModalContext);

  return (
    <ReactModal isOpen={isModalOpen === id} style={ModalStyles}>
      {children}
    </ReactModal>
  );
};

export default Modal;
