import { useState } from "react";
import BottomModal from "./BottomModal";
import DateTimePicker from "@react-native-community/datetimepicker";

type DateSelectorProps = {
  visible: boolean;
  onDateSelected: (date: Date) => void;
};
export default function DateSelector(props: DateSelectorProps) {
  const [date, setDate] = useState(new Date());
  return (
    <BottomModal
      visible={props.visible}
      onAccept={() => props.onDateSelected(date)}
    >
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={"date"}
        display="spinner"
        onChange={(event) => setDate(new Date(event.nativeEvent.timestamp))}
      />
    </BottomModal>
  );
}
