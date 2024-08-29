import { View, Dimensions } from "react-native";
import React from "react";
import Slider from "@react-native-community/slider";
import { FIREBASE_DB, set, ref } from "../../../../../utils/FirebaseConfig";

const { width, height } = Dimensions.get("window");

export default function Pan() {
  return (
    <View>
      <View>
        <Slider
          style={{ width: width / 2, marginTop: height / 20 }}
          minimumValue={30}
          value={90}
          maximumValue={150}
          onValueChange={(val) => {
            const roundedValue = Math.round(val);
            set(ref(FIREBASE_DB, `${uid}/robot/pan`), 180 - roundedValue)
              .then(() => {
                console.log(`PAN : ${roundedValue}`);
              })
              .catch((error) => {
                console.error("Error updating status:", error);
              });
          }}
          thumbTintColor="#FF6347"
          minimumTrackTintColor="#fcc9c0"
        />
      </View>
    </View>
  );
}
