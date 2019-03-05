import React, { Component } from 'react';
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';

import Header from "../../components/header/Header";
import SwitchSelector from "../../components/switchSelector/SwitchSelector";
import NumberPicker from "../../components/numberPicker/NumberPicker";
import Button from "../../components/button/Button";
import Loader from "../../components/loader/Loader";

import { Gender } from "../../utilities/constants/constants";

import { addUser } from "../../store/actions/users";
import { Colors } from '../../assets/GeneralStyle';

const options = [
  { label: Gender.Male.Label, value: Gender.Male.Value },
  { label: Gender.Female.Label, value: Gender.Female.Value },
  { label: Gender.Neutral.Label, value: Gender.Neutral.Value }
];

class LoginScreen extends Component {
    state = {
        user: {
          gender: 0,
          age: 18
        }
    }

    onChoseGenderHandler = value => {
      this.setState(prevState => {
        return{
          user: {
            ...prevState.user,
            gender: value
          }
        }
      })
    }

    onChangeAgeHandler = value => {
      this.setState(prevState => {
        return{
          user: {
            ...prevState.user,
            age: value
          }
        }
      })
    }

    createUser = () => {
      this.props.onCreateUser(this.state.user)
    }

    componentDidUpdate(){
      if(this.props.addUserAction.succes){
          this.props.navigation.navigate('App');
      }
    }

    static navigationOptions = Header;

    render() {
        return (
            <View style={styles.container}>
            <Loader isLoading={this.props.addUserAction.loading ? this.props.addUserAction.loading : false} />
              <View style={styles.switchSelectorContainer}>
                <SwitchSelector options={options} selectedState={this.state.user.gender} onChoseHandler={this.onChoseGenderHandler.bind(this)}/>
              </View>
              <View style={styles.numberPickerContainer}>
                <NumberPicker label={"Leeftijd:"} minValue={0} maxValue={120} iconColor={"black"} initialValue={18} onChangeHandler={this.onChangeAgeHandler.bind(this)} />
              </View>
              <Button text={"Ga verder"} onPressHandler={this.createUser}/>
              {this.props.addUserAction.error ? <Text style={styles.errorText}>Er is een fout opgetreden, probeer het nog eens</Text> : null}
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
    marginBottom: "5%"
  },
  numberPickerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: "5%",
    marginBottom: "5%",
    width: "80%"
  },
  errorText: {
    marginTop: "5%",
    color: Colors.danger,
    fontFamily: "LiberationSans-Regular",
  }
})

const mapStateToProps = state => {
  return {
    addUserAction: state.usersStore.addUserAction
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onCreateUser: (user) => dispatch(addUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)