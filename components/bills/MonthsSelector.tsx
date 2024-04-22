import { Octicons } from "@expo/vector-icons"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { fonts, onBgColor } from "../../lib/themes"

export default function MonthsSelector() {
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
        onPress={() => {
          console.log("left")
        }}
      >
        <View style={{ paddingHorizontal: 5 }}>
          <Octicons name="chevron-left" size={30} color={color} />
        </View>
      </TouchableOpacity>
      <Text style={{ color, fontFamily: fonts.pixelify, fontSize: 20 }}>
        April 2024
      </Text>

      <TouchableOpacity
        onPress={() => {
          console.log("right")
        }}
      >
        <View style={{ paddingHorizontal: 5 }}>
          <Octicons name="chevron-right" size={30} color={color} />
        </View>
      </TouchableOpacity>
    </View>
  )
}
