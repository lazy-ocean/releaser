import { Container } from "./Dropdown.styled";
import type { DropdownProps } from "./Dropdown.interface";
import useKeyboard from "~/shared/utils/hooks/useKeyboard";
/* import { Menu } from "@mui/base/Menu";
import { MenuItem } from "@mui/base/MenuItem"; */
import { Menu, Popover, MenuItem } from "react-aria-components";
import { useState } from "react";

const Dropdown = (props: DropdownProps) => {
  const { items, action, anchorEl, handleClose, isOpen, setIsOpen } = props;
  /*   const open = Boolean(anchorEl); */

  useKeyboard({
    enter: (target: { id: string; dataset: { name: string } }) =>
      action(target.id, target.dataset.name),
  });

  return (
    <Popover
      isOpen={isOpen}
      onClose={handleClose}
      placement="bottom"
      triggerRef={anchorEl}
      shouldCloseOnInteractOutside={() => setIsOpen(false)}
    >
      <Container
        aria-multiselectable="false"
        anchorEl={anchorEl}
        onClose={handleClose}
        slots={{ listbox: Container }}
      >
        {items.map(({ id, name }) => (
          <MenuItem
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
            style={{ cursor: "pointer" }}
          >
            {name}
          </MenuItem>
        ))}
      </Container>
    </Popover>
  );
};

export default Dropdown;
