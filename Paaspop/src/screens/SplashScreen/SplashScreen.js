import React, { Component } from 'react';
import { View, Image, StyleSheet, AsyncStorage } from "react-native";

import { LocalStorageKeys } from "../../utilities/constants/constants"
import { Colors } from "../../assets/GeneralStyle";
import Logo from "../../assets/images/paaspoplogo.png"

class SplashScreen extends Component {
    async componentDidMount() {
        const data = await this.getUser();
    
        if (data) {
          this.props.navigation.navigate('App');
        } else if(data === null){} 
        else {
            this.props.navigation.navigate('Login');
        }
    }

    getUser = async() => {
        return new Promise((resolve) =>
            setTimeout(
                async() => { 
                    try {
                        const value = await AsyncStorage.getItem(LocalStorageKeys.User.Key);
                        if (value !== null){
                            resolve(true)
                        } 
                        resolve(false)
                    }
                    catch (error) {
                        resolve(null)
                        alert("Er is iets fout gegaan, start de app opnieuw op of herinstalleer de app")
                    }    
                },
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