import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

export default function AirPressureMeter({ value }) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: 260,
      }}
    >
      <View style={styles.lottie}>
        <LottieView
          source={require("../../../assets/Sensors/AirPressureMeter/airrr.json")}
          autoPlay
          loop
          style={{ width: width * 0.7, height: height * 0.34 }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.rainText}>{value} Pa</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lottie: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.6,
    height: height * 0.2,
    marginTop: -30,
  },
  rainText: {
    fontSize: 40,
    fontWeight: "400",
    color: "gray",
  },
});
