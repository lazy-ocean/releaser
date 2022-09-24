import { createContext } from "react";

interface ModalContextInterface {
  isModalOpen: string | false;
  setIsModalOpen: (arg: string | false) => void;
}

const ModalContext = createContext<ModalContextInterface>({
  isModalOpen: false,
  setIsModalOpen: (arg) => {},
});

export default ModalContext;
