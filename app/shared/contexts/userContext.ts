import { createContext } from "react";
import type { Session } from "remix-auth-spotify";

interface UserContextInterface {
  user: Session | null;
}

const UserContext = createContext<UserContextInterface>({
  user: null,
});

export default UserContext;
