import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import { errorColor, isDark, okColor, onBgColor } from "../../../lib/themes"
import { DashedSpacer } from "../spacers/DashedSpacer"

export type AppInputStatus = "initial" | "ok" | "error"
type AppInputProps = {
  value?: string
  onChangeText?: (value: string) => void
  placeholder?: string
  secureTextEntry?: boolean
  label?: string
  keyboardType?: KeyboardTypeOptions
  status?: AppInputStatus
  errorText?: string
}
export const AppInput = (props: AppInputProps) => {
  let color = "white"
  switch (props.status) {
    case "ok":
      color = okColor()
      break
    case "error":
      color = errorColor()
      break
    case "initial" || undefined:
      color = onBgColor()
      break
  }
  return (
    <View style={styles.input}>
      <Text style={{ color: color }}>{props.label}</Text>
      <TextInput
        style={{
          fontSize: 20,
          paddingBottom: 6,
          paddingHorizontal: 4,
          paddingTop: 10,
          color: color,
        }}
        placeholderTextColor={isDark() ? "#999" : "#888"}
        keyboardType={props.keyboardType}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
      />
      <DashedSpacer color={color} />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {},
})
