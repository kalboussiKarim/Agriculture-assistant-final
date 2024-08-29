import React from "react";
import { View, ActivityIndicator } from "react-native";

export default function LoadingIndicator() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="#8e948f" />
    </View>
  );
}
