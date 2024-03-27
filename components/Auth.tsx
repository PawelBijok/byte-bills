import React, { useState } from "react"
import { Alert, StyleSheet, View } from "react-native"
import { supabase } from "../lib/supabase"
import { AppButton } from "./ui/buttons/AppButton"
import { AppInput } from "./ui/inputs/AppInput"

export default function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert("Please check your inbox for email verification!")
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <AppInput
          value={email}
          placeholder="unique email"
          onChangeText={(text) => setEmail(text)}
          secureTextEntry={false}
          label="Email"
          keyboardType="email-address"
        />
      </View>
      {/* <View style={[styles.verticallySpaced, styles.mt20]}>
        <AppInput
          value={password}
          placeholder="super secret password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          label="Password"
          keyboardType="visible-password"
        />
      </View> */}
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <AppButton
          title="Sign up"
          onPress={() => signUpWithEmail()}
          loading={loading}
        ></AppButton>
      </View>
      <View style={[styles.verticallySpaced]}></View>
      <AppButton
        title={"Sign up"}
        onPress={() => {
          setLoading((loading) => !loading)
        }}
        loading={loading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
})
