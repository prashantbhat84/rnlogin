import React, { useState, useRef } from "react";
import Firebase from "../config/Firebase";

import { View, StyleSheet, TextInput, Button, Alert } from "react-native";

const ForgotPassword = props => {
  const [email, setEmail] = useState("");

  emailSend = email => {
    Firebase.auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        props.navigation.navigate("Login");
      })
      .catch(error => {
        Alert.alert(
          "Caution!!!",
          "This E-mail account does not exist Please Signup"
        );

        props.navigation.navigate("Signup");
      });
  };
  return (
    <View style={Styles.container}>
      <TextInput
        style={Styles.inputBox}
        onChangeText={email => setEmail(email)}
        placeholder="Email"
        autoCapitalize="none"
      />

      <View>
        <Button title="Submit" onPress={() => emailSend(email)} />
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    marginTop: 50
  },
  text: {
    marginBottom: 30
  },
  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center"
  }
});
export default ForgotPassword;
