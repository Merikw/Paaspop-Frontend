import React, { Component } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { connect } from 'react-redux';

import Header from "../../components/header/Header";
import SwitchSelector from "../../components/switchSelector/SwitchSelector";
import NumberPicker from "../../components/numberPicker/numberPicker";

import { Gender } from "../../utilities/constants/constants";

const options = [
  { label: Gender.Male.Label, value: Gender.Male.Value },
  { label: Gender.Female.Label, value: Gender.Female.Value },
  { label: Gender.Neutral.Label, value: Gender.Neutral.Value }
];

class LoginScreen extends Component {
    state = {
        user: {
          gender: 0,
          age: 0,
        }
    }

    static navigationOptions = Header;

    onChoseGenderHandler = value =>{
      this.setState(prevState => {
        return{
          user: {
            ...prevState.user,
            gender: value
          }
        }
      })
    }

    render() {
        return (
            <View style={styles.container}>
              <View style={styles.switchSelectorContainer}>
                <SwitchSelector options={options} selectedState={this.state.user.gender} onChoseHandler={this.onChoseGenderHandler.bind(this)}/>
              </View>
              <View style={styles.numberPickerContainer}>
                <NumberPicker label={"Leeftijd:"} minValue={0} maxValue={120} iconColor={"black"} initialValue={18} />
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  switchSelectorContainer: {
    marginTop: "20%",
    justifyContent: "center",
    height: 30,
    width: "80%",
  },
  numberPickerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: "5%",
    width: "80%"
  }
})

const mapStateToProps = state => {
    return {
        gender: state.paaspop.gender 
    }
}

export default connect(mapStateToProps)(LoginScreen)