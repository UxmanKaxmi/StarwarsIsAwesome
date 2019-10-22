import React, { Component } from 'react';
import { Text } from 'react-native';
import {
  createSwitchNavigator,
  createAppContainer,
  Header,
} from 'react-navigation';
import People from "../pages/People";
import Planets from "../pages/Planets";
import StarShips from "../pages/StarShips";

import { createMaterialTopTabNavigator } from 'react-navigation-tabs';


const HomeStack = createMaterialTopTabNavigator({
  People: People,
  Planets: Planets,
  StarShips: StarShips,

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