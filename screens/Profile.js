import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Firebase from "../config/Firebase";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
const Profile = props => {
  const registerForPushNotificationsAsync = async user => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }

    try {
      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync();

      // POST the token to your backend server from where you can retrieve it to send push notifications.
      Firebase.database()
        .ref("/users/" + user + "/push_token")
        .set(token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let user = Firebase.auth().currentUser;
    console.log(user.uid);

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
    } else {
      registerForPushNotificationsAsync(user.uid);
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
