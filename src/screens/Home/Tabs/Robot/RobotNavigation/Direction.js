import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import {
  FIREBASE_DB,
  FIREBASE_AUTH,
  set,
  ref,
} from "../../../../../utils/FirebaseConfig";

const { width, height } = Dimensions.get("window");

export default function Direction() {
  uid = FIREBASE_AUTH.currentUser.uid;

  const [buttonPressState, setButtonPressState] = useState({
    forward: false,
    left: false,
    right: false,
    backwards: false,
  });

  const handlePressIn = (direction) => {
    setButtonPressState((prevState) => ({
      ...prevState,
      [direction]: true,
    }));
    set(ref(FIREBASE_DB, `${uid}/robot/direction`), direction)
      .then(() => {
        console.log(`Started moving ${direction}`);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const handlePressOut = (direction) => {
    setButtonPressState((prevState) => ({
      ...prevState,
      [direction]: false,
    }));
    set(ref(FIREBASE_DB, `${uid}/robot/direction`), "S")
      .then(() => {
        console.log(`Stopped moving ${direction}`);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          onPressIn={() => handlePressIn("F")}
          onPressOut={() => handlePressOut("F")}
          style={[
            styles.button,
            buttonPressState.forward && { backgroundColor: "orange" },
          ]}
        >
          <Ionicons name="arrow-up" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPressIn={() => handlePressIn("L")}
          onPressOut={() => handlePressOut("L")}
          style={[
            styles.button,
            buttonPressState.left && { backgroundColor: "orange" },
          ]}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ width: width / 8 }}></View>
        <TouchableOpacity
          onPressIn={() => handlePressIn("R")}
          onPressOut={() => handlePressOut("R")}
          style={[
            styles.button,
            buttonPressState.right && { backgroundColor: "orange" },
          ]}
        >
          <Ionicons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPressIn={() => handlePressIn("B")}
          onPressOut={() => handlePressOut("B")}
          style={[
            styles.button,
            buttonPressState.backwards && { backgroundColor: "orange" },
          ]}
        >
          <Ionicons name="arrow-down" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: width / 3,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
  },
  button: {
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: "#ededed",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF6347",
    width: width * 0.16,
    height: width * 0.16,
    marginTop: 5,
  },
});
