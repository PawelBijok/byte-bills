import { User } from "@supabase/supabase-js"
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { initialize as initializeSupabase } from "../lib/supabase"
import { Profile } from "../types/profile"

type UserState = {
  user?: User
  profile?: Profile
  isLoading: boolean
  logIn: (email: string, password: string) => void
  logOut: () => void
  register: (
    email: string,
    password: string,
    passwordConfirmation: string
  ) => void
}

const initialUserState = {
  isLoading: true,
  logIn: () => {},
  logOut: () => {},
  register: () => {},
}

export const UserContext = createContext<UserState>(initialUserState)

type UserProviderProps = {
  children: ReactNode
}

export default function UserProvider(props: UserProviderProps) {
  const logIn = async (email: string, password: string) => {}
  const logOut = async () => {}
  const register = async () => {}

  const [state, setState] = useState<UserState>({
    ...initialUserState,
    logIn,
    logOut,
    register,
  })

  useEffect(() => {
    const fetchUser = async () => {
      initializeSupabase((session) => {
        if (session === null) {
          setState((state) => {
            return {
              ...state,
              user: undefined,
              profile: undefined,
              isLoading: false,
            }
          })
        } else {
          setState((state) => {
            return { ...state, user: session.user, isLoading: false }
          })
        }
      })
    }
    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
