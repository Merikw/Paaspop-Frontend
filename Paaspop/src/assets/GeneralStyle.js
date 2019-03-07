import { StyleSheet } from 'react-native';

const Colors = {
  primary: '#62258d',
  danger: '#c92d39',
  transparentBackground: '#00000040',
  black: 'black',
  white: 'white',
};

const Styles = StyleSheet.create({
  mainText: {
    color: Colors.black,
    fontFamily: 'LiberationSans-Regular',
    fontSize: 24,
  },
});

export { Colors, Styles };
