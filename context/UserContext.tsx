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
  isLoading: boolean;
};

export const UserContext = createContext<UserState>({ isLoading: true });

type UserProviderProps = {
  children: ReactNode;
};

export default function UserProvider(props: UserProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [state, setState] = useState<UserState>({ isLoading });

  useEffect(() => {
    const fetchUser = async () => {
      initialize((sesh) => {
        if (sesh === null) {
          setState({ user: undefined, profile: undefined, isLoading: false });
        } else {
          setState({ user: sesh.user, isLoading: false });
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
