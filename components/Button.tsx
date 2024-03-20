import { StyleSheet } from "react-native"
import { Button } from "react-native-elements"

type AppButtonProps = {
  title: string
  onPress: () => void
}

export const AppButton = (props: AppButtonProps) => {
  return (
    <Button
      title={props.title}
      buttonStyle={styles.appButtonLight}
      onPress={props.onPress}
    />
  )
}

const styles = StyleSheet.create({
  appButtonLight: {
    backgroundColor: "#009688",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
})
