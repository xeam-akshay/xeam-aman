import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getWidthnHeight} from './width';

const Button = ({onPress, children, style, buttonColor}) => {
  const {buttonStyle, textStyle} = styles;
  console.log("BUTTON COLOR: ", buttonColor)
  let color = null;
  if(!buttonColor){
      color = ['#F71A1A', '#E1721D'];
  }
  return (
    <View style={[buttonStyle, style]}>
      <TouchableOpacity onPress={onPress}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={buttonColor || color} style={styles.linearGradient}>
          <Text style={[textStyle, style]}>{children}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  buttonStyle: {
    marginTop: 40,
    marginHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    borderColor: 'black',
    borderWidth: 0,
  },
  linearGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    borderColor: 'yellow',
    borderWidth: 0
  },
};

export {Button};
