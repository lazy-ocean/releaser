import styled from "styled-components";

export const AnchorBtn = styled.button<{ isVisible: boolean }>`
  position: fixed;
  bottom: 2.5rem;
  right: 2.5rem;
  z-index: 20;
  padding: var(--spacing-xs);
  border: none;
  background-color: var(--bg-elevation-hover);
  border-radius: 5px;
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  align-items: center;
  font-size: 1rem;
  gap: var(--spacing-xxs);
  font-family: "Circular Std", sans-serif;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.2s, visibility 0.2s;
`;
