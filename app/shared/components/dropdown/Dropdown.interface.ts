export interface DropdownProps {
  items: { id: string; name: string }[];
  toggle: (arg: boolean) => void;
  action: (id: string) => void;
  ariaLabel?: string;
}
