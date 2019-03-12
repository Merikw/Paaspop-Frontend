import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Colors } from '../../assets/GeneralStyle';

class SwitchSelector extends Component {
  constructor(...args) {
    super(...args);
    const { selectedState } = this.props;
    this.state = {
      selected: selectedState,
    };
  }

  onClickHandler = value => () => {
    const { onChoseHandler } = this.props;
    this.setState({
      selected: value,
    });
    onChoseHandler(value);
  };

  render() {
    const { options } = this.props;
    const { selected } = this.state;
    if (options !== null) {
      const selectors = [];
      for (let i = 0; i < options.length; i++) {
        var value = options[i].value;
        var isSelected = selected === value;
        selectors.push(
          <TouchableOpacity
            key={i}
            style={[
              styles.button,
              options.length - 1 === i ? styles.lastButton : null,
              isSelected ? styles.buttonSelected : null,
            ]}
            onPress={this.onClickHandler(value)}
          >
            <Text style={[styles.textUnselected, isSelected ? styles.textSelected : null]}>
              {options[i].label}
            </Text>
          </TouchableOpacity>
        );
      }

      return <View style={styles.container}>{selectors}</View>;
    } else {
      return <View />;
    }
  }
}

SwitchSelector.propTypes = {
  selectedState: PropTypes.number,
  options: PropTypes.arrayOf(Object).isRequired,
  onChoseHandler: PropTypes.func.isRequired,
};

SwitchSelector.defaultProps = {
  selectedState: 0,
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  button: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 3,
    borderColor: Colors.primary,
  },
  lastButton: {
    borderRightWidth: 0,
  },
  buttonSelected: {
    backgroundColor: Colors.primary,
  },
  textSelected: {
    color: Colors.white,
  },
  textUnselected: {
    color: Colors.black,
    fontFamily: 'LiberationSans-Regular',
    fontSize: 18,
  },
});

export default SwitchSelector;
