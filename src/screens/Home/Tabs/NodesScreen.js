import React, { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, ActivityIndicator, Dimensions } from "react-native";
import ItemsScreen from "./Items/ItemsScreen";

import {
  FIREBASE_AUTH,
  FIRESTORE_DB,
  collection,
  getDocs,
} from "../../../utils/FirebaseConfig";
import NodesNoItems from "./Nodes/NodesNoItems";
import NodesError from "./Nodes/NodesError";

const { width, height } = Dimensions.get("window");

const LoadingIndicator = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 80,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="#8e948f" />
    </View>
  );
};

const Drawer = createDrawerNavigator();

const NodesScreen = () => {
  const [drawerScreens, setDrawerScreens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //fonction eli bech tasna3 lkol node its Drawer Screen  =  itemScreen (flatlist fehal items)
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(FIRESTORE_DB, `/${user.uid}`)
        );
        const nodesData = querySnapshot.docs.map((doc) => ({
          name: doc.id,
          component: () => <ItemsScreen nodeId={doc.id} uid={user.uid} />,
        }));

        if (nodesData.length === 0) {
          setDrawerScreens([]);
        } else {
          setDrawerScreens(nodesData);
        }

        setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };

    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      fetchData();
    } else {
      setError("No user logged in.");
    }
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (drawerScreens.length === 0) {
    return <NodesNoItems />;
  }

  if (error) {
    return <NodesError error={error} />;
  }

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleStyle: {
          color: "#3d3d3d",
          fontSize: 32,
        },
        drawerActiveTintColor: "tomato",
        drawerInactiveTintColor: "gray",
        headerTintColor: "tomato",
      }}
    >
      {drawerScreens.map((node, index) => (
        <Drawer.Screen key={index} name={node.name}>
          {node.component}
        </Drawer.Screen>
      ))}
    </Drawer.Navigator>
  );
};

export default NodesScreen;
