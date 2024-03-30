import { View } from "react-native";

type DashedSpacerProps = {
  elements?: number;
  elementHeight?: number;
  color?: string;
  elementSpacing?: number;
  spacerHeight?: number;
};

export const DashedSpacer = (props: DashedSpacerProps) => {
  let items = new Array(props.elements ?? 10).fill(null);

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: props.spacerHeight ?? 3,
        gap: props.elementSpacing ?? 5,
      }}
    >
      {items.map((_, index) => (
        <View
          key={index}
          style={{
            height: props.elementHeight ?? 3,
            backgroundColor: props.color,
            flex: 1,
          }}
        ></View>
      ))}
    </View>
  );
};
