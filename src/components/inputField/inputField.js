import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const Inputfield = ({
  error,
  label,
  password,
  iconName,
  showError = true,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);

  return (
    <View>
      <View
        style={[
          styles.container,
          {
            borderWidth: 1,
            borderColor: error ? "red" : isFocused ? "black" : "white",
          },
        ]}
      >
        <View style={{ flex: 0.95 }}>
          <TextInput
            style={{ marginLeft: 10 }}
            autoCorrect={false}
            onFocus={() => {
              onFocus();
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            placeholder={label}
            secureTextEntry={hidePassword}
            {...props}
          />
        </View>

        {password ? (
          <Ionicons
            onPress={() => {
              setHidePassword(!hidePassword);
            }}
            name={hidePassword ? "eye-off-outline" : "eye-outline"}
            style={{ color: "#de954b", fontSize: 27, marginRight: 10 }}
          />
        ) : (
          <Ionicons
            name={iconName}
            style={{ color: "#de954b", fontSize: 27, marginRight: 10 }}
          />
        )}
      </View>
      {error && showError && (
        <Text
          style={{
            marginTop: 3,
            marginBottom: 3,
            color: "red",
            fontSize: 12,
            marginLeft: 20,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderColor: "white",
    elevation: 10,
    borderRadius: 50,
    padding: 5,
  },
});
