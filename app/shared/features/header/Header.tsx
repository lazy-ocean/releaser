import type { User } from "remix-auth-spotify";
import { StyledHeader, Logo, SkipToMain } from "./Header.styled";
import { UserDropdown } from "~/shared/features";
import { Link } from "@remix-run/react";

const Header = ({ user }: { user?: User | null }) => {
  return (
    <StyledHeader>
      <Link to="/">
        <Logo
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
          alt="Spotify logo"
        />
      </Link>
      <SkipToMain href="#main" aria-label="Skip to main content">
        Skip to main
      </SkipToMain>
      {user && <UserDropdown user={user} />}
    </StyledHeader>
  );
};

export default Header;
