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
    id: PropTypes.func,
    name: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    label:PropTypes.string,
    title:PropTypes.string,
    onPress: PropTypes.func,
    source: PropTypes.any.isRequired,
    data:PropTypes.string,
  }

    render (){
      const context=this;
      const data = [{name:"naveen",id:'1'},{name:"naveen",id:'2'},{name:"naveen",id:'3'}]
      return(
           
             <View style={[styles.box,this.props.style]}>
            <Dropdown
               containerStyle={{left:wp('1%'),bottom:25}}
               maxLength = {12}
               inputContainerStyle={{ borderBottomWidth:wp(0),borderBottomColor:"rgb(19,111,232)",fontSize:hp(2) }}
               data={this.props.data}
               valueExtractor={this.props.id}
              labelExtractor={this.props.name}
               label={this.props.label}
               onChangeText={this.props.onChangeText}
               baseColor = '#e5314e'
               style = {{color: '#aaa'}}
               
             />
      </View>
        
      );
    }
}

  const styles = StyleSheet.create({
    box:{
       top:0,
      borderWidth:1,
      borderColor:'#c4c4c4',
      borderRadius:10,
     left:0,
     
      
    },
    inputBox:{
      borderBottomWidth: 0 ,
      bottom:12,
      paddingBottom:0,
      left:0,
      width:'95%',
      height:'0%'
    },
    image:{
      left: 300,
      bottom:5,
      backgroundColor:'white'
    }
  });
