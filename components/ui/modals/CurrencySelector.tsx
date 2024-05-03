import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { overlayBgColor, onBgColor } from "../../../lib/themes";
import { FilledButton } from "../buttons/FilledButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type CurrencySelectorProps = {
  visible: boolean;
  onCurrencySelected: (currency: string) => void;
};
export default function CurrencySelector(props: CurrencySelectorProps) {
  const [currency, setCurrency] = useState("pln");
  const insets = useSafeAreaInsets();
  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <View
        style={{
          width: "100%",
          backgroundColor: overlayBgColor(),
          borderTopRightRadius: 18,
          borderTopLeftRadius: 18,
          position: "absolute",
          shadowColor: onBgColor(),
          shadowRadius: 15,
          shadowOpacity: 0.1,
          bottom: 0,
        }}
      >
        <Picker
          mode="dialog"
          selectedValue={currency}
          style={{
            padding: 0,
            margin: 0,
          }}
          onValueChange={(itemValue, _) => setCurrency(itemValue)}
        >
          {/* TODO: update curencies */}
          <Picker.Item label="Polish złoty" color={onBgColor()} value="pln" />
          <Picker.Item label="American dolar" color={onBgColor()} value="usd" />
          <Picker.Item label="Euro" value="eur" color={onBgColor()} />
        </Picker>
        <View
          style={{
            paddingHorizontal: 30,
            paddingBottom: insets.bottom,
          }}
        >
          <FilledButton
            title="Ok"
            onPress={() => props.onCurrencySelected(currency)}
          />
        </View>
      </View>
    </Modal>
  );
}
