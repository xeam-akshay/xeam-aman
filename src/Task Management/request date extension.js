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
import GradientButton from '../Components/Gradient button'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import {extractBaseURL} from '../api/BaseURL';
import {CommonModal, IOS_StatusBar, WaveHeader} from '../KulbirComponents/common';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class TaskDateExtension extends Component {

  constructor(props){
  super(props)
  
  this.state={
                  task_title_value:[],
                  task_title_id:'',
                  task_id:'',
                  due_date:'',
                  user_id:'',
                  task_user_id:'',
                  required_date:'',
                  remark:'',
                  TaskTitle:'',
                  baseURL: null,
                  errorCode: null,
                  apiCode: null,
                  commonModal: false,
                  callSubmit: false,
                  taskTitleError: true,
                  requiredDateError: true,
                  remarkError: true,
                  anyError: function(){
                    return (this.taskTitleError === true || this.requiredDateError === true || this.remarkError === true)
                  },
                  noError: function(){
                    return (this.taskTitleError === false && this.requiredDateError === false && this.remarkError === false)
                  }
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

  async extractLink(){
    await extractBaseURL().then((baseURL) => {
      this.setState({baseURL}, () => console.log("EXTRACT LINK: ", this.state.baseURL))
    })
  }
  
  task_title=async()=>{
    await this.extractLink();
    const {baseURL} = this.state;
    var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
const _this=this;
this.showLoader();
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState !== 4) {
    return;
  }if(xhr.status == 200){
    var json_obj = JSON.parse(xhr.responseText);
     var title = json_obj.message.mytask;
     _this.hideLoader();
    _this.setState({task_title_value:title});
  }else{
    console.log(xhr.status)
    _this.enableModal(xhr.status, "041");
  }
});

xhr.open("GET", `${baseURL}/task-for-date-extension`);
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);

xhr.send();
  }

task_details=async()=>{
  const {baseURL} = this.state;
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
const _this=this;
this.showLoader();
  var data = new FormData();
data.append("task_id", this.state.task_title_id);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState !== 4){
    return;
  } 
  if(this.status === 200){
    _this.hideLoader();
    var json_obj = JSON.parse(xhr.responseText);
    _this.setState({due_date:json_obj.success.task.due_date}) 
    _this.setState({user_id:json_obj.success.task.user_id}) 
    _this.setState({task_user_id:json_obj.success.task.task_user.user_id})
  } else {
    _this.enableModal(xhr.status, "042");
  }
});

xhr.open("POST", `${baseURL}/task-detail`);
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);

xhr.send(data);
}

submit=async()=>{
  const {baseURL} = this.state;
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
  const _this=this;
  this.showLoader();
  var data = new FormData();
data.append("task_id", this.state.task_title_id);
data.append("assignee_id", this.state.task_user_id);
data.append("creator_id", this.state.user_id);
data.append("assigned_date", this.state.due_date);
data.append("required_date", this.state.required_date);
data.append("remarks", this.state.remark);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState !== 4) {
    return;
  }if(xhr.status === 200){
    _this.hideLoader();
    var json_obj = JSON.parse(xhr.responseText);
    console.log(json_obj);
    Alert.alert(json_obj.message)
    _this.setState({remark:''})
    _this.setState({TaskTitle:""})
    _this.setState({required_date:""})
    _this.setState({due_date:""})
    _this.setState({callSubmit: false, taskTitleError: true, requiredDateError: true, remarkError: true})
  }
  else{
    _this.hideLoader();
    console.log(xhr.responseText)
    alert("The remarks must be at least 10 characters.")
    _this.setState({remark:''})
    _this.setState({TaskTitle:""})
    _this.setState({required_date:""})
    _this.setState({callSubmit: false, taskTitleError: true, requiredDateError: true, remarkError: true})
    _this.enableModal(xhr.status, "043");
  }
});

xhr.open("POST", `${baseURL}/request-task-date-extension`);
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);

xhr.send(data);
}

dropDownValueChange(value){
  console.log("value",value)
  this.setState({TaskTitle:"Task Title"})
  
}

componentDidMount(){
  //this.initialize();
  this.task_title();
}

async initialize(){
  await this.extractLink();
  this.task_title();
}

confirmSubmit(){
  this.setState({callSubmit: true})
  const anyError = this.state.anyError();
  const noError = this.state.noError();
  if(anyError){
    Alert.alert("Please fill the fields highlighted in RED")
  }else if(noError){
    this._callForSubmit();
  }
}

