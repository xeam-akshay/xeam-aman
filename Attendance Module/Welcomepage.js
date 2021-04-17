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
  Linking,
  Loader,
} from 'react-native';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,
} from 'react-native-card-view';
import Base_url from '../src/Base_url';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';
import PTRView from 'react-native-pull-to-refresh';
// import AsyncStorage from '@react-native-community/async-storage';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Button from 'react-native-button';
import CustomHeader from '../src/Header';
import CameraPage from '../src/Attendance Module/CameraPage';
import Monthlyreport from './Attendance Management/My_Attendance';
import Logo from './Image/logo.png';
import abc from '../src/ExpandableViewSeparate';
import Header_drawer from '../src/header_width_drawer';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import {extractBaseURL} from '../src/api/BaseURL';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class Welcomepage extends Component {
  static navigationOptions = {
      headerBackground:<View style={{alignItems:'center',justifyContent:'center'}}><Image source={Logo} style={{height:30,width:120,marginTop:20,}}/></View>,

                  };

        constructor(props){
              super(props)
                  this.state={
                                successToken:'',
                                userName:'',
                                loading: false,
                                device:'',
                                deviceVersion:'',
                                rendum_value:'',
                                dashboard:[],
                                loading: false,
                                animating: true,
                                baseURL: null
                              }
                              this._refresh = this._refresh.bind(this);
  }

componentDidMount(){
 this.device_id();
 this.dashboard_list_component();
 
 // this.puch_notification().done();
}

async extractLink(){
  await extractBaseURL().then((baseURL) => {
    this.setState({baseURL}, () => console.log("EXTRACT LINK: ", this.state.baseURL))
  })
}

hideLoader = () => {
  this.setState({ loading: false });
}

showLoader = () => {
  this.setState({ loading: true });
}
device_id(){
  const deviceInfo2 = DeviceInfo.getSystemName();
  const deviceVersion = DeviceInfo.getVersion();
  //alert('deviceInfo1'+deviceInfo1);
  console.log(deviceVersion)
  this.setState({device : deviceInfo2})
  this.setState({deviceVersion : deviceVersion})
  // console.log(deviceInfo2)
}
puch_notification=async()=>{
  const {baseURL} = this.state;
  const context=this;
  console.log("puch_notification");
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_sec=permissions_fir.success.secret_token;
  var data = new FormData();
data.append("version", this.state.deviceVersion);
data.append("device_type", this.state.device);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  console.log(xhr.status)
  console.log(xhr.readyState)
  if (xhr.readyState !== 4) {
                              return;
                            }
  if (xhr.status === 200) {

console.log(xhr.responseText)
  }
  else{
    var json_obj = JSON.parse(xhr.responseText);
    var c = json_obj.error;
    Alert.alert(
      'Xenia',
      c,
      [
        {text: 'Update', onPress: () => context.update()},
      ],
      {cancelable: false},
    );

  }
});

xhr.open("POST", `${baseURL}/app-version`);

xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);


xhr.send(data);
}
update(){
  const url='https://play.google.com/store/apps/details?id=com.xenia';
  Linking.canOpenURL(url)
  .then((supported) => {
    if (!supported) {
      console.log("Can't handle url: " + url);
    } else {
      return Linking.openURL(url);
    }
  })
  .catch((err) => console.error('An error occurred', err));

}

hideLoader = () => {
                      this.setState({ loading: false });
                    }

showLoader = () => {
                      this.setState({ loading: true });
                    }

_menu = null;

setMenuRef = ref => {
                        this._menu = ref;
                      };

hideMenu = () => {
                    this._menu.hide();
                  };

showMenu = () => {
                  this._menu.show();
                };

