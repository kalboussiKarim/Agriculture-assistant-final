import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

import {
  FIREBASE_DB,
  FIREBASE_AUTH,
  set,
  ref,
  get,
} from "../../../../../utils/FirebaseConfig";

const { width, height } = Dimensions.get("window");
export default function SideOptions() {
  uid = FIREBASE_AUTH.currentUser.uid;
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const [isVolumeHighOn, setIsVolumeHighOn] = useState(false);
  const [savePressed, setSavePressed] = useState(false);

  const handleFlashlightPress = () => {
    setIsFlashlightOn((prevState) => !prevState);

    isFlashlightOn
      ? set(ref(FIREBASE_DB, `${uid}/robot/flash`), 0)
          .then(() => {
            console.log("Flash light turned OFF.");
          })
          .catch((error) => {
            console.error("Error updating status:", error);
          })
      : set(ref(FIREBASE_DB, `${uid}/robot/flash`), 1)
          .then(() => {
            console.log("Flash light turned ON.");
          })
          .catch((error) => {
            console.error("Error updating status:", error);
          });
  };

  const handleVolumeHighPressIn = () => {
    setIsVolumeHighOn(true);
    set(ref(FIREBASE_DB, `${uid}/robot/horn`), 1)
      .then(() => {
        console.log("Horn ON.");
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const handleVolumeHighPressOut = () => {
    setIsVolumeHighOn(false);
    set(ref(FIREBASE_DB, `${uid}/robot/horn`), 0)
      .then(() => {
        console.log("Horn OFF.");
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const handleSavePressIn = async () => {
    console.log("Save button pressed");

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status === "granted") {
        const imageSnapshot = await get(ref(FIREBASE_DB, `${uid}/robot/image`));
        const base64Data = imageSnapshot.val();

        if (base64Data) {
          const uri = FileSystem.cacheDirectory + "image.jpg";
          await FileSystem.writeAsStringAsync(uri, base64Data, {
            encoding: FileSystem.EncodingType.Base64,
          });

          await MediaLibrary.saveToLibraryAsync(uri);

          console.log("Image saved to gallery successfully");
        } else {
          console.log("No image data to save");
        }
      } else {
        Alert.alert(
          "Permission Denied",
          "Please allow photo accessc in your settings"
        );
      }
    } catch (error) {
      console.error("Error saving image to gallery:", error);
      Alert.alert(
        "Error saving image",
        "Please check your network connectivity or reach for the admin."
      );
    }
  };

  const handleSavePressOut = () => {
    setSavePressed(false);
  };

  return (
    <View
      style={{
        width: width / 4,
        flexDirection: "column",
        alignItems: "center",
        marginLeft: width * 0.08,
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        style={[
          styles.button,
          isFlashlightOn ? { backgroundColor: "#fcc9c0" } : null,
        ]}
        onPress={handleFlashlightPress}
      >
        <Ionicons name="flashlight" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          isVolumeHighOn ? { backgroundColor: "#fcc9c0" } : null,
        ]}
        onPressIn={handleVolumeHighPressIn}
        onPressOut={handleVolumeHighPressOut}
      >
        <Ionicons name="volume-high" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: savePressed ? "#fcc9c0" : "#ededed" },
        ]}
        onPressIn={handleSavePressIn}
        onPressOut={handleSavePressOut}
      >
        <Ionicons name="save" size={24} color="black" />
      </TouchableOpacity>
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
    marginBottom: 10,
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
    width: width * 0.11,
    marginTop: 10,
  },
});
