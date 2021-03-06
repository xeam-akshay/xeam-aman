import React from 'react';
import {TextInput, View, Text} from 'react-native';

const Input = ({
  label, 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry, 
  keyboardType, 
  style,
  updateContainer
}) => {
  const {containerStyle, inputStyle, labelStyle} = styles;
  return (
    <View style={[containerStyle, updateContainer]}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        style={[inputStyle, style]}
        secureTextEntry={secureTextEntry}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = {
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
  },
  containerStyle: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    color: '#000',
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
  },
};

export {Input};
