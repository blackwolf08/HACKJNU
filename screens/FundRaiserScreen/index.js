import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import ProgressCircle from "react-native-progress-circle";
import cancer from "../../assets/images/cancer.png";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default class FundRaiserScreen extends Component {
  state = {
    name: [],
    amount: [],
    current: [],
    doctor: [],
    cancerStage: []
  };
  async componentDidMount() {
    console.log("hello");
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
    console.log(doctor);
    this.setState({
      name: name,
      amount: amount,
      current: current,
      doctor: doctor,
      cancerStage: cancer
    });
    console.log(this.state.cancerStage);
    console.log(this.state.current);
  }
  render() {
    return (
      <View>
        <ScrollView>
          {this.state.name.map((e, i) => {
            return (
              <View>
                <View
                  style={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: 20,
                    margin: 0.03 * HEIGHT,
                    height: 0.4 * HEIGHT,
                    width: 0.9 * WIDTH,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 12
                    },
                    shadowOpacity: 0.58,

                    shadowRadius: 16.0,
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
                    <Text style={{ fontSize: 20 }}> {this.state.name[i]}</Text>
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
                        {this.state.current[i]}%
                      </Text>
                    </ProgressCircle>
                  </View>
                  <TouchableOpacity>
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
                        marginLeft: WIDTH - 300,
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
          <View>
            <View
              style={{
                backgroundColor: "#f9f9f9",
                borderRadius: 20,
                margin: 0.03 * HEIGHT,
                height: 0.4 * HEIGHT,
                width: 0.9 * WIDTH,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 12
                },
                shadowOpacity: 0.58,

                shadowRadius: 16.0,
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
                <Text style={{ fontSize: 20 }}> Ramesh</Text>
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
                <Text style={{ fontSize: 20 }}> 2500000</Text>
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
                <Text style={{ fontSize: 20 }}> Dr. Dhama</Text>
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
                <Text style={{ fontSize: 20 }}> 3</Text>
              </Text>
              <View
                style={{
                  position: "absolute",
                  right: 0.1 * WIDTH,
                  top: 0.1 * HEIGHT
                }}
              >
                <ProgressCircle
                  percent={37}
                  radius={42}
                  borderWidth={6}
                  color="#90ee90"
                  shadowColor="#999"
                  bgColor="#fff"
                >
                  <Text style={{ fontSize: 18 }}>{"37%"}</Text>
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
                    marginLeft: WIDTH - 300,
                    marginTop: 30,
                    marginBottom: 15
                  }}
                >
                  Donate
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

FundRaiserScreen.navigationOptions = {
  title: "Fund Raiser"
};
