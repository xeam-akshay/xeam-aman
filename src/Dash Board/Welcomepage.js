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
  Platform,
  StatusBar,
  BackHandler,
  ToastAndroid
} from 'react-native';
import {connect} from 'react-redux';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,
} from 'react-native-card-view';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Base_url from '../Base_url';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';
import PTRView from 'react-native-pull-to-refresh';
// import AsyncStorage from '@react-native-community/async-storage';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Button from 'react-native-button';
import CustomHeader from '../Header';
import CameraPage from '../Attendance Module/CameraPage';
//import Monthlyreport from '../Attendance Management/My_Attendance';
import Logo from '../Image/logo.png';
import AartiDrugs from '../Image/AartiLogo-128.png'
import abc from '../ExpandableViewSeparate';
import Header_drawer from '../header_width_drawer';
// import firebase from 'react-native-firebase';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { getWidthnHeight, MenuIcon, GradientText, WaveHeader, fontSizeH4, version, CommonModal, IOS_StatusBar, Spinner} from '../KulbirComponents/common';
import {extractBaseURL} from '../api/BaseURL';
import { Actions } from 'react-native-router-flux';
import { parse } from 'xdate';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

// const notifications = firebase.notifications();

class Welcomepage extends Component {
  // static navigationOptions = {
  //     headerBackground:<View style={{alignItems:'center',justifyContent:'center'}}><Image source={Logo} style={{height:30,width:120,marginTop:20,}}/></View>,

  //                 };

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
                                project: "1",
                                dimensions: undefined,
                                logo: undefined,
                                baseURL: null,
                                errorCode: null,
                                apiCode: null,
                                commonModal: false,
                                header: undefined
                              }
                              this._refresh = this._refresh.bind(this);
  }
//Runs the functions once when the screen shows up
componentDidMount(){
 this.device_id();
 this.extractLink();
 BackHandler.addEventListener('hardwareBackPress', () => {
  //ToastAndroid.show('Not Allowed', ToastAndroid.SHORT)
  return true;
})
}

UNSAFE_componentWillUnmount(){
  BackHandler.removeEventListener('hardwareBackPress', () => {
    //ToastAndroid.show('Not Allowed', ToastAndroid.SHORT)
    return true;
  })
}

//Re-runs the functions if a different user Log(s) In
// componentDidUpdate(prevProps, prevState){
//   const lastProp = JSON.parse(prevProps.drawerProps)
//   const currentProp = JSON.parse(this.props.drawerProps)
//   const prevProject = lastProp.success.project
//   const currentProject = currentProp.success.project
//   //console.log("***PREV PROPS: ", lastProp, "\n %%%%%$$$$$ \n" , "CURRENT PROP: ", currentProp)
//   console.log("***PREV PROJECT: ", prevProject, "\n %%%%%$$$$$ \n" , "CURRENT PROJECT: ", currentProject)
//   if(prevProject !== currentProject){
//     this.device_id();
//     this.dashboard_list_component();
//   }
// }

//Hides the Loading Spinner
hideLoader = () => {
  this.setState({ loading: false });
}

//Shows the Loading Spinner
showLoader = () => {
  this.setState({ loading: true });
}

//Gets DeviceID of the users phone
device_id(){
  const deviceInfo2 = DeviceInfo.getSystemName();
  const deviceVersion = DeviceInfo.getVersion();
  //alert('deviceInfo1'+deviceInfo1);
  console.log("DEVICE INFO and VERSION: ", deviceInfo2, deviceVersion)
  this.setState({device : deviceInfo2})
  this.setState({deviceVersion : deviceVersion})
  // console.log(deviceInfo2)
}

onDecline(){
  this.setState({commonModal: false})
}

