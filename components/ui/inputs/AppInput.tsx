import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { errorColor, isDark, okColor, onBgColor } from "../../../lib/themes";
import { DashedSpacer } from "../spacers/DashedSpacer";

export type AppInputStatus = "initial" | "ok" | "error";

type AppInputProps = {
  value?: string;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  label?: string;
  keyboardType?: KeyboardTypeOptions;
  status?: AppInputStatus;
  errorText?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

export const AppInput = (props: AppInputProps) => {
  let color = onBgColor();
  switch (props.status) {
    case "ok":
      color = okColor();
      break;
    case "error":
      color = errorColor();
      break;
    case "initial" || undefined:
      color = onBgColor();
      break;
  }
  return (
    <View style={styles.input}>
      <Text style={{ color: color, fontFamily: "Pixelify" }}>
        {props.label}
      </Text>
      <TextInput
        style={{
          fontSize: 20,
          paddingBottom: 6,
          paddingHorizontal: 4,
          paddingTop: 10,
          color: color,
          fontFamily: "Overpass-Bold",
        }}
        autoCapitalize={props.autoCapitalize}
        placeholderTextColor={isDark() ? "#999" : "#888"}
        keyboardType={props.keyboardType}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
      />
      <DashedSpacer
        color={color}
        spacerHeight={10}
        elements={15}
        elementHeight={2}
        elementSpacing={8}
      />
      {props.errorText != null && props.status == "error" ? (
        <Text style={{ color: color, fontFamily: "Overpass-Light" }}>
          {props.errorText}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {},
});
