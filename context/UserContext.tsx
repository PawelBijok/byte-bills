import { Session, User } from "@supabase/supabase-js";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Profile } from "../types/profile";
import { initialize } from "../lib/supabase";

type UserState = {
  user?: User;
  profile?: Profile;
};

export const UserContext = createContext<UserState>({});

type UserProviderProps = {
  children: ReactNode;
};

export default function UserProvider(props: UserProviderProps) {
  const [state, setState] = useState<UserState>({});

  useEffect(() => {
    const fetchUser = async () => {
      initialize((sesh) => {
        if (sesh === null) {
          setState({ user: undefined, profile: undefined });
        } else {
          setState({ user: sesh.user });
        }
      });
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
