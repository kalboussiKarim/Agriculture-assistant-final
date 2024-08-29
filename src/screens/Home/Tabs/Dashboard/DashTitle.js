import { View, Text, Dimensions } from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");
export default function DashTitle() {
  return (
    <View
      style={{
        alignItems: "center",
        width: width,
        paddingBottom: height * 0.009,
      }}
    >
      <Text style={{ color: "#3d3d3d", fontSize: 32, fontWeight: 600 }}>
        Dashboard
      </Text>
    </View>
  );
}
