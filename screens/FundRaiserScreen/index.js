import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Animated,
  Easing
} from "react-native";
import axios from "axios";
import ProgressCircle from "react-native-progress-circle";
import cancer from "../../assets/images/cancer.png";
import chat from "../../assets/images/chat.png";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default class FundRaiserScreen extends Component {
  state = {
    name: [],
    amount: [],
    current: [],
    doctor: [],
    cancerStage: [],
    loading: true
  };
  async componentDidMount() {
    this.setState({
      loading: true
    });

    let name = [];
    let amount = [];
    let current = [];
    let doctor = [];
    let cancer = [];
    let res = await axios.get(
      "https://stormy-reaches-07388.herokuapp.com/fundraisers"
    );
    Object.keys(res.data).forEach(data => {
      name.push(res.data[data].details.name);
      amount.push(res.data[data].details.amount);
      current.push(res.data[data].details.current);
      doctor.push(res.data[data].details.doctor);
      cancer.push(res.data[data].details.stage);
    });

    this.setState({
      name: name,
      amount: amount,
      current: current,
      doctor: doctor,
      cancerStage: cancer,
      loading: false
    });
  }
  render() {
    if (this.state.loading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator size="small" />
        </View>
      );
    }
    return (
      <View>
        <Image
          style={{
            height: HEIGHT * 0.35,
            width: WIDTH,
            position: "absolute"
          }}
          source={require("../../assets/images/gif_15.gif")}
        />
        <ScrollView
          style={{
            marginTop: HEIGHT * 0.3,
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
          }}
        >
          {!this.state.loading &&
            this.state.name.map((e, i) => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    opacity: this.state.scale
                  }}
                  key={i}
                >
                  <View
                    style={{
                      backgroundColor: "#f9f9f9",
                      borderRadius: 20,
                      margin: 0.03 * HEIGHT,
                      height: 0.4 * HEIGHT,
                      width: 0.8 * WIDTH,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: Platform.OS == "android" ? 12 : 4
                      },
                      shadowOpacity: Platform.OS == "android" ? 0.58 : 0.3,

                      shadowRadius: Platform.OS == "android" ? 16.0 : 4,
                      elevation: 24
                    }}
                  >
                    <Image
                      style={{
                        width: "28%",
                        height: "28%",
                        position: "absolute",
                        borderRadius: 20,
                        position: "absolute",
                        resizeMode: "contain",
                        left: -0.11 * WIDTH,
                        top: -0.02 * HEIGHT,
                        transform: [{ rotate: "-40deg" }]
                      }}
                      source={cancer}
                    ></Image>
                    <Text
                      style={{
                        marginTop: 0.09 * HEIGHT,
                        marginLeft: 0.04 * WIDTH
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 22,
                          fontWeight: "bold"
                        }}
                      >
                        Name:
                      </Text>
                      <Text style={{ fontSize: 20 }}>
                        {" "}
                        {this.state.name[i]}
                      </Text>
                    </Text>
                    <Text style={{ marginLeft: 0.04 * WIDTH }}>
                      <Text
                        style={{
                          fontSize: 22,
                          fontWeight: "bold"
                        }}
                      >
                        Amount:
                      </Text>
                      <Text style={{ fontSize: 20 }}>
                        {" "}
                        {this.state.amount[i]}
                      </Text>
                    </Text>
                    <Text style={{ marginLeft: 0.04 * WIDTH }}>
                      <Text
                        style={{
                          fontSize: 22,
                          fontWeight: "bold"
                        }}
                      >
                        Doctor:
                      </Text>
                      <Text style={{ fontSize: 20 }}>
                        {" "}
                        {this.state.doctor[i]}
                      </Text>
                    </Text>
                    <Text style={{ marginLeft: 0.04 * WIDTH }}>
                      <Text
                        style={{
                          fontSize: 22,
                          fontWeight: "bold"
                        }}
                      >
                        Cancer Level:
                      </Text>
                      <Text style={{ fontSize: 20 }}>
                        {" "}
                        {this.state.cancerStage[i]}
                      </Text>
                    </Text>
                    <View
                      style={{
                        position: "absolute",
                        right: 0.1 * WIDTH,
                        top: 0.1 * HEIGHT
                      }}
                    >
                      <ProgressCircle
                        percent={parseInt(this.state.current[i])}
                        radius={42}
                        borderWidth={6}
                        color="#90ee90"
                        shadowColor="#999"
                        bgColor="#fff"
                      >
                        <Text style={{ fontSize: 18 }}>
                          {parseInt(this.state.current[i])}%
                        </Text>
                      </ProgressCircle>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("LiquidSwipe");
                      }}
                    >
                      <Text
                        style={{
                          alignItems: "center",
                          textAlign: "center",
                          width: WIDTH - 220,
                          fontWeight: "bold",
                          fontSize: 15,
                          height: 50,
                          paddingTop: 15,
                          color: "white",
                          backgroundColor: "#404040",
                          borderRadius: 10,
                          marginLeft: WIDTH * 0.16,
                          marginTop: 30,
                          marginBottom: 15
                        }}
                      >
                        Donate
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
        </ScrollView>
        {!this.state.loading && (
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 15,
              bottom: 15,
              height: 70,
              width: 70,
              zIndex: 5,
              backgroundColor: "#f9f9f9",
              padding: 10,
              borderRadius: 50,
              shadowColor: "black",
              shadowOpacity: 0.26,
              shadowOffset: { width: 0, height: 4 },
              shadowRadius: 10,
              elevation: 3,
              backgroundColor: "#fff"
            }}
          >
            <Image
              style={{
                resizeMode: "contain",
                flex: 1,
                height: null,
                width: null
              }}
              source={chat}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({});

FundRaiserScreen.navigationOptions = {
  header: null
};
