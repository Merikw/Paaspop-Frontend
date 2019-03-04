import React, { Component } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

class NumberPicker extends Component{
    state = {
        value: this.props.initialValue,
        correctValue: this.props.initialValue
    }

    onButtonChange = (opperator) => {
        this.setState(prevState => {
            var newValue = opperator === "minus" ? parseInt(prevState.value) - 1 : parseInt(prevState.value) + 1;
            if(parseInt(newValue) <= 120 && parseInt(newValue) >= 1){
                this.props.onChangeHandler(newValue);
                return{
                    value: newValue,
                    correctValue: newValue
                }
            }
        })
    }

    onChange = value => {
        this.setState({
            value: (value.trim() !== "" && value.trim() !== "-") ? parseInt(value) : ""
        })
    }

    onEndEditing = event => {
        var value = event.nativeEvent.text
        if(value){
            if(value.trim() !== "" && value.trim() !== "-" && parseInt(value) >= 1 && parseInt(value) <= 120){
                this.setState({
                    value: parseInt(value),
                    correctValue: parseInt(value)
                })
                this.props.onChangeHandler(parseInt(value));
            } else {
                this.setState(prevState => {
                    return {
                        value: prevState.correctValue
                    }
                })
            }
        }   
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.numberPickerContainer}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>{this.props.label}</Text>
                    </View>
                    <View style={styles.numericInputContainer}>
                        <TextInput style={styles.textInput} returnKeyType='done' underlineColorAndroid='rgba(0,0,0,0)' onChangeText={this.onChange} onEndEditing={this.onEndEditing} keyboardType='numeric' value={String(this.state.value)}/>
                        <View style={styles.buttonContainer}>  
                            <TouchableOpacity onPress={this.onButtonChange.bind(this, "plus")}>
                                <Icon name="ios-arrow-up" size={15} color={"black"}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onButtonChange.bind(this, "minus")}>
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