chekIn = () =>{
                    console.log("I am inside chekIn")
                    // const _this = this;
                    // this.showLoader();
                    const context=this;
                    var userObj = JSON.parse(context.props.route.params.userObj);
                    var successToken={token:userObj.success.secret_token};
                    var user_id ={userid:userObj.success.user.employee.user_id}
                    var userName={fullname:userObj.success.user.employee.fullname}
                    context.props.navigation.navigate("cameraPage",{successToken:successToken});
                    context.props.navigation.navigate("cameraPage",{userName:userName});
                    context.props.navigation.navigate("cameraPage",{user_id:user_id});
                    var xyz="Check-In";
                    context.props.navigation.navigate("cameraPage",{xyz:xyz});
                  }
  chekOut = () =>{
                    console.log("I am inside checkOutPage")
                    // const _this = this;
                    // this.showLoader();
                    const context=this;
                    var userObj = JSON.parse(context.props.route.params.userObj);
                    var successToken={token:userObj.success.secret_token};
                    var user_id ={userid:userObj.success.user.employee.user_id}
                    var userName={fullname:userObj.success.user.employee.fullname}
                    context.props.navigation.navigate("CheckOut",{successToken:successToken});
                    context.props.navigation.navigate("CheckOut",{userName:userName});
                    context.props.navigation.navigate("CheckOut",{user_id:user_id});
                    var xyz="Check-Out";
                    context.props.navigation.navigate("CheckOut",{xyz:xyz});
                  }
otherPage = () => {
                    const context=this;
                    var userObj = JSON.parse(context.props.route.params.userObj);
                    var successToken=(userObj.success.secret_token);
                    var user_id =(userObj.success.user.employee.user_id);
                    context.props.navigation.navigate("monthlyreport",{successToken});
                    context.props.navigation.navigate("monthlyreport",{user_id});
                }
sec_otherPage = () => {
                        Alert.alert("\nthis service not activate right now !");
                  }
thrd_otherPage = () => {
                        Alert.alert("\nthis service not activate right now !");
                  }

                  _onItemPressed(item){
                    
                    this.value().done();
                }
dwaerButton(){
  const context=this;
  context.props.navigation.toggleDrawer();
  this._onItemPressed.bind(this);
}
// UNSAFE_componentWillMount(){
  
// }
dashboard_list_component=async()=>{
  await this.extractLink();
  const {baseURL} = this.state;
  const _this = this;
  this.showLoader();
  const context=this;
  console.log("dashboard_list_component")
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_sec=permissions_fir.success.secret_token;    
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
                    if (xhr.readyState !== 4) {
                      return;
                    }
                  if (xhr.status === 200) {
                    _this.hideLoader();
                    var json_obj = JSON.parse(xhr.responseText);
                    var DashBoard = json_obj.success.attendance_data;
                    console.log("DashBoard",DashBoard)
                    context.setState({dashboard:DashBoard})
                          
                  }
                  else{
                    _this.hideLoader();
                  Alert.alert("No data found")

                  }
});

xhr.open("GET", `${baseURL}/emp-three-days-attendance`);
xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);

