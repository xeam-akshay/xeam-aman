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
    
  static propTypes = {
    containerStyle: PropTypes.style,
    style: PropTypes.style,
    autoFocus: PropTypes.bool,
    editbale: PropTypes.bool,
    textColor: PropTypes.string,
    onChangeText: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    lable:PropTypes.string,
    title:PropTypes.string,
    onPress: PropTypes.func,
  }

    render (){
      const context=this;
      return(
         
             <LinearGradient 
                                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                        colors={['#5434ff', '#21bbff']}
                                        style={{borderColor:'rgb(19,111,232)',height:2,width:'20%',left:'2%'}}
                                        >
                                              
                                              </LinearGradient>
         
      );
    }
}

  const styles = StyleSheet.create({
    button: {
        color: '#DCE4EF',
        marginLeft:0,
        marginBottom: 10,
        paddingTop:23,
        paddingBottom:23,
        paddingLeft:70,
        paddingRight:70,
        backgroundColor:'rgb(19,111,232)',
        borderRadius:10,
        borderWidth: 1,
        borderColor: 'transparent',
        elevation: 0,
        overflow: "hidden"
      },
  });
