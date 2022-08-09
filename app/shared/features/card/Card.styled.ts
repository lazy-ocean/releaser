import styled from "styled-components";
import { FlexRow, FlexColumn } from "~/shared/styles/utils";

export const Card = styled.section`
  display: flex;
  gap: var(--spacing-s);
  margin: var(--spacing-s);
  align-items: flex-start;
`;

export const Cover = styled.img`
  max-width: 6rem;
  aspect-ratio: 1/1;

  @media (max-width: 12450px) {
  }
`;

export const Info = styled(FlexColumn)`
  gap: var(--spacing-xxs);
`;

export const AlbumName = styled.h2`
  font-weight: 700;
  font-size: 1.2rem;
  margin: 0;
`;

export const Artists = styled(FlexRow)`
  gap: var(--spacing-xxs);

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
