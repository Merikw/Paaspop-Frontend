import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Colors } from '../../assets/GeneralStyle';

const Button = props => {
  const { onPressHandler, text } = props;
  return (
    <TouchableOpacity onPress={onPressHandler}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  onPressHandler: PropTypes.func.isRequired,
  text: PropTypes.string,
};

Button.defaultProps = {
  text: 'Klik',
};

const styles = StyleSheet.create({
  buttonText: {
    color: Colors.primary,
    fontFamily: 'LiberationSans-Regular',
    fontSize: 22,
  },
});

export default Button;
