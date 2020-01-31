import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Platform
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Constants from "expo-constants";
import axios from "axios";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import doctor from "../../assets/images/doctor.jpg";

export default class NearbyScreen extends Component {
  state = {
    text: null,
    region: {
      latitude: 28.5212,
      longitude: 77.179,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    location: null,
    errorMessage: null,
    doctorNames: [],
    phoneNumbers: [],
    location: []
  };
  componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };
  getDoctors = async () => {
    console.log("hello");
    let names = [];
    let address = [];
    let phone = [];
    await axios
      .get(
        "https://api.betterdoctor.com/2016-03-01/practices?location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=6&limit=10&user_key=2738dd76528bfc2c03a57c9f752e508e"
      )
      .then(function(response) {
        console.log(
          response.data.data[0].visit_address.city +
            " " +
            response.data.data[0].visit_address.state
        );
        response.data.data.forEach(obj => {
          names.push(obj.name);
        });
        response.data.data.forEach(obj => {
          address.push(obj.visit_address.state + " " + obj.visit_address.city);
        });
        response.data.data.forEach(obj => {
          obj.phones.forEach(pho => {
            phone.push(pho.number);
          });
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({
      doctorNames: names,
      phoneNumbers: phone,
      location: address
    });
    console.log(this.state.doctorNames);
    console.log(this.state.phoneNumbers);
    console.log(this.state.location);
  };
  render() {
    let text = "Waiting..";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    return (
      <View>
        <View>
          <TextInput
            placeholder="Enter Location"
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 20,
              color: "black",
              marginTop: 5,
              marginBottom: 7,
              paddingLeft: 8,
              marginLeft: 5,
              marginRight: 5
            }}
            editable={true}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            placeholder="Enter Location"
          />
        </View>
        {/* <View style={styles.container}>
          <Text style={styles.paragraph}>{text}</Text>
        </View> */}
        <TouchableOpacity onPress={() => this.getDoctors()}>
          <Text
            style={{
              alignItems: "center",
              textAlign: "center",
              width: WIDTH - 150,
              fontWeight: "bold",
              fontSize: 15,
              height: 50,
              paddingTop: 15,
              color: "white",
              backgroundColor: "#404040",
              borderRadius: 10,
              marginLeft: WIDTH - 315,
              marginTop: 10,
              marginBottom: 15
            }}
          >
            Find Doctors
          </Text>
        </TouchableOpacity>
        <ScrollView horizontal={true}>
          {this.state.location.map((e, i) => {
            return (
              <View
                style={{
                  backgroundColor: "#f9f9f9",
                  height: HEIGHT / 5,
                  width: WIDTH / 3,
                  margin: 20,
                  borderRadius: 10,
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
                    opacity: 0.5,
                    resizeMode: "cover",

                    marginLeft: 0.11 * WIDTH
                  }}
                  source={doctor}
                ></Image>
                <Text
                  style={{
                    marginTop: 40,
                    textAlign: "center"
                  }}
                >
                  {this.state.doctorNames[i]}
                </Text>
                <Text
                  style={{
                    marginTop: 15,
                    height: 39,
                    width: WIDTH / 3
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold"
                    }}
                  >
                    Add-
                  </Text>
                  {this.state.location[i]}
                </Text>
                <TouchableOpacity
                  onPress={
                    (this.dialCall = () => {
                      let phoneNumber = this.state.phoneNumbers[i];

                      if (Platform.OS === "android") {
                        phoneNumber = "tel:${1234567890}";
                      } else {
                        phoneNumber = "telprompt:${1234567890}";
                      }

                      Linking.openURL(phoneNumber);
                    })
                  }
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 17
                    }}
                  >
                    Tap to Call
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            region={this.state.region}
            style={styles.mapStyle}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2
  }
});

NearbyScreen.navigationOptions = {
  title: "Find Nearby Doctors"
};