_callForSubmit(){
  this.submit();
  this.dropDownValueChange();
}
renderScreenHeader(employer){
  switch(employer){
    case "XEAMHO":
      return (
        <WaveHeader
          wave={Platform.OS ==="ios" ? false : false} 
          //logo={require('../Image/Logo-164.png')}
          menu='white'
          title='Request Date Extension'
          //version={`Version ${this.state.deviceVersion}`}
        />
            );
    case "Lehri HO":
      return (
        <WaveHeader
          wave={Platform.OS ==="ios" ? false : false} 
          //logo={require('../Image/Logo-164.png')}
          menu='white'
          title='Request Date Extension'
          //version={`Version ${this.state.deviceVersion}`}
        />
            );
    case "Aarti Drugs Ltd":
      return <Header navigation={this.props.navigation} title='Request Date Extension' width={[getWidthnHeight(50)]} menu="white" images={false}/>
    default:
      return null;
    }
  }

    render (){
      const {errorCode, apiCode, taskTitleError, requiredDateError, remarkError, callSubmit} = this.state;
      const leaveType = [{id: 'approved', name: "Approved"}, {id: '2', name: "pending"}, {id: '3', name: "rejected"}]
       console.log(this.state.task_user_id)
       const _this=this;
       console.log("task id",this.state.task_title_id)
        console.log("task user id",this.state.task_user_id)
        console.log("user id",this.state.user_id)
        console.log("duew date",this.state.due_date)
        console.log("re date",this.state.required_date)
        console.log("remark",this.state.remark)
        let user = this.props.employer;
        console.log("***EMPLOYER: ", user)
        let gradient = null;
        let borderColor = null;
        let searchButton = null;
        if(user === "Aarti Drugs Ltd"){
          searchButton = {backgroundColor: '#F06130'}
          gradient = ['#F03030', '#E1721D']
          borderColor = {borderColor: '#F06130'}
        }else{
          searchButton = {backgroundColor: 'rgb(19,111,232)'}
          gradient = ['#0E57CF', '#25A2F9']
          borderColor = {borderColor: 'rgb(19,111,232)'}
        }
      return(
     
            <View style={{height:viewportHeight,width:viewportWidth,backgroundColor:'white'}}>
               <IOS_StatusBar color={gradient} barStyle="light-content"/>
                  {this.renderScreenHeader(user)}
            <View style={{height:hp('50%'),flexDirection:'column',justifyContent:'space-evenly'}}>
            {(this.state.loading) ?
        <View style={{
                   flex:1,flexDirection:'row',width: '50%', backgroundColor: '#EFEFEF',
                   alignItems: 'center', justifyContent: 'center',
                   position: 'absolute', height:'15%',
                   shadowOffset:{  width: 100,  height: 100,  },
                   shadowColor: '#330000',
                   shadowOpacity: 0,
                   shadowRadius: 5,
                   elevation: 10,
                   left:'25%',
                   top:'50%'
               }}>

        <ActivityIndicator  size="large" color='rgb(19,111,232)' />
                <Text style={{fontSize:15,left:10}}>Loading..</Text>
        </View>
        : null}
            <Dropdown
              containerStyle={{width:'100%',top:'2%',paddingLeft:15,paddingRight:15}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor: (callSubmit && taskTitleError)? 'red' : 'rgb(19,111,232)' }}
              data={this.state.task_title_value}
              valueExtractor={({id})=> id}
             label={"Task Title"}
              value={this.state.TaskTitle}
              labelExtractor={({title})=> title}
              // placeholder={'Select leave type'}
              onChangeText={task_title_id => this.setState({task_title_id, taskTitleError: false}) || this.task_details()}
              // onChangeText = {(value)=> this.dropDownValueChange(value)}
            />

            <View style={{flexDirection:'row',justifyContent:'space-between',paddingLeft:15,paddingRight:15}}>
              <View>
            <DatePicker
                  style={{top:'0%',left:'0%',}}
                  date={this.state.due_date}
                  ref={input => { this.textDate = input }}
                  mode="date"
                  placeholder="Assigned date"
                  format="YYYY-MM-DD"
                  minDate="2016-01"
                  maxDate="2022-12"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  disabled='true'
                  onDateChange={(date) => {this.setState({from_date: date})}}
                />
                <View style={{backgroundColor:'rgb(19,111,232)',height:'1.4%',width:'92%',top:'0%',left:'5%'}}/>
                </View>

                <View>
              <DatePicker
                  style={{borderColor: (callSubmit && requiredDateError)? 'red' : 'transparent', borderWidth: 1}}
                  date={this.state.required_date}
                  ref={input => { this.textDate = input }}
                  mode="date"
                  placeholder="Required date"
                  format="YYYY-MM-DD"
                  minDate="2016-01"
                  maxDate="2022-12"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                 
                  onDateChange={(date) => {this.setState({required_date: date, requiredDateError: false})}}
                />
                <View style={{backgroundColor:'rgb(19,111,232)',height:'1.4%',width:'92%',top:'0%',left:'5%'}}/>
                </View>
            </View>
                 <View style={{paddingLeft:15,paddingRight:15}}>
             
                 <Text >Remarks</Text>
                    <TextInput
                      style={{ 
                        height: 90,
                        borderColor: (callSubmit && remarkError)? 'red' :'rgb(19,111,232)',
                        borderWidth: 1,
                        fontSize:14 ,
                        paddingLeft:10,
                        borderRadius:10
                      }}
                      placeholder={'Remarks'}
                      multiline
                      numberOfLines={4}
                      editable
                      maxLength={190}
                      onChangeText={remark => {
                        this.setState({remark, remarkError: false })
                        if(remark === ''){
                          this.setState({remarkError: true})
                        }
                      }}
                     value={this.state.remark}
                   />
                </View>
                
                <GradientButton 
                  style={{fontSize:0,paddingTop:10,
                    paddingBottom:10,
                    paddingLeft:30,
                    paddingRight:30,
                    borderRadius:30,
                  }}
                  lable={' Submit '}
                  onPress={() => this.confirmSubmit()}
                />
                 
                   </View>
                   <CommonModal 
                    title="Something went wrong"
                    subtitle= {`Error Code: ${errorCode}${apiCode}`}
                    visible={this.state.commonModal}
                    onDecline={this.onDecline.bind(this)}
                    buttonColor={['#0E57CF', '#25A2F9']}
                  />
                </View>
                 

      );
    }
}

  const styles = StyleSheet.create({
    
  });
