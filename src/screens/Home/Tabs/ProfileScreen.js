import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { signOut } from "firebase/auth";
import {
  FIREBASE_AUTH,
  FIREBASE_DB,
  onValue,
  ref,
  set,
} from "../../../utils/FirebaseConfig";
import storage from "../../../utils/AsyncStorage";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
export default function ProfileScreen({ navigation }) {
  const [userEmail, setUserEmail] = useState(null);
  const [smsStatus, setSmsStatus] = useState("off");
  const [emailStatus, setEmailStatus] = useState("off");

  /********
   * function bech namlou beha el rese state ta3 onboarding screeen
   */
  const resetOnboardin = () => {
    storage.save({
      key: "onboarded",
      data: {
        value: "0",
      },
    });
  };
  useEffect(() => {
    const currentUser = FIREBASE_AUTH.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
    }
  }, []);

  /*************************************************** */
  /* fonction chargée bech tbadel el sms alerts status */
  useEffect(() => {
    const databaseRef = ref(
      FIREBASE_DB,
      `${FIREBASE_AUTH.currentUser.uid}/security/SMS`
    );
    const unsubscribe = onValue(databaseRef, (snapshot) => {
      const data = snapshot.val();
      setSmsStatus(data);
    });

    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    const newValue = smsStatus === "on" ? "off" : "on";
    set(
      ref(FIREBASE_DB, `${FIREBASE_AUTH.currentUser.uid}/security/SMS`),
      newValue
    );
  };

  const buttonStyle = smsStatus === "on" ? styles.onButton : styles.offButton;
  const textStyle = smsStatus === "on" ? styles.onText : styles.offText;
  /**************************************************** */

  /*************************************************** */
  /* fonction chargée bech tbadel el mail alerts status */
  useEffect(() => {
    const databaseRef = ref(
      FIREBASE_DB,
      `${FIREBASE_AUTH.currentUser.uid}/security/EMAIL`
    );
    const unsubscribe = onValue(databaseRef, (snapshot) => {
      const data = snapshot.val();
      setEmailStatus(data);
    });

    return () => unsubscribe();
  }, []);

  const handleToggle2 = () => {
    const newValue = emailStatus === "on" ? "off" : "on";
    set(
      ref(FIREBASE_DB, `${FIREBASE_AUTH.currentUser.uid}/security/EMAIL`),
      newValue
    );
  };

  const buttonStyle2 =
    emailStatus === "on" ? styles.onButton : styles.offButton;
  const textStyle2 = emailStatus === "on" ? styles.onText : styles.offText;
  /*************************************************** */
  /* fonction chargée bech taamel log out               */
  const handleLogout = async () => {
    Alert.alert("Confirm Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",

        onPress: async () => {
          try {
            await signOut(FIREBASE_AUTH);
            resetOnboardin();
            navigation.replace("OnboardingScreen");
          } catch (error) {
            console.error("Error logging out:", error);
          }
        },
      },
    ]);
  };
  /*************************************************** */
  return (
    <ImageBackground
      source={require("../../../../assets/bk555.jpg")}
      style={{ flex: 1, width: width, height: height, alignItems: "center" }}
    >
      <SafeAreaView style={{ flex: 1 }} marginBottom={-height / 25}>
        <View
          style={{
            backgroundColor: "#ffe7e3",
            borderRadius: 20,
            padding: 10,
            margin: 10,
            width: width * 0.9,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="account"
              size={width / 6}
              color="#ff8d7a"
            />
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 40, color: "#ff8d7a" }}>
                User profile
              </Text>
              <Text style={{ fontSize: 15, color: "#787878" }}>
                {userEmail}
              </Text>
            </View>
            <View style={{ flexDirection: "column", marginHorizontal: 30 }}>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity onPress={handleLogout}>
                  <MaterialCommunityIcons
                    name="logout"
                    size={width / 8}
                    color="#ff8d7a"
                  />
                </TouchableOpacity>
              </View>
              <Text style={{ color: "#787878" }}>Logout</Text>
            </View>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{
            marginTop: 30,
            //alignItems: "center",
            //justifyContent: "flex-start",
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
              marginBottom: 10,
              backgroundColor: "#fafafa",
              alignItems: "center",
              padding: 8,
              justifyContent: "space-between",
              borderWidth: 1,
              borderColor: "#8c8c8c",
              borderRadius: 27,
            }}
          >
            <Text style={{ fontSize: 26, fontWeight: "300" }}>
              • SMS notifications
            </Text>
            <TouchableOpacity
              style={[styles.buttonContainer, buttonStyle]}
              onPress={handleToggle}
            >
              <Text style={textStyle}>{smsStatus === "on" ? "ON" : "OFF"}</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginBottom: 10,
              backgroundColor: "#fafafa",
              alignItems: "center",
              padding: 8,
              justifyContent: "space-between",
              borderWidth: 1,
              borderColor: "#8c8c8c",
              borderRadius: 27,
            }}
          >
            <Text style={{ fontSize: 26, fontWeight: "300" }}>
              • Email notifications
            </Text>
            <TouchableOpacity
              style={[styles.buttonContainer, buttonStyle2]}
              onPress={handleToggle2}
            >
              <Text style={textStyle2}>
                {emailStatus === "on" ? "ON" : "OFF"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: width * 0.2,
    height: height * 0.045,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  onButton: {
    backgroundColor: "#ff7259",
  },
  offButton: {
    backgroundColor: "#ffe7e3",
    borderColor: "black",
    borderWidth: 0.4,
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
