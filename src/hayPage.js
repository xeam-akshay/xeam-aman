import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Loader,
  Dimensions
} from 'react-native';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';



const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class LoginPage extends Component {


  render () {



     const card = {card: {width: '100%', height: '100%',}};
    return (
       <View>
       <Text>hii</Text>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  logintext: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
   textShadowColor: 'rgba(0, 0, 0, 0.75)',
   textShadowOffset: {width: 40, height: 60},
   textShadowRadius: 0
  },
  title: {
    flex:1,
    flexDirection:'row',
    textAlign:'center',
    color: 'rgb(19,111,232)',
    fontSize: 38,
    fontWeight: 'bold',
  },
  button: {
    color: '#DCE4EF',
    marginLeft:0,
    marginBottom: 50,
    paddingTop:23,
    paddingBottom:23,
    paddingLeft:70,
    paddingRight:70,
    backgroundColor:'rgb(19,111,232)',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'rgb(0,0,0)'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#2B2929',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  btnEye: {
    position: 'absolute',
    top: 20,
    right: 28,
  },
  iconEye: {
    width: 50,
    height: 50,
    tintColor: "black",
  },

});
