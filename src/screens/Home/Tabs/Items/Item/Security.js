import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import {
  FIRESTORE_DB,
  FIREBASE_DB,
  onValue,
  ref,
  set,
  doc,
  updateDoc,
} from "../../../../../utils/FirebaseConfig";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Name from "../../../../../components/item/Name";
import Info from "../../../../../components/item/Info";
import IsFavourite from "../../../../../components/item/IsFavourite";

const { width, height } = Dimensions.get("window");
export default function Security({ item, uid, nodeId }) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    const databaseRef = ref(
      FIREBASE_DB,
      `${uid}/security/${nodeId}/${item.path}`
    );
    const unsubscribe = onValue(databaseRef, (snapshot) => {
      const data = snapshot.val();
      setStatus(data);
    });

    return () => unsubscribe();
  }, [item]);

  const handleToggle = () => {
    const newValue = status === "on" ? "off" : "on";
    set(ref(FIREBASE_DB, `${uid}/security/${nodeId}/${item.path}`), newValue);
  };

  const buttonStyle = status === "on" ? styles.onButton : styles.offButton;
  const textStyle = status === "on" ? styles.onText : styles.offText;

  return (
    <View style={{ flexDirection: "column" }}>
      <Name uid={uid} item={item} nodeId={nodeId}></Name>
      <View style={{ marginTop: 10, flexDirection: "row" }}>
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Info item={item} nodeId={nodeId}></Info>
          <IsFavourite item={item} nodeId={nodeId} uid={uid} />
          <View
            style={{
              marginTop: 10,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={[styles.buttonContainer, buttonStyle]}
              onPress={handleToggle}
            >
              <Text style={textStyle}>{status === "on" ? "ON" : "OFF"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            width: width / 3.5,
            height: width / 3.5,
            borderRadius: width / 10,
            borderColor: "gray",
            borderWidth: 0.5,
          }}
        >
          {item.sub_category === "laser" && (
            <MaterialCommunityIcons
              name="laser-pointer"
              size={width / 5}
              color="#ff5c5c"
            />
          )}
          {item.sub_category === "fire" && (
            <MaterialCommunityIcons
              name="fire"
              size={width / 5}
              color="#ff5c5c"
            />
          )}
          {item.sub_category === "motion" && (
            <MaterialCommunityIcons
              name="motion-sensor"
              size={width / 5}
              color="#ff5c5c"
            />
          )}
          {item.sub_category === "door" && (
            <MaterialCommunityIcons
              name="door-closed-lock"
              size={width / 5}
              color="#ff5c5c"
            />
          )}
          {item.sub_category === "default" && (
            <MaterialCommunityIcons
              name="security"
              size={width / 5}
              color="#ff5959"
            />
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    width: 100,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  onButton: {
    backgroundColor: "#68c965",
  },
  offButton: {
    backgroundColor: "#e0e0e0",
    borderColor: "black",
    borderWidth: 0.25,
  },
  onText: {
    color: "white",
    fontWeight: "bold",
  },
  offText: {
    color: "black",
    fontWeight: "bold",
  },
});
