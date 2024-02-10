import { css, styled } from "styled-components";

export const CommonButton = css<{ shadow?: boolean }>`
  border: none;
  font-size: 1rem;
  font-family: "Circular Std", sans-serif;
  border-radius: 50px;
  padding-inline: 1.5rem;
  min-height: 3rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, filter 0.2s ease-in-out;
  ${({ shadow }) => shadow && `box-shadow: var(--shadow)`};
`;

export const PrimaryButton = styled.button<{ shadow?: boolean }>`
  ${CommonButton};
  background-color: var(--brand-green);
  color: var(--bg-base);

  &:hover {
    filter: brightness(0.8);
  }
`;

export const SecondaryButton = styled.button<{ shadow?: boolean }>`
  ${CommonButton};
  border: 1px solid var(--text-secondary);
  color: var(--text-primary);
  background-color: transparent;

  &:hover {
    background-color: rgba(150, 150, 150, 0.2);
  }
`;
