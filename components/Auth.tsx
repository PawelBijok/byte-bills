import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { supabase } from "../lib/supabase";
import { onBgColor } from "../lib/themes";
import { FilledButton } from "./ui/buttons/FilledButton";
import { TextButton } from "./ui/buttons/TextButton";
import { AppInput, AppInputStatus } from "./ui/inputs/AppInput";
import { DashedSpacer } from "./ui/spacers/DashedSpacer";

const validateEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const validatePassword = (password: string): boolean => {
  return password.length >= 5;
};

type AuthProps = {
  onTypeChanged: (value: boolean) => void;
};

type AuthState = {
  registering: boolean;
  email: string;
  password: string;
  passwordRepeat: string;
  loading: boolean;
} & {
  readonly emailStatus: () => AppInputStatus;
  readonly passwordStatus: () => AppInputStatus;
  readonly passwordRepeatStatus: () => AppInputStatus;
  readonly isValid: () => boolean;
};

export default function Auth(props: AuthProps) {
  const initialState: AuthState = {
    registering: false,
    email: "",
    password: "",
    passwordRepeat: "",
    loading: false,
    emailStatus: function (): AppInputStatus {
      if (!this.registering || this.email.length === 0) {
        return "initial";
      }
      return validateEmail(this.email) ? "ok" : "error";
    },
    passwordStatus: function (): AppInputStatus {
      if (!this.registering || this.password.length === 0) {
        return "initial";
      }
      return validatePassword(this.password) ? "ok" : "error";
    },
    passwordRepeatStatus: function (): AppInputStatus {
      if (this.password.length === 0 || this.passwordRepeat.length === 0) {
        return "initial";
      }
      return this.passwordRepeat === this.password ? "ok" : "error";
    },
    isValid: function (): boolean {
      if (this.registering) {
        return (
          validateEmail(this.email) &&
          validatePassword(this.password) &&
          this.password === this.passwordRepeat
        );
      }
      return true;
    },
  };
  const [state, setState] = useState<AuthState>(initialState);

  function onTypeChanged() {
    props.onTypeChanged(!state.registering);
    setState((state) => ({ ...state, registering: !state.registering }));
  }

  async function signInWithEmail() {
    if (!state.isValid()) {
      return;
    }
    setState((state) => ({ ...state, loading: true }));
    const { error } = await supabase.auth.signInWithPassword({
      email: state.email,
      password: state.password,
    });
    if (error) Alert.alert(error.message);
    setState((state) => ({ ...state, loading: false }));
  }

  async function signUpWithEmail() {
    if (!state.isValid()) {
      return;
    }
    setState((state) => ({ ...state, loading: true }));
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: state.email,
      password: state.password,
    });
    if (error) {
      Alert.alert(error.message);
    }
    if (!session) {
      Alert.alert("Please check your inbox for email verification!");
    }
    setState((state) => ({ ...state, loading: false }));
  }

  return (
    <View style={[styles.container]}>
      <View style={[styles.form]}>
        <AppInput
          value={state.email}
          placeholder="unique email"
          autoCapitalize="none"
          onChangeText={(text) =>
            setState((state) => ({
              ...state,
              email: text,
            }))
          }
          status={state.emailStatus()}
          secureTextEntry={false}
          label="Email"
          keyboardType="email-address"
          errorText="Invalid email address."
        />

        <AppInput
          value={state.password}
          placeholder="super secret password"
          autoCapitalize="none"
          onChangeText={(text) =>
            setState((state) => ({
              ...state,
              password: text,
            }))
          }
          secureTextEntry={true}
          label="Password"
          keyboardType="visible-password"
          status={state.passwordStatus()}
          errorText="Password must be at least 5 characters long."
        />
        {state.registering ? (
          <AppInput
            value={state.passwordRepeat}
            placeholder="super secret password once again"
            autoCapitalize="none"
            onChangeText={(text) =>
              setState((state) => ({
                ...state,
                passwordRepeat: text,
              }))
            }
            secureTextEntry={true}
            label="Repeat password"
            keyboardType="visible-password"
            status={state.passwordRepeatStatus()}
            errorText="Password does not match."
          />
        ) : null}

        {state.registering ? (
          <FilledButton
            title="Sign up"
            onPress={signUpWithEmail}
            loading={state.loading}
          ></FilledButton>
        ) : (
          <FilledButton
            title={"Sign in"}
            onPress={signInWithEmail}
            loading={state.loading}
          />
        )}
      </View>
      <View style={[styles.flexSpace]}>
        <DashedSpacer
          color={onBgColor()}
          elements={25}
          elementHeight={1}
          elementSpacing={4}
          spacerHeight={40}
        />
        <TextButton
          title={
            state.registering
              ? "Already have an account? Sign in"
              : "Don't have an account? Register"
          }
          onPress={onTypeChanged}
        ></TextButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    margin: 12,
    marginTop: 30,
    gap: 30,
  },
  flexSpace: {
    flexGrow: 1,
    justifyContent: "flex-end",
    marginBottom: 40,
  },
});
