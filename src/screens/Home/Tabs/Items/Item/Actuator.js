import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import {
  FIREBASE_DB,
  onValue,
  ref,
  set,
} from "../../../../../utils/FirebaseConfig";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Name from "../../../../../components/item/Name";
import Info from "../../../../../components/item/Info";
import IsFavourite from "../../../../../components/item/IsFavourite";

const Actuator = ({ item, uid, nodeId }) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    const databaseRef = ref(
      FIREBASE_DB,
      `${uid}/actuators/${nodeId}/${item.path}`
    );
    const unsubscribe = onValue(databaseRef, (snapshot) => {
      const data = snapshot.val();
      setStatus(data);
    });

    return () => unsubscribe();
  }, [item]);

  const handleToggle = () => {
    const newValue = status === "on" ? "off" : "on";
    set(ref(FIREBASE_DB, `${uid}/actuators/${nodeId}/${item.path}`), newValue);
  };

  const buttonStyle = status === "on" ? styles.onButton : styles.offButton;
  const textStyle = status === "on" ? styles.onText : styles.offText;

  return (
    <View style={{ flexDirection: "column" }}>
      <Name uid={uid} item={item} nodeId={nodeId}></Name>
      <View style={{ marginTop: 10, flexDirection: "row" }}>
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
            borderColor: "gray",
            borderWidth: 0.5,
          }}
        >
          {item.sub_category === "water pump" && (
            <MaterialCommunityIcons name="water" size={110} color="#70c6ff" />
          )}
          {item.sub_category === "lightbulb" && (
            <MaterialCommunityIcons
              name="lightbulb"
              size={110}
              color="#ffa742"
            />
          )}
          {item.sub_category === "default" && (
            <MaterialCommunityIcons
              name="power-socket-jp"
              size={110}
              color="#4ba386"
            />
          )}
        </View>
        <View style={{ marginLeft: 20, flex: 1 }}>
          <Info item={item} nodeId={nodeId}></Info>
          <IsFavourite item={item} nodeId={nodeId} uid={uid} />
          <View
            style={{
              marginTop: 10,
              alignItems: "flex-end",
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
      </View>
    </View>
  );
};
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
    //borderColor: "black",
    //borderWidth: 1,
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
export default Actuator;
