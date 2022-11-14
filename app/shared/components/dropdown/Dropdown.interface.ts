export interface DropdownProps {
  items: { id: string; name: string }[];
  action: (id: string, name: string) => void;
  ariaLabel?: string;
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
}
