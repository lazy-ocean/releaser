import type { MutableRefObject } from "react";
import { useEffect, forwardRef } from "react";
import { Container } from "./Dropdown.styled";
import type { DropdownProps } from "./Dropdown.interface";

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
  const { items, toggle, action } = props;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        (ref as MutableRefObject<HTMLDivElement>)?.current &&
        !(ref as MutableRefObject<HTMLDivElement>)?.current.contains(
          event.target as Node
        )
      ) {
        toggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return (
    <Container>
      {items.map(({ id, name }) => (
        <li
          key={id}
          onClick={() => {
            action(id);
          }}
          aria-label={props.ariaLabel ? props.ariaLabel + name : ""}
        >
          {name}
        </li>
      ))}
    </Container>
  );
});

Dropdown.displayName = "Dropdown";
export default Dropdown;
