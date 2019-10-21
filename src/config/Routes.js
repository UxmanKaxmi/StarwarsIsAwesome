import React, { Component } from 'react';
import { Text } from 'react-native';
import {
  createSwitchNavigator,
  createAppContainer,
  Header,
} from 'react-navigation';
import HomePage from "../pages/HomePage";


const HomeStack = createSwitchNavigator({
  Home: HomePage,
  // Login: LoginStack,
});

const HomeRoot = createAppContainer(HomeStack);

export default class Routes extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() { }

  render() {
    return (<HomeRoot />
    )

  }

}