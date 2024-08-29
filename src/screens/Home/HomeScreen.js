import React from "react";
import { StatusBar, Platform } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import DashboardScreen from "./Tabs/DashboardScreen";
import NodesScreen from "./Tabs/NodesScreen";
import RobotScreen from "./Tabs/RobotScreen";
import ProfileScreen from "./Tabs/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation }) {
  return (
    <>
      {Platform.OS === "ios" && <StatusBar barStyle="default" />}
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "bold",
          },
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="view-dashboard-outline"
                size={size * 1.3}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Nodes"
          component={NodesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="dots-hexagon"
                size={size * 1.3}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Robot"
          component={RobotScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="robot-outline"
                size={size * 1.3}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                size={size * 1.3}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
