import styled from "styled-components";

export const FlexRow = styled.div<{ gap?: string }>`
  display: flex;
  ${({ gap }) => gap && `gap: var(--spacing-${gap})`}
`;

export const FlexColumn = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  ${({ gap }) => gap && `gap: var(--spacing-${gap})`}
`;
