import type { User } from "remix-auth-spotify";
import React, { useState, useRef, useEffect } from "react";
import {
  UserButton,
  DropdownButton,
  Username,
  Menu,
} from "./UserDropdown.styled";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { Form, useSubmit } from "@remix-run/react";
import useKeyboard from "~/shared/utils/hooks/useKeyboard";

const UserDropdown = ({ user }: { user: User }) => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement>(null);
  const submit = useSubmit();

  const { name, image } = user;

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    submit(event.currentTarget);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event?.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useKeyboard({ escape: () => setMenuOpen(false) });

  return (
    <UserButton onClick={() => setMenuOpen(!isMenuOpen)} ref={ref}>
      <img src={image} alt="Your avatar" />
      <Username>{name}</Username>
      <DropdownButton aria-label="Open user menu">
        {isMenuOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </DropdownButton>

      {isMenuOpen && (
        <Menu>
          <Form action="/logout" method="post" tabIndex={-1}>
            <button
              onClick={handleSubmit}
              type="submit"
              onBlur={() => setMenuOpen(false)}
              autoFocus
            >
              Logout
            </button>
          </Form>
        </Menu>
      )}
    </UserButton>
  );
};

export default UserDropdown;
