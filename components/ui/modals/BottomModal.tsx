import { Children, ReactNode } from "react";
import { Modal, View } from "react-native";
import { onBgColor, overlayBgColor } from "../../../lib/themes";
import { FilledButton } from "../buttons/FilledButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type BottomModalProps = {
  visible: boolean;
  children: ReactNode;
  onAccept: () => void;
};
export default function BottomModal(props: BottomModalProps) {
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
