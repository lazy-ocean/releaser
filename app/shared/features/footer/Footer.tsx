import { StyledFooter } from "./Footer.styled";

const Footer = () => (
  <StyledFooter>
    <p>
      This app is not affiliated with Spotify and is only using data from{" "}
      <a href="https://developer.spotify.com/documentation/web-api/">
        open Spotify Web API endpoints
      </a>
    </p>
    <p>
      2022, made by{" "}
      <a href="https://lazy-ocean.vercel.app/">Vladlena Panchenko</a>
    </p>
  </StyledFooter>
);

export default Footer;
