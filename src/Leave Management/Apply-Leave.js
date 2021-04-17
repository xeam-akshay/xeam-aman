import React, {Component} from 'react';
import {
  TimePickerAndroid,
  DatePickerAndroid,
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
  ScrollView,
  SafeAreaView,
  TextInput, 
  Platform,
  LayoutAnimation,
  Keyboard
} from 'react-native';
import KeyboardShift from '../KeyboardShift';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import Base_url from '../Base_url';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,
} from 'react-native-card-view';
import {Header, HeaderHeightContext, useHeaderHeight} from '@react-navigation/stack';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { DrawerItems } from 'react-navigation-drawer';
import {createStackNavigator,StackNavigator} from 'react-navigation-stack';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import RNPickerSelect from 'react-native-picker-select';
import Button from 'react-native-button';
import DatePicker from 'react-native-datepicker';
import LeftSide from '../Image/side.png';
import DateTimePicker from '@react-native-community/datetimepicker';
import RightSide from '../Image/side2.png';
import Search from '../Image/search.png';
import LeaveSectionDesign from '../LeaveSectionDesign';
import { Dropdown } from 'react-native-material-dropdown';
import { CustomPicker } from 'react-native-custom-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {} from 'react-navigation';
import {setMinutes, setHours} from "date-fns";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Selector from 'react-native-easy-select';
import {extractBaseURL, login} from '../api/BaseURL';
import {CommonModal, IOS_StatusBar, WaveHeader, getWidthnHeight, TimePicker} from '../KulbirComponents/common';
import {show_HideTimePicker} from '../actions';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const { State: TextInputState } = TextInput;

const now = moment();
const timeStamp = now.valueOf();

class Leaves extends Component {
  constructor(props){
  super(props)
  this.state={
                loading: false,
                leave_types:[],
                language_sec:'1',
                language_thrd:'',
                countries_Value:null,
                states_Value:null,
                cities_Value:null,
                departments_Value:null,
                employees_Value:null,
                from_time:'',
                from_date:'',
                to_time:'',
                to_date:'',
                number_of_days:'',
                countries:[],
                states:[],
                cities:[],
                departments:[],
                employees:[],
                value:null,
                value_sec:'',
                value_thrd:null,
                replacement_id:'',
                excluded_dates:'',
                included_dates:'',
                fileInput:'',
                types1: [{label: 'First Half', value: 0}, {label: 'Second Half', value: 1}],
                value1: 0,
                value1Index: 0,
                value1_1: 0,
                value1_1Index: 0,
                types2: [{label: 'First Half', value: 0}, {label: 'Second Half', value: 1},],
                value2: 0,
                value2Index: 0,
                types3: [{label: 'First Half', value: 0}, {label: 'Second Half', value: 1},],
                value3: 0,
                value3Index: 0,
                show: true,
                show_sec: true,
                leaveType:'',
                button_value:'',
                num: 200,
                leave_data:'',
                mandatory:'0',
                depart:'',
                typeleave:'',
                visit_location_a:'',
                visit_location_b:'',
                visit_location_c:'',
                replacement_person_a:'',
                replacement_person_b:'',
                business_type:'1',
                leave_half:'First Half',
                baseURL: null,
                errorCode: null,
                apiCode: null,
                commonModal: false,
                setDate: moment().valueOf(),
                showTimer: false,
                scrollHeight: undefined,
                visibleHeight: null,
                countryError: true,
                stateError: true,
                cityError: true,
                mobileError: true,
                departmentError: true,
                empNameError: true,
                reasonError: true,
                handoverError: true,
                shortTimingsError: true,
                errorShort: function(){
                  return (this.countryError === true || this.stateError === true || this.cityError === true || 
                    this.mobileError === true || this.departmentError === true || this.empNameError === true || 
                    this.reasonError === true || this.shortTimingsError === true)
                },
                errorHalf: function(){
                  return (this.countryError === true || this.stateError === true || this.cityError === true || 
                    this.mobileError === true || this.departmentError === true || this.empNameError === true || 
                    this.reasonError === true)
                },
                errorFull: function(){
                  return (this.countryError === true || this.stateError === true || this.cityError === true || 
                    this.mobileError === true || this.departmentError === true || this.empNameError === true || 
                    this.reasonError === true || this.handoverError === true)
                },
                fullError: function(){
                  return (this.countryError === false && this.stateError === false && this.cityError === false && 
                    this.mobileError === false && this.departmentError === false && this.empNameError === false && 
                    this.reasonError === false && this.handoverError === false)
                },
                halfError: function(){
                  return (this.countryError === false && this.stateError === false && this.cityError === false && 
                    this.mobileError === false && this.departmentError === false && this.empNameError === false && 
                    this.reasonError === false)
                },
                shortError: function(){
                  return (this.countryError === false && this.stateError === false && this.cityError === false && 
                    this.mobileError === false && this.departmentError === false && this.empNameError === false && 
                    this.reasonError === false && this.shortTimingsError === false)
                },
                buttonPressed: false,
                timePicker: false
              }
         }

  onDecline(){
    this.setState({commonModal: false})
  }
  
  enableModal(status, apiCode){
    this.setState({errorCode: status})
    this.setState({apiCode})
    this.setState({commonModal: true})
  }

  hideLoader = () => {
    this.setState({ loading: false });
  }

  showLoader = () => {
    this.setState({ loading: true });
  }

  from_month(){
    var today = new Date();
    var dd = today.getDate();
  
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
  
    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = yyyy+'-'+mm+'-'+dd;
    this.setState({from_date:today})
    console.log(today);
  }
  
  to_month(){
    var today = new Date();
    var dd = today.getDate();
  
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
  
    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = yyyy+'-'+mm+'-'+dd;
    this.setState({to_date:today})
    console.log(today);
  }
  

componentDidMount(){
  this.props.show_HideTimePicker({'fromTime': null, 'toTime': null})
  this.initialize();
  // this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
  // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))
}

// UNSAFE_componentWillUnmount () {
//   this.keyboardDidShowListener.remove()
//   this.keyboardDidHideListener.remove()
// }

// keyboardDidShow (e) {
//   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
//   let newSize = Dimensions.get('window').height - e.endCoordinates.height
//   this.setState({
//     visibleHeight: newSize,
//     //topLogo: {width: 100, height: 70}
//   })
// }

// keyboardDidHide (e) {
//   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
//   this.setState({
//     visibleHeight: Dimensions.get('window').height,
//     //topLogo: {width: Dimensions.get('window').width}
//   })
// } 

async initialize(){
  await this.extractLink();
  this.apply_leave().done();
  this.ShowHideComponent_short();
  this.leave_balance().done();
  this.from_month();
  this.to_month();
}

async extractLink(){
  await extractBaseURL().then((baseURL) => {
    this.setState({baseURL}, () => console.log("EXTRACT LINK: ", this.state.baseURL))
  })
}

apply_leave=async()=>{
  const {baseURL} = this.state;
  console.log("apply leave", this.state.baseURL);
  const context=this;
  const _this = this;
  this.showLoader();
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
  var data = new FormData();

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {

  if (xhr.readyState !== 4) {
                              return;
                            }
  if (xhr.status === 200) {
    _this.hideLoader();
      // console.log(this.responseText);
      var json_obj = JSON.parse(xhr.responseText);
      var leave_types = json_obj.success.leave_data.leave_types;
      var countries = json_obj.success.leave_data.countries;
      var states = json_obj.success.leave_data.states;
      var departments = json_obj.success.leave_data.departments;
      // console.log(leave_types)
      context.setState({leave_types:leave_types})
      context.setState({countries:countries})
      context.setState({states:states})
      context.setState({departments:departments})
  }

  else{
    console.log("inside error")
    _this.hideLoader();
    _this.enableModal(xhr.status, "014");
  }
  // if(this.readyState === 4) {
  //
  // }
});

xhr.open("GET", `${baseURL}/apply-leave`);
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);

