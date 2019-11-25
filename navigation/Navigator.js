import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Profile from "../screens/Profile";
import ForgotPassword from "../screens/ForgotPassword";

const switchNavigator = createSwitchNavigator({
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  },
  Forgot: {
    screen: ForgotPassword
  },

  Profile: {
    screen: Profile
  }
});
export default createAppContainer(switchNavigator);
