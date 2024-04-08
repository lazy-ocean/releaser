import { css, styled } from "styled-components";
import { FlexColumn, FlexRow } from "~/shared/styles/utils";
/* import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { MdOutlinePlaylistAdd } from "react-icons/md"; */

const IconCss = css<{ $isLiked: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  ${({ $isLiked }) => $isLiked && `fill: var(--brand-green)`};
`;

export const IconButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: inherit;
  padding: 0;
  margin: 0;
`;

export const AddToLibraryPanel = styled(FlexColumn)<{ $isLiked?: boolean }>`
  margin-left: auto;
  gap: var(--spacing-xxs);
`;
/* 
export const FullHeart = styled(HiHeart)<{ $isLiked: boolean }>`
  ${IconCss}
`;

export const EmptyHeart = styled(HiOutlineHeart)<{ $isLiked: boolean }>`
  ${IconCss}
`;

export const PlaylistButton = styled(MdOutlinePlaylistAdd)`
  width: 2rem;
  height: 2rem;
`; */

export const FullHeart = styled.div<{ $isLiked: boolean }>`
  ${IconCss}
`;

export const EmptyHeart = styled.div<{ $isLiked: boolean }>`
  ${IconCss}
`;

export const PlaylistButton = styled.button`
  width: 2rem;
  height: 2rem;
  background-color: white;
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
  line-height: 1.5rem;
  font-size: 1.1rem;

  & + ${FlexRow} {
    justify-content: flex-end;
  }
`;
