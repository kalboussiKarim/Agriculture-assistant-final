import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Inputfield } from "../../components/inputField/inputField";
import { FIREBASE_AUTH } from "../../utils/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { Alert } from "react-native";
const { width, height } = Dimensions.get("window");

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  //function to handle the password reset when pressing "Forgot your password ?"  :p
  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      Alert.alert(
        "Password Reset Email Sent",
        "Please check your email inbox to reset your password."
      );
    } catch (error) {
      Alert.alert(
        "Email Not Valid",
        "Failed to send password reset email. Make sure you type your email address correctly."
      );
    }
  };

  //function to handle login status, if success the user is redirected to the home screen, otherwise an error shows up
  const Login = async () => {
    //if eamil wala password are empty don't even try ha3ha3ha3
    if (email != "" && password != "") {
      setLoading(true);
      try {
        const response = await signInWithEmailAndPassword(
          FIREBASE_AUTH,
          email,
          password
        );
        await new Promise((resolve) => setTimeout(resolve, 200));
        navigation.replace("HomeScreen");
      } catch (error) {
        let message = error.message;
        if (message.includes("(auth/invalid-email)"))
          setEmailError("Invalid email");
        if (message.includes("(auth/user-not-found)"))
          setEmailError("User not found");
        if (message.includes("(auth/wrong-password)"))
          setPasswordError("Wrong password");
        if (message.includes("(auth/missing-password)"))
          setPasswordError("Enter the password");
        if (message.includes("(auth/invalid-credential)")) {
          setEmailError("Invalid email");
          setPasswordError("Wrong password");
        }
        if (message.includes("(auth/too-many-requests)")) {
          Alert.alert(
            "Account temporarily disabled",
            "This account has been temporarily disabled due to many failed login attempts. You can try again later."
          );
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            marginTop: height * 0.115,
            paddingBottom: height * 0.1,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Logo element  */}
            <Image
              style={styles.logoImage}
              source={require("../../../assets/Logos/logo.png")}
            />

            {/* Email and password input elements  */}
            <View style={{ width: width * 0.97 }}>
              <Inputfield
                onChangeText={(text) => setEmail(text)}
                onFocus={() => setEmailError(null)}
                label="Enter you email address"
                error={emailError}
                iconName="mail-outline"
                keyboardType="email-address"
                returnKeyType="default"
              />
              <Inputfield
                onChangeText={(text) => setPassword(text)}
                onFocus={() => setPasswordError(null)}
                label="Enter your password"
                error={passwordError}
                keyboardType="default"
                password
                returnKeyType="done"
                onSubmitEditing={Login}
              />
            </View>

            {/* Reset password element  */}
            <View>
              <TouchableOpacity onPress={handleForgotPassword}>
                <View>
                  <Text style={{ color: "#488be8", marginTop: height * 0.02 }}>
                    Forgot your password ?
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Login button element  */}
            <TouchableOpacity
              onPress={() => Login()}
              style={[
                styles.loginButton,
                { backgroundColor: loading ? "#adadad" : "#de954b" },
              ]}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6cebe",
  },
  input: {
    paddingLeft: 10,
    marginVertical: 10,
    marginHorizontal: 30,
    borderWidth: 1.5,
    borderRadius: 25,
    backgroundColor: "white",
  },
  logoImage: {
    height: height * 0.35,
    width: width * 0.6,
  },
  loginButton: {
    marginTop: 15,
    margin: 30,
    borderRadius: 30,
    width: width * 0.51,
    height: height * 0.055,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 19,
  },
});
