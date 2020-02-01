import React, { Component } from "react";
import { Text, StyleSheet, View, Image, Dimensions } from "react-native";
import { Divider } from "react-native-elements";

const { width, height } = Dimensions.get("window");

export default class Report extends Component {
  render() {
    console.log(this.props.cancer_prob);
    return (
      <View
        style={{
          width: width * 0.8
        }}
      >
        <Image
          style={{ height: 60, width: 60 }}
          source={require("../../assets/images/logo.png")}
        />
        <Divider
          style={{
            backgroundColor: "grey",
            height: 2,
            marginBottom: 20,
            marginTop: 20
          }}
        />
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20
            }}
          >
            Hypertext Assassins Lab
          </Text>
          <Text>JIIT Noida</Text>
          <Text
            style={{
              marginTop: 20,
              fontWeight: "bold",
              fontSize: 14
            }}
          >
            Diabetic Retinopathy Report for Patient {this.props.name}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
