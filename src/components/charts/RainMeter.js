import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

export default function RainMeter({ value }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500, // Adjust duration as needed
      useNativeDriver: true,
    }).start();

    return () => {
      // Reset the fade animation to 0 when component unmounts
      fadeAnim.setValue(0);
    };
  }, [value, fadeAnim]);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={styles.lottie}>
        {value >= 0 && value <= 2 && (
          <LottieView
            source={require("../../../assets/Sensors/RainMeter/rain_0.json")}
            autoPlay
            loop
            style={{ width: width * 0.7, height: height * 0.34 }}
          />
        )}
        {value > 2 && value <= 20 && (
          <LottieView
            source={require("../../../assets/Sensors/RainMeter/rain_1.json")}
            autoPlay
            loop
            speed={0.75}
            style={{ width: width * 0.7, height: height * 0.34 }}
          />
        )}
        {value > 20 && value <= 40 && (
          <LottieView
            source={require("../../../assets/Sensors/RainMeter/rain_2.json")}
            autoPlay
            loop
            style={{ width: width * 0.7, height: height * 0.34 }}
          />
        )}
        {value > 40 && (
          <LottieView
            source={require("../../../assets/Sensors/RainMeter/rain_3.json")}
            autoPlay
            loop
            speed={1.2}
            style={{ width: width * 0.7, height: height * 0.34 }}
          />
        )}
      </View>
      <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
        {value >= 0 && value <= 5 && <Text style={styles.rainText}>Clear</Text>}
        {value > 5 && value <= 20 && (
          <Text style={styles.rainText}>Light rain</Text>
        )}
        {value > 20 && value <= 40 && (
          <Text style={styles.rainText}>Moderate rain</Text>
        )}
        {value > 40 && <Text style={styles.rainText}>Heavy rain</Text>}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  lottie: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.6,
    height: height * 0.2,
    marginTop: -45,
    marginBottom: 30,
  },
  rainText: {
    fontSize: 40,
    fontWeight: "400",
    color: "gray",
  },
});