puch_notification=async()=>{
  const context=this;
  const {baseURL} = this.state;
  console.log("puch_notification")
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
    _this.setState({errorCode: xhr.status})
    _this.setState({apiCode: "002"})
    _this.setState({commonModal: true})
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

//Navigates the user to the Check In Screen                
chekIn = (gradient, project) =>{
                    console.log("I am inside chekIn")
                    console.log("THIS>PROPS: ", this.props)
                    // const _this = this;
                    // this.showLoader();
                    const context=this;
                    var userObj = JSON.parse(this.props.drawerProps);
                    var successToken={token:userObj.success.secret_token};
                    var user_id ={userid:userObj.success.user.employee.user_id}
                    var userName={fullname:userObj.success.user.employee.fullname}
                    var xyz="Check-In";
                    Actions.cameraPage({
                      successToken:successToken, 
                      button: gradient, 
                      project: project,
                      userName:userName,
                      user_id:user_id,
                      xyz:xyz
                    });
                    // context.props.navigation.navigate("cameraPage",{successToken:successToken, button: gradient, project: project});
                    // context.props.navigation.navigate("cameraPage",{userName:userName});
                    // context.props.navigation.navigate("cameraPage",{user_id:user_id});
                    // var xyz="Check-In";
                    // context.props.navigation.navigate("cameraPage",{xyz:xyz});
                  }

//Navigates the user to the Check Out Screen                  
  chekOut = (gradient, project) =>{
                    console.log("I am inside checkOutPage")
                    // const _this = this;
                    // this.showLoader();
                    const context=this;
                    var userObj = JSON.parse(this.props.drawerProps);
                    var successToken={token:userObj.success.secret_token};
                    var user_id ={userid:userObj.success.user.employee.user_id}
                    var userName={fullname:userObj.success.user.employee.fullname}
                    var xyz="Check-Out";
                    Actions.CheckOut({
                      successToken:successToken, 
                      button: gradient, 
                      project: project,
                      userName:userName,
                      user_id:user_id,
                      xyz:xyz
                    });
                    // context.props.navigation.navigate("CheckOut",{successToken:successToken, button: gradient, project: project});
                    // context.props.navigation.navigate("CheckOut",{userName:userName});
                    // context.props.navigation.navigate("CheckOut",{user_id:user_id});
                    // var xyz="Check-Out";
                    // context.props.navigation.navigate("CheckOut",{xyz:xyz});
                  }
otherPage = () => {
                    const context=this;
                    var userObj = JSON.parse(this.props.drawerProps);
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
//Open or Closes the Drawer Menu                
dwaerButton(){
  const context=this;
  context.props.navigation.toggleDrawer();
  this._onItemPressed.bind(this);
}
// UNSAFE_componentWillMount(){
  
// }
async extractLink(){
  await extractBaseURL().then((baseURL) => {
    this.setState({baseURL}, () => {
      const {baseURL} = this.state;
      console.log("EXTRACT LINK: ", baseURL)
      if(baseURL){
        this.dashboard_list_component()
      }
    })
  })
}

//Fetches the Last 3 Days attendance data
dashboard_list_component=async()=>{
  const _this = this;
  const {baseURL} = this.state;
  this.showLoader();
  const context=this;
  console.log("dashboard_list_component", `${baseURL}/emp-three-days-attendance`)
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  console.log("WELCOME: ", permissions_fir)
  var permissions_sec=permissions_fir.success.secret_token;
  if(permissions_fir.success.project === "Aarti Drugs Ltd"){
    this.setState({project: "2"}, () => console.log("AARTI: ", this.state.project))
  }else{
    this.setState({project: "1"}, () => console.log("XEAM: ", this.state.project))
  }
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
                    _this.setState({errorCode: xhr.status})
                    _this.setState({apiCode: "003"})
                    _this.setState({commonModal: true})
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

  //Evaluates which Logo is to be displayed (XEAM or AARTI)
  renderLogo(employer) {
    switch(employer){
      case "1": //XEAM
        return <Image source={Logo} style={{bottom:10,height:50,width:200,borderColor:'rgb(19,111,232)',borderWidth:1}}/>
      case "2": //AARTI DRUGS
        const AartiLogoWidth = getWidthnHeight(25);
        const height = {height: AartiLogoWidth.width - 20}
        console.log("****LIFE: ", AartiLogoWidth, height)
        return <Image source={AartiDrugs} style={[AartiLogoWidth, height]}/>
      default:
        return <Image source={Logo} style={{bottom:10,height:50,width:200,borderColor:'rgb(19,111,232)',borderWidth:1}}/>;
    }
  }

  //Evaluates which Header is to be shown for XEAM and AARTI
  renderHeader(project, dimensions, logoMargin, aartiLogo){
    switch(project){
      case "1": //XEAM HEADER
        return (
          <WaveHeader
            wave={false} 
            logo={require('../Image/Logo-164.png')}
            menu='white'
            //version={`Version ${this.state.deviceVersion}`}
          />
        );
      case "2": //AARTI DRUGS HEADER
        return (
          <View>
            <View style={[styles.aartiLogo, getWidthnHeight(100, 15)]} onLayout={this.onLayout}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#F03030', '#E1721D']} style={[styles.linearGradient, getWidthnHeight(100, 15)]}>
                <View style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}, dimensions]}>
                  {(dimensions) ?
                  <View style={[{borderColor: 'black', borderWidth: 0}, getWidthnHeight(30)]}>
                    <TouchableOpacity style={{right:'0%',top:'0%'}} onPress={() => this.dwaerButton()}>
                    {/*Donute Button Image */}
                    <MenuIcon boundary={aartiLogo} color="white"/>
                    </TouchableOpacity>
                  </View>
                  : null
                  }
                  <View style={[styles.logo, getWidthnHeight(35, 15)]} onLayout={this.logoLayout}>
                    <View style={{alignItems: 'center', borderColor: 'black', borderWidth: 0, flex: 1, justifyContent: 'center'}}>
                      {this.renderLogo(project)}
                    </View>
                  </View>
                  <View style={[{width: 50, height: 50, borderColor: 'black', borderWidth: 0}, getWidthnHeight(30)]}/>
                </View> 
                
                
            </LinearGradient>
            
            </View>
          </View>
        )
        default:
          return null;
    }
  }

  //Calculates the Dimensions for Header based on users device dimension

  headerLayout = (event) => {
    if(this.state.header){
      return;
    }
    let width = Math.round(event.nativeEvent.layout.width)
    let height = Math.round(event.nativeEvent.layout.height)
    let data = event.nativeEvent.layout
    this.setState({header:  height})
  }

  onLayout = (event) => {
    if(this.state.dimensions){
      return;
    }
    let width = Math.round(event.nativeEvent.layout.width)
    let height = Math.round(event.nativeEvent.layout.height)
    let data = event.nativeEvent.layout
    this.setState({dimensions: {width, height}})
  }

  //Calculates the Dimensions for Logo based on users device dimension
  logoLayout = (event) => {
    if(this.state.logo){
      return;
    }
    let width = Math.round(event.nativeEvent.layout.width)
    let height = Math.round(event.nativeEvent.layout.height)
    let data = event.nativeEvent.layout
    console.log("LOGO: ", data)
    this.setState({logo: {width, height}})
  }

  //Evaluates the color for the WELCOME text
  renderText(project){
    switch(project){
      case "1":
        return <Text style={{fontSize:50, color: '#2667D0',textAlignVertical:'center',textAlign:'center', marginTop: 20}}>WELCOME</Text>
      case "2":
        return <GradientText title="WELCOME" style={{fontSize: 50, textAlignVertical:'center',textAlign:'center', fontWeight: null, marginTop: 20}}/>
    }
  }

    render ()
                {
                  console.log("STATUS BAR: ", getStatusBarHeight(true));
                  console.log("KULBIR: ", this.props.drawerProps);
                  let userObj = JSON.parse(this.props.drawerProps);
                  let user = userObj.success.project
                  //console.log("PROPS: ", JSON.parse(this.props.drawerProps))
                  const card = {card: {width: viewportWidth/1, height: viewportHeight,}};
                  const context=this;
                  
                  //console.log("Drawer", Drawer)
                  // console.log(userObj.success.user.employee.profile_picture);
                  
                  //var profile_picture={uri:this.props.drawerProps.success.user.employee.profile_picture};
                  const Options= [{Date:'Date',Status:'Status',First_Punch:'First Punch',Last_Punch:'Last Punch'}]
                  const totalHeight = getWidthnHeight(undefined, 100)
                  const {dimensions, logo, errorCode, apiCode} = this.state;
                  let headerDimensions = null;
                  let logoMargin = null;
                  if(dimensions){
                    headerDimensions = {width: Math.round(dimensions.width), height: Math.round(dimensions.height)}
                  }
                  if(logo){
                    logoMargin = {marginTop: ((-1) * Math.round(logo.height/2))}
                  }
                  let gradient = null;
                  let gradientShadow = null;
                  let greenGradient = null;
                  let backgroundColor = null;
                  let borderColor = null;
                  let headerHeight = null;
                  let aartiLogoDimension = getWidthnHeight(100, 15)
                  if(this.state.project === "1"){
                    gradient = ['#0E57CF', '#25A2F9']
                    gradientShadow = ['#0D4EBA', '#197EC4']
                    backgroundColor = {backgroundColor: '#3E81EF'}
                    borderColor = {borderColor: '#3E81EF'}
                  }else if(this.state.project === "2"){
                    gradient = ['#F03030', '#E1721D']
                    gradientShadow = ['#C72828', '#C86417']
                    backgroundColor = {backgroundColor: '#F06130'}
                    borderColor = {borderColor: '#F06130'}
                  }
                  if(this.state.header){
                    headerHeight = {height: totalHeight.height - this.state.header}
                    console.log("HEADER HEIGHT: ", headerHeight, user)
                  }

		return(
           <View style={{flex: 1, backgroundColor: 'white'}}>
             <IOS_StatusBar color={gradient} barStyle="light-content"/>
             <View onLayout={this.headerLayout}>
              {this.renderHeader(this.state.project, headerDimensions, logoMargin, aartiLogoDimension)}
            </View>
                <PTRView
                  //style={(user === "XEAMHO") ? {marginTop: 0} : {marginTop: 0}}
                  onRefresh={this._refresh}>
                   <View style={headerHeight}>
                  
                          {this.renderText(this.state.project)}

                        <View style={{alignItems:'center', marginVertical: 20}}>
                          <Text style={{fontSize:30, color: 'black',alignItems: 'center',textAlignVertical:'center',textAlign:'right'}}>{userObj.success.user.employee.fullname}</Text>
                        </View>
                                             
                                             
                                        <View style ={{justifyContent: 'space-evenly', flex: 1}}>
                                        <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center', marginTop: 50}}>
                                            <TouchableOpacity onPress={() =>this.chekIn(gradient, this.state.project)}>
                                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                                <LinearGradient 
                                                  start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                                  colors={gradient}
                                                  style={[styles.button, getWidthnHeight(40, 8)]}>
                                                    <Text style={[{color:'white', fontSize: 14, textAlign: 'center', fontWeight: 'bold'}, getWidthnHeight(40)]}>Check In </Text>
                                                </LinearGradient>
                                            </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() =>this.chekOut(gradient, this.state.project)}>
                                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                              <LinearGradient 
                                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                                colors={gradient}
                                                style={[styles.button, getWidthnHeight(40, 8)]}>
                                                <Text style={[{color:'white', fontSize: 14, textAlign: 'center', fontWeight: 'bold'}, getWidthnHeight(40)]}>Check Out</Text>
                                              </LinearGradient>
                                            </View>
                                            </TouchableOpacity>
                                        </View>
                                        
                            <Text style={{textAlign:'center', marginTop: 0}}>Last 3 Days Attendance </Text>

                            {(this.state.loading) ? <Spinner loading={this.state.loading} style={styles.loadingStyle}/> : null}

                            <View style={[{alignItems: 'center'}, getWidthnHeight(100)]}>
                              <View style={[{alignItems: 'center', marginTop: 0, borderColor: 'black', borderWidth: 1, borderRadius: 10}, borderColor, getWidthnHeight(95, 25)]}>
                                    <View style={[{width:'100%',flexDirection:'row',justifyContent:'space-around', borderTopLeftRadius: 10, borderTopRightRadius: 10}, backgroundColor, getWidthnHeight(95, 3)]}>
                                      <Text style={[{width:'25%', color: 'white', textAlign: 'center', textAlignVertical: 'center', borderWidth: 0, borderColor: 'black'}, fontSizeH4()]}>{Options[0].Date}</Text>
                                      <Text style={[{width:'23%', color: 'white', textAlign: 'center', textAlignVertical: 'center'}, fontSizeH4()]}>{Options[0].First_Punch}</Text>
                                      <Text style={[{width:'23%', color: 'white', textAlign: 'center', textAlignVertical: 'center'}, fontSizeH4()]}>{Options[0].Last_Punch}</Text>
                                    </View>
                                    <View style={[{flex: 1, justifyContent: 'space-evenly', borderWidth: 0, borderColor: 'black', backgroundColor: 'white', borderBottomLeftRadius: 10, borderBottomRightRadius: 10}, getWidthnHeight(94)]}>
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
                                    <View style={[{flexDirection:'row',justifyContent:'space-around',width:'100%'}, getWidthnHeight(95, 3)]}>
                                      <Text style={[{left:'0%',width:'25%', textAlign: 'center', textAlignVertical: 'center'}, fontSizeH4()]}>{item.on_date}</Text>
                                      
                                      <Text style={[
                                            (Number(hour) > timeToCompareHour)?[styles.present, fontSizeH4()] : [styles.data_sec, fontSizeH4()] &&  (Number(min) > timeToCompareMinute) ? [styles.present, fontSizeH4()] : [styles.data_sec, fontSizeH4()] && (item.first_punch == "N/A" ? [styles.n_a, fontSizeH4()] : [styles.data_sec, fontSizeH4()])
                                      ]}>{item.first_punch}</Text>
                                      <Text style={[
                                        (item.last_punch == "N/A" ? styles.n_a : styles.data_sec)
                                      ]}>{item.last_punch}</Text>
                                    </View>
                                  );
                                  })}
                              </View>
                            </View>
                          </View>                
            <View style={{alignItems: 'center', marginTop: 0}}>                               
              <Text style={{fontSize:10,textAlign:'center'}}>© Copyright 2020 XEAM Ventures Pvt. Ltd. All Rights Reserved</Text>
              <Text style={{fontSize:10, color: 'black'}}>{`Version ${this.state.deviceVersion}`}</Text>
            </View>
            </View>
            {(this.state.commonModal) ?
            <CommonModal 
                title="Something went wrong"
                subtitle= {`Error Code: ${errorCode}${apiCode}`}
                visible={this.state.commonModal}
                onDecline={this.onDecline.bind(this)}
                buttonColor={['#0E57CF', '#25A2F9']}
            />
            : null
            }
        </View>
        </PTRView>
        </View>
      );
    }
  }
  

  const styles = StyleSheet.create({
    present:{backgroundColor:'red',borderRadius:5,color:'white',overflow: "hidden",paddingLeft:5,paddingRight:5,width:'23%',textAlign:'center', textAlignVertical: 'center',},
    data_sec:{backgroundColor:'green',color:'white',borderRadius:5,overflow: "hidden",paddingLeft:5,paddingRight:5,width:'23%',textAlign:'center', textAlignVertical: 'center',},
    n_a:{backgroundColor:'#adadad',color:'white',borderRadius:5,overflow: "hidden",paddingLeft:5,paddingRight:5,width:'23%',textAlign:'center', textAlignVertical: 'center',},
    // data_sec:{
    //   top:0,
    //   alignItems:'center',
    //   left:'32%',
    //   backgroundColor:'green',
    //   color:'red'
    // },
    button: {
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              shadowColor: '#000000',
            },
    buttonShadow: {
              marginTop: 10,
              marginLeft: 0,
              borderTopLeftRadius: 50,
              borderBottomRightRadius: 50
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
  dashboard_list_component:{
              margin:10,
              flexDirection:'column',
              justifyContent: 'space-around',
              //   alignItems: 'stretch',
              borderRadius: 5,
              borderTopWidth: 1.5,
              borderBottomWidth:1.5,
              borderRightWidth:1.5,
              borderLeftWidth:1.5,
              backgroundColor:'#ffffff',
              borderColor: '#2667D0',
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
        },
        aartiLogo: {
          borderColor: 'black',
          borderWidth: 0,
          //justifyContent: 'center',
          shadowColor: 'black',
          elevation: 7,
          shadowRadius: 25,
          borderColor: '#E44C13',
          borderBottomWidth: 0,
          borderBottomLeftRadius:25,
          borderBottomRightRadius: 25
        },
        logo: {
          backgroundColor: 'white', 
          borderRadius: 10, 
          justifyContent: 'center',
          shadowColor: 'black',
          elevation: 7,
          shadowRadius: 25,
        },
        linearGradient: {
          alignItems: 'center',
          justifyContent: 'center',
          height: 95,
          borderBottomLeftRadius:25,
          borderBottomRightRadius: 25
        },
        loadingStyle: {
          shadowOffset: null, 
          shadowColor: 'black', 
          shadowOpacity: null, 
          shadowRadius: 10, 
          elevation: 5,
          backgroundColor: 'white',
          height: 60,
          borderRadius:5
        },
  });

  const mapStateToProps = (state) => {
    //console.log("***Welcome***MAP STATE TO PROPS: ", state.props.userObj)
    return {
      drawerProps: state.props.userObj
    }
  }

  export default connect(mapStateToProps)(Welcomepage);