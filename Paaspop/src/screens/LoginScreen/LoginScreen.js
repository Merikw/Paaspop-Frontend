import React, { Component } from 'react';
import { View, Image, StyleSheet } from "react-native";

import Header from "../../utilities/navigation/header/Header";

class LoginScreen extends Component {
    static navigationOptions = Header;

    render() {
        return (
            <View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  headerLogo: {
    alignSelf: "center"
  }
})

export default LoginScreen