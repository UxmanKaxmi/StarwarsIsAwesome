import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { Text } from 'react-native';

import Planets from "../pages/Planets";
import StarShips from "../pages/StarShips";
import People from '../pages/People';

import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { COLOR_PRIMARY, BG_BLACK, BG_Page } from './colors';


const HomeStack = createMaterialTopTabNavigator({
  People: People,
  Planets: Planets,
  StarShips: StarShips,

}, {

  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;

      if (routeName === 'People') {

      } else if (routeName === 'Planets') {
      }
      else if (routeName === 'StarShips') {

      }

      // You can return any component that you like here!
      return <Text>asdasdasd</Text>;
    },
  }),
  // activeTintColor?: string;
  // allowFontScaling?: boolean;
  // bounces?: boolean;
  // inactiveTintColor?: string;
  // pressColor?: string;
  // pressOpacity?: number;
  // scrollEnabled?: boolean;
  // showIcon?: boolean;
  // showLabel?: boolean;
  // upperCaseLabel?: boolean;
  // tabStyle?: StyleProp<ViewStyle>;
  // indicatorStyle?: StyleProp<ViewStyle>;
  // iconStyle?: StyleProp<ViewStyle>;
  // labelStyle?: StyleProp<TextStyle>;
  // contentContainerStyle?: StyleProp<ViewStyle>;
  // style?: StyleProp<ViewStyle>;

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