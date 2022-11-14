import { Container } from "./Dropdown.styled";
import type { DropdownProps } from "./Dropdown.interface";
import useKeyboard from "~/shared/utils/hooks/useKeyboard";
import MenuUnstyled from "@mui/base/MenuUnstyled";
import MenuItemUnstyled from "@mui/base/MenuItemUnstyled";

const Dropdown = (props: DropdownProps) => {
  const { items, action, anchorEl, handleClose } = props;
  const open = Boolean(anchorEl);

  useKeyboard({
    enter: (target: { id: string; dataset: { name: string } }) =>
      action(target.id, target.dataset.name),
  });

  return (
    <MenuUnstyled
      role="listbox"
      aria-multiselectable="false"
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      slots={{ listbox: Container }}
    >
      {items.map(({ id, name }) => (
        <MenuItemUnstyled
          key={id}
          id={id}
          data-name={name}
          onClick={() => {
            action(id, name);
          }}
          aria-label={props.ariaLabel ? props.ariaLabel + name : ""}
          tabIndex={0}
          role="option"
          aria-selected={false}
        >
          {name}
        </MenuItemUnstyled>
      ))}
    </MenuUnstyled>
  );
};

export default Dropdown;
