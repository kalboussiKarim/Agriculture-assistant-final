import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FIREBASE_AUTH } from "./src/utils/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import LoadingIndicator from "./src/components/Loading/LoadingIndicator";
import OnboardingScreen from "./src/screens/OnBoarding/OnboardingScreen";
import LoginScreen from "./src/screens/Login/LoginScreen";
import HomeScreen from "./src/screens/Home/HomeScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import storage from "./src/utils/AsyncStorage";
const Stack = createNativeStackNavigator();

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //use effect hoook ychouf el user already onboarded or not
  useEffect(() => {
    const checkOnboarded = async () => {
      const onboarded = await storage.load({ key: "onboarded" });
      setIsOnboarded(onboarded === "1");
    };

    checkOnboarded();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setTimeout(() => {
        setIsLoggedIn(!!user);
        setIsLoading(false);
      }, 600);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          // el gestureEnnabled lezem tkoun false sinon el user ynajem ynavigi men screen l screen ki yamel swipe back
          screenOptions={{ gestureEnabled: false }}
          options={{ headerShown: false }}
          //This is very important khater it depends mel state ta3 user bech ychargi el screen el adéquate :o woow
          initialRouteName={
            isOnboarded
              ? isLoggedIn
                ? "HomeScreen"
                : "LoginScreen"
              : "OnboardingScreen"
          }
        >
          <Stack.Screen
            name="OnboardingScreen"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
