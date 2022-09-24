import { Form } from "@remix-run/react";
import { Button } from "~/shared/components";
import { ButtonType } from "~/shared/components/button/button";
import { Container, Header } from "./LoginForm.styled";
import { Link } from "@remix-run/react";
import type { User } from "remix-auth-spotify";

const LoginForm = ({ user }: { user: User | null }) => {
  return (
    <Container>
      <Header>
        Catch up with the new music releases from your favourite artists!
      </Header>
      {user ? (
        <Link to="/home">
          <Button label="Go to my releases" type={ButtonType.PRIMARY} shadow />
        </Link>
      ) : (
        <Form action="/auth/spotify" method="post">
          <Button label="Log in to Spotify" type={ButtonType.PRIMARY} />
        </Form>
      )}
    </Container>
  );
};

export default LoginForm;
