import { styled } from "styled-components";

export const Container = styled.section`
  background-color: var(--bg-card);
  border-radius: 20px;
  padding: var(--spacing-s);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: var(--spacing-s);
  box-shadow: var(--shadow);
`;

export const Header = styled.h2`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: var(--spacing-s);
`;

export const Subtext = styled.p`
  color: var(--text-faded);
  text-align: center;

  & a {
    color: var(--brand-green);
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CTARow = styled.div`
  display: flex;
  gap: var(--spacing-xs);
  justify-content: center;
`;
