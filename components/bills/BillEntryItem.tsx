import moment from "moment"
import React, { useRef } from "react"
import { Alert, Animated, Text, TouchableOpacity, View } from "react-native"
import { Swipeable } from "react-native-gesture-handler"
import { deleteBill } from "../../lib/db/bills"
import { errorColor, fonts, onBgColor, onBgSubtleColor } from "../../lib/themes"
import { useBillsStore } from "../../store/BillsStore"
import { Bill, getFullAmount } from "../../types/bill"
import { Gap } from "../ui/common/Gap"
import TextTag from "../ui/text/TextTag"

type BillEntryItemProps = {
  bill: Bill
}

export default function BillEntryItem(props: BillEntryItemProps) {
  let textColor = onBgColor()
  let error = errorColor()
  let borderColor = onBgSubtleColor()
  const billsStore = useBillsStore()

  const uniqueCategoriesNames: string[] = [...new Set(props.bill.categories.map((e) => e.name))]

  const swipeableRef = useRef<Swipeable>()

  const deleteItem = async () => {
    swipeableRef.current?.close()
    Alert.alert("Warning", "Are you sure you want to delete this bill?", [
      {
        text: "Delete",
        onPress: () => {
          confirmDelete()
        },
        style: "destructive",
      },
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
    ])
  }

  const confirmDelete = async () => {
    const billId = props.bill.id
    if (billId === undefined) {
      return
    }
    const success = deleteBill(billId)
    if (!success) {
      return Alert.alert("Error", "Failed to delete bill")
    }
    billsStore.removeBill(billId)
  }

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => (
    <View
      style={{
        width: 90,
        flexDirection: "row",
      }}
    >
      <RightActionElement
        text="Delete"
        color={`${error}33`}
        x={85}
        progress={progress}
        onPress={() => {
          deleteItem()
        }}
      />
    </View>
  )
  return (
    <Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>
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
            flex: 1,
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
    </Swipeable>
  )
}

type ActionElementProps = {
  text: string
  color: string
  x: number
  progress: Animated.AnimatedInterpolation<number>
  onPress?: () => void
}
const RightActionElement = (props: ActionElementProps) => {
  const borderColor = onBgSubtleColor()
  const trans = props.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [props.x, 0],
  })

  return (
    <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
      <TouchableOpacity onPress={props.onPress} style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: props.color,
            marginLeft: 5,
            borderColor: borderColor,
            borderWidth: 2,
            borderRadius: 5,
            borderStyle: "dashed",
          }}
        >
          <Text>{props.text}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}
