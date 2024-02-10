import { styled } from "styled-components";

export const Logo = styled.img`
  width: 8rem;
`;

export const StyledHeader = styled.header`
  padding: var(--spacing-s);
  display: flex;
`;

export const SkipToMain = styled.a`
  padding: var(--spacing-xs);
  position: absolute;
  transform: translateY(-300%);
  display: block;
  overflow: hidden;
  left: 40%;
  z-index: 10;
  &:focus {
    transition: transform 0.2s;
    transform: translateY(0%);
  }
`;
