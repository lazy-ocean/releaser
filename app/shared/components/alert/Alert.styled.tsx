import styled from "styled-components";
import { AlertType } from "./Alert.interface";

export const StyledAlert = styled.div<{ type: AlertType | false }>`
  opacity: ${({ type }) => (type ? "1" : "0")};
  position: fixed;
  bottom: 4rem;
  left: 50%;
  padding: var(--spacing-xs);
  transform: translate(-50%, 50%);
  border-radius: 20px;
  transition: all 0.4s ease-in-out;

  ${({ type }) =>
    type &&
    `background-color: ${
      type === AlertType.ERROR ? "var(--alert-error)" : "var(--alert-success)"
    }`}
`;
