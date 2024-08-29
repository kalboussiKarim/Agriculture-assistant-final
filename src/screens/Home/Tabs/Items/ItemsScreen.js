import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  ImageBackground,
} from "react-native";

import {
  FIRESTORE_DB,
  collection,
  query,
  onSnapshot,
} from "../../../../utils/FirebaseConfig";
import Item from "./Item/Item";
import ItemsNoItems from "./ItemsNoItems";

const LoadingIndicator = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="#8e948f" />
    </View>
  );
};

export default function ItemsScreen({ uid, nodeId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(FIRESTORE_DB, `${uid}/${nodeId}/items`)),
      (snapshot) => {
        const updatedItems = [];
        snapshot.forEach((doc) => {
          updatedItems.push({ id: doc.id, ...doc.data() });
        });
        setItems(updatedItems);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [uid, nodeId]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (items.length === 0) {
    return <ItemsNoItems nodeId={nodeId} />;
  }

  return (
    <ImageBackground
      source={require("../../../../../assets/bk555.jpg")}
      style={{ flex: 1 }}
    >
      <FlatList
        style={{ flex: 1 }}
        data={items}
        renderItem={({ item }) => {
          return <Item key={item.id} item={item} nodeId={nodeId} uid={uid} />;
        }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </ImageBackground>
  );
}
