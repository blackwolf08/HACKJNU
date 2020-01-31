import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  BackHandler,
  ActivityIndicator
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import querystring from "querystring";

import { height, width } from "../../../constants";
import { Button, Block, Input } from "../../../components";

export default class App extends React.Component {
  state = {
    scanned: null,
    hasPermission: null,
    loading: false,
    vendor_id: null,
    amount: "0"
  };

  async componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    this.setState({
      hasPermission: status === "granted"
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scanned: true,
      loading: true
    });
    let body = {
      username: "darksun27",
      mobile_number: "9810866770",
      card_details: "5321532153215321",
      amount: this.state.amount,
      vendor_id: data
    };
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    this.setState({ loading: false });

    let res_history = await axios.post(
      "https://sih-aai-payment.herokuapp.com/api/spend",
      querystring.stringify(body),
      config
    );
    alert(`Payment Successfull`);
    this.props.navigation.navigate("Wallet");
  };
  handlePayment = async () => {
    this.setState({
      loading: true
    });
    let body = {
      username: "darksun27",
      mobile_number: "9810866770",
      card_details: "5321532153215321",
      amount: this.state.amount,
      vendor_id: this.state.vendor_id || data
    };
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    console.log(querystring.stringify(body));
    let res_history = await axios.post(
      "https://sih-aai-payment.herokuapp.com/api/spend",
      querystring.stringify(body),
      config
    );
    console.log(res_history.data);
    this.setState({ loading: false });
    alert(`Payment Successfull`);
    this.props.navigation.navigate("Wallet");
  };

  render() {
    let { hasPermission, scanned } = this.state;
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    if (this.state.loading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 4,
            paddingTop: 40
          }}
        >
          <Text
            style={{
              fontSize: 28,
              paddingHorizontal: 20
            }}
          >
            Send Money
          </Text>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="+91 Enter Mobile Number"
            placeholderTextColor="grey"
            keyboardType="numeric"
            onChangeText={vendor_id => this.setState({ vendor_id })}
            style={{
              fontWeight: "700",
              borderRadius: 20,
              height: 50,
              paddingHorizontal: 20,
              fontSize: 20,
              marginTop: 20
            }}
          />
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="Enter Amount"
            placeholderTextColor="grey"
            keyboardType="numeric"
            onChangeText={amount => this.setState({ amount })}
            style={{
              fontWeight: "700",
              borderRadius: 20,
              height: 50,
              paddingHorizontal: 20,
              fontSize: 20,
              marginTop: 20
            }}
          />
          <Button gradient onPress={() => this.handlePayment()}>
            {this.state.loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold"
                }}
              >
                Pay
              </Text>
            )}
          </Button>
        </View>
        <Text
          style={{
            fontSize: 18,
            position: "absolute",
            top: height * 0.45,
            zIndex: 2,
            textAlign: "center",
            color: "white",
            width
          }}
        >
          Scan Paytm, UPI, or any other QR Code
        </Text>
        <View
          style={{
            position: "absolute",
            top: height * 0.5,
            zIndex: 2,
            borderWidth: 2,
            borderColor: "#fff",
            height: 200,
            width: 200,
            left: width / 2 - 100
          }}
        ></View>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={{ flex: 6, width }}
        />
      </View>
    );
  }
}
