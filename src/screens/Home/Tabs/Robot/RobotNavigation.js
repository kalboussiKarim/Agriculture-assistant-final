import { View, Dimensions } from "react-native";
import React from "react";
import Direction from "./RobotNavigation/Direction";
import SideOptions from "./RobotNavigation/SideOptions";
import Tilt from "./RobotNavigation/Tilt";
import Pan from "./RobotNavigation/Pan";

const { width, height } = Dimensions.get("window");
export default function RobotNavigation() {
  return (
    <View style={{ alignItems: "center", marginTop: height / 30 }}>
      <View style={{ flexDirection: "row" }}>
        <Tilt />
        <Direction />
        <SideOptions />
      </View>
      <Pan />
    </View>
  );
}
