import { View, Text } from "react-native";
import React from "react";
//import CircularProgress from "react-native-circular-progress-indicator";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function HumidityMeter({ value }) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AnimatedCircularProgress
        size={250}
        padding={10}
        width={60}
        fill={value > 100 ? 100 : value == "nan" ? 0 : value}
        backgroundColor={"#d6f0ff"}
        tintColor="#4369E1"
        rotation={260}
      >
        {(fill) => (
          <Text style={{ fontSize: 36, fontWeight: 500, color: "gray" }}>
            {value}%
          </Text>
        )}
      </AnimatedCircularProgress>
    </View>
  );
}
