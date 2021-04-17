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
import Svg, { Path } from 'react-native-svg';
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
        lable:PropTypes.string,
        titleFirstFloor:PropTypes.string,
        titleGroundFloor:PropTypes.string,
        onPress: PropTypes.func,
        source: PropTypes.node.isRequired
      }

    render (){
           const context=this;
		return(
           
            <View style={styles.ViewOne}>
            
            <Svg
          height="120%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{ position: 'absolute', top: 50 , left:0}}
        >
          <Path
            fill="#e5314e"
            d="M0,224L80,240C160,256,320,288,480,266.7C640,245,800,171,960,160C1120,149,1280,203,1360,229.3L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </Svg>
        <View style={{flexDirection:'row',}}>
        <TouchableOpacity style={{top:hp('1%')}} onPress={this.props.onPress}>
                        {/*Donute Button Image */}
                        <Image
                          source={this.props.source}
                          style={this.props.style}
                        />
                      </TouchableOpacity>
                     
                      </View>
                      <View style={{top:10,left:10}}> 
            <Text style={{color:'white',fontSize:18,left:5,top:10}}>{this.props.titleFirstFloor}</Text>
            <Text style={{color:'white',fontSize:30,fontWeight:'bold',left:5}}>{this.props.titleGroundFloor}</Text>
            </View>
            <View style={{backgroundColor:'white',borderRadius:30,width: 55, height: 55,justifyContent:'center',alignItems:'center',left:'70%',bottom:30}}>
            <Image
                          source={require('../Image/leads.png')}
                          style={{ width: 41.5, height: 35, marginLeft: 0,top:0 }}
                        />
                        </View>
              </View>
           
          

      );
    }
}

  const styles = StyleSheet.create({
    
   ViewOne:{
    backgroundColor:'#e5314e',
    height:'12%',
    width:'100%',
    borderRadius:0,
   
   },
   ViewTwo:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    top:hp('3%'),
   
   },
   ViewThree:{

   }

  });
