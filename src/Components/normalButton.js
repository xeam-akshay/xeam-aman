import React, {Component} from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  TextInput
} from 'react-native';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,
} from 'react-native-card-view';
import Icon from 'react-native-vector-icons/Ionicons';
import KeyboardShift from '../KeyboardShift';
// import Base_url from '../Base_url';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LeftSide from '../Image/side.png';
import RightSide from '../Image/side2.png';
import Logo from '../Image/logo.png';
import CheckBox from 'react-native-check-box';
import DatePicker from 'react-native-datepicker';
import { CustomPicker } from 'react-native-custom-picker';
import { Dropdown } from 'react-native-material-dropdown';
import DocumentPicker from 'react-native-document-picker';
import TitleBox from '../Components/title box'
import Header from '../Components/Header'
import LinearGradient from 'react-native-linear-gradient';
import { Hoshi } from 'react-native-textinput-effects';
import AnimatedInput from "react-native-animated-input";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import PropTypes from 'prop-types';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class GradientButton extends Component {
  constructor(props){
    super(props)

this.state = {
   email:''
    }
}
  static propTypes = {
    containerStyle: PropTypes.style,
    style: PropTypes.style,
    TextStyle: PropTypes.style,
    image:PropTypes.style,
    autoFocus: PropTypes.bool,
    editbale: PropTypes.bool,
    textColor: PropTypes.string,
    onChangeText: PropTypes.func,
    onDateChange: PropTypes.func,
    value: PropTypes.string,
    format: PropTypes.string,
    mode: PropTypes.string,
    date: PropTypes.string,
    placeholder: PropTypes.string,
    lable:PropTypes.string,
    title:PropTypes.string,
    onPress: PropTypes.func,
    source: PropTypes.any.isRequired
  }

    render (){
      const context=this;
     
      return(
           
             <TouchableOpacity style={[styles.button,this.props.style]} onPress={this.props.onPress} >
           <View style={styles.box}>
              <View style={styles.whiteRowOne}/>
              <Text style={{color:'white'}}>{this.props.title}</Text>
              <View style={styles.whiteRowTwo}/>
           </View>
              
      </TouchableOpacity>
        
      );
    }
}

  const styles = StyleSheet.create({
    button:{
     
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
        // top:320,
        // left:10
    },
    box:{
       
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height:40,
       
        
    },
    whiteRowOne:{
        justifyContent:'flex-start',
        alignItems:'flex-start',
        height:40,
        width:5,
        backgroundColor:'white',
        right:20
    },
    whiteRowTwo:{
        justifyContent:'flex-end',
        alignItems:'flex-end',
        height:40,
        width:5,
        backgroundColor:'white',
        left:20
    }
  });
