import React from "react";
import { View, Text, Dimensions, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function ItemsNoItems({ nodeId }) {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", overflow: "hidden" }}>
      <ImageBackground
        source={require("../../../../../assets/bk555.jpg")}
        style={{
          flex: 1,
          width: width,
          height: height,
          alignItems: "center",
          marginTop: -height * 0.048,
        }}
      >
        <View
          style={{
            padding: 2,
            margin: 10,
            marginTop: height * 0.315,
            backgroundColor: "tomato",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              padding: 30,
              backgroundColor: "#FFFFFF",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="database-off-outline"
              size={50}
              color="tomato"
            />
            <Text
              style={{
                marginTop: 10,
                fontSize: 18,
              }}
            >
              No items available inside {nodeId}.
            </Text>

            <Text style={{ marginTop: 10, fontSize: 15 }}>
              If you think this is a mistake
            </Text>
            <Text style={{ fontSize: 15 }}>please contact the admin.</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
