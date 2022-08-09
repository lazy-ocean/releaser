import styled from "styled-components";
import { FlexRow } from "~/shared/styles/utils";

export const DayList = styled(FlexRow)`
  flex-grow: 1;
`;

export const ReleaseDate = styled.p`
  min-width: 9%;
  text-align: right;
  color: var(--text-secondary);
  padding: 0 var(--spacing-xs);
  font-size: 1.2rem;
  font-weight: 300;
`;
