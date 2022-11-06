import type { MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts } from "@remix-run/react";
import styles from "~/shared/styles/global.css";
import { useState } from "react";
import ModalContext from "./shared/contexts/modalContext";

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
    "og:image": "https://spotify-releaser.vercel.app/meta_img.png",
  };
};

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "icon",
      href: "/favicon.ico",
      sizes: "any",
    },
    {
      rel: "icon",
      href: "/icon.png",
      type: "image/png",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
    },
  ];
}

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState<string | false>(false);
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {typeof document === "undefined" ? "__STYLES__" : null}
      </head>
      <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
        <body>
          <Outlet />
          <LiveReload />
          <Scripts />
        </body>
      </ModalContext.Provider>
    </html>
  );
}
