import type { MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts } from "@remix-run/react";
import styles from "~/shared/styles/global.css";

export const meta: MetaFunction = () => {
  const description =
    "With Spotify Releaser, you will never miss new music from your favourite artists!";
  return {
    viewport: "width=device-width,initial-scale=1",
    charset: "utf-8",
    description,
    title: "Spotify Releaser",
    "og:title": "Spotify Releaser",
    "og:description": description,
    "og:image": "meta_img.png",
  };
};

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {typeof document === "undefined" ? "__STYLES__" : null}
      </head>
      <body>
        <Outlet />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
}
