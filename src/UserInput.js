import React, {Component} from 'react';

import {StyleSheet, View, TextInput, Image ,Text } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default class UserInput extends Component {

  render() {
    return (
      <View style={styles.inputWrapper}>

        <Image source={this.props.source} style={styles.inlineImg} />
        <TextInput
          style={styles.input}
          placeholder={this.props.placeholder}
          secureTextEntry={this.props.secureTextEntry}
          autoCorrect={this.props.autoCorrect}
          autoCapitalize={this.props.autoCapitalize}
          returnKeyType={this.props.returnKeyType}
          placeholderTextColor="black"
          value = {this.props.value}
          onChangeText={this.props.onChangeText}
          underlineColorAndroid="rgb(19,111,232)"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
     marginTop:'5%',
    backgroundColor: 'transparent',
    width: 250,
    marginHorizontal: 10,
    paddingLeft: 45,
    borderBottomColor: 'rgb(19,111,232)',
    borderBottomEndRadius: 500,
    borderColor: 'rgb(0,0,0)',
    overflow: "hidden"
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
    top: 25,

  },
});
