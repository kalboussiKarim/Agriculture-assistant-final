import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Circle } from "react-native-svg";

export default function TemperatureMeter({ value = 0 }) {
  const [tintColor, setTintColor] = useState("#4369E1");

  useEffect(() => {
    const colors = [
      "#4369E1", // Blue
      "#6BB3FF",
      "#FFC070", // yellow
      "#FFC070", // Orange
      "#FFB060",
      "#FFA050",
      "#FF9040",
      "#FF8030",
      "#FF7030",
      "#FF6030",
      "#FF5030",
      "#FF4030",
      "#FF3030", // Red
      "#FF2020",
      "#FF1010",
      "#FF0000",
    ];

    const check = value > 100 ? 100 : value;
    const colorIndex = Math.floor((check / 100) * (colors.length - 1));
    setTintColor(colors[colorIndex]);
  }, [value]);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginBottom: -80,
      }}
    >
      <AnimatedCircularProgress
        size={250}
        padding={10}
        width={15}
        fill={value > 100 ? 100 : value == null ? 0 : value}
        backgroundColor={"#e0e0e0"}
        rotation={250}
        arcSweepAngle={220}
        tintColor={tintColor}
        renderCap={({ center }) => (
          <Circle
            style={{ backgroundColor: "red", padding: 20 }}
            cx={center.x}
            cy={center.y}
            r="15"
            fill={tintColor}
          />
        )}
      >
        {(fill) => (
          <Text style={{ fontSize: 45, fontWeight: 400, color: "gray" }}>
            {value} °C
          </Text>
        )}
      </AnimatedCircularProgress>
    </View>
  );
}
