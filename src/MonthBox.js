import React, {Component} from 'react';

import {StyleSheet, View, TextInput, Image ,Text } from 'react-native';

export default class CommentBoxInput extends Component {

  render() {
    return (
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={this.props.placeholder}
          secureTextEntry={this.props.secureTextEntry}
          autoCorrect={this.props.autoCorrect}
          autoCapitalize={this.props.autoCapitalize}
          returnKeyType={this.props.returnKeyType}
          placeholderTextColor="black"
          keyboardType="numeric"
          value = {this.props.value}
          onChangeText={this.props.onChangeText}
        />
      </View>
    );
  }
}




const styles = StyleSheet.create({
  input: {

    borderRadius: 10,
    backgroundColor: '#F0F8FF',
    paddingLeft:20,
    paddingRight:0,
    paddingTop:5,
    paddingBottom:5,
    borderColor:'transparent',
    fontSize:12,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderLeftWidth:1,
    borderStyle:'dashed',
    elevation: 7,
  },
  inputWrapper: {
    flex: 1,

  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height:30,
    left: 20,
    top: 10,
  },
});
