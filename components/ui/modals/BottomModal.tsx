import { Children, ReactNode } from "react";
import { Modal, View } from "react-native";
import { onBgColor, overlayBgColor } from "../../../lib/themes";
import { FilledButton } from "../buttons/FilledButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableWithoutFeedback } from "react-native";

type BottomModalProps = {
  visible: boolean;
  children: ReactNode;
  onAccept: () => void;
  onBackdropPress?: () => void;
};
export default function BottomModal(props: BottomModalProps) {
  const insets = useSafeAreaInsets();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      style={{
        backgroundColor: "yellow",
        borderColor: "red",
        borderWidth: 10,
      }}
      visible={props.visible}
    >
      <TouchableWithoutFeedback onPress={props.onBackdropPress}>
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0)",
          }}
        />
      </TouchableWithoutFeedback>
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
        {props.children}
        <View
          style={{
            paddingHorizontal: 30,
            paddingBottom: insets.bottom,
          }}
        >
          <FilledButton title="Ok" onPress={props.onAccept} />
        </View>
      </View>
    </Modal>
  );
}
