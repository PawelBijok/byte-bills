import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useCurrency } from "../../../context/CurrencyContext";
import { onBgColor, overlayBgColor } from "../../../lib/themes";
import { Currency } from "../../../types/currency";
import BottomModal from "./BottomModal";

type CurrencySelectorProps = {
  visible: boolean;
  initialValue?: Currency;
  onCurrencySelected: (currency: Currency) => void;
  onCancel?: () => void;
};
export default function CurrencySelector(props: CurrencySelectorProps) {
  const availableCurrencies = useCurrency()!.availableCurrencies;
  const [currency, setCurrency] = useState<string>(
    props.initialValue?.id ?? availableCurrencies![0].id,
  );
  return (
    <BottomModal
      visible={props.visible}
      onAccept={() =>
        props.onCurrencySelected(
          availableCurrencies?.find((c) => c.id == currency)!,
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
        {availableCurrencies?.map((currency) => (
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
