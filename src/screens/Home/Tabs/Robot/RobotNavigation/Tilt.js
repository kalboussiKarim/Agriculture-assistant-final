import { View, Dimensions } from "react-native";
import React from "react";
import Slider from "@react-native-community/slider";
const { width, height } = Dimensions.get("window");
import { FIREBASE_DB, set, ref } from "../../../../../utils/FirebaseConfig";

export default function Tilt() {
  return (
    <View
      style={{
        width: width / 3,
        justifyContent: "center",
        marginBottom: height / 18,
      }}
    >
      <View style={{ transform: [{ rotate: "90deg" }] }}>
        <Slider
          style={{ width: width / 2, marginRight: 50 }}
          minimumValue={30}
          value={90}
          maximumValue={150}
          onValueChange={(val) => {
            const roundedValue = Math.round(val);
            set(ref(FIREBASE_DB, `${uid}/robot/tilt`), 180 - roundedValue)
              .then(() => {
                console.log(`TILT : ${roundedValue}`);
              })
              .catch((error) => {
                console.error("Error updating status:", error);
              });
          }}
          thumbTintColor="#FF6347"
          minimumTrackTintColor="#fcc9c0"
          inverted={true}
        />
      </View>
    </View>
  );
}
