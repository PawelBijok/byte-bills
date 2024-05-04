import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { overlayBgColor, onBgColor } from "../../../lib/themes";
import { FilledButton } from "../buttons/FilledButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomModal from "./BottomModal";

type CurrencySelectorProps = {
  visible: boolean;
  initialValue?: string;
  onCurrencySelected: (currency: string) => void;
  onCancel?: () => void;
};
export default function CurrencySelector(props: CurrencySelectorProps) {
  const [currency, setCurrency] = useState(props.initialValue ?? "pln");
  return (
    <BottomModal
      visible={props.visible}
      onAccept={() => props.onCurrencySelected(currency)}
      onBackdropPress={props.onCancel}
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
    </BottomModal>
  );
}
