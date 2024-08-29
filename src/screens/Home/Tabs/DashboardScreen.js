import React, { useState, useEffect } from "react";
import { FlatList, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FIRESTORE_DB,
  FIREBASE_AUTH,
  collection,
  where,
  query,
  getDocs,
  onSnapshot,
} from "../../../utils/FirebaseConfig";

import Item from "./Items/Item/Item";
import DashTitle from "./Dashboard/DashTitle";
import DashNoItems from "./Dashboard/DashNoItems";
import LoadingIndicator from "../../../components/Loading/LoadingIndicator";

export default function DashboardScreen({ nodeId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  uid = FIREBASE_AUTH.currentUser.uid;

  const resetFavourites = async (nodeIds) => {
    try {
      let fetchedItemsNodes = [];
      for (const nodeId of nodeIds) {
        const itemsQuerySnapshot = await getDocs(
          query(
            collection(FIRESTORE_DB, `${uid}/${nodeId}/items`),
            where("isFavourite", "==", 1)
          )
        );
        const nodeItems = itemsQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          nodeId: nodeId,
          uid: uid,
          ...doc.data(),
        }));

        fetchedItemsNodes = [...fetchedItemsNodes, ...nodeItems];
      }
      return fetchedItemsNodes;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchNodeIds = async () => {
      const nodeIds = [];
      const querySnapshot = await getDocs(collection(FIRESTORE_DB, `${uid}`));
      querySnapshot.forEach((doc) => {
        nodeIds.push(doc.id);
        //console.log("fetching nodes");
      });

      const unsubscribeFunctions = nodeIds.map((currentNodeId) => {
        return onSnapshot(
          query(
            collection(FIRESTORE_DB, `${uid}/${currentNodeId}/items`),
            where("isFavourite", "==", 1)
          ),
          (snapshot) => {
            resetFavourites(nodeIds)
              .then((fetchedItemsNodes) => {
                setItems(fetchedItemsNodes);
                setLoading(false);
              })
              .catch((error) => {
                console.error("Error resetting favourites:", error);
                setLoading(false);
              });
          }
        );
      });

      return () => {
        unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
      };
    };

    fetchNodeIds();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (items.length === 0) {
    return <DashNoItems />;
  }

  return (
    <SafeAreaView style={{ flex: 1, marginBottom: -35 }}>
      <DashTitle />
      <ImageBackground
        source={require("../../../../assets/bk555.jpg")}
        style={{ flex: 1 }}
      >
        <FlatList
          style={{ flex: 1 }}
          data={items}
          renderItem={({ item }) => {
            return (
              <Item
                key={`${item.nodeId}-${item.id}`}
                item={item}
                nodeId={item.nodeId}
                uid={item.uid}
              />
            );
          }}
          keyExtractor={(item) => `${item.nodeId}-${item.id}`}
          contentContainerStyle={{ padding: 10 }}
          showsVerticalScrollIndicator={false}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
