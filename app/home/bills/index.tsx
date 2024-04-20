import { SafeAreaView } from "react-native-safe-area-context";
import Bills from "../../../components/pages/Bills";

export default function BillsPage() {
  return (
    <SafeAreaView style={{ flex: 1, padding: 15 }}>
      <Bills />
    </SafeAreaView>
  );
}
