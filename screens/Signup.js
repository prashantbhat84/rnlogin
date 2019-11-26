import React, { useState, useRef } from "react";
import Firebase from "../config/Firebase";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  TouchableHighlight
} from "react-native";

const Signup = props => {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [userid, setUserid] = useState("");
  const inputref = useRef();

  const handleSignup = (email, password) => {
    Firebase.auth()
      .createUserWithEmailAndPassword(email.trim(), password)
      .then(user => {
        setUserid(user.uid);
        let appUser = Firebase.auth().currentUser;
        console.log(appUser);
        appUser.sendEmailVerification().then(() => {
          console.log("email sent");
        });
        appUser.updateProfile({ displayName: name }).catch(e => {
          console.log(e);
        });
        props.navigation.navigate("Profile");
      })
      .catch(error => {
        let { code } = error;

        if (code === "auth/email-already-in-use") {
          Alert.alert(
            "Email Exists",
            "Email id already exists. Please use another E-mail ID"
          );
        }
        if (code === "auth/weak-password") {
          Alert.alert("Password", "Password Length must be of minimum 6 chars");
        }
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        value={name}
        onChangeText={name => setName(name)}
        placeholder="Full Name"
      />
      <TextInput
        style={styles.inputBox}
        value={email}
        onChangeText={email => {
          setemail(email);
        }}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.inputBox}
        value={password}
        onChangeText={password => {
          setPassword(password);
        }}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSignup(email, password)}
      >
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <TouchableHighlight
        style={styles.button}
        onPress={() => props.navigation.navigate("Login")}
      >
        <Text>Go to Login</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DCDCDC"
  },
  inputBox: {
    width: 250,
    height: 45,
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderRadius: 30,
    flexDirection: "row",
    textAlign: "center",
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF"
  },
  button: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  },
  buttonSignup: {
    fontSize: 12
  }
});

export default Signup;
