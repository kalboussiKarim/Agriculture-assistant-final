import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Rect, Text as SvgText } from "react-native-svg";

const GaugeMeter = ({ value }) => {
  const radius = 80;
  const strokeWidth = 10;
  const center = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const progress = value / 100;
  const progressDashArray = `${circumference} ${circumference}`;

  return (
    <View style={styles.container}>
      <Svg width={2 * center} height={2 * center}>
        {/* Background Circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
          fill="#a3c2d4"
        />
        {/* Progress Arc */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#22a4f0"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={progressDashArray}
          strokeDashoffset={(1 - progress) * circumference}
          strokeLinecap="round"
        />
        {/* Center Text */}
        <SvgText
          x={center}
          y={center}
          textAnchor="middle"
          alignmentBaseline="center"
          fontSize="30"
          fontWeight="bold"
          fill="#000"
        >
          {value}%
        </SvgText>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
export default GaugeMeter;
