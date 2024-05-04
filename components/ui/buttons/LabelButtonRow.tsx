import { Text, View } from "react-native";
import { fonts, onBgColor, onBgSubtleColor } from "../../../lib/themes";
import { TextButton } from "./TextButton";
import { DashedSpacer } from "../spacers/DashedSpacer";
import { Gap } from "../common/Gap";

type LabelButtonRowProps = {
  buttonLabel: string;
  label: string;
  onPress: () => void;
};

export default function LabelButtonRow(props: LabelButtonRowProps) {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: onBgColor(),
            fontFamily: fonts.pixelify,
          }}
        >
          {props.label}
        </Text>
        <TextButton title={props.buttonLabel} onPress={props.onPress} />
      </View>
      <DashedSpacer
        elements={15}
        elementHeight={1}
        spacerHeight={20}
        color={onBgSubtleColor()}
      />
      <Gap size="l" />
    </View>
  );
}
