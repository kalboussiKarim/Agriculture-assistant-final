import { View, Text } from "react-native";
import React from "react";

export default function DefaultSensor({ value, unit }) {
  return (
    <View style={{ alignItems: "center", margin: 20 }}>
      <Text style={{ fontSize: 50, color: "#adadad" }}>
        {value} {unit}
      </Text>
    </View>
  );
}
