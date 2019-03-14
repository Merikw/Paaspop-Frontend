import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, StyleSheet, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';

import { LocalStorageKeys } from '../../utilities/constants/constants';
import { Colors } from '../../assets/GeneralStyle';
import Logo from '../../assets/images/paaspoplogo.png';

import UpdateLocationTask from '../../utilities/tasks/UpdateLocationTask';
import { updateUser } from '../../store/actions/users';

class SplashScreen extends Component {
  async componentDidMount() {
    const data = await this.getUser();
    const { navigation, onUpdateUser } = this.props;
    if (data) {
      UpdateLocationTask(onUpdateUser, navigator);
      navigation.navigate('App');
    } else {
      navigation.navigate('Login');
    }
  }

  getUser = async () => {
    return new Promise(resolve =>
      setTimeout(async () => {
        try {
          const value = await AsyncStorage.getItem(LocalStorageKeys.User.Key);
          if (value !== null) {
            resolve(true);
          }
          resolve(false);
        } catch (error) {
          resolve(null);
          alert('Er is iets fout gegaan, start de app opnieuw op of herinstalleer de app');
        }
      }, 2000)
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={Logo} />
      </View>
    );
  }
}

SplashScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  onUpdateUser: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onUpdateUser: user => dispatch(updateUser(user)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SplashScreen);
