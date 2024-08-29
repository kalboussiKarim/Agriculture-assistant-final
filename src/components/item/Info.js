import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Info({ item, nodeId }) {
  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      {item.category == "actuator" && (
        <Text style={styles.infoStyleTitle}>Actuator informations :</Text>
      )}
      {item.category == "sensor" && (
        <Text style={styles.infoStyleTitle}>Sensor informations :</Text>
      )}
      {item.category == "security" && (
        <Text style={styles.infoStyleTitle}>Security item informations :</Text>
      )}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.infoStyle}>Category : </Text>
        <Text style={styles.infoStyleValue}>{item.sub_category}</Text>
      </View>

      {/*<View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.infoStyle}>Node : </Text>
        <Text style={styles.infoStyleValue}>{nodeId}</Text>
      </View>
      */}

      {item.sub_category == "laser" && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.infoStyle}>To node : </Text>
          <Text style={styles.infoStyleValue}>{item.to}</Text>
        </View>
      )}

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.infoStyle}>Item ID : </Text>
        <Text style={styles.infoStyleValue}>{item.id}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoStyle: {
    fontSize: 14,
    color: "#363636",
    fontWeight: "bold",
  },
  infoStyleValue: {
    fontSize: 16,
    color: "#363636",
  },
  infoStyleTitle: {
    fontSize: 16,
    color: "#363636",
    fontWeight: "600",
  },
});
