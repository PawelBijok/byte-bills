import { User } from "@supabase/supabase-js"
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { Alert } from "react-native"
import { initialize as initializeSupabase, supabase } from "../lib/supabase"
import { Profile } from "../types/profile"

type UserState = {
  user?: User
  profile?: Profile
  isLoading: boolean
  logIn: (email: string, password: string) => Promise<boolean>
  logOut: () => void
  register: (email: string, password: string) => Promise<boolean>
}

const initialUserState = {
  isLoading: true,
  logIn: async () => {
    return false
  },
  logOut: () => {},
  register: async () => {
    return false
  },
}

export const UserContext = createContext<UserState>(initialUserState)

type UserProviderProps = {
  children: ReactNode
}

export default function UserProvider(props: UserProviderProps) {
  const logIn = async (email: string, password: string): Promise<boolean> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      Alert.alert(error.message)
      return false
    }
    return true
  }
  const logOut = async () => {
    supabase.auth.signOut()
  }
  const register = async (email: string, password: string) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      Alert.alert(error.message)
      return false
    }
    if (!session) {
      Alert.alert("Please check your inbox for email verification!")
      return false
    }
    return true
  }

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
