import { styled } from "styled-components";

export const Container = styled.ul`
  list-style-type: none;
  background-color: var(--bg-elevation);
  padding: var(--spacing-xxs);
  border-radius: 20px;
  width: max-content;
  overflow-y: scroll;
  max-height: 20rem;
  font-size: 0.9rem;
  z-index: 10;

  &::-webkit-scrollbar {
    background-color: var(--bg-elevation);
    width: 13px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--bg-elevation-hover);
  }

  & li {
    padding: var(--spacing-xs);
    border-radius: 15px;

    &:hover {
      background-color: var(--bg-elevation-hover);
    }
  }
`;
