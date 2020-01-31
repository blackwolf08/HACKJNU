import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class NearbyScreen extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

NearbyScreen.navigationOptions = {
  title: "Find Nearby Doctors"
};
