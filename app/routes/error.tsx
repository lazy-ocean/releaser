import { Link } from "@remix-run/react";
import { Button } from "~/shared/components";
import { ButtonType } from "~/shared/components/button/button";
import { Header } from "~/shared/features";
import { Header as HeaderText } from "~/shared/features/loginForm/LoginForm.styled";
import { LoaderWrapper } from "~/shared/features/albumsTile/Tile.styled";
import { CTARow } from "~/shared/features/loginForm/LoginForm.styled";

export default function ErrorPage() {
  return (
    <>
      <Header />
      <LoaderWrapper>
        <HeaderText>
          Ooops, this doesn't seem right, looks like you don't have access to
          this page. <br />
          Please{" "}
          <a
            href="https://lazy-ocean.vercel.app/"
            rel="noreferrer noopener"
            target="_blank"
          >
            reach out
          </a>{" "}
          to get your access! 🚀
        </HeaderText>
        <CTARow>
          <Link to="/">
            <Button type={ButtonType.PRIMARY} label="Go back" />
          </Link>
          <Link to="/demo">
            <Button label="Demo version" type={ButtonType.SECONDARY} />
          </Link>
        </CTARow>
      </LoaderWrapper>
    </>
  );
}
