import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator
} from 'react-native';

import { Colors } from "../../assets/GeneralStyle";

const Loader = props => {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={props.isLoading}>
      <View style={styles.modalBackground}>
        <ActivityIndicator animating={props.isLoading} size="large" color={Colors.primary} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  }
});

export default Loader;