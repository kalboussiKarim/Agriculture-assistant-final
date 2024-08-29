import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");

export default function SoilMoisture({ value }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/Sensors/SoilMoisture/soil-moisture-sensor.png")}
        style={styles.image}
      />
      <Text style={styles.rainText}> {value}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    width: width * 0.5,
    height: height * 0.2,
    resizeMode: "contain",
  },
  text: {
    marginTop: 10,
    fontSize: 18,
  },
  rainText: {
    fontSize: 40,
    fontWeight: "400",
    color: "gray",
  },
});
