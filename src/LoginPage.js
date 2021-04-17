import React, {Component} from 'react';
import {
  AsyncStorage, View, StyleSheet,
  Text, KeyboardAvoidingView, TouchableOpacity,
  Alert, Dimensions, Keyboard, Linking,
  Platform, BackHandler, ToastAndroid, Image
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import ActionModal from 'react-native-modal';
import RNExitApp from 'react-native-exit-app';
import {connect} from 'react-redux';
import DeviceInfo, {getDeviceId} from 'react-native-device-info';
// import AsyncStorage from '@react-native-community/async-storage';
//import firebase  from './firebase';
import RNFirebase from '@react-native-firebase/app';
import firebase from './firebase';
import messaging from '@react-native-firebase/messaging';
import LinearGradient from 'react-native-linear-gradient';
import Logo from './header_sec';
import {login, extractBaseURL} from './api/BaseURL';
import {getWidthnHeight, Input, Spinner, CommonModal, IOS_StatusBar, RadioEnable, RadioDisable} from './KulbirComponents/common';
import {sendProps} from './actions';
//import { RadioButton } from 'react-native-simple-radio-button';

// import { Notifications, NotificationAction, NotificationCategory } from 'react-native-notifications'
let count = 0;
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class LoginPage extends Component {

  // static DrawerNavigator = {
  //                             header: null,
  //                             drawerLockMode: 'locked-closed',
  //                             edgeWidth: 0,
  //                             disableGestures: true
  //                           };
  	constructor(props){
    super(props)
    
		this.state={
          			employee_code:'',
          			userPassword:'',
                device_id: null,
                device_type:'',
                loading: false,
                name:'',
                code:'',
                permissions:'',
                counter:0,
                baseURL: null, 
                userObj: null,
                token: null,
                reload: false,
                showTip: false,
                showPassword: false,
                errorCode: null,
                apiCode: null,
                commonModal: false,
                clickCount: null,
                selectServerModal: false,
                testServer: false,
                serverLink: 'http://www.erp.xeamventures.com/api/v1',
                }
           }
           
    componentDidMount(){
      const {navigation} = this.props;
      //Alert.alert("ALERT 3");
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this))
        this._unsubscribe = navigation.addListener("didFocus", async() => {
          //console.log("PLEASE LOGIN: ", DeviceInfo.getUniqueId())
          this.initialize();
        })
    }
    
    UNSAFE_componentWillUnmount(){
      this._unsubscribe().remove();
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this))
    }

    handleBackButton(){
        ToastAndroid.show('Not Allowed', ToastAndroid.SHORT);
      return true;
    }

    async initialize(){
      //Alert.alert("ALERT 4");
        await this.device_type();
        
        if(Platform.OS === 'ios'){
          this.checkiOSPermission().done();
        }else if(Platform.OS === 'android'){
          await this.requestUserPermission();
        }
    }

    // async requestUserPermission() {
    //   const authStatus = await messaging().requestPermission();
    //   const enabled =
    //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
    //   if (enabled) {
    //     console.log('Authorization status:', authStatus);
    //     const token = await messaging().getToken();
    //     this.setState({device_id: token})
    //     this.value();
    //   }
    // }

    requestUserPermission = async () => {
      //Alert.alert("ALERT 5");
      await firebase.messaging().registerDeviceForRemoteMessages();
      const token = await firebase.messaging().getToken();
      this.setState({device_id: token})
      this.value();
    }

   showAlert = (title, message) => {
   Alert.alert(
     'Xenia',
     'Update your App',
     [
       {text: 'Update', onPress: () => this.update()},
     ],
     {cancelable: false},
   );
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

device_type(){
  const deviceInfo2 = DeviceInfo.getSystemName();
  this.setState({device_type : deviceInfo2}, () => console.log('DEVICE TYPE: ', deviceInfo2));
}

   value_thrd= async()=>{
      console.log("iOS Detected*****")
      //await messaging().registerDeviceForRemoteMessages();
      await firebase.messaging().requestPermission().then(async(success) => {
        console.log("IOS ACK: ", Boolean(success))
        const token = await firebase.messaging().getToken()
        //this.setState({device_id : DeviceInfo.getUniqueId()})
        this.setState({device_id : token}, () => {
          console.log("IOS TOKEN: ", this.state.device_id)
          if(this.state.device_id){
            this.value();
          }
        })
      }).catch((error) => {
        console.log("IOS NACK: ", Boolean(error))
        Alert.alert("Request TimeOut. \n To Allow: \n Goto Settings -> Xenia -> Notifications -> Allow Notifications \n Afterwards, clear app from background and try again.")
        RNExitApp.exitApp();
      })
  }

async value(){
    const promiseEmpCode = AsyncStorage.getItem('user');
    const promisePassword = AsyncStorage.getItem('user_pass');
    const promiseToken = AsyncStorage.getItem('userObj');
    
    Promise.all([promiseEmpCode, promisePassword, promiseToken]).then((values) => {
      const empCode = values[0];
      const password = values[1];
      const userObj = values[2];
      this.setState({employee_code: empCode});
      this.setState({userPassword: password});
      this.setState({token: userObj})
      const {employee_code, userPassword, token, device_id, device_type} = this.state;
      console.log("^^^^^^^USERNAME and PASSWORD: ", employee_code, userPassword, "\n", device_type, device_id)
    
      if(typeof token === "string"){
        console.log("^^^^^^TOKEN AVAILABLE")
        this.props.sendProps(token)
        Actions.main();
        return;
      }
    }).catch((error) => {
      Alert.alert(error);
    })
}

popup=()=>{

  Alert.alert(
'save user name and Password',
'',
[
 {
   text: 'Cancel',
   onPress: () => console.log('Cancel Pressed'),
   style: 'cancel',
 },
 {text: 'OK',  onPress:()=>this.value().done()},
],
{cancelable: false},
);
}

checkiOSPermission = async () => {
  const enabled = await firebase.messaging().hasPermission();
    console.log("PROMISE CHECK: ", enabled)
    if(enabled){
          this.value_thrd();
      } else {
          this.requestiOSPermission();
      }
}

requestiOSPermission = async () => {
    await firebase.messaging().requestPermission()
    .then(() => {
      this.checkiOSPermission();
    })
    .catch((error) => {
      console.log("REQUEST PERMISSION: ", error)
      // User has rejected permissions 
    })
}

// messageListener = async () => {
//   this.notificationListener = firebase.notifications().onNotification((notification) => {
//       const { title, body } = notification;
//       this.showAlert(title, body);
//   });

//   this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
//       const { title, body } = notificationOpen.notification;
//       this.showAlert(title, body);
//   });

//   const notificationOpen = await firebase.notifications().getInitialNotification();
//   if (notificationOpen) {
//       const { title, body } = notificationOpen.notification;
//       this.showAlert(title, body);
//   }

//   this.messageListener = firebase.messaging().onMessage((message) => {
//     console.log(JSON.stringify(message));
//   });
// }

    hideLoader = () => {
                this.setState({ loading: false });
              }

    showLoader = () => {
              this.setState({ loading: true });
            }

  	login = async() =>{
// console.log(isLoading);
      console.log("I am inside login()")
  		const {employee_code,userPassword,isLoading,device_id,device_type, baseURL} = this.state;
  	//	let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

  		if(employee_code==""){
                            console.log("emp code is empty")
                      			//alert("Please enter Email address");
                      		  // this.setState({employee:'Please enter Employee id'})
                            // this.setState({ isLoading: true });
                            let employee='Please enter Employee id';
                            Alert.alert(employee);
  		                      }

      else if(userPassword==""){
                                console.log('abc')
                              this.setState({userPassword:'Please enter Password'})
                              // this.setState({ isLoading: true });
                                Alert.alert("INVAILD ID");
                              }

  		else {
              console.log("I am going to call login api")
              var data = JSON.stringify({
      				// we will pass our input data to server
      				employee_code: this.state.employee_code,
      				password: this.state.userPassword,
              device_id: this.state.device_id,
              device_type: this.state.device_type,
  			      })

    console.log(device_id);
    console.log(device_type);
    const _this = this;
    this.showLoader();
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.timeout = 60000;
    const context=this;
      xhr.addEventListener("readystatechange", async () => {
                                          console.log(xhr.status)
                                          console.log(xhr.readyState)
                                          if (xhr.readyState !== 4) {
                                                                      return;
                                                                    }
                                          if (xhr.status === 200) {
                                            _this.hideLoader();
                                            console.log("Successfully200")
                                            _this.props.sendProps(xhr.responseText);
                                            const data = JSON.parse(xhr.responseText);
                                            //console.log("HELLO :", data.success.base_url)

                                            //IMPORTANT LINK - DO NO DELETE
                                            //********Central DB XEAM BPO - Uncomment this line to use********//
                                            //await AsyncStorage.setItem('receivedBaseURL', data.success.base_url)

                                            //TO SHIFT THE APP TO Central DB XEAM BPO - Comment this line
                                            if(this.state.testServer){
                                              AsyncStorage.setItem('receivedBaseURL', 'http://www.erp.xeambpo.com/api/v1');
                                            }else{
                                              AsyncStorage.setItem('receivedBaseURL', 'http://www.erp.xeamventures.com/api/v1');
                                            }
                                            AsyncStorage.setItem('user',employee_code);
                                            AsyncStorage.setItem('user_pass',userPassword);
                                            AsyncStorage.setItem('user_token',xhr.responseText);
                                            AsyncStorage.setItem('userObj',xhr.responseText);
                                            Actions.main();
                                            // await extractBaseURL().then((baseURL) => {
                                            //   _this.setState({baseURL}, () => console.log("EXTRACT LINK: ", _this.state.baseURL))
                                            // })
                                            //_this.receivedBaseURL();
                                            // console.log("login", xhr.responseText, "EMPLOYER: ", user)
                                          }else if (xhr.status === 401){
                                            var json_obj = JSON.parse(xhr.responseText);
                                            var login_error = json_obj.error;
                                            console.log("json_obj",xhr.responseText)
                                            console.log("login_error",login_error)
                                            Alert.alert(login_error);
                                            _this.hideLoader();
                                          }
                                          else {
                                            _this.hideLoader();
                                            console.log('RPT Error: ', this.responseText);
                                            _this.enableModal(xhr.status, "107");
                                          }
                                          // if (xhr.status === 500){
                                          //   _this.hideLoader();
                                          //   Alert.alert("Internal Server Error")
                                          // }if (xhr.status === 401){
                                          //   var json_obj = JSON.parse(xhr.responseText);
                                          //   var login_error = json_obj.error;
                                          //   console.log("json_obj",xhr.responseText)
                                          //   console.log("login_error",login_error)
                                          //   Alert.alert(login_error);
                                          //   _this.hideLoader();
                                          // }
//                                           else {
//
//                                             var json_obj = JSON.parse(xhr.responseText);
//                                             var login_error = json_obj.error;
//                                              console.log("json_obj",xhr.responseText)
//                                              console.log("login_error",login_error)
//                                             Alert.alert(login_error);
//                                               _this.hideLoader();
//                                           }
                                          // else{
                                          //   var json_obj = JSON.parse(xhr.responseText);
                                          
                                          //   Alert.alert(json_obj);
                                          //     _this.hideLoader();
                                          // }
                                        });

                        xhr.open("POST", `${this.state.serverLink}/login`);
                        xhr.setRequestHeader("accept", "application/json");
                        xhr.setRequestHeader("content-type", "application/json");
                        xhr.send(data);
                          		
                          	}
                          }

  enableModal(status, apiCode){
    this.setState({errorCode: status})
    this.setState({apiCode})
    this.setState({commonModal: true})
  }

  onDecline(){
    this.setState({commonModal: false})
  }

  receivedBaseURL = async() =>{
    console.log("I am inside receivedBaseURL()")
    const {employee_code, userPassword, isLoading, device_id, device_type, baseURL} = this.state;

      console.log("About to call Second Login API", employee_code, userPassword, device_id, device_type, baseURL)
      var data = JSON.stringify({
        employee_code: employee_code,
        password: userPassword,
        device_id: device_id,
        device_type: device_type,
      })
      const _this = this;
      this.showLoader();
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.timeout = 60000;
      const context=this;
      xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState !== 4) {
          return;
        }
        if (xhr.status === 200) {
          _this.hideLoader();
          _this.props.sendProps(xhr.responseText);
          console.log("***RECEIVED BASEURL - Successfully200: ", baseURL)
          AsyncStorage.setItem('user',employee_code);
          AsyncStorage.setItem('user_pass',userPassword);
          AsyncStorage.setItem('user_token',xhr.responseText);
          AsyncStorage.setItem('userObj',xhr.responseText);
          const data = JSON.parse(xhr.responseText);
          const user = data.success.project;
          console.log("Login: ", xhr.responseText, "EMPLOYER: ", user)
          Actions.main();
        }if (xhr.status === 500){
          _this.hideLoader();
          Alert.alert("Internal Server Error")
        }if (xhr.status === 401){
            var json_obj = JSON.parse(xhr.responseText);
          var login_error = json_obj.error;
            console.log("json_obj",xhr.responseText)
            console.log("login_error",login_error)
          Alert.alert(login_error);
            _this.hideLoader();
          }
        });
        xhr.open("POST", `${baseURL}/login`);
        xhr.setRequestHeader("accept", "application/json");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(data);    
      }

  hide =()=>{
            const a= Keyboard.dismiss();
          }
  functionCombined() {
    this.setState({selectServerModal: false})
    if(this.state.employee_code && this.state.userPassword){
      this.login();
      this.hide();
    }else {
      Alert.alert("Please enter both credentials")
    }
  }

  developerMode(){
    const {employee_code, userPassword} = this.state;
      if(employee_code && userPassword){
        this.setState({selectServerModal: true})
      }else{
        Alert.alert("Please enter both credentials")
      }
  }


  render () {
          //this.initializeFirebase();
          //Alert.alert("ALERT 1");
          const {employee_code, userPassword, errorCode, apiCode, selectServerModal} = this.state;
          const {navigate} = this.props.navigation;
          const card = {card: {width: '100%', height: '100%',backgroundColor: '#edeceb'}};
          let gradientShadow = ['#0D4EBA', '#197EC4'];
          let gradient = ['#E7E7E7', '#E7E7E7']
          const circleWidth = getWidthnHeight(70)
          const circleHeight = {height: circleWidth.width}
          console.log("APP MODE: ", __DEV__);
          //console.log("device_type", this.state.device_type);
          //console.log("REDUX PROPS: ", this.props)
          //Alert.alert("ALERT 2");
  return (
        <View style={{alignItems: 'center', backgroundColor: '#E7E7E7', flex: 1}}>
          <KeyboardAvoidingView behavior="position" style={{flex: 1}} keyboardVerticalOffset={(Platform.OS === 'android' ? -100: -120)}>
          <View style={[{borderColor: 'black', borderWidth: 0}, getWidthnHeight(undefined, 20)]}>
            <Logo/>
          </View>
          <View style={{alignItems: 'center'}}>

              <View style={styles.logintext}>
                <Text style={styles.title}>LOGIN</Text>
              </View>

              <ActionModal 
                isVisible={selectServerModal}
                style={{justifyContent: 'center', alignItems: 'center'}}
                avoidKeyboard={true}
                onBackdropPress={() => this.setState({selectServerModal: false})}
              >
                <View style={[{backgroundColor: 'white', alignItems: 'center', borderRadius: 300, overflow: 'hidden'}, circleWidth, circleHeight]}>
                  <View style={[{backgroundColor: '#1079D5', justifyContent: 'center', alignItems: 'center', overflow: 'hidden'}, getWidthnHeight(70, 10)]}>
                    <Text style={{textAlign: 'center', color:'white', textAlignVertical: 'center', overflow: 'hidden'}}>Please Select</Text>
                  </View>
                  <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <View style={{justifyContent: 'center', borderColor: 'black', borderWidth: 0}}>
                      {(this.state.testServer) ?
                        <View style={[{borderColor: 'red', borderWidth: 0, justifyContent: 'space-evenly', alignItems: 'center'}, getWidthnHeight(60, 15)]}>
                          <RadioEnable title="Test Server" onPress={() => this.setState({testServer: true})}/> 
                          <RadioDisable title="Live Server" onPress={() => this.setState({testServer: false, serverLink: 'http://www.erp.xeamventures.com/api/v1'})}/>
                        </View>
                      :
                        <View style={[{borderColor: 'red', borderWidth: 0, justifyContent: 'space-evenly', alignItems: 'center'}, getWidthnHeight(60, 15)]}>
                          <RadioDisable title="Test Server" onPress={() => this.setState({testServer: true, serverLink: 'http://www.erp.xeambpo.com/api/v1'})}/>
                          <RadioEnable title="Live Server" onPress={() => this.setState({testServer: false})}/>
                        </View>
                      }
                    </View>
                      <TouchableOpacity onPress={() => this.functionCombined()} style={[{justifyContent: 'center', alignItems: 'center',borderColor: '#1079D5', borderWidth: 2, borderRadius: 10}, getWidthnHeight(20, 5)]}>
                        <Text style={[{color: '#1079D5', fontWeight: 'bold', textAlignVertical: 'center', textAlign: 'center'}, getWidthnHeight(15)]}>Go</Text>
                      </TouchableOpacity>
                  </View>
                </View>
              </ActionModal>
              <View style={[styles.loginCard, getWidthnHeight(80, 40)]}>
                <View style={[{flexDirection: 'column', alignItems: 'center', borderWidth: 0, borderColor: 'red'}, getWidthnHeight(80)]}>
                  <View style={[{flexDirection: 'row', alignItems: 'center', borderColor: 'black', borderWidth: 0, marginBottom: 30}, getWidthnHeight(undefined, 7)]}>
                    <Image source={require('./Image/avatar.png')} style={{borderColor: 'black', borderWidth: 0, width: 25, height: 25}}/>
                    <View>
                      <Input 
                        updateContainer={[{borderWidth: 0, borderColor: 'red'}, getWidthnHeight(60)]}
                        style={[{paddingLeft: 10, paddingRight: 10, flex: null, borderColor: '#D3D3D3', borderWidth: 1, backgroundColor: '#D3D3D3', borderRadius: 10, fontSize: (employee_code)? 14 : 12}, getWidthnHeight(55, 6)]}
                        value={this.state.employee_code}
                        onChangeText={employee_code => this.setState({ employee_code })}
                        placeholder='Employee Code'
                        autoCorrect={false}
                        autoCapitalize={'none'}
                      />
                    </View>
                  </View>
                  <View style={[{flexDirection: 'row', alignItems: 'center', borderWidth: 0, borderColor: 'black'}, getWidthnHeight(undefined, 7)]}>
                    <Image source={require('./Image/padlock.png')} style={{borderColor: 'black', borderWidth: 0, width: 25, height: 25}}/>
                    <View style={{borderWidth: 0, borderColor: 'black'}}>
                      <Input
                        updateContainer={[{borderWidth: 0, borderColor: 'red'}, getWidthnHeight(60)]}
                        style={[{paddingLeft: 10, paddingRight: 10, flex: null, borderColor: '#D3D3D3', borderWidth: 1, backgroundColor: '#D3D3D3', borderRadius: 10, fontSize: (userPassword)? 14 : 12}, getWidthnHeight(55, 6)]}
                        value={this.state.userPassword}
                        onChangeText={userPassword => this.setState({ userPassword })}
                        placeholder='Password'
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        secureTextEntry={(!this.state.showPassword)? true : false}
                      />
                      <View style={[{position: 'absolute', alignSelf: 'flex-end', borderColor: 'black', borderWidth: 0}, getWidthnHeight(undefined, 7)]}>
                        {(!this.state.showPassword) ?
                        <View style={[{flexDirection: 'row', alignItems: 'center'}, getWidthnHeight(undefined, 7)]}>
                          <TouchableOpacity onPress={() => this.setState({showPassword: true})}>
                            <Image source={require('./Image/visibilityOff.png')} style={{marginRight: 10, width: 20, height: 20}}/>
                          </TouchableOpacity>
                        </View>
                        :
                        <View style={[{flexDirection: 'row', alignItems: 'center'}, getWidthnHeight(undefined, 7)]}>
                          <TouchableOpacity onPress={() => this.setState({showPassword: false})}>
                            <Image source={require('./Image/visibility.png')} style={{marginRight: 10, width: 20, height: 20}}/>
                          </TouchableOpacity>
                        </View>
                        }
                      </View>
                    </View>
                  </View>
                </View>

                {(this.state.loading) ? <Spinner loading={this.state.loading} style={styles.loadingStyle}/> : null}

                <TouchableOpacity onPress={() =>{
                    this.developerMode();
                    //this.functionCombined()
                  }} 
                  style={{borderColor: 'black', borderWidth: 0}}>
                  <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 0}}>
                    <LinearGradient 
                      start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                      colors={['#0E57CF', '#25A2F9']}
                      style={[styles.button, getWidthnHeight(40, 7)]}>
                      <Text style={[{color:'white',fontWeight:'bold', textAlign: 'center'}, getWidthnHeight(20)]}>LOGIN</Text>
                    </LinearGradient>
                  </View>
                </TouchableOpacity>
              </View>
                                                  {/* {<TouchableOpacity
                                            activeOpacity={0.7}
                                      style={styles.btnEye}
                                      onPress={this.showPass}>
                                          </TouchableOpacity> */}
                                      
                                      
              </View>
                                    {(Platform.OS === 'ios') ?
                                      <View style={{alignItems: 'center'}}>
                                        <View style={[{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20, alignItems: 'center'}, getWidthnHeight(25)]}>
                                          <Text style={{fontSize: 14}}>Tip</Text>
                                          <TouchableOpacity onPress={() => this.setState({showTip: !this.state.showTip})}>
                                            {(!this.state.showTip) ?
                                              <Text style={[{color: '#0E9ADB', fontWeight: 'bold', fontSize: 14}, getWidthnHeight(15)]}>Show</Text>
                                            :
                                              <Text style={[{color: '#0E9ADB', fontWeight: 'bold', fontSize: 14}, getWidthnHeight(15)]}>Hide</Text>
                                            }
                                          </TouchableOpacity>
                                        </View>
                                      </View>
                                      : null
                                    }
                                      {(this.state.showTip) ?
                                      <View style={{alignItems: 'center', marginTop: 10}}>
                                        <Text style={{color:"#D83707", fontWeight: 'bold'}}>iOS Manual Permissions</Text>
                                        <Text style={{marginTop: 10, textAlign: 'center'}}>{`${"Goto Settings -> Xenia -> Notifications -> Allow Notifications(ON). \n \n Afterwards, clear the app from background and try again."}`}</Text>
                                        <Text style={{color:"#D83707", marginTop: 10, fontWeight: 'bold'}}>To be used if Request TimeOut Alert pops-up.</Text>
                                      </View>
                                      : null
                                      }
                                      <CommonModal 
                                          title="Login Failed! Please check your internet connection."
                                          subtitle= {`Error Code: ${errorCode}${apiCode}`}
                                          visible={this.state.commonModal}
                                          onDecline={this.onDecline.bind(this)}
                                          buttonColor={['#0E57CF', '#25A2F9']}
                                      />
            </KeyboardAvoidingView>
          </View>
    );
  }
}


