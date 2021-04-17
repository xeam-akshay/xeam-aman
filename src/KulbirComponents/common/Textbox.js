import React from 'react';
import {View, Text, Image,TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {getMarginTop, getMarginLeft, fontSizeH3, fontSizeH4, getWidthnHeight} from './width';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5';

const Textbox = ({
    textboxtitle,
    textinputdata, 
    inputbgStyle,
    boxcontainerStyle,
    textboxplaceholder,
    textboxvalue,
    iconbgColor,
    iconname,
    iconsize,
    iconcolor,
}) => {
    return (            
        <View>
            <View style = {[getWidthnHeight(40)]}>
            <View style={[{flexDirection:'row', marginTop:getMarginTop(1.5).marginTop},styles.box, boxcontainerStyle]}>    
            <View style={[{width: '26%',height: 35,borderRadius: 35/2, borderWidth:0, backgroundColor:'#DBE8F8', justifyContent:'center'}, getMarginTop(1.7), getMarginLeft(2.5), iconbgColor]}>
            <View style={[{alignItems:'center'}]}>   
            <FontAwesomeIcons name={iconname} size={iconsize} color={iconcolor}/>
            </View> 
            </View>    
            <View style ={[getMarginTop(1), getMarginLeft(2.5)]}>
            <Text style = {[{color:'#FFFEFF', fontWeight:'600'},fontSizeH4() ]}>{textboxplaceholder}</Text>
            <Text style = {[{color:'#FFFEFF', fontWeight:'bold'},fontSizeH4() ]}>{textboxvalue}</Text>
            </View>
            </View>
            </View>
        </View>
    );
};

const styles = {
box:{
    left:0,
    height:60,
    width:'90%',
    borderRadius:10,
    },   
};

export {Textbox};