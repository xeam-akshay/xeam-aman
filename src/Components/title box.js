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
export default class TaskDateExtension extends Component {

    static propTypes = {
        containerStyle: PropTypes.style,
        style: PropTypes.style,
        autoFocus: PropTypes.bool,
        editbale: PropTypes.bool,
        textColor: PropTypes.string,
        onChangeText: PropTypes.func,
        value: PropTypes.string,
        placeholder: PropTypes.string,
        lable:PropTypes.string
      }

    render (){
           
		return(
           
            <View style={[styles.container,this.props.style]} >
            <View style={styles.card_view_thrd}>
            <Text style={{color:'#fcfeff',left:0}}>{this.props.lable}</Text>
                  </View>
                    <Image source={LeftSide} style={{right:'3%',bottom:'0%',height:'100%',width:50,borderColor:'black',}}/>
                 </View> 

      );
    }
}

  const styles = StyleSheet.create({
    
    card_view_thrd: {
        paddingTop:5,
        paddingLeft:5,
        
        paddingBottom:10,
        backgroundColor:'#3280e4',
       
        // shadowOffset:{  width: 100,  height: 100,  },
        // shadowColor: '#330000',
        shadowOpacity: 0,
        // shadowRadius: 0,
  },
  container:{
    flexDirection:'row',
    left:10
  }

  });