xhr.send(data);
}
between_leave_holidays=async()=>{
  const {baseURL} = this.state;
  const context=this;
  const _this = this;
  this.showLoader();
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
  var data = new FormData();
  console.log(this.state.from_date)
data.append("from_date", this.state.from_date);
data.append("to_date", this.state.to_date);
data.append("secondary_leave_type", this.state.leaveType);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if (xhr.readyState !== 4) {
                              return;
                            }
  if (xhr.status === 200) {
      // console.log(this.responseText);
      _this.hideLoader();
       console.log(this.responseText);
      var json_obj = JSON.parse(xhr.responseText);
      var number_of_days = json_obj.success.number_of_days;
      var excluded_dates = json_obj.success.excluded_dates;
      var included_dates = json_obj.success.included_dates;
      console.log(number_of_days)
      context.setState({number_of_days:number_of_days})
      context.setState({excluded_dates:excluded_dates})
      context.setState({included_dates:included_dates})
  }

  else{
    var json_obj = xhr.responseText;
    console.log("inside error",json_obj)
    _this.hideLoader();
    _this.enableModal(xhr.status, "015");

  }
  // if(this.readyState === 4) {

  // }
});

xhr.open("POST", `${baseURL}/between-leave-holidays`);
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
xhr.setRequestHeader("Content-Type", "multipart/form-data");

xhr.send(data);
}

cities=async()=>{
  const {baseURL} = this.state;
  const context=this;
  const _this = this;
  this.showLoader();
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
  var data = new FormData();
  console.log(this.state.states_Value)
data.append("state_ids", this.state.states_Value);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if (xhr.readyState !== 4) {
                              return;
                            }
  if (xhr.status === 200) {
      // console.log(this.responseText);
      _this.hideLoader();
     console.log(this.responseText);
      var json_obj = JSON.parse(xhr.responseText);
      var cities = json_obj.success.cities;
      context.setState({cities:cities})
  }

  else{
    console.log("inside error")
    _this.hideLoader();
    _this.enableModal(xhr.status, "016");
  }
  // if(this.readyState === 4) {

  // }
});

xhr.open("POST", `${baseURL}/states-wise-cities`);
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
xhr.setRequestHeader("Content-Type", "multipart/form-data");

xhr.send(data);
}

leave_replacement_availability=async()=>{
  const {baseURL} = this.state;
  const context=this;
  const _this = this;
  this.showLoader();
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
  var data = new FormData();
data.append("from_date", this.state.from_date);
data.append("to_date", this.state.to_date);
data.append("department_id", this.state.departments_Value);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if (xhr.readyState !== 4) {
                              return;
                            }
  if (xhr.status === 200) {
       console.log(this.responseText);
      _this.hideLoader();
       // console.log(this.responseText);
      var json_obj = JSON.parse(xhr.responseText);
      var employees = json_obj.success.employees;


      context.setState({employees:employees})
      // context.setState({replacement_id:replacement_id})
      }

  else{
    console.log("inside error")
    _this.hideLoader();
    _this.enableModal(xhr.status, "017");
  }
});

xhr.open("POST", `${baseURL}/leave-replacement-availability`);
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
xhr.setRequestHeader("Content-Type", "multipart/form-data");

xhr.send(data);
}

apply_leave_post=async()=>{
  const {baseURL} = this.state;
  const context=this;
  const _this = this;
  this.showLoader();
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
  var fileInput= "";
   console.log(this.state.to_date)
   console.log(this.state.from_date)
   console.log(this.state.employees_Value)
   console.log(this.state.value_sec)
   console.log(this.state.number_of_days)
   console.log(this.state.language_sec)
   console.log(this.state.from_time)
   console.log(this.state.to_time)
   console.log(this.state.countries_Value)
   console.log(this.state.states_Value)
   console.log(this.state.cities_Value)
   console.log(this.state.value)
   console.log(this.state.excluded_dates)
   console.log(this.state.included_dates)

  var data = new FormData();
data.append("to_date", this.state.to_date);
data.append("from_date", this.state.from_date);
data.append("reason", this.state.value_thrd);
data.append("replacement_id", this.state.employees_Value);
data.append("tasks", this.state.value_sec);
data.append("number_of_days", this.state.number_of_days);
data.append("secondary_leave_type", this.state.leaveType);
data.append("leave_type_id", this.state.language_sec);
data.append("from_time", this.state.from_time);
data.append("to_time", this.state.to_time);
data.append("country_id", this.state.countries_Value);
data.append("state_id", this.state.states_Value);
data.append("city_id", this.state.cities_Value);
data.append("mobile_country_id", "1");
data.append("mobile_number", this.state.value);
data.append("excluded_dates", this.state.excluded_dates);
data.append("leave_half", this.state.leave_half);
data.append("leave_documents", "");
data.append("included_dates", this.state.included_dates);



var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", async function() {
  if(xhr.readyState !== 4) {
    return;
  }
  if(this.status === 200) {
    console.log("200",this.responseText);
    _this.hideLoader();
    await _this.setToDefault();
    // console.log(this.responseText);
    Alert.alert("Leave Applied Successfully")
    // Alert.alert(this.responseText)
    
  }
  else if(this.status === 405){
    _this.hideLoader();
    await _this.setToDefault();
    //context.setState({mandatory:'1'})
    var json_obj = JSON.parse(xhr.responseText);
    var error = json_obj.error;
      console.log("error", error);
      // Alert.alert(json_obj);
      // if(json_obj=='{"validation_error":{"reason":["The reason field is required."],"replacement_id":["The replacement id field is required."],"number_of_days":["The number of days field is required."],"leave_type_id":["The leave type id field is required."],"country_id":["The country id field is required."],"state_id":["The state id field is required."],"city_id":["The city id field is required."],"mobile_number":["The mobile number field is required."]}}'){
      //   alert("1)The from date and to date field is required.\n2)The reason field is required.\n3)The replacement person details field is required.\n4)The leave type field is required.\n5)The mobile number field is required.\n6)The visiting location field is required.")
      // }
      if(error === "You have already applied for a leave on the given dates."){
        Alert.alert(error)
      }if(error === "The approval status of your previously applied leave is pending with one or more authorities. Please contact the concerned person and clear it first."){
        alert(error)
      }
      // else{
      // alert("1)The from date and to date field is required.\n2)The reason field is required.\n3)The replacement person details field is required.\n4)The leave type field is required.\n5)The mobile number field is required.\n6)The visiting location field is required.")
      // }
  }
  else {
    _this.hideLoader();
    var json_obj = JSON.parse(xhr.responseText);
    const error = json_obj.error;
    console.log("##### ELSE: ", json_obj)
    await _this.setToDefault();
    alert(error);
    _this.enableModal(xhr.status, "018");
  }
});

xhr.open("POST", `${baseURL}/apply-leave`);
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
xhr.setRequestHeader("Content-Type", "multipart/form-data");

xhr.send(data);
}

setToDefault(){
    this.setState({from_time:null})
    this.setState({to_time:null})
    this.setState({value:null})
    this.setState({value_sec:''})
    this.setState({value_thrd:null})
    this.setState({typeleave:""})
    this.setState({visit_location_a:""})
    this.setState({visit_location_b:""})
    this.setState({visit_location_c:""})
    this.setState({language_sec:'1'})
    this.setState({replacement_person_a:""})
    this.setState({replacement_person_b:""})
    this.setState({employees_Value:null})
    this.setState({countries_Value:null})
    this.setState({states_Value:null})
    this.setState({cities_Value:null})
}

leave_balance=async()=>{
  const {baseURL} = this.state;
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
     console.log("leave_balance inside error")
     _this.enableModal(xhr.status, "019");
   }
  });
  
  xhr.open("GET", `${baseURL}/leave-balance`);
  
  xhr.setRequestHeader("Authorization", "Bearer "+ permissions_four);
  
  xhr.send(data);
}

