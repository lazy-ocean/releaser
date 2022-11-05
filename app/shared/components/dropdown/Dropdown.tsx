import type { MutableRefObject } from "react";
import { useEffect, forwardRef } from "react";
import { Container } from "./Dropdown.styled";
import type { DropdownProps } from "./Dropdown.interface";
import FocusTrap from "focus-trap-react";
import useKeyboard from "~/shared/utils/hooks/useKeyboard";

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

  useKeyboard({
    enter: (target: { id: string; dataset: { name: string } }) =>
      action(target.id, target.dataset.name),
  });

  return (
    <FocusTrap>
      <Container role="listbox" aria-multiselectable="false">
        {items.map(({ id, name }) => (
          <li
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
          </li>
        ))}
      </Container>
    </FocusTrap>
  );
});

Dropdown.displayName = "Dropdown";
export default Dropdown;
