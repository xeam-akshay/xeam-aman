import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,
} from 'react-native-card-view';
import Logo from './Image/logo.png';
import {getWidthnHeight} from './KulbirComponents/common';


export default class Header extends Component {

    render () {

		return(
          <View style={[styles.container, getWidthnHeight(100)]}>
            <Image source={Logo} style={{height:40,width:150}}/>
          </View>

      );
    }
  }


  const styles = StyleSheet.create({
    container: {
      width: 170, 
      height: 60, 
      marginTop: 40,
      marginBottom: 30,
      alignItems: 'center', 
      justifyContent: 'center',
      borderRadius: 10,
      borderColor: 'black',
      borderWidth: 0
    }
  });
