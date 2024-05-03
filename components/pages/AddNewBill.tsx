import * as Crypto from "expo-crypto";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import CategotyAmountRow from "../bills/CategoryAmountRow";
import { FilledButton } from "../ui/buttons/FilledButton";
import { TextButton } from "../ui/buttons/TextButton";
import { Gap } from "../ui/common/Gap";
import CurrencySelector from "../ui/modals/CurrencySelector";
import { DashedSpacer } from "../ui/spacers/DashedSpacer";
import { fonts, onBgColor, onBgSubtleColor } from "../../lib/themes";
import { Bill, Category } from "../../types/bill";
import { useBillsDispatch } from "../../context/BillsContext";
import moment from "moment";
import DateSelector from "../ui/modals/DateSelector";

type EditableCategory = {
  id: string;
  name: string;
  value: string;
};

export default function AddNewBill() {
  const billsDispatcher = useBillsDispatch();
  const [currencyPickerVisible, setCurrencyPickerVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("pln");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const freshCategory = { name: "", value: "", id: "1" };
  const [categories, setCategories] = useState<EditableCategory[]>([
    { ...freshCategory },
  ]);

  const save = () => {
    const billCategoties: Category[] = categories.map((category) => {
      const value = parseFloat(category.value.replaceAll(",", "."));
      return {
        name: category.name,
        value: value,
      };
    });

    const bill: Bill = {
      date: selectedDate,
      id: Crypto.randomUUID(),
      currency: selectedCurrency,
      categories: billCategoties,
    };

    billsDispatcher!({
      type: "ADD",
      bill: bill,
    });

    if (canDismiss) {
      router.back();
    }
  };

  const updateCategoryName = (id: string, name: string) => {
    setCategories((oldCategories) => {
      return oldCategories.map((category) => {
        if (category.id === id) {
          return { ...category, name };
        }
        return category;
      });
    });
  };
  const updateCategoryAmount = (id: string, value: string) => {
    setCategories((oldCategories) => {
      return oldCategories.map((category) => {
        if (category.id === id) {
          return { ...category, value: value };
        }
        return category;
      });
    });
  };

  const addNewCategory = () => {
    const UUID = Crypto.randomUUID();
    setCategories((oldCategories) => {
      return [...oldCategories, { ...freshCategory, id: UUID }];
    });
  };

  const deleteCategory = (id: string) => {
    setCategories((oldCategories) => {
      return oldCategories.filter((c) => c.id !== id);
    });
  };

  const canDismiss = router.canGoBack();
  return (
    <View
      style={{
        flex: 1,
        padding: 15,
      }}
    >
      <View
        style={{
          flexGrow: 1,
          gap: 15,
        }}
      >
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <CategotyAmountRow
              categoryName={item.name}
              amount={item.value}
              onAmountChanged={(amount) =>
                updateCategoryAmount(item.id, amount)
              }
              onNameChanged={(name) => updateCategoryName(item.id, name)}
              onDelete={() => deleteCategory(item.id)}
              enableDeleteButton={categories.length > 1}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <Gap size="xl" />}
          ListFooterComponent={() => (
            <View style={{ paddingTop: 30 }}>
              <TextButton
                title="New category"
                onPress={addNewCategory}
                icon={{
                  name: "plus",
                  type: "font-awesome",
                  size: 15,
                }}
              />
            </View>
          )}
        />
      </View>
      <SelectedCurrency
        selectedCurrency={selectedCurrency}
        onSelectPress={() => setCurrencyPickerVisible(true)}
      />
      <SelectDateTime
        selectedDate={selectedDate}
        onSelectPress={() => setDatePickerVisible(true)}
      />

      <FilledButton title="Save" onPress={save} />
      <CurrencySelector
        visible={currencyPickerVisible}
        onCurrencySelected={(currency) => {
          setCurrencyPickerVisible(false);
          setSelectedCurrency(currency);
        }}
      />
      <DateSelector
        visible={datePickerVisible}
        onDateSelected={(date) => {
          setDatePickerVisible(false);
          setSelectedDate(date);
        }}
      />
    </View>
  );
}

type SelectedCurrencyProps = {
  selectedCurrency: string;
  onSelectPress: () => void;
};

function SelectedCurrency(props: SelectedCurrencyProps) {
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
          Select currency
        </Text>
        <TextButton
          title={props.selectedCurrency}
          onPress={props.onSelectPress}
        />
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

type SelectedDateTimeProps = {
  selectedDate: Date;
  onSelectPress: () => void;
};

function SelectDateTime(props: SelectedDateTimeProps) {
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
          Select date
        </Text>
        <TextButton
          title={moment(props.selectedDate).format("DD-MM-YYYY")}
          onPress={props.onSelectPress}
        />
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
