import React, { useState } from "react";
import Firebase from "../config/Firebase";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";

const Signup = props => {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [userid, setUserid] = useState("");
  const handleSignup = () => {
    console.log(email);
    console.log(password);

    Firebase.auth()
      .createUserWithEmailAndPassword(email.trim(), password)
      .then(user => {
        setUserid(user.uid);
        console.log(userid);

        props.navigation.navigate("Profile");
      })
      .catch(error => console.log(error));
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
        onChangeText={email => setemail(email)}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.inputBox}
        value={password}
        onChangeText={password => setPassword(password)}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center"
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#FFA611",
    borderColor: "#FFA611",
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  },
  buttonSignup: {
    fontSize: 12
  }
});

export default Signup;