xhr.send();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("this.state.nextProps",nextProps)
  //   console.log("nextState.nextState",nextState)
  //   return true;
  // }


 
  _refresh () {
    // you must return Promise everytime
    return new Promise((resolve) => {
      setTimeout(()=>{
        // some refresh process should come here
        this.dashboard_list_component();
        resolve(); 
      }, 10)
    })
  }

    render ()
                {
                  
                  const card = {card: {width: viewportWidth/1, height: viewportHeight,}};
                  const context=this;
                  var userObj = JSON.parse(context.props.route.params.userObj);
                  var Drawer = (context.props.route.params.Drawer);
                  console.log("Drawer",Drawer)
                  // console.log(userObj.success.user.employee.profile_picture);
                  
                  var profile_picture={uri:userObj.success.user.employee.profile_picture};
                const Options= [{Date:'Date',Status:'Status',First_Punch:'First punch',Last_Punch:'Last punch'}]
                // let attendanceTime = "09:31"
                // let [hour , min] = attendanceTime.split(':')
                // let timeToCompareHour = 9
                // let timeToCompareMinute = 30

                // if(Number(hour) > timeToCompareHour){
                //   console.log('show red')
                // }
                

                // var officeTime = new Date();
                //   officeTime.setHours(9,30,0); // 9.30 am
                //   var currentTime = new Date();
                //   currentTime.setHours(9,30,0); // 9.31 am

                //   if(currentTime >= officeTime){
                //       console.log("late!");
                //   }else{
                //       console.log("on time");
                //   }
		return(

           <View style={{height:hp('100%')}}>
                <View style={{backgroundColor:'rgb(19,111,232)',height:'13%'}}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',top:'10%',left:'30%'}}>
                  
                <Image source={Logo} style={{bottom:0,height:50,width:200,borderColor:'rgb(19,111,232)',borderWidth:1}}/>
                <Text style={{top:'4%',left:'15%',fontSize:10}}>Version 2.2.1</Text>
                  </View>
                <TouchableOpacity style={{right:'0%',top:'0%'}} onPress={() => this.dwaerButton()}>
                            {/*Donute Button Image */}
                            <Image
                              source={require('../src/Image/menu.png')}
                              style={{ width: 35, height: 35, marginLeft: 10,top:0 }}
                            />
                          </TouchableOpacity>
                </View>
                <PTRView
          //  style={{height:hp('10%')}}
            
          onRefresh={this._refresh}
        >
                   <View style={{height:hp('85%')}}>
                  

                          <Text style={{fontSize:50, color: 'black',top:hp('5%'),textAlignVertical:'center',textAlign:'center'}}>WELCOME</Text>

                         <View style={{top:hp('10%'),alignItems:'center'}}>
                         <Text style={{fontSize:30, color: 'black',alignItems: 'center',textAlignVertical:'center',textAlign:'right'}}>{userObj.success.user.employee.fullname}</Text>  
                                    </View>
                                             
                                             

                                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',top:hp('20%'),}}>
                                            <TouchableOpacity 
                                              onPress={() =>this.chekIn()}>
                                                <LinearGradient 
                                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                        colors={['#5434ff', '#21bbff']}
                                        style={styles.button1}>
                                              <Text style={{ color:'white',}}>Check In </Text>
                                              </LinearGradient>
                                              </TouchableOpacity>
                                              <TouchableOpacity 
                                                onPress={() =>this.chekOut()}>
                                                <LinearGradient 
                                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                        colors={['#5434ff', '#21bbff']}
                                        style={styles.button2}>
                                              <Text style={{ color:'white',}}>Check Out</Text>
                                              </LinearGradient>
                                                </TouchableOpacity>
                                                

                                        </View>

                                        <Text style={{textAlign:'center',top:hp('25%')}}>Last 3 Days Attendance </Text>

                                        
                            <View style={styles.dashboard_list_component}>
                            {(this.state.loading) ?
               <View style={{
                          flex:1,flexDirection:'row',width: '50%', backgroundColor: '#EFEFEF',
                          alignItems: 'center', justifyContent: 'center',
                          position: 'absolute', height:'40%',
                          shadowOffset:{  width: 100,  height: 100,  },
                          shadowColor: '#330000',
                          shadowOpacity: 0,
                          shadowRadius: 5,
                          elevation: 10,
                          
                          overflow: "hidden",
                          left:'25%',
                          top:'50%'
                      }}>

               <ActivityIndicator  size="large" color='rgb(19,111,232)' />
                       <Text style={{fontSize:15,left:10}}>Loading..</Text>
               </View>
               
               : null}
                            
                              {Options.map((item) => {
                                return(
                                  <View style={{width:'100%',flexDirection:'row',justifyContent:'space-around'}}>
                                      <Text style={{width:'25%',fontWeight:'bold'}}>{item.Date}</Text>
                                      
                                      <Text style={{width:'23%',fontWeight:'bold'}}>{item.First_Punch}</Text>
                                      <Text style={{width:'23%',fontWeight:'bold'}}>{item.Last_Punch}</Text>
                                    </View>
                                ); })}
                                 {this.state.dashboard.map((item) => {
                                   console.log(item.first_punch.substring(0,5))
                                              let attendanceTime = item.first_punch.substring(0,5)
                                                let [hour , min] = attendanceTime.split(':')
                                                let timeToCompareHour = 9
                                                let timeToCompareMinute = 30

                                                if(Number(hour) > timeToCompareHour){
                                                  console.log('show red')
                                                }else if(Number(hour) == timeToCompareHour){
                                                  if(Number(min) > timeToCompareMinute){
                                                    console.log('show red')
                                                  }else {
                                                    console.log('show green')
                                                  }
                                                }else {
                                                  console.log('show green')
                                                }
                                   
                                return(
                                  <View style={{flexDirection:'row',justifyContent:'space-around',width:'100%'}}>
                                    <Text style={{left:'0%',width:'25%'}}>{item.on_date}</Text>
                                    
                                    <Text style={[
                                           (Number(hour) > timeToCompareHour)?styles.present : styles.data_sec &&  (Number(min) > timeToCompareMinute) ? styles.present : styles.data_sec && (item.first_punch == "N/A" ? styles.n_a : styles.data_sec)
                                    ]}>{item.first_punch}</Text>
                                    <Text style={[
                                      (item.last_punch == "N/A" ? styles.n_a : styles.data_sec)
                                    ]}>{item.last_punch}</Text>
                                  </View>
                                );
                                 })}
                             
                            </View>
                                       
                                            

            <Text style={{top:hp('25%') ,fontSize:10,textAlign:'center'}}>© Copyright 2020 XEAM Ventures Pvt. Ltd. All Rights Reserved</Text>
       
        </View>
        </PTRView>
        </View>
      );
    }
  }
  

  const styles = StyleSheet.create({
    present:{backgroundColor:'red',borderRadius:5,color:'white',overflow: "hidden",paddingLeft:5,paddingRight:5,width:'23%',textAlign:'center'},
    data_sec:{backgroundColor:'green',color:'white',borderRadius:5,overflow: "hidden",paddingLeft:5,paddingRight:5,width:'23%',textAlign:'center'},
    n_a:{backgroundColor:'#adadad',color:'white',borderRadius:5,overflow: "hidden",paddingLeft:5,paddingRight:5,width:'23%',textAlign:'center'},
    // data_sec:{
    //   top:0,
    //   alignItems:'center',
    //   left:'32%',
    //   backgroundColor:'green',
    //   color:'red'
    // },
    button1: {
              
             
              flex:0,
              margin: 0,

              left: 0,
              alignItems: 'center',
              justifyContent: 'center',

              marginTop:0,
              marginBottom:'0%',
              marginRight:10,
              paddingTop:25,
              paddingBottom:25,
              paddingLeft:40,
              paddingRight:40,
               backgroundColor:'rgb(19,111,232)',
              
              borderRadius:10,
              borderWidth: 1,
              borderColor: 'transparent',
              elevation: 0,
              overflow: "hidden"
            },
    button2: {
      
      

              flex:0,
              margin: 0,
              marginTop:0,
              marginLeft:0,
              marginRight:0,
              marginBottom:'0%',
              right:0,

              alignItems: 'center',
              justifyContent: 'center',
              marginLeft:10,
              paddingTop:25,
              paddingBottom:25,
              paddingLeft:40,
              paddingRight:40,
               backgroundColor:'rgb(19,111,232)',
               
              borderRadius:10,
              borderWidth: 1,
              borderColor: 'transparent',
              elevation: 0,
              overflow: "hidden"
            },
  separator: {
              marginVertical: 8,
              borderBottomColor: '#2B2929',
              borderBottomWidth: StyleSheet.hairlineWidth,
          },
  container: {
              flex: 0,
              flexDirection: 'row',
              alignItems: 'center',
          },
  btnEye: {
              position: 'absolute',
              top: 20,
              right: 28,
          },
  icon: {
            top:10,
            width: 100,
            height: 100,
            // tintColor: "black",
        },
  dashboard_list_component:{
              margin:10,
              top:hp('25%'),
              flexDirection:'column',
              justifyContent: 'space-around',
              //   alignItems: 'stretch',
              borderRadius: 5,
              borderTopWidth: 1.5,
              borderBottomWidth:1.5,
              borderRightWidth:1.5,
              borderLeftWidth:1.5,
              backgroundColor:'#ffffff',
              borderColor: '#ffffff',
              // shadowOffset:{  width: 0,  height: 0,  },
              shadowColor: '#330000',
              paddingTop:10,
              paddingBottom:10,
              width:'95%',
              height:'30%',
            
                shadowOpacity: 0,
                shadowRadius: 0,
                elevation: 10,
              overflow: "hidden"
        }

  });
