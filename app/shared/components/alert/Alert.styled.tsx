import { styled } from "styled-components";
import { AlertType } from "./Alert.interface";

export const StyledAlert = styled.div<{ alerttype: AlertType | false }>`
  opacity: ${({ alerttype }) => (alerttype ? "1" : "0")};
  position: fixed;
  bottom: 4rem;
  left: 50%;
  padding: var(--spacing-xs);
  transform: translate(-50%, 50%);
  border-radius: 20px;
  transition: all 0.4s ease-in-out;

  ${({ alerttype }) =>
    alerttype &&
    `background-color: ${
      alerttype === AlertType.ERROR
        ? "var(--alert-error)"
        : "var(--alert-success)"
    }`}
`;
