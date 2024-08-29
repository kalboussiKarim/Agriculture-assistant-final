import React from "react";
import { View, Text, Dimensions, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DashTitle from "./DashTitle";

const { width, height } = Dimensions.get("window");
export default function DashNoItems() {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", overflow: "hidden" }}>
      <DashTitle />
      <ImageBackground
        source={require("../../../../../assets/bk555.jpg")}
        style={{ flex: 1, width: width, height: height, alignItems: "center" }}
      >
        <View
          style={{
            padding: 2,
            margin: 10,
            marginTop: height * 0.31,
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
              name="heart-plus-outline"
              size={50}
              color="tomato" //layers-plus
            />
            <Text style={{ marginTop: 10, fontSize: 18 }}>
              No favourite items found.
            </Text>

            <Text style={{ marginTop: 10, fontSize: 15 }}>
              Click the heart icon of an item to
            </Text>
            <Text style={{ fontSize: 15 }}>add it to your dashboard.</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
