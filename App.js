"use strict";
import React, { Component } from "react";
import { Text } from "react-native";
import Routes from "./src/config/Routes";
import {
  createSwitchNavigator,
  createAppContainer,
} from "react-navigation";



const RootStack = createSwitchNavigator({
  Routes: Routes,
});


const Root = createAppContainer(RootStack);

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Root />
    );
  }
}


console.disableYellowBox = true;
