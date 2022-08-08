import type { User } from "remix-auth-spotify";
import React, { useState } from "react";
import {
  UserButton,
  DropdownButton,
  Username,
  Menu,
} from "./UserDropdown.styled";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { Form, useSubmit } from "@remix-run/react";

const UserDropdown = ({ user }: { user: User }) => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const submit = useSubmit();

  const { name, image } = user;

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    submit(event.currentTarget);
  };

  return (
    <>
      <UserButton onClick={() => setMenuOpen(!isMenuOpen)}>
        <img src={image} alt="" />
        <Username>{name}</Username>
        <DropdownButton>
          {isMenuOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
        </DropdownButton>

        {isMenuOpen && (
          <Menu>
            <li>Profile</li>
            <Form action="/logout" method="post">
              <button onClick={handleSubmit}>Logout</button>
            </Form>
          </Menu>
        )}
      </UserButton>
    </>
  );
};

export default UserDropdown;
