import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const Wave = ({ value }) => {
  const circleSize = width * 0.5;
  const perimeterSize = width * 0.55;

  // Calculate circle height based on value, ensuring it stays within bounds
  const clampedCircleHeight = Math.min(circleSize * (value / 100), circleSize); // Clamp between 0 and circleSize
  const percentageText = `${value}%`;

  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(borderAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(borderAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ]),
      { iterations: -1 }
    ).start();
  }, []);

  const circleInterpolate = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [clampedCircleHeight - 10, clampedCircleHeight + 1], // Account for border width
  });

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.perimeter,
          { width: perimeterSize, height: perimeterSize },
        ]}
      />
      <View
        style={[
          styles.circleContainer,
          { width: circleSize, height: circleSize },
        ]}
      >
        <Animated.View
          style={[
            styles.circle,
            {
              height: circleInterpolate,
              width: circleInterpolate,
              borderRadius: circleInterpolate,
            },
          ]}
        ></Animated.View>
        <Text style={styles.percentageText}>{percentageText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  perimeter: {
    position: "absolute",
    borderRadius: width / 2,
    backgroundColor: "#cee4f2",
  },
  circleContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  circle: {
    backgroundColor: "#70c6ff",
    overflow: "hidden",
  },

  percentageText: {
    position: "absolute",
    fontSize: 40,
    color: "white",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default Wave;
