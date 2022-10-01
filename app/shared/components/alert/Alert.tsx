import { StyledAlert } from "./Alert.styled";
import { useContext } from "react";
import AlertContext from "~/shared/contexts/alertContext";
import { useEffect } from "react";

const Alert = () => {
  const { alertIsOpen, alertText, setAlertIsOpen } = useContext(AlertContext);

  useEffect(() => {
    if (alertIsOpen) setTimeout(() => setAlertIsOpen(false), 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertIsOpen]);

  return (
    <StyledAlert alerttype={alertIsOpen} aria-live="polite">
      {alertText}
    </StyledAlert>
  );
};

export default Alert;
