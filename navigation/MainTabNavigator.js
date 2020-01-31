import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import FundRaiserScreen from "../screens/FundRaiserScreen";
import NearbyScreen from "../screens/NearbyScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-home" />
};

HomeStack.path = "";

const FundRaiserStack = createStackNavigator(
  {
    FundRaiser: FundRaiserScreen
  },
  config
);

FundRaiserStack.navigationOptions = {
  tabBarLabel: "Fund Raiser",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="ios-trending-up" />
  )
};

FundRaiserStack.path = "";

const NearbyStack = createStackNavigator(
  {
    Nearby: NearbyScreen
  },
  config
);

NearbyStack.navigationOptions = {
  tabBarLabel: "Near You",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="ios-navigate" />
  )
};

NearbyStack.path = "";

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  FundRaiserStack,
  NearbyStack
});

tabNavigator.path = "";

export default tabNavigator;
