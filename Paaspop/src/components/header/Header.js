import React from 'react';
import { View, Image } from 'react-native';

import Logo from '../../assets/images/paaspoplogo.png';
import { Colors } from '../../assets/GeneralStyle';

const HeaderStyle = { flex: 1, alignItems: 'center', marginTop: '21%', overflow: 'visible' };
const ImageStyle = { width: '40%', resizeMode: 'contain' };

const Header = {
  headerTitle: (
    <View style={HeaderStyle}>
      <Image source={Logo} style={ImageStyle} />
    </View>
  ),
  headerStyle: {
    backgroundColor: Colors.primary,
    height: '25%',
  },
};

export default Header;
