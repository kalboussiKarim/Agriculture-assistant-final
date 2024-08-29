import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

export default function LightMeter({ value = 0 }) {
  const [tintColor, setTintColor] = useState("#000000");
  const [brightText, setBrightText] = useState("Dark");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    return () => {
      fadeAnim.setValue(0);
    };
  }, [value, fadeAnim]);

  useEffect(() => {
    const colors = [
      "#333333",
      "#999999",
      "#FFEDBF",
      "#FFDD7A",
      "#FFD38C",
      "#FFCC67",
      "#FFC670",
      "#FFB754",
      "#FFAB3A",
    ];

    const brightnessLevels = [
      "Dark",
      "Dim",
      "Gloomy",
      "Faint",
      "Pale",
      "Radiant",
      "Brilliant",
      "Intense",
      "Blinding!",
    ];

    const check = value > 100 ? 100 : value;
    const colorIndex = Math.floor((check / 100) * (colors.length - 1));
    setTintColor(colors[colorIndex]);
    setBrightText(brightnessLevels[colorIndex]);
  }, [value]);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AnimatedCircularProgress
        size={220}
        dashedBackground={{ gap: 6 }}
        dashedTint={{ gap: 6 }}
        padding={10}
        width={30}
        fill={value > 100 ? 100 : value == null ? 0 : value}
        backgroundColor={"#cfcfcf"}
        tintColor={tintColor}
        rotation={270}
      >
        {(fill) => (
          <View style={styles.lottie}>
            <LottieView
              source={require("../../../assets/Sensors/LightMeter/sun.json")}
              progress={0.23 - (0.23 / 100) * (value > 100 ? 100 : value)}
              style={{ width: width * 0.67, height: height * 0.67 }}
            />
          </View>
        )}
      </AnimatedCircularProgress>
      <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
        <Text style={styles.rainText}>{brightText}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  lottie: {
    borderRadius: height * 0.35,
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.7,
    height: height * 0.3,
  },
  rainText: {
    fontSize: 40,
    fontWeight: "400",
    color: "gray",
  },
});
