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
  Picker,
   ScrollView
} from 'react-native';
import Base_url from './Base_url';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,
} from 'react-native-card-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { DrawerItems } from 'react-navigation-drawer';
import {createStackNavigator,StackNavigator} from 'react-navigation-stack';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import RNPickerSelect from 'react-native-picker-select';
import Button from 'react-native-button';
import DatePicker from 'react-native-datepicker';
import LeftSide from '../src/Image/side.png';
import RightSide from '../src/Image/side2.png';
import Search from '../src/Image/search.png';
import Watch from '../src/Image/appliedLeaveDetails.png';
import LeaveSectionDesign from './LeaveSectionDesign';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class AppliedLeaveDetailPage extends Component {

  constructor(props){
  super(props)
  this.state={
               loading: false,
               leave_data:''
              }
         }
         hideLoader = () => {
            this.setState({ loading: false });
          }
        
          showLoader = () => {
            this.setState({ loading: true });
          }
  leave_balance=async()=>{
    var user_token= await AsyncStorage.getItem('user_token');
    var permissions_fir= JSON.parse(user_token);
    var permissions_four=permissions_fir.success.secret_token;
    const _this = this;
    const context=this;
    this.showLoader();
    var data = new FormData();

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function() {
      if(xhr.readyState !== 4) {
        return;
      }
      if(xhr.status===200){
        _this.hideLoader();
        var json_obj = JSON.parse(xhr.responseText);
        
        var leave_data = json_obj.success.leave_data;
          context.setState({leave_data:leave_data})
        // console.log(leave_data)
     }
     else{
       _this.hideLoader();
       console.log("inside error")
       
     }
    });
    
    xhr.open("GET", "http://erp.xeamventures.com/api/v1/leave-balance");
    
    xhr.setRequestHeader("Authorization", "Bearer "+ permissions_four);
    
    xhr.send(data);
  }
componentDidMount(){
    this.leave_balance().done();
}
    render (){

          console.log("render",this.state.leave_data)
          const {leave_data}=this.state;
		return(
      <View style={{height:'100%'}}>
      <View style={{backgroundColor:'rgb(19,111,232)',height:'10%'}}>
      <View style={{left:wp('15%'),top:hp('5%')}}>
             <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Leave Balance</Text>
              </View>
            <TouchableOpacity style={{right:'0%',top:hp('0%')}} onPress={() => this.props.navigation.toggleDrawer()}>
                        {/*Donute Button Image */}
                        <Image
                          source={require('../src/Image/menu.png')}
                          style={{ width: 35, height: 35, marginLeft: 10,top:0 }}
                        />
                      </TouchableOpacity>
            </View>
      <View style={styles.pagedata}>
      {(this.state.loading) ?
              <View style={{
                         flex:1,flexDirection:'row',width: '50%', backgroundColor: '#EFEFEF',
                         alignItems: 'center', justifyContent: 'center',
                         position: 'absolute', height:'10%',
                         shadowOffset:{  width: 100,  height: 100,},
                         shadowColor: '#330000',
                         shadowOpacity: 0,
                         shadowRadius: 5,
                         elevation: 10,
                         left:'25%',
                         top:'70%'
                     }}>

              <ActivityIndicator  size="large" color='rgb(19,111,232)'/>
                      <Text style={{fontSize:15,left:10}}>Loading..</Text>
              </View>
              : null}
          
      <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',}}>
      <Text style={{color:'rgb(19,111,232)',fontSize:18,top:10}}>Leave Balance</Text>
        <Text style={{color:'white',marginLeft:'40%'}}>{leave_data.total_leaves}</Text>
             </View>
          
         <View style={{flexDirection:'column',marginLeft:10,marginRight:10}}>
             
             <View style={styles.balanceData}>
                 <Text style={{color:'white',left:20,width:'50%'}}>Total Leave</Text>
        <Text style={{color:'white',marginLeft:'30%'}}>{leave_data.total_leaves}</Text>
             </View>
             <View style={styles.balanceData}>
                 <Text style={{color:'white',left:20,width:'50%'}}>Balance Leave</Text>
                 <Text style={{color:'white',marginLeft:'30%'}}>{leave_data.leaves_left}</Text>
             </View>
             <View style={styles.balanceData}>
                 <Text style={{color:'white',left:20,width:'50%'}}>Paid Leave</Text>
                 <Text style={{color:'white',marginLeft:'30%'}}>{leave_data.paid_count}</Text>
             </View>
             <View style={styles.balanceData}>
                 <Text style={{color:'white',left:20,width:'50%'}}>Unpaid Leave</Text>
                 <Text style={{color:'white',marginLeft:'30%'}}>{leave_data.unpaid_count}</Text>
             </View>
             <View style={styles.balanceData}>
                 <Text style={{color:'white',left:20,width:'50%'}}>Compensatory Leave</Text>
                 <Text style={{color:'white',marginLeft:'30%'}}>{leave_data.compensatory_leaves_count}</Text>
             </View>
             </View>
       </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    balanceData:{
        flexDirection:'row',
        alignItems:'center',
       backgroundColor:'rgb(19,111,232)' ,
       height:'10%',
       margin:10,
       borderRadius:5,
       shadowColor: '#330000',
                shadowOpacity: 0,
                // shadowRadius: 0,
                elevation: 15,

    },
    pageData:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        height:'85%',
        top:hp('20%'),
        marginTop:10

    }

  });
