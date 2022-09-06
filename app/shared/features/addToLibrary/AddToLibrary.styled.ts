import styled from "styled-components";
import { FlexColumn } from "~/shared/styles/utils";

export const AddToLibraryPanel = styled(FlexColumn)<{ liked?: boolean }>`
  margin-left: auto;
  svg {
    width: 1.5rem;
    height: 1.5rem;
    fill: ${({ liked }) => liked && `var(--brand-green)`};
  }
`;
