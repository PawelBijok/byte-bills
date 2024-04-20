import { Stack, router } from "expo-router";
import { Dimensions, Pressable } from "react-native";
import { View, Text, Image } from "react-native";
import { isDark, onBgColor } from "../../lib/themes";
import { SafeAreaView } from "react-native-safe-area-context";
import { FilledButton } from "../../components/ui/buttons/FilledButton";
import { Gap } from "../../components/ui/common/Gap";

export default function LandingPage() {
  const windowWidth = Dimensions.get("window").width;
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          headerTitle: "",
        }}
      />

      <Image
        source={
          isDark()
            ? require("../../assets/decoration-on-dark.png")
            : require("../../assets/decoration-on-light.png")
        }
        style={{
          position: "absolute",
          bottom: -50,
          right: -50,
          height: windowWidth * 1.5,
          width: windowWidth,
          resizeMode: "contain",
        }}
      />
      <SafeAreaView style={{ flex: 1, padding: 15 }} edges={["top"]}>
        <Gap size={70} />

        <Text
          style={{
            fontSize: 64,
            fontFamily: "Overpass-Bold",
            color: onBgColor(),
          }}
        >
          Byte Bills
        </Text>
        <Gap size={60} />
        <FilledButton
          title="Get Started"
          onPress={() => {
            router.navigate("/auth/form");
          }}
        />
      </SafeAreaView>
    </>
  );
}
