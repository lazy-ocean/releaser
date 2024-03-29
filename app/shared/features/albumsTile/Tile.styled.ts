import styled from "styled-components";
import { FlexRow, FlexColumn } from "~/shared/styles/utils";

export const DayList = styled(FlexRow)`
  flex-grow: 1;
  flex-wrap: wrap;
  width: 100%;
  margin: 0;
`;

export const ReleaseDate = styled.p`
  text-align: right;
  color: var(--text-faded);
  padding-right: var(--spacing-xs);
  padding-left: var(--spacing-s);
  font-size: 1.3rem;
  writing-mode: tb;
  transform: rotate(180deg);
  margin: 0;

  @media (max-width: 600px) {
    padding-left: var(--spacing-xs);
    font-size: 1rem;
    writing-mode: inherit;
    transform: initial;
  }
`;

export const ReleasesPanel = styled(FlexColumn)`
  gap: 1rem;
`;

export const ReleasesRow = styled(FlexRow)`
  border-radius: 20px;
  background-color: var(--bg-card);
  align-items: center;
  padding: var(--spacing-xs);
  box-shadow: var(--shadow);

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const HomePageContainer = styled.section`
  padding: var(--spacing-xs) var(--spacing-s);
`;

export const LoaderWrapper = styled.div`
  margin: var(--spacing-s);
  text-align: center;

  & h3 {
    color: var(--text-secondary);
  }

  & span {
    color: var(--brand-green);
  }

  & a {
    color: var(--brand-green);
  }
`;
