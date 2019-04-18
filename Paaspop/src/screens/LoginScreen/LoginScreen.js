import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../../components/header/Header';
import SwitchSelector from '../../components/switchSelector/SwitchSelector';
import NumberPicker from '../../components/numberPicker/numberPicker';
import Button from '../../components/button/Button';
import Loader from '../../components/loader/Loader';

import { Gender } from '../../utilities/constants/constants';

import { addUser } from '../../store/actions/users';
import { Colors } from '../../assets/GeneralStyle';

const options = [
  { label: Gender.Male.Label, value: Gender.Male.Value },
  { label: Gender.Female.Label, value: Gender.Female.Value },
  { label: Gender.Neutral.Label, value: Gender.Neutral.Value },
];

class LoginScreen extends Component {
  static navigationOptions = Header;

  constructor(args) {
    super(...args);
    this.onChoseGenderHandler = this.onChoseGenderHandler.bind(this);
  }

  state = {
    user: {
      gender: 0,
      age: 18,
    },
  };

  componentDidUpdate() {
    const { addUserAction, navigation } = this.props;
    if (addUserAction.succes) {
      navigation.navigate('App');
    }
  }

  onChoseGenderHandler = value => {
    this.setState(prevState => {
      return {
        user: {
          ...prevState.user,
          gender: value,
        },
      };
    });
  };

  onChangeAgeHandler = value => {
    this.setState(prevState => {
      return {
        user: {
          ...prevState.user,
          age: value,
        },
      };
    });
  };

  createUser = () => {
    const { onCreateUser } = this.props;
    const { user } = this.state;
    onCreateUser(user);
  };

  render() {
    const { addUserAction } = this.props;
    const { user } = this.state;
    return (
      <View style={styles.container}>
        <Loader isLoading={addUserAction.loading ? addUserAction.loading : false} />
        <View style={styles.switchSelectorContainer}>
          <SwitchSelector
            options={options}
            selectedState={user.gender}
            onChoseHandler={this.onChoseGenderHandler}
          />
        </View>
        <View style={styles.numberPickerContainer}>
          <NumberPicker
            label="Leeftijd:"
            minValue={0}
            maxValue={120}
            iconColor="black"
            initialValue={18}
            onChangeHandler={this.onChangeAgeHandler}
          />
        </View>
        <Button text="Ga verder" onPressHandler={this.createUser} />
        {addUserAction.error ? (
          <Text style={styles.errorText}>Er is een fout opgetreden, probeer het nog eens</Text>
        ) : null}
      </View>
    );
  }
}

LoginScreen.propTypes = {
  addUserAction: PropTypes.shape(
    PropTypes.objectOf,
    PropTypes.bool,
    PropTypes.bool,
    PropTypes.bool
  ),
  onCreateUser: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

LoginScreen.defaultProps = {
  addUserAction: { newUser: {}, error: false, loading: false, succes: false },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchSelectorContainer: {
    marginTop: '20%',
    width: '80%',
    height: '15%',
  },
  numberPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: '5%',
    width: '80%',
  },
  errorText: {
    marginTop: '5%',
    color: Colors.danger,
    fontFamily: 'LiberationSans-Regular',
  },
});

const mapStateToProps = state => {
  return {
    addUserAction: state.usersStore.addUserAction,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateUser: user => dispatch(addUser(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
