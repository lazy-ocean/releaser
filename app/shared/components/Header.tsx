import type { User } from "remix-auth-spotify";
import React, { useState } from "react";
import {
  StyledHeader,
  Logo,
  UserButton,
  DropdownButton,
  Username,
  Menu,
} from "./Header.styled";
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

const Header = ({ user }: { user: User | null }) => {
  return (
    <StyledHeader>
      <Logo
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
        alt="Spotify logo"
      />
      {user && <UserDropdown user={user} />}
    </StyledHeader>
  );
};

export default Header;
