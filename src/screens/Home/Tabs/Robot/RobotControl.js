import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FIREBASE_DB,
  FIREBASE_AUTH,
  onValue,
  ref,
  set,
} from "../../../../utils/FirebaseConfig";
import RobotVideo from "./RobotVideo";
import RobotNavigation from "./RobotNavigation";
//import LoadingIndicator from "../../../../Components/Loading/LoadingIndicator";

const { width, height } = Dimensions.get("window");

export default function RobotControl() {
  uid = FIREBASE_AUTH.currentUser.uid;
  const [camStatus, setCamStatus] = useState(null);
  const [movingStatus, setMovingStatus] = useState(null);

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
        <ActivityIndicator
          size="large"
          color="#8e948f"
          style={{ marginBottom: 10 }}
        />
        <TouchableOpacity
          onPress={handleStatusChange}
          style={{
            backgroundColor: "#fcc9c0",
            height: height * 0.05,
            width: width * 0.3,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#FF6347",
          }}
        >
          <Text style={styles.loginButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };

  //retreive el cam status
  useEffect(() => {
    const databaseRef = ref(FIREBASE_DB, `${uid}/robot/cam_status`);
    const unsubscribe = onValue(databaseRef, (snapshot) => {
      const data = snapshot.val();
      setCamStatus(data);
    });

    return () => unsubscribe();
  }, []);

  //retreive el robot status
  useEffect(() => {
    const databaseRef = ref(FIREBASE_DB, `${uid}/robot/moving_status`);
    const unsubscribe = onValue(databaseRef, (snapshot) => {
      const data = snapshot.val();
      setMovingStatus(data);
    });

    return () => unsubscribe();
  }, []);

  //turn off the robot
  const handleStatusChange = () => {
    set(ref(FIREBASE_DB, `${uid}/robot/status`), "off")
      .then(() => {
        console.log("Robot OFF.");
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  if (camStatus != "on" || movingStatus != "on") {
    return <LoadingIndicator />;
  }

  return (
    <ImageBackground
      source={require("../../../../../assets/bk555.jpg")}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ marginTop: height / 20 }} marginBottom={-height}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <RobotVideo />
            <RobotNavigation />
            <TouchableOpacity
              onPress={handleStatusChange}
              style={[styles.loginButton, { backgroundColor: "#fcc9c0" }]}
            >
              <Text style={styles.loginButtonText}>Stop Robot</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    marginTop: 25,
    margin: 30,
    borderRadius: 30,
    borderColor: "#FF6347",
    borderWidth: 1,
    width: (width / 3) * 2,
    height: height / 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height / 10,
  },
  loginButtonText: {
    color: "#FF6347",
    fontSize: 18,
  },
});
