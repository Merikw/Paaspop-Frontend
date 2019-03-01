import React, { Component } from 'react';
import { View, Image, StyleSheet } from "react-native";

import Header from "../../utilities/navigation/header/Header";
import { Gender } from "../../utilities/constants/constants";

class LoginScreen extends Component {
    state = {
        gender: Gender.Male
    }

    static navigationOptions = Header;

    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})

export default LoginScreen