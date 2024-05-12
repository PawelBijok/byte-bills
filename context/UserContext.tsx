import { Session, User } from "@supabase/supabase-js"
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { Alert } from "react-native"
import { initialize as initializeSupabase, supabase } from "../lib/supabase"
import { Currency } from "../types/currency"
import { Profile } from "../types/profile"

type UserState = {
  user?: User
  profile?: Profile
  isLoading: boolean
  logIn: (email: string, password: string) => Promise<boolean>
  logOut: () => void
  register: (email: string, password: string) => Promise<boolean>
  setDefaultCurrency: (currency: Currency) => void
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
  setDefaultCurrency: () => {},
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

  const getProfile = async (user: User): Promise<Profile | undefined> => {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        "id, fullName:full_name, avatarUrl:avatar_url, currency:currencies!inner(*)"
      )
      .eq("id", user.id)
      .returns<Profile[]>()
      .single()
    if (error || data === null) {
      return undefined
    }
    return data
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

  const [userState, setUserState] = useState<UserState>({
    ...initialUserState,
    logIn,
    logOut,
    register,
  })

  useEffect(() => {
    async function setDefaultCurrency(currency: Currency) {
      const { error } = await supabase
        .from("profiles")
        .update({ default_currency_id: currency.id })
        .eq("id", userState.user!.id)
      if (error !== null) {
        console.log(error.message)
        return
      }
      setUserState((state) => {
        return { ...state, profile: { ...state.profile!, currency } }
      })
    }
    setUserState((state) => {
      return { ...state, setDefaultCurrency }
    })
  }, [userState.user, setUserState])

  async function onSessionChanged(session: Session | null) {
    if (session === null) {
      setUserState((state) => {
        return {
          ...state,
          user: undefined,
          profile: undefined,
          isLoading: false,
        }
      })
    } else {
      let profile: Profile | undefined = undefined
      if (userState.profile === undefined) {
        profile = await getProfile(session.user)
      }
      setUserState((state) => {
        return { ...state, user: session.user, profile, isLoading: false }
      })
    }
  }

  useEffect(() => {
    initializeSupabase(onSessionChanged)
  }, [])

  return (
    <UserContext.Provider value={userState}>
      {props.children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
