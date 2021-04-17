import React from 'react';
import {TextInput, View, Text} from 'react-native';
import {getMarginLeft,getMarginTop, getWidthnHeight} from './width';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

function Circle({
  position,
  activecircle = false, 
  status,
}) {
  const {containerStyle, inputStyle, labelStyle} = styles;
  return (
    <View>
    <View style ={{alignItems:'center',justifyContent:'center',marginTop:'5.5%'}}>
    {status == 'approved' ?
        <View style={[{backgroundColor:'white', borderRadius:(getWidthnHeight(undefined,8).height)/2, borderWidth:7, borderColor:'#019C02'/*'#DBE8F8'*/, }, getWidthnHeight(15,8)]}>
        <View style = {[{alignItems:'center', justifyContent:'center'},getMarginTop(0.9)]}>
        <FontAwesome name = {"check"} size = {30} color = {'#019C02'}/> 
        </View>
        </View>:
     status == 'rejected' ?
        <View style={[{backgroundColor:'white', borderRadius:(getWidthnHeight(undefined,8).height)/2, borderWidth:7, borderColor:'#E93B30'/*'#DBE8F8'*/, }, getWidthnHeight(15,8)]}>
        <View style = {[{alignItems:'center', justifyContent:'center'},getMarginTop(0.9)]}>
        <FontAwesomeIcons name = {"close"} size = {30} color = {'#E93B30'}/> 
        </View>
        </View>:
     status == 'sendback' ?    
        <View style={[{backgroundColor:'white', borderRadius:(getWidthnHeight(undefined,8).height)/2, borderWidth:7, borderColor:'#E68F1B'/*'#DBE8F8'*/, }, getWidthnHeight(15,8)]}>
        <View style = {[{alignItems:'center', justifyContent:'center'},getMarginTop(0.9)]}>
        <FontAwesome name = {"level-up-alt"} size = {30} color = {'#E68F1B'}/> 
        </View>
        </View>:
        <View style={[{backgroundColor:'white', borderRadius:(getWidthnHeight(undefined,8).height)/2, borderWidth:7, borderColor:'#DBE8F8', }, getWidthnHeight(15,8)]}>
        <View style = {[{alignItems:'center', justifyContent:'center'},getMarginTop(1)]}>
        <FontAwesome/> 
        </View>
        </View>
    }  
    </View>
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

export {Circle};
