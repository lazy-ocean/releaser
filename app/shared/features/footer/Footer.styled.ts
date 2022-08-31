import styled from "styled-components";

export const StyledFooter = styled.footer`
  text-align: center;
  margin-top: auto;
  padding: var(--spacing-xs);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs);

  p {
    margin: 0;
    color: var(--text-faded);
    font-size: 1rem;

    a {
      color: var(--brand-green);
      filter: brightness(0.7);
    }
  }
`;
