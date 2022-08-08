import type { User } from "remix-auth-spotify";
import { StyledHeader, Logo } from "./Header.styled";
import { UserDropdown } from "~/shared/features";

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
