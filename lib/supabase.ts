import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session, createClient } from "@supabase/supabase-js";
import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import { secrets } from "../secrets";
import { useState } from "react";

const supabaseUrl = secrets.url;
const supabaseAnonKey = secrets.apiKey;
export let supabaseSession: Session | null;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const initialize = (
  onSessionChanged: (sesh: Session | null) => void,
) => {
  function handleSession(session: Session | null) {
    onSessionChanged(session);
    supabaseSession = session;
  }

  supabase.auth.onAuthStateChange((_event, session) => {
    handleSession(session);
  });

  AppState.addEventListener("change", (state) => {
    if (state === "active") {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });
};
