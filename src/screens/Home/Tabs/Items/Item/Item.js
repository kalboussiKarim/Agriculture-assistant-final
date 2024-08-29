import React from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-paper";
import { Animated } from "react-native";
import Actuator from "./Actuator";
import Sensor from "./Sensor";
import Security from "./Security";

const fadeAnim = new Animated.Value(0);

const Item = ({ item, uid, nodeId }) => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 1500,
    useNativeDriver: true,
  }).start();

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}
    >
      <Card
        style={{
          marginVertical: 10,
          paddingHorizontal: 10,
          backgroundColor: "white",
          shadowOpacity: 10,
        }}
      >
        <Card.Content>
          {item.category === "actuator" ? (
            <Actuator item={item} uid={uid} nodeId={nodeId} />
          ) : item.category === "sensor" ? (
            <Sensor item={item} uid={uid} nodeId={nodeId} />
          ) : item.category === "security" ? (
            <Security item={item} uid={uid} nodeId={nodeId} />
          ) : (
            <View style={{ alignItems: "center" }}>
              <Text
                style={{ fontSize: 14, color: "#363636", fontWeight: "bold" }}
              >
                The configuration of this item is not done yet
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>
    </Animated.View>
  );
};

export default Item;
