import { styled } from "styled-components";
import { FlexRow, FlexColumn } from "~/shared/styles/utils";

export const Card = styled.li`
  display: flex;
  gap: var(--spacing-xs);

  & > a {
    display: flex;
    gap: var(--spacing-xs);
    align-items: flex-start;
  }

  list-style-type: none;
  margin: var(--spacing-xs);
  align-items: flex-start;
  width: 35%;

  @media (max-width: 850px) {
    width: 100%;
  }
`;

export const Cover = styled.img`
  max-width: 5rem;
  aspect-ratio: 1/1;
`;

export const Info = styled(FlexColumn)`
  gap: var(--spacing-xxs);
`;

export const AlbumName = styled.h2`
  font-weight: 700;
  font-size: 1.1rem;
  margin: 0;
`;

export const Artists = styled(FlexRow)`
  gap: var(--spacing-xxs);
  flex-wrap: wrap;

  & a {
    color: var(--brand-green);

    &:not(:first-child)::before {
      content: "•";
      margin-right: var(--spacing-xxs);
    }
  }
`;

export const AdditionalInfo = styled(FlexRow)`
  gap: var(--spacing-xxs);

  & p {
    color: var(--text-secondary);
    font-size: 0.875rem;
    margin: 0;

    &:not(:first-child)::before {
      content: "•";
      margin-right: var(--spacing-xxs);
    }
  }
`;
