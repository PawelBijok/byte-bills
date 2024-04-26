import { Octicons } from "@expo/vector-icons"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { fonts, onBgColor } from "../../lib/themes"

type MonthSelectorProsp = {

  month: string;
  year: number;
  onPrevious: ()=>void;
  onNext: ()=>void;
}
export default function MonthsSelector(props:MonthSelectorProsp) {
  let color = onBgColor()
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={props.onPrevious}
      >
        <View style={{ paddingHorizontal: 5 }}>
          <Octicons name="chevron-left" size={30} color={color} />
        </View>
      </TouchableOpacity>
      <Text style={{ color, fontFamily: fonts.pixelify, fontSize: 20 }}>
        {props.month} {props.year}
      </Text>

      <TouchableOpacity
        onPress={props.onNext}
      >
        <View style={{ paddingHorizontal: 5 }}>
          <Octicons name="chevron-right" size={30} color={color} />
        </View>
      </TouchableOpacity>
    </View>
  )
}
