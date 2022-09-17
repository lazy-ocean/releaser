import { createContext } from "react";
import type { AlertType } from "../components/alert/Alert.interface";

interface AlertContextInterface {
  alertIsOpen: AlertType | false;
  setAlertIsOpen: (type: AlertType | false) => void;
  alertText: string | null;
  setAlertText: (text: string | null) => void;
}

const AlertContext = createContext<AlertContextInterface>({
  alertIsOpen: false,
  setAlertIsOpen: (type) => {},
  alertText: null,
  setAlertText: (text) => {},
});

export default AlertContext;
