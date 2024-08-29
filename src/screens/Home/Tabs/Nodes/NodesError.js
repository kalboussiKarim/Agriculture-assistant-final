import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NodesError({ error }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 30,
      }}
    >
      <Text style={{ marginTop: 10, fontSize: 20, fontWeight: "600" }}>
        An error occured: {error}
      </Text>
    </SafeAreaView>
  );
}
