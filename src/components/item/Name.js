import { View, Text, TouchableOpacity, Alert, TextInput } from "react-native";
import React, { useRef, useState } from "react";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import {
  FIRESTORE_DB,
  FIREBASE_DB,
  onValue,
  ref,
  set,
  doc,
  updateDoc,
} from "../../utils/FirebaseConfig";

export default function Name({ uid, item, nodeId }) {
  const [name, setName] = useState(item.name);
  const inputRef = useRef(null);
  const handleIconPress = () => {
    inputRef.current.focus();
  };

  const handleChangeName = async () => {
    if (name != item.name) {
      try {
        const itemRef = doc(FIRESTORE_DB, `${uid}/${nodeId}/items/${item.id}`);
        await updateDoc(itemRef, { name: name });
        Alert.alert("Success!", "Name updated successfully.");
      } catch (error) {
        Alert.alert("Failure", "Error updating name.");
      }
    }
  };

  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        backgroundColor: "#d9d9d9",
        borderRadius: 22,
        padding: 2,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
          backgroundColor: "white",
          borderRadius: 20,
          padding: 5,
        }}
      >
        <TextInput
          ref={inputRef}
          defaultValue={item.name}
          placeholder="Enter item name"
          onChangeText={(text) => setName(text)}
          keyboardType="default"
          returnKeyType="done"
          onSubmitEditing={handleChangeName}
          style={{
            paddingLeft: 5,
            fontSize: 30,
            flex: 1,
            color: "black",
            fontWeight: "300",
          }}
        ></TextInput>
        <TouchableOpacity onPress={handleIconPress}>
          <MaterialCommunityIcons
            name="circle-edit-outline"
            size={35}
            color="#ff8a75"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

{
  /*<View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#cccccc",
              height: 40,
              width: 40,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontSize: 30 }}>+</Text>
          </View>*/
}
