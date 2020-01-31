import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import LiquidSwipe from "../LiquidSwipe";

export default class Payment extends Component {
  render() {
    return <LiquidSwipe {...this.props} />;
  }
}

const styles = StyleSheet.create({});
