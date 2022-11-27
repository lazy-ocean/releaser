import { createContext } from "react";
import type { UserProfile } from "../types/types";

interface UserContextInterface {
  user: UserProfile | null;
}

const UserContext = createContext<UserContextInterface>({
  user: null,
});

export default UserContext;
