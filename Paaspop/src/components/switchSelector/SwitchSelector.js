import React, { Component } from "react";
import {View, StyleSheet, Text, TouchableOpacity } from "react-native";

import { Colors } from "../../assets/GeneralStyle";

class SwitchSelector extends Component{
    state = {
        selected: this.props.selectedState
    }

    onClickHandler = value => {
        this.setState({
            selected: value
        })
        this.props.onChoseHandler(value)
    }

    render() {
        if(this.props.options !== null){
            const selectors = [];
            for(let i = 0; i < this.props.options.length; i++){
                var value = this.props.options[i].value;
                var isSelected = this.state.selected === value;
                selectors.push(
                    <TouchableOpacity key={i} style={[styles.button, this.props.options.length - 1 === i ? styles.lastButton : null, isSelected ? styles.buttonSelected : null]}
                        onPress={this.onClickHandler.bind(this, value)}>
                        <Text style={[styles.textUnselected, isSelected ? styles.textSelected : null]}> 
                            {this.props.options[i].label}
                        </Text>
                    </TouchableOpacity>
                )
            }

            return (
                <View style={styles.container}>
                    {selectors}
                </View>
            )
        } else {
            return (<View></View>)
        }
    }   
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        borderWidth: 3,
        borderColor: Colors.primary
    },
    button: {
        flex: 1,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 3,
        borderColor: Colors.primary
    },
    lastButton: {
        borderRightWidth: 0
    },
    buttonSelected: {
        backgroundColor: Colors.primary
    },
    textSelected: {
        color: "white"
    },
    textUnselected: {
        color: "black",
        fontFamily: "LiberationSans-Regular",
        fontSize: 18
    }
});

export default SwitchSelector;