import styled, { css } from "styled-components";
import { FlexColumn, FlexRow } from "~/shared/styles/utils";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { MdOutlinePlaylistAdd } from "react-icons/md";

const IconCss = css<{ liked: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  ${({ liked }) => liked && `fill: var(--brand-green)`};
`;

export const IconButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: inherit;
  padding: 0;
  margin: 0;
`;

export const AddToLibraryPanel = styled(FlexColumn)<{ liked?: boolean }>`
  margin-left: auto;
  gap: var(--spacing-xxs);
`;

export const FullHeart = styled(HiHeart)<{ liked: boolean }>`
  ${IconCss}
`;

export const EmptyHeart = styled(HiOutlineHeart)<{ liked: boolean }>`
  ${IconCss}
`;

export const PlaylistButton = styled(MdOutlinePlaylistAdd)`
  width: 2rem;
  height: 2rem;
`;

export const Wrapper = styled.div`
  position: relative;
`;

export const ModalHeader = styled.h3`
  margin: 0;
  margin-bottom: var(--spacing-xs);
`;

export const ModalTxt = styled.p`
  margin-bottom: var(--spacing-s);

  & + ${FlexRow} {
    justify-content: flex-end;
  }
`;
