import React, {Component} from 'react';

import {StyleSheet, View, Text} from 'react-native';

export default class SignupSection extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Create Account</Text>
        <Text style={styles.text}>Forgot Password?</Text>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 65,
    
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: 'black',
    backgroundColor: 'transparent',
  },
});
