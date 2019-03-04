import React, { Component } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native'

import { Colors } from "../../assets/GeneralStyle";

const Button = (props) => {
    return (
        <TouchableOpacity onPress={props.onPressHandler}>
            <Text style={styles.buttonText}>
                {props.text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        color: Colors.primary,
        fontFamily: "LiberationSans-Regular",
        fontSize: 22
    }
})

export default Button;