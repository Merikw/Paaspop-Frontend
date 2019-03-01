import React from 'react';
import { View, Image } from "react-native";

import Logo from "../../../assets/images/paaspoplogo.png"
import { Colors } from "../../../assets/GeneralStyle";

const Header = {
    headerTitle: (
        <View style={{flex: 1, alignItems: "center", marginTop: "21%", overflow: "visible"}}>
            <Image source={Logo} style={{width: "40%", resizeMode: "contain"}}/>
        </View>
    ),
    headerStyle: {
        backgroundColor: Colors.primary,
        height: "25%"
    },
};

export default Header;