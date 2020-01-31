import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ListItem } from "react-native-elements";
import axios from "axios";
import querystring from "querystring";

const { height, width } = Dimensions.get("window");

export default class index extends Component {
  state = {
    money: null,
    loading: true,
    res_history: null
  };
  async componentDidMount() {
    this.setState({
      loading: true
    });
    let body = {
      username: "darksun27",
      mobile_number: "9810866770",
      card_details: "5321532153215321",
      amount: "400",
      vendor_id: "1234"
    };
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    let res = await axios.post(
      "https://sih-aai-payment.herokuapp.com/api/get-wallet-details",
      querystring.stringify(body),
      config
    );
    let res_history = await axios.post(
      "https://sih-aai-payment.herokuapp.com/api/get-history",
      querystring.stringify(body),
      config
    );
    this.setState({
      money: res.data.wallet,
      loading: false,
      res_history: res_history.data.history
    });
  }
  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <LinearGradient
          start={[0, 0]}
          end={[1, 0]}
          colors={["#429dd3", "#9c6fe9"]}
        >
          <View
            style={{
              height: height / 3,
              width,
              paddingTop: Constants.statusBarHeight
            }}
          >
            <View
              style={{
                flex: 2,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: "#eee",
                  textAlign: "center",
                  fontFamily: "monti",
                  fontWeight: "bold"
                }}
              >
                WALLET
              </Text>
            </View>
            <View
              style={{
                flex: 4,
                paddingHorizontal: 40
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  fontFamily: "monti"
                }}
              >
                YOUR BALANCE
              </Text>
              {this.state.loading && <ActivityIndicator size="small" />}
              {!this.state.loading && (
                <Text
                  style={{
                    fontSize: 55,
                    color: "white",
                    fontWeight: "300",
                    fontFamily: "monti"
                  }}
                >
                  ₹{this.state.money}
                </Text>
              )}
            </View>
          </View>
        </LinearGradient>
        <View
          style={{
            flex: 1
          }}
        >
          <View
            style={{
              height: 100,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <LinearGradient
                start={[0, 0]}
                end={[1, 0]}
                colors={["#429dd3", "#9c6fe9"]}
                style={{
                  borderRadius: 30
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 25,
                    shadowOffset: { width: 2, height: 2 },
                    shadowColor: "black",
                    shadowOpacity: 0.2,
                    borderRadius: 30
                  }}
                  onPress={() => this.props.navigation.navigate("Payment")}
                >
                  <Ionicons
                    style={{
                      color: "#eee"
                    }}
                    size={30}
                    name="ios-arrow-up"
                  />
                  <Text
                    style={{
                      fontFamily: "monti",
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#eee"
                    }}
                  >
                    {"  "}PAY
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <LinearGradient
                start={[0, 0]}
                end={[1, 0]}
                colors={["#429dd3", "#9c6fe9"]}
                style={{
                  borderRadius: 30
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 25,
                    shadowOffset: { width: 2, height: 2 },
                    shadowColor: "black",
                    shadowOpacity: 0.2,
                    borderRadius: 30
                  }}
                  onPress={() => this.props.navigation.navigate("CardInput")}
                >
                  <Ionicons
                    style={{
                      color: "#eee"
                    }}
                    size={30}
                    name="ios-add"
                  />
                  <Text
                    style={{
                      fontFamily: "monti",
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#eee"
                    }}
                  >
                    {"  "}ADD
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
          {/* Pay and add ends here */}
          <ScrollView>
            {!this.state.res_history && (
              <ActivityIndicator
                size="small"
                style={{
                  marginTop: 20
                }}
              />
            )}
            {this.state.res_history &&
              this.state.res_history.reverse().map((item, i) => (
                <ListItem
                  key={i}
                  subtitle={`₹${item.amount}`}
                  title={`${item.given_to}`}
                  leftIcon={{
                    name: item.type == "ADD" ? "add" : "remove",
                    color: item.type == "ADD" ? "green" : "red"
                  }}
                  bottomDivider
                  chevron
                  subtitleStyle={{
                    color: item.type == "ADD" ? "green" : "red",
                    fontFamily: "monti"
                  }}
                  titleStyle={{
                    fontFamily: "monti",
                    fontWeight: "bold"
                  }}
                  containerStyle={{
                    width
                  }}
                />
              ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
