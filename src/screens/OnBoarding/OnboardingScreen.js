import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import storage from "../../utils/AsyncStorage";

const { width, height } = Dimensions.get("window");
const backgroundCol = "#e6cebe";

export default function OnboardingScreen({ navigation }) {
  //function passed to the onboarding element to set the onboarding state to 1 meaning the user is already onboarded
  const handleDone = () => {
    storage.save({
      key: "onboarded",
      data: "1",
    });
    navigation.replace("LoginScreen");
  };

  //button element to be passed to the Onboarding done button componeent
  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneBtn} {...props}>
        <Text>Done</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        DoneButtonComponent={doneButton}
        showNext={false}
        showSkip={false}
        bottomBarHighlight={false}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[
          {
            backgroundColor: backgroundCol,
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require("../../../assets/animations/Onboarding1.json")}
                  autoPlay
                  loop
                  style={{ width: width * 0.75, height: height * 0.75 }}
                />
              </View>
            ),
            title: "Where Comfort Meets Revolution",
            subtitle: "Rethink everything you know about well-being.",
          },
          {
            backgroundColor: backgroundCol,
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require("../../../assets/animations/Onboarding2.json")}
                  autoPlay
                  style={{ width: width * 1.2, height: height * 1.2 }}
                />
              </View>
            ),
            title: "Cultivate With Confidence",
            subtitle: "Remote access, irrigation control, all in your hand.",
          },
          {
            backgroundColor: backgroundCol,
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require("../../../assets/animations/Onboarding3.json")}
                  autoPlay
                  loop
                  style={{
                    width: width * 0.75,
                    height: height * 0.75,
                  }}
                />
              </View>
            ),
            title: "Eyes Up, Anytime, Anywhere",
            subtitle: "Real-time video monitoring for informed decisions.",
          },
          {
            backgroundColor: backgroundCol,
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require("../../../assets/animations/Onboarding4.json")}
                  autoPlay
                  loop
                  style={{ width: width * 1.1, height: height * 1.1 }}
                />
              </View>
            ),
            title: "See More, Do More, Together",
            subtitle: "Wireless control, efficient water management.",
          },
          {
            backgroundColor: backgroundCol,
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require("../../../assets/animations/Onboarding5.json")}
                  autoPlay
                  loop
                  style={{ width: width * 0.9, height: height * 1.1 }}
                />
              </View>
            ),
            title: "Secure, Fireproof, Unyielding",
            subtitle:
              "High security system with motion detection, laser boundaries, and fire protection.",
          },
          {
            backgroundColor: backgroundCol,
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require("../../../assets/animations/Onboarding6.json")}
                  autoPlay
                  loop
                  style={{
                    width: width * 0.6,
                    height: height * 0.6,
                  }}
                />
              </View>
            ),
            title: "Grow Beyond Limits",
            subtitle: "Welcome to Agriculture Assistant.",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lottie: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.7,
    height: height * 0.3,
  },
  doneBtn: {
    padding: 12,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: width * 0.1,
    borderRadius: 20,
  },
});
