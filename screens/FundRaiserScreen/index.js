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
    await axios
      .get("https://stormy-reaches-07388.herokuapp.com/fundraisers")
      .then(function(response) {
        console.log(response.data);
        response.data.forEach(obj => {
          name.push(obj.name);
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
      <View>
        <ScrollView>
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
                <Text style={{ fontSize: 20 }}> 25LACS</Text>
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
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

FundRaiserScreen.navigationOptions = {
  title: "Fund Raiser"
};
