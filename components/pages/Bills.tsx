import { View, Text } from "react-native";
import TextHeader from "../ui/text/TextHeader";
import BillEntryItem from "../bills/BillEntryItem";
import { Gap } from "../ui/common/Gap";

export default function Bills() {
  return (
    <View>
      <TextHeader title="Your bills" size="medium" />
      <Gap size="l" />
      <BillEntryItem />
    </View>
  );
}
