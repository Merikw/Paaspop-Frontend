import React from 'react';
import { View, Image } from 'react-native';

import Logo from '../../assets/images/paaspoplogo.png';
import { Colors } from '../../assets/GeneralStyle';

const HeaderStyle = {
  flex: 1,
  alignItems: 'center',
  marginTop: '21%',
};
const ImageStyle = { width: '40%', resizeMode: 'contain' };

const Header = {
  headerTitle: (
    <View style={HeaderStyle}>
      <Image source={Logo} style={ImageStyle} />
    </View>
  ),
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: Colors.white,
  headerBackTitle: null,
  headerTitleContainerStyle: {
    left: 0, // THIS RIGHT HERE
  },
  headerLayoutPreset: 'center',
};

export default Header;
