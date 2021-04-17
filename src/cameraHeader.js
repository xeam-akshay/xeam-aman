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
import Base_url from './Base_url';


export default class Header extends Component {

    render () {

		return(

          <View style={{
            flex:0,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#0080FF',
            marginBottom:8,
            marginTop:-5,
            shadowOffset:{  width: 100,  height: 100,  },
            shadowColor: 'rgba(0, 0, 0, 0.75)',
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 8,
          }}>
          <Text style={{
            flex:1,
            flexDirection:'row',
            textAlign:'center',
            color:'white',
            fontSize:25,
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: {width: 2, height: 6},
            textShadowRadius: 10
          }}
            >
         ATTENDANCE PORTAL
         </Text>
        </View>
      );
    }
  }


  const styles = StyleSheet.create({


  });
