import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { overlayBgColor, onBgColor } from "../../../lib/themes";
import { FilledButton } from "../buttons/FilledButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomModal from "./BottomModal";
import { Currency, availableCurrencies } from "../../../types/currency";

type CurrencySelectorProps = {
  visible: boolean;
  initialValue?: Currency;
  onCurrencySelected: (currency: Currency) => void;
  onCancel?: () => void;
};
export default function CurrencySelector(props: CurrencySelectorProps) {
  const [currency, setCurrency] = useState<string>(
    props.initialValue?.id ?? availableCurrencies[0].id,
  );
  return (
    <BottomModal
      visible={props.visible}
      onAccept={() =>
        props.onCurrencySelected(
          availableCurrencies.find((c) => c.id == currency)!,
        )
      }
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
        {availableCurrencies.map((currency) => (
          <Picker.Item
            label={currency.name}
            color={onBgColor()}
            value={currency.id}
            key={currency.id}
          />
        ))}
      </Picker>
    </BottomModal>
  );
}
