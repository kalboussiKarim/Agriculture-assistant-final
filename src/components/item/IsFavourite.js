import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { FIRESTORE_DB, doc, updateDoc } from "../../utils/FirebaseConfig";

import { FontAwesome } from "@expo/vector-icons";

export default function IsFavourite({ uid, item, nodeId }) {
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const toggleFavorite = () => {
    const updatedValue = item.isFavourite === 1 ? 0 : 1;
    const itemRef = doc(FIRESTORE_DB, `${uid}/${nodeId}/items/${item.id}`);
    updateDoc(itemRef, { isFavourite: updatedValue })
      .then(() => {
        setSnackbarVisible(true);
      })
      .catch((error) => console.error("Error updating isFavorite:", error));
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity onPress={toggleFavorite}>
        {item.isFavourite === 1 ? (
          <FontAwesome name="heart" size={width * 0.065} color="#ff6666" />
        ) : (
          <FontAwesome name="heart-o" size={width * 0.065} color="gray" />
        )}
      </TouchableOpacity>
    </View>
  );
}
