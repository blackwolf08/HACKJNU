import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class FundRaiserScreen extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

FundRaiserScreen.navigationOptions = {
  title: "Fund Raiser"
};
