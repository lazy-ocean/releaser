import styled from "styled-components";
import { FlexRow, FlexColumn } from "~/shared/styles/utils";

export const DayList = styled(FlexRow)`
  flex-grow: 1;
  flex-wrap: wrap;
`;

export const ReleaseDate = styled.p`
  text-align: right;
  color: var(--text-faded);
  padding-right: var(--spacing-xs);
  padding-left: var(--spacing-s);
  font-size: 1.3rem;
  font-weight: 300;
  writing-mode: tb;
  transform: rotate(180deg);
  margin: 0;
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
`;

export const HomePageContainer = styled.section`
  padding: var(--spacing-xs) var(--spacing-s);
`;
