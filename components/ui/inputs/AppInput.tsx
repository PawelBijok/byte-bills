import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import { isDark } from "../../../lib/themes"
import { DashedSpacer } from "../spacers/DashedSpacer"
type AppInputProps = {
  value?: string
  onChangeText?: (value: string) => void
  placeholder?: string
  secureTextEntry?: boolean
  label?: string
  keyboardType?: KeyboardTypeOptions
}
export const AppInput = (props: AppInputProps) => {
  return (
    <View style={styles.input}>
      <Text style={{ color: isDark() ? "white" : "black" }}>{props.label}</Text>
      <TextInput
        style={{
          fontSize: 20,
          paddingBottom: 6,
          paddingHorizontal: 4,
          paddingTop: 10,
          color: isDark() ? "white" : "black",
        }}
        placeholderTextColor={isDark() ? "#999" : "#888"}
        keyboardType={props.keyboardType}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
      />
      <DashedSpacer />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {},
})
