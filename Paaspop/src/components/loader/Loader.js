import React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Colors } from '../../assets/GeneralStyle';

const Loader = props => {
  const { isLoading } = props;
  return (
    <Modal transparent animationType="none" visible={isLoading}>
      <View style={styles.modalBackground}>
        <ActivityIndicator animating={isLoading} size="large" color={Colors.primary} />
      </View>
    </Modal>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool,
};

Loader.defaultProps = {
  isLoading: false,
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: Colors.transparentBackground,
  },
});

export default Loader;