const styles = StyleSheet.create({
        logintext: {
                    alignItems:'center',
                    marginBottom:0,
                    marginTop: -10
                   },
        title: {
                  textAlign:'center',
                  color: 'rgb(19,111,232)',
                  fontSize: 38,
                  marginBottom: 20
                  // fontWeight: 'bold',
                },
        button: {
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  shadowColor: '#000000',
                  elevation: 7
                },
        buttonShadow: {
                  marginTop: 10,
                  marginLeft: 0,
                  borderTopLeftRadius: 50,
                  borderBottomRightRadius: 50
                },
  pagecomponent: {
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:'#ffffff',
                borderRadius: 10,
                borderTopWidth: 1.5,
                borderBottomWidth:1.5,
                borderRightWidth:1.5,
                borderLeftWidth:1.5,
                borderColor: '#ffffff',
                width:viewportWidth/1.2,
                height: '60%',
                // shadowOffset:{  width: 100,  height: 100,  },
                shadowColor: '#330000',
                shadowOpacity: 0,
                // shadowRadius: 0,
                elevation: 5,
              },
  separator: {
              marginVertical: 8,
              borderBottomColor: '#2B2929',
              borderBottomWidth: StyleSheet.hairlineWidth,
            },
  container: {
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#edeceb'
            },
  btnEye: {
            position: 'absolute',
            top: 20,
            right: 28,
          },
  iconEye: {
            width: 50,
            height: 50,
            tintColor: "black",
          },
  loginCard: {
            backgroundColor: 'white', 
            borderRadius: 10, 
            alignItems: 'center', 
            borderColor: 'black', 
            borderWidth: 0, 
            shadowColor: '#000000',
            elevation: 10,
            justifyContent: 'space-evenly'
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
// export default LoginPage;
const LoginPageComponent = connect(null, {sendProps})(LoginPage);
export default LoginPageComponent;