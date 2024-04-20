import { View, Text } from "react-native";
import { fonts, onBgColor } from "../../lib/themes";
import TextTag from "../ui/text/TextTag";
import { Gap } from "../ui/common/Gap";

export default function BillEntryItem() {
  let textColor = onBgColor();
  return (
    <View
      style={{
        borderColor: textColor,
        borderRadius: 10,
        borderWidth: 2,
        padding: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: textColor,
            fontSize: 16,
            fontFamily: fonts.overpassBold,
          }}
        >
          187,23 pln
        </Text>
        <Text style={{ color: textColor, fontFamily: fonts.pixelify }}>
          2024-04-20
        </Text>
      </View>
      <Gap size="s" />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          columnGap: 4,
          rowGap: 2,
        }}
      >
        <TextTag title="Groceries" />
        <TextTag title="Alkohol" />
        <TextTag title="Utils" />
        <TextTag title="Home" />
      </View>
    </View>
  );
}
