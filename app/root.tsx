import type { MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts } from "@remix-run/react";
import styles from "~/shared/styles/global.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

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
