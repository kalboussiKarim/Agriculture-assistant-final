import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import {
  FIREBASE_DB,
  FIREBASE_AUTH,
  set,
  ref,
} from "../../../../utils/FirebaseConfig";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");
export default function RobotHome() {
  uid = FIREBASE_AUTH.currentUser.uid;

  //function charged bech trod rl robot state on
  const handleStatusChange = () => {
    set(ref(FIREBASE_DB, `${uid}/robot/status`), "on")
      .then(() => {
        console.log("Robot ON.");
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  return (
    <ImageBackground
      source={require("../../../../../assets/bk555.jpg")}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ marginTop: 20 }} marginBottom={-height * 0.1}>
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
          showsVerticalScrollIndicator={false}
        >
          <LottieView
            source={require("../../../../../assets/robot/robot4.json")}
            autoPlay
            loop
            speed={0.6}
            style={{
              width: width * 0.9,
              height: width * 0.9,
              marginBottom: -height / 15,
            }}
          />
          <View>
            {/*******************************/}
            <View
              style={{
                backgroundColor: "#fafafa",
                borderWidth: 0.5,
                borderColor: "#8c8c8c",

                marginHorizontal: 15,
                borderRadius: 20,
                margin: 5,
              }}
            >
              <Text style={styles.rulesText}>
                • Prior to initiating the robot, ensure a stable network
                connection, as a weak connection may result in slow streaming.
              </Text>
            </View>
            {/*******************************/}
            <View
              style={{
                backgroundColor: "#fafafa",
                borderWidth: 0.5,
                borderColor: "#8c8c8c",
                marginHorizontal: 15,
                borderRadius: 20,
                margin: 5,
              }}
            >
              <Text style={styles.rulesText}>
                • The robot may require up to 30 seconds to awaken from deep
                sleep mode.
              </Text>
            </View>
            {/*******************************/}
            <View
              style={{
                backgroundColor: "#fafafa",
                borderWidth: 0.5,
                borderColor: "#8c8c8c",
                marginHorizontal: 15,
                borderRadius: 20,
                margin: 5,
              }}
            >
              <Text style={styles.rulesText}>
                • Kindly ensure to halt the robot's operation before exiting the
                application to conserve energy.
              </Text>
            </View>
            {/*******************************/}
            {/*
            <View
              style={{
                backgroundColor: "#fafafa",
                borderWidth: 0.5,
                borderColor: "#8c8c8c",
                marginHorizontal: 15,
                borderRadius: 20,
                margin: 5,
              }}
            >
              <Text style={styles.rulesText}>
                • The robot will automatically shut down if inactive for more
                than 1 minute.
              </Text>
            </View>
            
            <View
              style={{
                backgroundColor: "#fafafa",
                borderWidth: 0.5,
                borderColor: "#8c8c8c",
                marginHorizontal: 15,
                borderRadius: 20,
                margin: 5,
              }}
            >
              <Text style={styles.rulesText}>
                • Utilize the directional icons (left, right, forward, and
                backward) to control the robot's movement.
              </Text>
            </View>
           
            <View
              style={{
                backgroundColor: "#fafafa",
                borderWidth: 0.5,
                borderColor: "#8c8c8c",
                marginHorizontal: 15,
                borderRadius: 20,
                margin: 5,
              }}
            >
              <Text style={styles.rulesText}>
                • Adjust the vertical slider to move the robot's eye up and
                down.
              </Text>
            </View>
            
            <View
              style={{
                backgroundColor: "#fafafa",
                borderWidth: 0.5,
                borderColor: "#8c8c8c",
                marginHorizontal: 15,
                borderRadius: 20,
                margin: 5,
              }}
            >
              <Text style={styles.rulesText}>
                • Adjust the horizontal slider to move the robot's eye left and
                right.
              </Text>
            </View>
            
            <View
              style={{
                backgroundColor: "#fafafa",
                borderWidth: 0.5,
                borderColor: "#8c8c8c",
                marginHorizontal: 15,
                borderRadius: 20,
                margin: 5,
              }}
            >
              <Text style={styles.rulesText}>
                • Toggle the LED's state by pressing the flashlight icon.
              </Text>
            </View>
            
            <View
              style={{
                backgroundColor: "#fafafa",
                borderWidth: 0.5,
                borderColor: "#8c8c8c",
                marginHorizontal: 15,
                borderRadius: 20,
                margin: 5,
              }}
            >
              <Text style={styles.rulesText}>
                • Press the speaker icon to activate the robot's horn.
              </Text>
            </View>
            
            <View
              style={{
                backgroundColor: "#fafafa",
                borderWidth: 0.5,
                borderColor: "#8c8c8c",
                marginHorizontal: 15,
                borderRadius: 20,
                margin: 5,
              }}
            >
              <Text style={styles.rulesText}>
                • Press the disk icon to capture a snapshot of the ongoing
                stream.
              </Text>
            </View>
            
            <View
              style={{
                backgroundColor: "#fafafa",
                borderWidth: 0.5,
                borderColor: "#8c8c8c",
                marginHorizontal: 15,
                borderRadius: 20,
                margin: 5,
                marginBottom: 10,
              }}
            >
              <Text style={styles.rulesText}>
                • To initiate the robot, press the button below.
              </Text>
            </View>
            
            ******/}
          </View>
          <TouchableOpacity
            onPress={handleStatusChange}
            style={[styles.loginButton, { backgroundColor: "#fcc9c0" }]}
          >
            <Text style={styles.loginButtonText}>Start Robot</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    borderRadius: 30,
    borderColor: "#FF6347",
    borderWidth: 1,
    width: (width / 3) * 2,
    height: height / 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height / 9,
    marginTop: 30,
  },
  loginButtonText: {
    color: "#FF6347",
    fontSize: 18,
  },
  rulesText: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 15,
    fontSize: 21,
    color: "#424242",
  },
});
