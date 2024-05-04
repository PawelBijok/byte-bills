import { Text, View } from "react-native";
import { fonts, onBgColor, onBgSubtleColor } from "../../lib/themes";
import { Gap } from "../ui/common/Gap";
import TextTag from "../ui/text/TextTag";
import { Bill, getFullAmount } from "../../types/bill";
import moment from "moment";

type BillEntryItemProps = {
  bill: Bill;
};

export default function BillEntryItem(props: BillEntryItemProps) {
  let textColor = onBgColor();
  let borderColor = onBgSubtleColor();
  const uniqueCategoriesNames: string[] = [
    ...new Set(props.bill.categories.map((e) => e.name)),
  ];
  return (
    <View
      style={{
        borderColor: borderColor,
        borderWidth: 2,
        padding: 10,
        borderStyle: "dashed",
        borderRadius: 5,
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
          {`${getFullAmount(props.bill).toFixed(2)} ${props.bill.currency.shortName}`}
        </Text>
        <Text style={{ color: textColor, fontFamily: fonts.pixelify }}>
          {moment(props.bill.date).format("DD-MM-YYYY")}
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
        {uniqueCategoriesNames.map((name) => (
          <TextTag title={name} key={name} />
        ))}
      </View>
    </View>
  );
}
