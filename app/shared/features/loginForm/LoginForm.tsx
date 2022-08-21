import { Form } from "@remix-run/react";
import { Button } from "~/shared/components";
import { ButtonType } from "~/shared/components/button/button";
import { Container, Header } from "./LoginForm.styled";

const LoginForm = () => {
  return (
    <Container>
      <Header>
        Catch up with the new music releases from your favourite artists!
      </Header>
      <Form action="/auth/spotify" method="post">
        <Button label="Log in to Spotify" type={ButtonType.PRIMARY} />
      </Form>
    </Container>
  );
};

export default LoginForm;
