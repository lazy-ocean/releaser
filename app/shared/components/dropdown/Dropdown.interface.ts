export interface DropdownProps {
  items: { id: string; name: string }[];
  toggle: (arg: boolean) => void;
  action: (id: string, name: string) => void;
  ariaLabel?: string;
}
