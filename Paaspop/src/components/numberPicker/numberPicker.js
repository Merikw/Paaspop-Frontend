/* eslint react/no-unused-state: 0 */

import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../assets/GeneralStyle';

class NumberPicker extends Component {
  constructor(...args) {
    super(...args);
    const { initialValue } = this.props;
    this.state = {
      value: initialValue,
      correctValue: initialValue,
    };
  }

  onButtonChange = opperator => () => {
    const { onChangeHandler } = this.props;
    this.setState(prevState => {
      var newValue =
        opperator === 'minus' ? parseInt(prevState.value) - 1 : parseInt(prevState.value) + 1;
      if (parseInt(newValue) <= 120 && parseInt(newValue) >= 1) {
        onChangeHandler(newValue);
        return {
          value: newValue,
          correctValue: newValue,
        };
      }
    });
  };

  onChange = value => {
    this.setState({
      value: value.trim() !== '' && value.trim() !== '-' ? parseInt(value) : '',
    });
  };

  onEndEditing = event => {
    const { onChangeHandler } = this.props;
    var value = event.nativeEvent.text;
    if (value) {
      if (
        value.trim() !== '' &&
        value.trim() !== '-' &&
        parseInt(value) >= 1 &&
        parseInt(value) <= 120
      ) {
        this.setState({
          value: parseInt(value),
          correctValue: parseInt(value),
        });
        onChangeHandler(parseInt(value));
      } else {
        this.setState(prevState => {
          return {
            value: prevState.correctValue,
          };
        });
      }
    }
  };

  render() {
    const { label } = this.props;
    const { value } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.numberPickerContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>{label}</Text>
          </View>
          <View style={styles.numericInputContainer}>
            <TextInput
              style={styles.textInput}
              returnKeyType="done"
              underlineColorAndroid="rgba(0,0,0,0)"
              onChangeText={this.onChange}
              onEndEditing={this.onEndEditing}
              keyboardType="numeric"
              value={String(value)}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={this.onButtonChange('plus')}>
                <Icon name="ios-arrow-up" size={25} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onButtonChange('minus')}>
                <Icon name="ios-arrow-down" size={25} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

NumberPicker.propTypes = {
  initialValue: PropTypes.number,
  label: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired,
};

NumberPicker.defaultProps = {
  initialValue: 18,
  label: 'Getal: ',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  numberPickerContainer: {
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
  },
  numericInputContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'column',
    marginLeft: '15%',
  },
  labelContainer: {
    justifyContent: 'flex-start',
  },
  textInput: {
    fontSize: 26,
    fontFamily: 'LiberationSans-Regular',
    paddingTop: 0,
    paddingBottom: 0,
  },
  label: {
    fontSize: 24,
    fontFamily: 'LiberationSans-Regular',
    color: Colors.black,
  },
});

export default NumberPicker;
