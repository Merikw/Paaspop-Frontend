import React, { Component } from 'react';
import { View, Image, StyleSheet } from "react-native";

import { Colors } from "../../assets/GeneralStyle";

import Logo from "../../assets/images/paaspoplogo.png"

class SplashScreen extends Component {
    async componentDidMount() {
        const data = await this.performTimeConsumingTask();
    
        if (data !== null) {
          this.props.navigation.navigate('App');
        }
    }

    performTimeConsumingTask = async() => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                2000
            )
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={Logo} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary
  }
})

export default SplashScreen