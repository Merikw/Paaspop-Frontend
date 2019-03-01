import React, { Component } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

class NumberPicker extends Component{
    state = {
        value: this.props.initialValue
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.numberPickerContainer}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>{this.props.label}</Text>
                    </View>
                    <View style={styles.numericInputContainer}>
                        <TextInput style={styles.textInput} returnKeyType='done' underlineColorAndroid='rgba(0,0,0,0)' keyboardType='numeric' value={String(this.state.value)}/>
                        <View style={styles.buttonContainer}>  
                            <TouchableOpacity>
                                <Icon name="ios-arrow-up" size={15} color={"black"}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name="ios-arrow-down" size={15} color={"black"}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    numberPickerContainer: {
        justifyContent: "space-between",
        width: "100%",
        flexDirection: "row"
    },
    numericInputContainer:{
        justifyContent: "flex-end",
        flexDirection: "row",
    },
    buttonContainer: {
        flexDirection: "column",
        marginLeft: "15%"
    },
    labelContainer: {
        justifyContent: "flex-start"
    },
    textInput: {
        fontSize: 22,
        fontFamily: "LiberationSans-Regular",
        paddingTop: 0,
        paddingBottom: 0
    },
    label: {
        fontSize: 22,
        fontFamily: "LiberationSans-Regular",
        color: "black"
    }
})

export default NumberPicker;