import styled from "styled-components";

export const Menu = styled.ul`
  position: absolute;
  right: 0;
  background-color: var(--bg-elevation);
  color: var(--text-primary);
  list-style-type: none;
  top: 115%;
  margin: 0;
  border-radius: 4px;
  padding: var(--spacing-xxs);
  width: 100%;
  text-align: initial;
  font-weight: 100;
  transition: background-color 0.2s ease-in-out;
  font-family: "Montserrat", sans-serif;

  & li,
  & button {
    padding: var(--spacing-xxs);
    font-size: 0.875rem;
    border-radius: 4px;

    &:hover {
      background-color: var(--bg-elevation-hover);
    }
  }

  & button {
    cursor: pointer;
    text-align: initial;
    border: none;
    width: 100%;
    font-size: 0.875rem;
    background-color: transparent;
    color: var(--text-primary);
    font-weight: 100;
    font-family: "Montserrat", sans-serif;
  }
`;

export const DropdownButton = styled.span`
  display: block;
  margin-inline-end: 0.5rem;

  & svg {
    width: 16px;
    height: 16px;
  }
`;

export const Logo = styled.img`
  width: 8rem;
`;

export const StyledHeader = styled.header`
  padding: var(--spacing-s);
  display: flex;
`;

export const Username = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-family: "Montserrat", sans-serif;
`;

export const UserButton = styled.button`
  margin-left: auto;
  max-width: 10rem;
  border: none;
  background-color: var(--bg-elevation);
  color: var(--text-primary);
  display: flex;
  gap: 0.5rem;
  align-items: center;
  white-space: nowrap;
  border-radius: 25px;
  padding: 0;
  cursor: pointer;
  position: relative;

  & img {
    border-radius: 50%;
    height: 2rem;
  }
`;
