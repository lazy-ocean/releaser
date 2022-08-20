import type { LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { spotifyStrategy } from "~/services/auth.server";
import type { IndexData } from "~/shared/types/types";
import { Header } from "~/shared/features";
import { Button } from "~/shared/components";
import { ButtonType } from "~/shared/components/button/button";

export const loader: LoaderFunction = async ({ request }) => {
  const userData = await spotifyStrategy.getSession(request);

  const res = {
    user: userData?.user,
  };
  return res;
};

export default function Index() {
  const data = useLoaderData<IndexData>();
  const { user = null } = data;

  return (
    <>
      <Header user={user} />
      <div>
        {!user && (
          <>
            <p>Please login to your Spotify account</p>
            <Form action={user ? "/logout" : "/auth/spotify"} method="post">
              <Button
                label={user ? "Logout" : "Log in to Spotify"}
                type={ButtonType.PRIMARY}
              />
            </Form>
          </>
        )}
      </div>
    </>
  );
}
