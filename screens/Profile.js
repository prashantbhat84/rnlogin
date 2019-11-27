import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Firebase from "../config/Firebase";

const Profile = props => {
  useEffect(() => {
    let user = Firebase.auth().currentUser;
    console.log(user);

    console.log(user.emailVerified);
    if (user.emailVerified === false) {
      console.log("email not verified");
      user.sendEmailVerification().then(() => {
        console.log("email sent through profile");
      });
      Alert.alert(
        "Message",
        "Please Verify your account through verification link sent to your email"
      );

      Firebase.auth()
        .signOut()
        .then(() => {
          console.log("signed out");
          props.navigation.navigate("Login");
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Profile;