from_date=async()=>{
  try {
  const {action, year, month, day} = await DatePickerAndroid.open({
    // Use `new Date()` for current date.
    // May 25 2020. Month 0 is January.
    date: new Date(2020, 3, 25),
  });
  if (action !== DatePickerAndroid.dismissedAction) {
    // Selected year, month (0-11), day
    this.setState({
                  from_date: year+"-"+month+"-"+day
              });
  }
} catch ({code, message}) {
  console.warn('Cannot open date picker', message);
}
}

to_date=async()=>{
  try {
  const {action, year, month, day} = await DatePickerAndroid.open({
    // Use `new Date()` for current date.
    // May 25 2020. Month 0 is January.
    date: new Date(2020, 3, 25),
  });
  if (action !== DatePickerAndroid.dismissedAction) {
    // Selected year, month (0-11), day
    this.setState({
                  to_date: year+"-"+month+"-"+day
              });
  }
} catch ({code, message}) {
  console.warn('Cannot open date picker', message);
}
this.between_leave_holidays();
}
combo(){
  this.between_leave_holidays();
   this.to_date();

}
ShowHideComponent_short = () => {
  var today = new Date(new Date().getTime());
  var time=today.getHours()+":"+parseInt(today.getMinutes()+1);
  console.log(time)
  this.setState({leaveType:"Short"});
  this.setState({value_sec:''});
  this.setState({button_value:0});
  this.between_leave_holidays();
  this.setState({leave_half:''});
  this.setState({from_time:null});
  this.setState({to_time:null});
  this.setState({shortTimingsError: true})

  if (this.state.show == false) {
    this.setState({ show: true });
  }
  if (this.state.show_sec == true) {
    this.setState({ show_sec: false });
  }
};
ShowHideComponent_half = () => {
  this.setState({leaveType:"Half"});
  this.setState({value_sec:''});
  this.setState({button_value:1});
  this.between_leave_holidays();
  this.setState({leave_half:'First Half'});


  if (this.state.show == true) {
    this.setState({ show: false });
  }
  if (this.state.show_sec == false) {
    this.setState({ show_sec: true });
  }
};
ShowHideComponent_full = () => {
  this.setState({leaveType:"Full"});
  this.setState({button_value:2});
  this.between_leave_holidays();
  this.setState({leave_half:''});
  this.setState({value_sec:''});
  

  if (this.state.show == true) {
    this.setState({ show: false });
  }
  if (this.state.show_sec == true) {
    this.setState({ show_sec: false });
  }
};

toTime(){
let Time = this.state.from_time
let hr = this.state.from_time.substring(0,2)
let min = this.state.from_time.substring(5,2)
console.log("hr",hr)
console.log("min",min)
let add_hr = Number(hr)+2;
console.log("to time",add_hr,min)
let finalTime = (add_hr+min);
this.setState({to_time:finalTime})
let [h , m] = this.state.from_time.split(':')
let timeInterval = (h + m );

console.log("timeInterval",timeInterval)

  // let [hour , min] = Time.split(':')
  // let totime = (hour + min )
  // let finalTime = Number(totime) + 200;
  // console.log("totime",finalTime)
  // let timeToCompareHour = 9
  // let timeToCompareMinute = 30

  // if(Number(hour) > timeToCompareHour){
  //   console.log('show red')
  // }else if(Number(hour) == timeToCompareHour){
  //   if(Number(min) > timeToCompareMinute){
  //     console.log('show red')
  //   }else {
  //     console.log('show green')
  //   }
  // }else {
  //   console.log('show green')
  // }
}
getTimein12Format = (addHour, addMin) =>{
  addHour = (addHour?addHour:0);
    addMin = (addMin?addMin:0);
    var time = new Date(new Date().getTime());
    console.log("time",time)
    var AM = true;
    var ndble = 0;
    var abc=120;
    var hours, newHour, overHour, newMin, overMin;
    //change form 24 to 12 hour clock
    if(time.getHours() >= 13){
        hours = time.getHours() - 12;
        AM = (hours>=12?true:false);
    }else{
        hours = time.getHours();
        AM = (hours>=12?false:true);
    }
    //get the current minutes
    var minutes = (time.getMinutes()+abc);
    console.log(minutes)
    // set minute
    if((minutes+addMin) >= 60 || (minutes+addMin)<0){
        overMin = (minutes+addMin)%60;
        
        overHour = Math.floor((minutes+addMin-Math.abs(overMin))/60);
        if(overMin<0){
            overMin = overMin+60;
            overHour = overHour-Math.floor(overMin/60);
        }
        newMin = String((overMin<10?'0':'')+overMin);
        addHour = addHour+overHour;
    }else{
        newMin = minutes+addMin;
        newMin = String((newMin<10?'0':'')+newMin);
    }
    //set hour
    if(( hours+addHour>=13 )||( hours+addHour<=0 )){
        overHour = (hours+addHour)%12;
        ndble = Math.floor(Math.abs((hours+addHour)/12));
        if(overHour<=0){
            newHour = overHour+12;
            if(overHour == 0){
                ndble++;
            }
        }else{
            if(overHour ==0 ){
                newHour = 12;
                ndble++;
            }else{
                ndble++;
                newHour = overHour;
            }
        }
        newHour = (newHour<10?'0':'')+String(newHour);
        AM = ((ndble+1)%2===0)?AM:!AM;
    }else{
        AM = (hours+addHour==12?!AM:AM);
        newHour = String((Number(hours)+addHour<10?'0':'')+(hours+addHour));
    }
    var am = (AM)?'AM':'PM';
    console.log(Number(newHour)+2, newMin, am)
    let adjust_Time =( Number(newHour)+2 +':'+ newMin);
    if(newHour >=  9){
      console.log("dsgdffdbdfbdbdgbdbdbdbdbdbdbdbdbdbdbdbdbdbdfbdfbdf")
      let new_Time =( newHour +':'+ newMin);
      this.setState({from_time:new_Time})
    }else{
      this.setState({from_time:"9:30"})
    }
    
  
    
    return new Array(newHour, newMin, am);


  
 }
 first_half = () => {
  
  this.setState({leave_half:'First Half'});
  this.setState({business_type:1});

};
second_half = () => {
 
  this.setState({leave_half:'Second Half'});
  this.setState({business_type:2});
  
};

