import { View } from 'react-native';
import { Gap } from '../ui/common/Gap';
import { AppInput } from '../ui/inputs/AppInput';

type CategoryAmountRowProps = {
  categoryName?: string;
  amount?: string;
  onNameChanged: (name: string) => void;
  onAmountChanged: (value: string) => void;
}

export default function CategotyAmountRow(props: CategoryAmountRowProps) {
  return <View style={{
    flexDirection: "row"

  }}>
    <View style={{
      flex: 2,
    }}>
      <AppInput label="Category" widthFraction={0.66} keyboardType='default' value={props.categoryName ?? ''} onChangeText={props.onNameChanged} />
    </View>
    <Gap size="xl" />
    <View style={{
      flex: 1,
    }}>
      <AppInput label="Amount" widthFraction={0.33} keyboardType='decimal-pad' value={props.amount?.toString() ?? ''} onChangeText={props.onAmountChanged} />
    </View>
  </View>
}
