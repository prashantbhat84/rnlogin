import React from "react";
import Firebase from "../config/Firebase";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  Alert
} from "react-native";

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleLogin = () => {
    const { email, password } = this.state;
    if (email === "" || password === "") {
      Alert.alert(
        "Message",
        "One or more Fields is blank. Please fill all fields"
      );
    } else {
      Firebase.auth()
        .signInWithEmailAndPassword(email.trim(), password)
        .then(user => {
          //console.log(user.user.uid);
          console.log(user);

          this.props.navigation.navigate("Profile");
        })
        .catch(error => {
          let { code } = error;
          if (code === "auth/wrong-password") {
            Alert.alert("Error", "Wrong Password");
          }
          if (code === "auth/user-not-found") {
            Alert.alert("Alert", "This user does not exist.");
          }
          if (code === "auth/user-disabled") {
            Alert.alert(
              "Info",
              "Your account has been suspended.Please contact support at hyperinfinite2019@gmail.com"
            );
          }
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputBox}
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Button
          title="Don't have an account yet? Sign up"
          onPress={() => this.props.navigation.navigate("Signup")}
        />
        <View style={styles.forgotpassword}>
          <Button
            title="Forgot Password"
            onPress={() => this.props.navigation.navigate("Forgot")}
          />
        </View>
      </View>
    );
  }
}

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
    backgroundColor: "#F6820D",
    borderColor: "#F6820D",
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
  },
  forgotpassword: {
    marginTop: 20
  }
});

export default Login;
