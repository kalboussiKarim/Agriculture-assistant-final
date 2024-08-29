import React from "react";
import { View, Text, Dimensions, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
export default function NodesNoItems() {
  return (
    <ImageBackground
      source={require("../../../../../assets/bk555.jpg")}
      style={{ flex: 1, width: width, height: height, alignItems: "center" }}
    >
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", overflow: "hidden" }}
      >
        <View
          style={{
            padding: 2,
            margin: 10,
            marginTop: height * 0.36,
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
              name="database-search-outline"
              size={50}
              color="tomato"
            />

            <Text style={{ marginTop: 10, fontSize: 18 }}>No nodes found.</Text>

            <Text style={{ marginTop: 10, fontSize: 15 }}>
              If you think this is a mistake
            </Text>
            <Text style={{ fontSize: 15 }}>please contact the admin.</Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
