import { StyleSheet } from "react-native"
import { Button } from "react-native-elements"
import { isDark } from "../../../lib/themes"

type AppButtonProps = {
  title: string
  onPress: () => void
  loading?: boolean
}

export const AppButton = (props: AppButtonProps) => {
  return (
    <Button
      loading={props.loading}
      loadingProps={{ color: isDark() ? "white" : "black" }}
      title={props.title}
      buttonStyle={[
        styles.appButton,
        isDark() ? styles.appButtonDark : styles.appButtonLight,
      ]}
      titleStyle={[isDark() ? { color: "white" } : { color: "black" }]}
      onPress={props.onPress}
    />
  )
}

const styles = StyleSheet.create({
  appButton: {
    borderRadius: 4,
    borderWidth: 3,
    padding: 10,
    elevation: 2,
    borderStyle: "dashed",
  },
  appButtonLight: {
    backgroundColor: "#ddd",
    borderColor: "black",
  },
  appButtonDark: {
    backgroundColor: "#222",
    borderColor: "white",
  },
})