async confirmEntries(){
  //await this.checkForError();
  this.setState({buttonPressed: true})
  if(this.state.leaveType === 'Full'){
    const errorFull = this.state.errorFull();
    const fullError = this.state.fullError();
    if(errorFull){
      Alert.alert("Please fill the fields highlighted in RED")
      console.log("^^^%%%***@@@ Full Error")
    }
    if(fullError){
      this.apply_for_leave_button();
    }
  }else if(this.state.leaveType === 'Half'){
    const errorHalf = this.state.errorHalf();
    const halfError = this.state.halfError();
    if(errorHalf){
      Alert.alert("Please fill the fields highlighted in RED")
      console.log("^^^%%%***@@@ Half Error")
    }
    if(halfError){
      this.apply_for_leave_button();
    }
  }else if(this.state.leaveType === 'Short'){
    const errorShort = this.state.errorShort();
    const shortError = this.state.shortError();
    if(errorShort){
      Alert.alert("Please fill the fields highlighted in RED")
      console.log("^^^%%%***@@@ Short Error")
    }
    if(shortError){
      this.apply_for_leave_button();
    }
  }
}

 async apply_for_leave_button(){
   await this.apply_leave();
   await this.apply_leave_post();
   this.dropDownValueChange();
   this.resetError();
 }

 resetError(){
    this.setState({countryError: true})
    this.setState({stateError: true})
    this.setState({cityError: true})
    this.setState({mobileError: true})
    this.setState({departmentError: true})
    this.setState({empNameError: true})
    this.setState({reasonError: true})
    this.setState({shortTimingsError: true})
    this.setState({handoverError: true})
    this.setState({buttonPressed: false})
 }

 dropDownValueChange(value){
   console.log("value",value)
   this.setState({visit_location_a:"Country"})
   this.setState({visit_location_b:"State"})
   this.setState({visit_location_c:"City"})
   this.setState({replacement_person_a:"Department"})
   this.setState({replacement_person_b:"Employee"})
   this.setState({typeleave:"Select leave type"})
 }

 renderScreenHeader(employer){
  switch(employer){
    case "XEAMHO":
      return (
        <WaveHeader
          wave={Platform.OS ==="ios" ? false : false} 
          //logo={require('../Image/Logo-164.png')}
          menu='white'
          title='Apply Leave'
          //version={`Version ${this.state.deviceVersion}`}
        />
            );
    case "Lehri HO":
      return (
        <WaveHeader
          wave={Platform.OS ==="ios" ? false : false} 
          //logo={require('../Image/Logo-164.png')}
          menu='white'
          title='Apply Leave'
          //version={`Version ${this.state.deviceVersion}`}
        />
            );
    case "Aarti Drugs Ltd":
      return <Header navigation={this.props.navigation} title='Apply Leave' width={[getWidthnHeight(50)]} menu="white" images={false}/>
    default:
      return null;
    }
  }
  showTimePicker(){
    this.setState({showTimer: true})
  }

  setShortLeaveTimings(){
    const {fromTime, toTime} = this.props;
    this.setState({from_time: fromTime, to_time: toTime, shortTimingsError: false}, () => this.props.show_HideTimePicker({'fromTime': null, 'toTime': null}))
  }

  onLayout = (event) => {
    if(this.state.scrollHeight){
        return;
      }
      let width = Math.round(event.nativeEvent.layout.width)
      let height = Math.round(event.nativeEvent.layout.height)
      const screenHeight = getWidthnHeight(undefined, 100)
      this.setState({scrollHeight: {width, height}}, () => {
      console.log("LAYOUT HEIGHT: ", this.state.scrollHeight)
      })
  }


    render (){
          const {
            leave_types,leave_data,language_sec,language_thrd,from_time,from_date,to_time,to_date,number_of_days,
            countries,states,cities,states_Value,departments,employees,value,value_thrd,replacement_id,employees_Value,
            cities_Value,excluded_dates,included_dates,button_value,departments_Value, errorCode, apiCode,
            countryError, stateError, cityError, mobileError, departmentError, empNameError, reasonError, buttonPressed,
            shortTimingsError, handoverError
          }= this.state;
          const Options= [
            {time:'1 AM',id:'1 AM'},{time:'2 AM',id:'2 AM'},{time:'3 AM',id:'3 AM'},{time:'4 AM',id:'4 AM'},{time:'5 AM',id:'5 AM'},{time:'6 AM',id:'6 AM'},{time:'7 AM',id:'7 AM'},{time:'8 AM',id:'8 AM'},{time:'9 AM',id:'9 AM'},{time:'10 AM',id:'10 AM'},{time:'11 AM',id:'11 AM'},{time:'12 AM',id:'12 AM'},

          ]
          var setMinutes = 30
          var date = new Date();
          var hr = date.getHours(); 
          console.log(hr)
          if(hr <= 9){

          }
          console.log("render render",this.state.language_sec)
         const leaveType = [{id: '1', name: "Casual Leave"}, {id: '2', name: "Sick Leave"}, {id: '3', name: "Unpaid Leave"}, {id: '5', name: "Compensatory Leave"}]
        const totalHeight = getWidthnHeight(undefined, 100)
        const context=this;
        let user = this.props.employer;
        console.log("***EMPLOYER: ", user, number_of_days)
        let gradient = null;
        let borderColor = null;
        let searchButton = null;
        let scrollViewHeight = null;
        if(user === "Aarti Drugs Ltd"){
          searchButton = {backgroundColor: '#F06130'}
          gradient = ['#F03030', '#E1721D']
          borderColor = {borderColor: '#F06130'}
        }else{
          searchButton = {backgroundColor: 'rgb(19,111,232)'}
          gradient = ['#0E57CF', '#25A2F9']
          borderColor = {borderColor: 'rgb(19,111,232)'}
        }
        if(this.state.scrollHeight){
          scrollViewHeight = {height: (totalHeight.height - (this.state.scrollHeight.height + 1))};
          console.log("SCROLL HEIGHT: ", scrollViewHeight)
        }
        //const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 80;
        console.log("##### MOMENT TIMINGS: ", this.props.fromTime, this.props.toTime, shortTimingsError)
		return(
      <KeyboardShift>
            {()=>(
            <View style={{flex: 1}}>
              <IOS_StatusBar color={gradient} barStyle="light-content"/>
              <View style={{borderColor: 'black', borderWidth: 0}} onLayout={this.onLayout}>
                {this.renderScreenHeader(user)}
              </View>
            
            <View style={[{backgroundColor:'white', borderWidth: 0, borderColor: 'green', flex: 1, justifyContent: 'space-between', marginTop: 10}, getWidthnHeight(100)]}>
               
            <ScrollView persistentScrollbar={true}>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:10}}>
                <Text style={styles.totalLeave}>Total Leave :{leave_data.total_leaves}</Text>
                <Text style={styles.balanceLeave}>Balance Leave :{leave_data.leaves_left}</Text>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <Text style={styles.paidLeave}>Paid Leave :{leave_data.paid_count}</Text>
                <Text style={styles.unpaidLeave}>Unpaid Leave :{leave_data.unpaid_count}</Text>
              </View>
            </View>

            <View style={[styles.compo]}>
              <TouchableOpacity onPress={context.ShowHideComponent_short}>
                <View style={{borderTopLeftRadius: 20, borderBottomLeftRadius: 20, overflow: 'hidden'}}>
                  <Text style={[button_value=== 0 ? styles.button_value_sec :styles.button_value_one ]}>
                    Short
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.ShowHideComponent_half}>
                <View style={{borderLeftWidth: 2, borderRightWidth: 3, borderColor: 'white'}}>
                  <Text  style={[button_value=== 1 ? styles.button_value_sec :styles.button_value_one ]}>
                    Half
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.ShowHideComponent_full}>
                <View style={{borderTopRightRadius: 20, borderBottomRightRadius: 20, overflow: 'hidden'}}>
                  <Text style={[button_value=== 2 ? styles.button_value_sec :styles.button_value_one ]}>
                    Full
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            
            {(this.state.loading) ?
              <View style={{
                         flex:1,flexDirection:'row',width: '50%', backgroundColor: '#EFEFEF',
                         alignItems: 'center', justifyContent: 'center',
                         position: 'absolute', height:'5%',
                         shadowOffset:{  width: 100,  height: 100,},
                         shadowColor: '#330000',
                         shadowOpacity: 0,
                         shadowRadius: 5,
                         elevation: 10,
                         left:'25%',
                         top:'40%'
                     }}>

              <ActivityIndicator  size="large" color='rgb(19,111,232)'/>
                      <Text style={{fontSize:15,left:10}}>Loading..</Text>
              </View>
              : null}

            <View style={{alignItems: 'center'}}>
              <Dropdown
                containerStyle={{width:'86%',textOverflow:'hidden'}}
                inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
                data={leaveType}
                valueExtractor={({id})=> id}
                label={"Select leave type"}
                //value={this.state.typeleave}
                value={leaveType[0]['name']}
                labelExtractor={({name})=> name}
                // placeholder={'Select leave type'}
                onChangeText={language_sec => this.setState({ language_sec })}
                // onChangeText = {(value)=> this.dropDownValueChange(value)}
              />
            </View> 

            <TimePicker 
              show={this.state.timePicker}
              timeDifference={2}
              onBackdropPress={() => this.setState({timePicker: false})}
            />
            {(this.props.fromTime)? this.setShortLeaveTimings() : null}

            {(this.state.show) ?
            <View style={[{marginVertical: 10, borderColor: 'red', borderWidth: 0}, getWidthnHeight(100)]}>
                <View>
            {/* {<DatePicker
                style={{width: wp('45%'),top:'0%',left:'0%',}}
                date={this.state.from_time}
                
                 minDate="09:30"
                // stepHour = '2'
                // minuteInterval = {15}
                mode="time"
                placeholder="Choose From Time"
                format="hh:mm"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={require('../Image/Time.png')}
                onDateChange={(date) => {this.setState({from_time: date}) || this.toTime()}}
              /> } */}
              {/*onPress={this.showTimePicker.bind(this)}*/}
              <TouchableOpacity onPress={() => this.setState({timePicker: true})} style={{marginTop: 5, marginBottom: 10, alignItems: 'center', borderRadius: 10}}>
                {(!this.state.from_time) ?
                <View style={[{
                  alignItems: 'center',borderRadius: 10, justifyContent: 'center',
                  borderColor: (buttonPressed && shortTimingsError) ? 'red' : 'grey',
                  borderWidth: 1, borderRadius: 10 
                  }, getWidthnHeight(60, 5)]}>
                  <Text style={[{
                    alignItems: 'center', justifyContent: 'center',
                    textAlignVertical: 'center', fontSize: 16, textAlign: 'center', 
                    color: 'rgb(19,111,232)'}, getWidthnHeight(60)]}
                  >
                      Click to Select Timings
                  </Text>
                </View>                  
                : 
                  <View style={{alignItems: 'center', marginBottom: 5, borderRadius: 10, borderColor: 'gray', borderWidth: 1}}>
                    <View style={[{flexDirection: 'row', borderRadius: 10}, getWidthnHeight(90, 5)]}>
                      <View style={{alignSelf: 'flex-start'}}>
                        <View style={[{backgroundColor: 'rgb(19,111,232)', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10}, getWidthnHeight(25, 5)]}>
                          <Text style={{fontSize: 10, color: 'white', textAlignVertical: 'center', textAlign: 'center'}}>Click to Change</Text>
                        </View>
                      </View>
                      <View style={[{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}, getWidthnHeight(65, 5)]}>
                        <Text style={{fontSize: 16, textAlign: 'center', color: 'rgb(19,111,232)', marginVertical: 0}}>{this.state.from_time}</Text>
                        <Text style={{fontSize: 12, textAlign: 'center', color: 'red', marginVertical: 0, textAlignVertical: 'center'}}>TO</Text>
                        <Text style={{fontSize: 16, textAlign: 'center', color: 'rgb(19,111,232)', marginVertical: 0}}>{this.state.to_time}</Text>
                      </View>
                    </View>
                  </View>
                }
              </TouchableOpacity>
              {(this.state.showTimer) && (<DateTimePicker
                //minimumDate="09:30"
                value={this.state.setDate}
                display={(Platform.OS === 'ios')? 'spinner' : 'clock'}
                mode='time'
                onChange={(selectedDate) => {
                  //const currentDate = selectedDate || this.state.setDate;
                  const currentDate = selectedDate;
                  console.log("DATE PARSE: ", this.state.setDate, currentDate)
                  if(currentDate){
                    this.setState({showTimer: false})
                    this.setState({shortTimingsError: false})
                    this.setState({from_time: moment(currentDate).format('hh:mm A')}, () => {
                      console.log("SET FROM TIME: ", this.state.from_time)
                    });
                    this.setState({to_time: moment(currentDate).add(2, 'hours').format('hh:mm A')}, () => {
                      console.log("SET TO TIME: ", this.state.to_time)
                    });
                  }else {
                    this.setState({showTimer: false})
                    this.setState({shortTimingsError: true})
                    this.setState({from_time: null}, () => {
                      console.log("CANCELLED FROM TIME: ", this.state.from_time)
                    });
                    this.setState({to_time: null}, () => {
                      console.log("CANCELLED TO TIME: ", this.state.to_time)
                    });
                    //Alert.alert("CANCELLED!!!")
                  }
                }}
              />)}
              {/* {<View style={{backgroundColor:'rgb(19,111,232)',height:'1.4%',width:wp('42%'),top:'0%',left:'5%'}}/>} */}
             </View>
            {/* {<View>
           
            <DatePicker
            style={{width: wp('45%'),bottom:'0%',marginLeft:'0%'}}
            date={this.state.to_time}
            //minuteInterval = {15}
            maxDate="06:30"
            mode="time"
            placeholder="Choose To Time"
            format="hh:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={require('../Image/Time.png')}
            // onDateChange={(date) => {this.setState({to_time: date})}}
          />
           
              <View style={{backgroundColor:'rgb(19,111,232)',height:'1.4%',width:wp('42%'),top:'0%',left:'5%'}}/>
              </View>} */}
            </View>
            : null
    }


       {this.state.show_sec ? (
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center', borderColor: 'black', borderWidth: 0, marginTop: 10, marginBottom: 10}}>
        <Text style={{fontSize:15}}>Time Interval:  </Text>
          <TouchableOpacity onPress={context.first_half}>
                {this.state.business_type== 1 ?
                <Image source={require('../Image/radio_on.png')} style={{ width: wp(7), height: hp(4), marginLeft:wp(0),top:0 }}/>
            :
            <Image source={require('../Image/radio_off.png')} style={{ width: wp(7), height:hp(4), marginLeft: wp(0),top:0 }}/>
            }
                </TouchableOpacity> 
                <Text style={{color:'rgb(19,111,232)'}}>  First Half </Text>

                <TouchableOpacity onPress={context.second_half}>
                {this.state.business_type== 2 ?
                <Image source={require('../Image/radio_on.png')} style={{ width: wp(7), height: hp(4), marginLeft: wp(1),top:0 }}/>
            :
            <Image source={require('../Image/radio_off.png')} style={{ width: wp(7), height: hp(4), marginLeft: wp(1),top:0 }}/>
            }
                </TouchableOpacity> 
                <Text style={{color:'rgb(19,111,232)'}}>  Second Half</Text>
        </View>
   ) : null}
           
           {this.state.leaveType == 'Short' ?   
              <View style={{flexDirection:'row', justifyContent: 'center'}}>
               <View>
              <DatePicker
                  style={{width: wp('45%')}}
                  date={this.state.from_date}
                  ref={input => { this.textDate = input }}
                  mode="date"
                  placeholder="Choose From Date"
                  format="YYYY-MM-DD"
                  minDate="2016-01"
                  maxDate="2022-12"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                 
                  onDateChange={(date) => {this.setState({from_date: date});this.setState({to_date: date});this.between_leave_holidays();}}
                />
                </View>
              <View>
                <DatePicker
                    style={{width: wp('45%')}}
                    date={this.state.from_date}
                    mode="date"
                    placeholder="Choose To Date"
                    format="YYYY-MM-DD"
                    minDate={this.state.from_date}
                    maxDate={this.state.from_date}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    
                    // onDateChange={(date) => {this.setState({to_date: date})||this.between_leave_holidays()}}
                  />
                  </View>
            </View>
            :
            null}
            {/*{<View style={{flexDirection:'row', justifyContent: 'center'}}>
               <DatePicker
                   style={{width: 160}}
                   date={this.state.from_date}
                   ref={input => { this.textDate = input }}
                   mode="date"
                   placeholder="Choose From Date"
                   format="YYYY-MM-DD"
                   minDate="2016-01"
                   maxDate="2022-12"
                   confirmBtnText="Confirm"
                   cancelBtnText="Cancel"
                
                   onDateChange={(date) => {this.setState({from_date: date})}}
                 />
                 <DatePicker
                     style={{width: 150}}
                     date={this.state.to_date}
                     mode="date"
                     placeholder="Choose To Date"
                     format="YYYY-MM-DD"
                     minDate={this.state.from_date}
                     maxDate="2022-12"
                     confirmBtnText="Confirm"
                     cancelBtnText="Cancel"
                    
                     onDateChange={(date) => {this.setState({to_date: date})||this.between_leave_holidays()}}
                   />
             </View>} */}
    {
    this.state.leaveType == 'Half' ?   
              <View style={{flexDirection:'row', justifyContent: 'center'}}>
                <View>
              <DatePicker
                  style={{width: wp('45%'),top:'0%',left:'0%'}}
                  date={this.state.from_date}
                  ref={input => { this.textDate = input }}
                  mode="date"
                  placeholder="Choose From Date"
                  format="YYYY-MM-DD"
                  minDate="2016-01"
                  maxDate="2022-12"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                 
                  onDateChange={(date) => {this.setState({from_date: date});this.setState({to_date: date});this.between_leave_holidays();}}
                />
                </View>
              <View>
                <DatePicker
                    style={{width: wp('45%'), marginLeft:'0%'}}
                    date={this.state.from_date}
                    mode="date"
                    placeholder="Choose To Date"
                    format="YYYY-MM-DD"
                    minDate={this.state.from_date}
                    maxDate={this.state.from_date}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    
                    // onDateChange={(date) => {this.setState({to_date: date})||this.between_leave_holidays()}}
                  />
                  </View>
            </View>
            :
            null}

            {this.state.leaveType === 'Full' ?
            <View style={{flexDirection:'row', justifyContent: 'center', marginTop: 15}}>
                <View>
              <DatePicker
                  style={{width: wp('45%'),top:'0%',left:'0%'}}
                  date={this.state.from_date}
                  ref={input => { this.textDate = input }}
                  mode="date"
                  placeholder="Choose From Date"
                  format="YYYY-MM-DD"
                  minDate="2016-01"
                  maxDate="2022-12"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                 
                  onDateChange={(date) => {this.setState({from_date: date})}}
                />
                </View>
              <View>
                <DatePicker
                    style={{width: wp('45%'),marginLeft:'0%'}}
                    date={this.state.to_date}
                    mode="date"
                    placeholder="Choose To Date"
                    format="YYYY-MM-DD"
                    minDate={this.state.from_date}
                    maxDate="2022-12"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    
                    onDateChange={(date) => {this.setState({to_date: date})||this.between_leave_holidays()}}
                  />
                  </View>
            </View>
            : null
            }
            
            <View style={{alignItems: 'center', marginVertical: 5}}>
              <View style={[styles.pagecomponent_eight, getWidthnHeight(90, 6)]}>
                <Text style={{textAlignVertical: 'center'}}>Number Of Days: {number_of_days}</Text>
              </View>
            </View>

            <View style={{alignItems:'center'}}>
              <View style={[{backgroundColor: "rgb(19,111,232)", alignItems: 'center', borderRadius: 5}, getWidthnHeight(50)]}>
                <Text style={{color:'white', fontSize: 12}}>Location During Absence</Text>
              </View>
                <View style={[{alignItems: 'center', borderColor: 'rgb(19,111,232)', borderWidth: 1, borderRadius: 10, justifyContent: 'center'}, getWidthnHeight(90, 30)]}> 
                  <View style={[{marginTop: 0, position: 'absolute', borderColor: 'red', borderWidth: 0, marginTop: 0, justifyContent: 'space-evenly'}, getWidthnHeight(undefined, 25)]}>
                    <View style={{marginTop: 0}}>
                    <Dropdown
                      inputContainerStyle={[{borderBottomWidth: 1,borderBottomColor: (buttonPressed && countryError) ? 'red' : 'rgb(19,111,232)'}, getWidthnHeight(80)]}
                      data={this.state.countries}
                      value={this.state.visit_location_a}
                      valueExtractor={({id})=> id}
                      labelExtractor={({name})=> name}
                      label='Country'
                      onChangeText={countries_Value => {
                        this.setState({ countries_Value })
                        this.setState({countryError: false})
                      }}
                    />
                    </View>
                    <View style={{marginTop: 0}}>
                      <Dropdown
                        inputContainerStyle={[{borderBottomWidth: 1,borderBottomColor:(buttonPressed && stateError) ? 'red' : 'rgb(19,111,232)'}, getWidthnHeight(80)]}
                        data={this.state.states}
                        value={this.state.visit_location_b}
                        valueExtractor={({id})=> id}
                        labelExtractor={({name})=> name}
                        label='State'
                        onChangeText={async(states_Value) => {
                          this.setState({ states_Value });
                          this.setState({visit_location_c: 'City'})
                          this.setState({cities: []});
                          this.setState({cityError: true})
                          this.setState({stateError: false});
                          await this.cities();
                          this.setState({visit_location_c: ''})
                        }}
                      />
                    </View>
                    <View style={{marginBottom: 0}}>
                      <Dropdown
                        inputContainerStyle={[{borderBottomWidth: 1,borderBottomColor:(buttonPressed && cityError) ? 'red' : 'rgb(19,111,232)' }, getWidthnHeight(80)]}
                        data={this.state.cities}
                        value={this.state.visit_location_c}
                        valueExtractor={({id})=> id}
                        labelExtractor={({name})=> name}
                        label='City'
                        onChangeText={cities_Value => {
                          this.setState({ cities_Value })
                          this.setState({cityError: false})
                        }}
                      />
                    </View>
                  </View>
                </View>
            </View>
             
             
             <View style={styles.pagecomponent_ten}>
              <View style={styles.country_code}>
                <Text style={{color:'white',fontSize:14,textAlign:'center', textAlignVertical: 'center'}}>+91</Text>
              </View>
              <View>
                <TextInput
                  style={[styles.mobile_text, getWidthnHeight(70), {borderColor: (buttonPressed && mobileError) ? 'red' : 'rgb(19,111,232)'}]}
                  placeholder={'Your Mobile Number During Leave'}
                  keyboardType="numeric"
                  maxLength={10}
                  ref={input => { this.textInput = input }}
                  onChangeText={value => {
                    const number = value.replace(/[^0-9]/g, '')
                    this.setState({ value: number })
                    this.setState({mobileError: false})
                    if(value === ''){
                      this.setState({mobileError: true})
                    }
                  }}
                  value={this.state.value}
                />
              </View>
             </View>

             <View style={{alignItems:'center', marginVertical: 5}}>
              <View style={[{backgroundColor: "rgb(19,111,232)", alignItems: 'center', borderRadius: 5}, getWidthnHeight(50)]}>
                <Text style={{color:'white', fontSize: 12}}>Replacement Person Details</Text>
              </View>
              <View style={styles.pagecomponent_one_two}>
                <View style={{flexDirection:'column',width:'90%'}}>
                  <Dropdown
                    containerStyle={{left:'0%'}}
                    inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:(buttonPressed && departmentError) ? 'red' : 'rgb(19,111,232)'}}
                    data={this.state.departments}
                    value={this.state.replacement_person_a}
                    valueExtractor={({id})=> id}
                    labelExtractor={({name})=> name}
                    label='Department'
                    onChangeText={async(departments_Value) => {
                      this.setState({ departments_Value })
                      this.setState({replacement_person_b:"Employee"})
                      this.setState({employees: [], employees_Value: null})
                      this.setState({departmentError: false})
                      this.setState({empNameError: true})
                      await this.leave_replacement_availability();
                      this.setState({replacement_person_b:""})
                    }}
                  />
                  
                  <Dropdown
                    containerStyle={{left:'0%', marginBottom: 20, borderWidth: 0, borderColor: 'grey'}}
                    inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:(buttonPressed && empNameError) ? 'red' : 'rgb(19,111,232)'}}
                    data={employees}
                    value={this.state.replacement_person_b}
                    valueExtractor={({user_id}) => user_id}
                    labelExtractor={({fullname})=> fullname }
                    overflow= 'hidden'
                    label='Employee'
                    on
                    onChangeText={(user_id, index, data) => {
                      this.setState({ employees_Value: user_id }, () => console.log("@@@@EMPLOYEE ID: ", this.state.employees_Value))
                      this.setState({empNameError: false})
                      console.log("####EMPLOYEES: ", this.state.employees_Value, data[index]['fullname'])
                    }}
                  />
                </View>
              </View>
            </View>

              {this.state.leaveType == 'Full' ?   
              <View style={{flexDirection:'column', marginVertical: 10, alignItems: 'center'}}>
                <View style={{flexDirection: 'row', marginBottom: 10, alignSelf: 'flex-start'}}>
                  <View style={[getWidthnHeight(35, 3)]}>
                    <Text style={[{color: 'white', textAlign: 'center', textAlignVertical: 'center', backgroundColor: '#3280e4'}, getWidthnHeight(undefined, 3)]}>Handover Tasks:</Text>
                  </View>
                  <Image source={LeftSide} style={[{borderColor:'black', borderWidth: 0}, getWidthnHeight(10, 3)]}/>
                </View>

                  <TextInput
                    style={[{ borderRadius: 10,
                      alignItems: 'center',
                      textAlignVertical: 'center',
                      paddingLeft:15,
                      borderTopWidth: 1,
                      borderBottomWidth:1,
                      borderRightWidth:1,
                      borderLeftWidth:1,
                      borderColor: (buttonPressed && handoverError) ? 'red' : 'rgb(19,111,232)',
                      fontSize:14, }, getWidthnHeight(90, 7)]}
                    placeholder={'Enter Your Task'}
                    ref={input => { this.textTask = input }}
                    multiline
                    numberOfLines={4}
                    editable
                    maxLength={190}
                    keyboardType="default"
                    onChangeText={value_sec => {
                      this.setState({ value_sec })
                      this.setState({handoverError: false})
                      if(value_sec === ''){
                        this.setState({handoverError: true})
                      }
                    }}
                    value={this.state.value_sec}
                  />
              </View>
           :
           null
           }
           
            
           <View style={{flexDirection:'column', marginVertical: 10, alignItems: 'center'}}>
              <View style={{flexDirection: 'row', marginBottom: 10, alignSelf: 'flex-start'}}>
                <View style={[getWidthnHeight(35, 3)]}>
                  <Text style={[{color: 'white', textAlign: 'center', textAlignVertical: 'center', backgroundColor: '#3280e4'}, getWidthnHeight(undefined, 3)]}>Reason:</Text>
                </View>
                <Image source={LeftSide} style={[{borderColor:'black', borderWidth: 0}, getWidthnHeight(10, 3)]}/>
              </View>
                <TextInput
                  style={[{
                    borderRadius: 10,
                    paddingLeft: 15,
                    borderTopWidth: 1,
                    borderBottomWidth:1,
                    borderRightWidth:1,
                    borderLeftWidth:1,
                    borderColor: (buttonPressed && reasonError) ? 'red' : 'rgb(19,111,232)',
                    fontSize:14, }, getWidthnHeight(90, 7)]}
                    placeholder={'Enter Reason'}
                    ref={input => { this.textReason = input }}
                    multiline
                    numberOfLines={4}
                    editable
                    maxLength={190}
                    keyboardType="default"
                    onChangeText={value_thrd => {
                      this.setState({ value_thrd })
                      this.setState({reasonError: false})
                      console.log("REASON: ", value_thrd)
                      if(value_thrd === ''){
                        this.setState({reasonError: true})
                      }
                    }}
                    value={this.state.value_thrd}
                /> 
              </View>
              </ScrollView>
              <View style={[{alignItems: 'center', justifyContent: 'center', borderTopColor: 'grey', borderTopWidth: 1, borderTopLeftRadius: 0, borderTopRightRadius: 0}, getWidthnHeight(100, 6)]}>
                <TouchableOpacity style={[{backgroundColor:'rgb(19,111,232)', borderRadius: 10, alignItems:'center', justifyContent: 'center', borderColor: 'green', borderWidth: 0, overflow:'hidden'}, getWidthnHeight(30, 5)]} onPress={()=>this.confirmEntries()}>

                  <Text style={{fontSize:15, color:'white'}}>Apply</Text>

                </TouchableOpacity>
              </View>
            </View>
            
            <CommonModal 
              title="Something went wrong"
              subtitle= {`Error Code: ${errorCode}${apiCode}`}
              visible={this.state.commonModal}
              onDecline={this.onDecline.bind(this)}
              buttonColor={['#0E57CF', '#25A2F9']}
            />
            </View>
          )}
          </KeyboardShift>
      );
    }
 
    clear(settings){
      const { selectedItem, defaultText, getLabel, clear } = settings
      return (
        <View style={styles.container_sec}>
          

                <Text style={[styles.text, { color: selectedItem.color }]}>
                  {clear(selectedItem)}
                </Text>
              </View>
            )}
         
      
    

    renderField(settings) {
      const { selectedItem, defaultText, getLabel, clear } = settings
      return (
        <View style={styles.container_sec}>
          <View>
            {!selectedItem && <Text style={[styles.text, { color: 'black' }]}>{defaultText}</Text>}
            {selectedItem && (
              <View style={styles.innerContainer}>

                <Text style={[styles.text, { color: selectedItem.color }]}>
                  {getLabel(selectedItem)}
                </Text>
              </View>
            )}
          </View>
        </View>
      )
    }

    renderHeader() {
      return (
        <View style={styles.headerFooterContainer}>
          <Text>Leave Type</Text>
        </View>
      )
    }
    renderHeader_sec() {
      return (
        <View style={styles.headerFooterContainer}>
          <Text>Select Employee</Text>
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'transparent',
    marginHorizontal: 0,
    marginVertical: 0,
  },

    pagecomponent_sec: {
                      flex:0.4,
                      bottom:40,
                      marginTop:0,
                      marginLeft:15,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'transparent',
                      borderRadius: 10,
                      borderTopWidth: 1.5,
                      borderBottomWidth:1.5,
                      borderRightWidth:1.5,
                      borderLeftWidth:1.5,
                      borderColor: 'transparent',
                      width:viewportWidth/1.1,
                      height: '10%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      // shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 5,
    },
    pagecomponent_thrd: {
                      marginTop: 10,
                      marginLeft:0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'transparent',
                      // borderRadius: 10,
                      // borderTopWidth: 1.5,
                      // borderBottomWidth:1.5,
                      // borderRightWidth:1.5,
                      // borderLeftWidth:1.5,
                      // borderColor: 'transparent',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      // shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 0,
                      overflow: "hidden"
    },
    pagecomponent_fifth: {
                      left:'0%',
                      bottom:'0%',
                      marginTop:0,
                      marginLeft:0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'transparent',
                      borderRadius: 0,
                      borderTopWidth: 1,
                      borderBottomWidth:1,
                      borderRightWidth:1,
                      borderLeftWidth:1,
                      borderColor: 'rgb(19,111,232)',
                      width:'90%',
                      height:'0%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      // shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 1,
    },
    pagecomponent_sixth: {
                      left:'0%',
                      bottom:'55%',
                      marginTop:0,
                      marginLeft:0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'transparent',
                      borderRadius: 0,
                      borderTopWidth: 1,
                      borderBottomWidth:1,
                      borderRightWidth:1,
                      borderLeftWidth:1,
                      borderColor: 'rgb(19,111,232)',
                      width:'90%',
                      height:'0%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 1,
    },
    pagecomponent_half: {
                      left:'0%',
                      bottom:'40%',
                      marginTop:0,
                      marginLeft:0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'transparent',
                      borderRadius: 0,
                      borderTopWidth: 1,
                      borderBottomWidth:1,
                      borderRightWidth:1,
                      borderLeftWidth:1,
                      borderColor: 'rgb(19,111,232)',
                      width:'90%',
                      height:'0%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 1,
    },
    pagecomponent_seven: {
                      left:'0%',
                      bottom:'30%',
                      marginTop:0,
                      marginLeft:0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'transparent',
                      borderRadius: 0,
                      borderTopWidth: 1,
                      borderBottomWidth:1,
                      borderRightWidth:1,
                      borderLeftWidth:1,
                      borderColor: 'rgb(19,111,232)',
                      width:'90%',
                      height:'0%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 1,
    },
    pagecomponent_eight: {
                      marginVertical:20,
                      marginLeft:0,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:'transparent',
                      borderRadius: 10,
                      borderTopWidth: 1,
                      borderBottomWidth:1,
                      borderRightWidth:1,
                      borderLeftWidth:1,
                      borderColor: 'rgb(19,111,232)',
                      shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      shadowRadius: 0,
                      elevation: 0,
                      overflow: "hidden"
    },

    pagecomponent_nine: {
                      alignItems: 'center',
                      backgroundColor:'transparent',
                      borderRadius: 10,
                      borderTopWidth: 1,
                      borderBottomWidth:1,
                      borderRightWidth:1,
                      borderLeftWidth:1,
                      borderColor: 'rgb(19,111,232)',
                      width:'90%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 0,
                      
    },
    pagecomponent_ten: {
                      flexDirection:'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:'transparent',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 0,
                      overflow: "hidden",
                      marginTop: 15,
                      marginBottom: 10,
                      borderWidth: 0,
                      borderColor: 'black'
    },
      mobile_text: {
                        backgroundColor:'transparent',
                        borderRadius: 10,
                        borderTopWidth: 1,
                        borderBottomWidth:1,
                        borderRightWidth:1,
                        borderLeftWidth:1,
                        borderColor: 'rgb(19,111,232)',
                        height: 40, width:240, fontSize:14,
                        // shadowOffset:{  width: 100,  height: 100,  },
                        shadowColor: '#330000',
                        shadowOpacity: 0,
                        // shadowRadius: 0,
                        elevation: 0,
                        overflow: "hidden",
                        textAlign: 'center'
  },
  country_code:{
                  justifyContent: 'center',
                  backgroundColor:'rgb(19,111,232)',
                  height: 40,
                  width: 40,
                  borderRadius: 10,
                  shadowColor: '#330000',
                  shadowOpacity: 0,
                  // shadowRadius: 0,
                  elevation: 0,
                  overflow: "hidden"
  },
    pagecomponent_one_one: {
                      //top:'-4%',
                      left:'0%',
                      bottom:'0%',
                      margin:0,
                      marginBottom:'20%',
                      marginLeft:0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'transparent',
                      // borderRadius: 10,
                      // borderTopWidth: 1,
                      // borderBottomWidth:1,
                      // borderRightWidth:1,
                      // borderLeftWidth:1,
                      // borderColor: 'rgb(19,111,232)',
                      width:'90%',
                     height:'8%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 0,
    },
    pagecomponent_one_two: {
                      marginLeft:0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'transparent',
                      borderRadius: 10,
                      borderTopWidth: 1,
                      borderBottomWidth:1,
                      borderRightWidth:1,
                      borderLeftWidth:1,
                      borderColor: 'rgb(19,111,232)',
                      width:'90%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 0,
    },
    pagecomponent_one_thrd: {
                      //top:'85%',
                      flex:0,
                      left:'0%',
                      bottom:'3%',
                      margin:'5%',
                      marginBottom:'0%',
                      marginLeft:0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'transparent',
                      
                      width:'90%',
                      height:'10%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 1,
    },
    card_view: {
                  marginBottom:0,
                  //top:'0.8%',
                  left:'30%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomEndRadius: 0,

                  backgroundColor:'#3280e4',
                  width:'40%',
                  height: '4.9%',
                  // shadowOffset:{  width: 100,  height: 100,  },
                  // shadowColor: '#330000',
                  shadowOpacity: 0,
                  // shadowRadius: 0,
    },
    card_view_sec: {
                  marginBottom:0,
                  bottom:'10%',
                  right:'0%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomEndRadius: 0,

                  backgroundColor:'#3280e4',
                  width:'40%',
                  height: '8%',
                  // shadowOffset:{  width: 100,  height: 100,  },
                  // shadowColor: '#330000',
                  shadowOpacity: 0,
                  // shadowRadius: 0,
    },
    card_view_thrd: {
                  marginBottom:0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomEndRadius: 0,
                  backgroundColor:'#3280e4',
                  // shadowOffset:{  width: 100,  height: 100,  },
                  // shadowColor: '#330000',
                  shadowOpacity: 0,
                  // shadowRadius: 0,
    },
    button: {
                  width:'100%',
                  color: '#DCE4EF',
                  marginLeft:0,
                  marginBottom: 0,
                  paddingTop:0,
                  paddingBottom:0,
                  paddingLeft:0,
                  paddingRight:0,
                  backgroundColor:'rgb(19,111,232)',
                  borderRadius:10,
                  borderWidth: 1,
                  borderColor: 'transparent',
                  elevation: 0,
            },
    scroll: {
                  margin:5,
                  width:'70%',
                  backgroundColor:'transparent',
                  borderRadius: 10,
                  borderTopWidth: 1.5,
                  borderBottomWidth:1.5,
                  borderRightWidth:1.5,
                  borderLeftWidth:1.5,
                  borderColor: 'green',
            },
    date_component: {


    },
    headerFooterContainer: {
      padding: 10,
      alignItems: 'center'
    },
    container_sec: {
      borderColor: 'grey',
      borderWidth: 0,
      padding: 15
    },
    innerContainer: {
      flexDirection: 'row',
      alignItems: 'stretch'
    },
    text: {
      fontSize:16,

    },
    compo: {
      flexDirection:'row',
      alignItems: 'center',
      justifyContent:'center',
      marginBottom: 0,
      marginTop: 20,
      marginBottom: 10,
      borderColor: 'black',
      borderWidth: 0,
      borderRadius: 0
    },
    radioStyle: {
      flexDirection:'row',
      alignItems: 'center',
      justifyContent:'center',
      marginBottom: 0,
      bottom:hp('0%')

    },
    button_value_one:{
      
      fontSize:18,
      backgroundColor:'#adadad',
      color:'white',
      paddingTop:5,
      paddingBottom:5,
      paddingLeft:30,
      paddingRight:30,
      borderRadius: 0,
      overflow: "hidden",
    },
    button_value_sec:{
      fontSize:18,
      backgroundColor:'rgb(19,111,232)',
      color:'white',
      paddingTop:5,
      paddingBottom:5,
      paddingLeft:30,
      paddingRight:30,
      borderRadius: 0,
      overflow: "hidden",
    },
    pageData:{
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
    
      //top:hp('20%'),
      //marginTop:10

  },
  totalLeave:{
    width:'45%',
    fontSize:12,
    backgroundColor:'#f2dede' ,
    borderColor:'#ebccd1',
    color:'#a94442',
    height:'100%',
    borderWidth:1,
    borderRadius:5,
    paddingLeft:12,
    paddingRight:10,
    shadowColor: '#330000',
    shadowOpacity: 0,
    // shadowRadius: 0,
    elevation: 8,

},
balanceLeave:{
  width:'45%',
  backgroundColor:'#dff0d8' ,
  fontSize:12,
  borderColor:'#d6e9c6',
  color:'#3c763d',
  height:'100%',
  borderWidth:1,
  borderRadius:5,
  paddingLeft:12,
  paddingRight:10,
  shadowColor: '#330000',
  shadowOpacity: 0,
  //shadowRadius: 0,
  elevation: 8,

},
paidLeave:{
  width:'45%',
  backgroundColor:'#fcf8e3' ,
  fontSize:12,
  borderColor:'#faebcc',
  color:'#8a6d3b',
  height:'100%',
  borderWidth:1,
  borderRadius:5,
  paddingLeft:12,
  paddingRight:10,
  shadowColor: '#330000',
  shadowOpacity: 0,
  // shadowRadius: 0,
  elevation: 8,

},
unpaidLeave:{
  width:'45%',
  backgroundColor:'#d9edf7' ,
  fontSize:12,
  borderColor:'#bce8f1',
  color:'#31708f',
  borderWidth:1,
  height:'100%',
  borderRadius:5,
  paddingLeft:12,
  paddingRight:10,
  shadowColor: '#330000',
  shadowOpacity: 0,
  // shadowRadius: 0,
  elevation: 8,
},
  });

const mapStateToProps = (state) => {
  console.log("#### MY ATTENDANCE STATE TO PROPS: ", state.timePickerModal.timePicker)
  return {
    fromTime: state.timePickerModal.timePicker.fromTime,
    toTime: state.timePickerModal.timePicker.toTime,
  }
}

export default connect(mapStateToProps, {show_HideTimePicker})(Leaves);
//export default Leaves;