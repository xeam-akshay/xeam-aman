import React, {Component} from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  TextInput
} from 'react-native';
import PropTypes from 'prop-types';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

 const propTypes = {
    containerStyle: PropTypes.style,
    style: PropTypes.style,
    TextStyle: PropTypes.style,
    circle:PropTypes.circle,
    autoFocus: PropTypes.bool,
    editbale: PropTypes.bool,
    textColor: PropTypes.string,
    onChangeText: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    lable:PropTypes.string,
    title:PropTypes.string,
    onPress: PropTypes.func,
    source: PropTypes.any.isRequired
  };

const Newspaper=(props) => {
    
      return (
          
      <TouchableOpacity activeOpacity={2}  style={{flexDirection:'column',justifyContent:'center',alignItems:'center',}} onPress={props.onPress}>
          <View style={[styles.box,props.style]}>  
              <Text style={[styles.input,props.TextStyle]}>  {props.title}</Text>
          </View>
          <View style={[styles.circle,props.circle]}>
            <Image source={props.source} style={{ width: 20, height: 20, marginLeft: 0,bottom:0,backgroundColor:'transparent' }} />
          </View>
      </TouchableOpacity>
          
      );

      
  };
  const styles = StyleSheet.create({
    box:{
      alignItems:'center',
     bottom:0,
     borderWidth:1,
    //  borderColor:'#e5214e',
     height:40,
     width:80,
     justifyContent: 'flex-end'
    } ,
    input:{
      fontSize:10,
    },
    circle:{
      borderRadius:30,
      borderWidth:1,
      width: 40, 
      height: 40,
      justifyContent:'center',
      alignItems:'center',
      marginTop: -60
    }
   });
  export default Newspaper;