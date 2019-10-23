import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { Text } from 'react-native';

import Planets from "../pages/Planets";
import StarShips from "../pages/StarShips";
import People from '../pages/People';
import Info from '../pages/Info';

import { createStackNavigator } from 'react-navigation-stack';

import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { COLOR_PRIMARY, BG_BLACK, BG_Page } from './colors';


const TabNavigator = createMaterialTopTabNavigator({
  People: People,
  Planets: Planets,
  StarShips: StarShips,

}, {

  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ }) => {
      const { routeName } = navigation.state;

      if (routeName === 'People') {

      } else if (routeName === 'Planets') {

      }
      else if (routeName === 'StarShips') {

      }
    },
  }),



  tabBarOptions: {
    activeTintColor: COLOR_PRIMARY,
    inactiveTintColor: 'black',
    tabStyle: {
      backgroundColor: BG_Page
    },
    bounces: true,
    indicatorStyle: {

    },
    labelStyle: {
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
      textShadowOffset: {
        width: 20,
        height: 20
      },
      textShadowColor: 'red',
      letterSpacing: 1,

    },
    style: {
      elevation: 22,
      shadowColor: COLOR_PRIMARY,

    }
  },


});


const HomeStack = createStackNavigator({
  TabNavigator: {
    screen: TabNavigator,
    navigationOptions: {
      header: null,
    },
  },

  Info: {
    screen: Info,
    navigationOptions: {
      header: null,
    },
  },


},

);



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