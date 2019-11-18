import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Profile from "../screens/Profile";

const switchNavigator = createSwitchNavigator({
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  },

  Profile: {
    screen: Profile
  }
});
export default createAppContainer(switchNavigator);
