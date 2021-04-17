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
import Base_url from '../Base_url';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,
} from 'react-native-card-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { NavigationContainer } from '@react-navigation/native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import RNPickerSelect from 'react-native-picker-select';
import Button from 'react-native-button';
import DatePicker from 'react-native-datepicker';
import Search from '../Image/search.png';
import { Dropdown } from 'react-native-material-dropdown';
import { CustomPicker } from 'react-native-custom-picker';
import {extractBaseURL} from '../api/BaseURL';
import {CommonModal, IOS_StatusBar, WaveHeader} from '../KulbirComponents/common';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class Leaves extends Component {

  constructor(props){
  super(props)
  this.state={
                  loading: false,
                  token:'',
                  final_data:'',
                  final_data_sec:'',
                  language:'',
                  language_sec:'',
                  tvf:[],
                  tvl:[],
                  data:[],
                  from:'',
                  to:'',
                  counter_data:'',
                  pic_name_data:'',
                  emp_code:'',
                  baseURL: null,
                  errorCode: null,
                  apiCode: null,
                  commonModal: false
              }
         }

componentDidMount(){
                    // this.show_thrd().done();
                    this.storage().done();
                    this.show_sec().done();
                    }

async extractLink(){
  await extractBaseURL().then((baseURL) => {
    this.setState({baseURL}, () => console.log("EXTRACT LINK: ", this.state.baseURL))
  })
}

from_to_date=()=>{
                const {from,to} =this.state;
                if(from==null){
                  Alert.alert("The from date field is required.")
                }if(to!==null){
                  this.show_four().done();
                }else{

                }
}

hideLoader = () => {
    this.setState({ loading: false });
  }

  showLoader = () => {
    this.setState({ loading: true });
  }

storage=async()=>{

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

  enableModal(status, apiCode){
    this.setState({errorCode: status})
    this.setState({apiCode})
    this.setState({commonModal: true})
  }

  onDecline(){
    this.setState({commonModal: false})
  }

show_sec=async()=>{
  await this.extractLink();
  const {baseURL} = this.state;
  console.log("AFTER");
  const b="show_sec";
  console.log(b)
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_sec=permissions_fir.success.secret_token;

var data = null;
const {token}=this.state;
const context=this;
const _this = this;
this.showLoader();
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  // console.log(xhr.status)
  console.log(xhr.readyState)

    if (xhr.readyState !== 4) {
                                return;
                              }
    if (xhr.status === 200) {
      _this.hideLoader();
     var json_obj = JSON.parse(xhr.responseText);
     var c = json_obj.success.departments;
     context.setState({tvl:c});
      // context.props.navigation.navigate("welcome");
    }

    else{
      console.log("inside error")
      _this.hideLoader();
      _this.enableModal(xhr.status, "007");

    }
});

xhr.open("GET", `${baseURL}/departments`);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);

xhr.send(data);
}

show_thrd=async()=>{
  const {baseURL} = this.state;
  const b="show_thrd";
  console.log(b)

  const context=this;
  const _this = this;
  this.showLoader();
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_sec=permissions_fir.success.secret_token;
  var data = new FormData();
  const {language}=this.state;
data.append("department_ids", language);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (xhr.readyState !== 4) {
                      return;
 }
 if(xhr.status===200){
     _this.hideLoader();
   // console.log(xhr.responseText)
   var json_obj = JSON.parse(xhr.responseText);
   var c = json_obj.success.employees;
   context.setState({tvf:c});
 }
 else{
    console.log("inside error")
    _this.hideLoader();
    _this.enableModal(xhr.status, "008");
 }

});
xhr.open("POST", `${baseURL}/departments-wise-employees`);
xhr.setRequestHeader("Content-Type", "multipart/form-data");
xhr.setRequestHeader("Authorization", "Bearer  "+ permissions_sec);
xhr.send(data);
}

show_four=async()=>{
const {baseURL} = this.state;
const context=this;
const _this = this;
this.showLoader();
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
  const {language_sec,from,to}=this.state;

  console.log(from)
  console.log(to)
  var data = new FormData();
data.append("from_date", from);
data.append("user_id", language_sec);
data.append("to_date", to);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {

  if (xhr.readyState !== 4)
  {
                      return;
  }
  if(xhr.status===200){
    _this.hideLoader();
   // console.log(xhr.responseText)
   var json_obj = JSON.parse(xhr.responseText);
   var c = json_obj.success.attendance_data;
   var counter=json_obj.success.counter_data;
   var pic_name=json_obj.success.user.employee;
   var emp_code=json_obj.success.user;
   context.setState({data:c});
   context.setState({counter_data:counter});
   context.setState({pic_name_data:pic_name});
   context.setState({emp_code:emp_code});
  }
  else{
    _this.hideLoader();
    console.log("inside error")
    var json_obj = JSON.parse(xhr.responseText);
    // var c = json_obj.validation_error;

    var o = json_obj.error;
    _this.enableModal(xhr.status, "009");
    // Alert.alert(c)
    // Alert.alert(o)
  }
});

xhr.open("POST", `${baseURL}/user-attendance-detail`);
xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "multipart/form-data");
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
xhr.send(data);
}

conditional=(t)=>{

  if(t=="Present"){
    return "Present"
  }if(t=="Absent"){
    return "Absent"
  }if(t=="Week-Off"){
    return "Week-Off"
  }if(t=="Holiday"){
    return "Holiday"
  }if(t=="Leave"){
    return "Leave"
  }
}
time_conditional=(t)=>{
  if(t ==""){
    return ""
  }if(t !==""){
    return ""
  }
}

renderScreenHeader(employer){
  switch(employer){
    case "XEAMHO":
      return (
        <WaveHeader
          wave={Platform.OS ==="ios" ? false : false} 
          //logo={require('../Image/Logo-164.png')}
          menu='white'
          title='Employee Attendance'
          //version={`Version ${this.state.deviceVersion}`}
        />
            );
    case "Lehri HO":
      const context = this;
      return (
        <WaveHeader
          wave={Platform.OS ==="ios" ? false : false} 
          //logo={require('../Image/Logo-164.png')}
          menu='white'
          title='Employee Attendance'
          //version={`Version ${this.state.deviceVersion}`}
        />
            );
    case "Aarti Drugs Ltd":
      return <Header navigation={this.props.navigation} title='Employee Attendance' width={[getWidthnHeight(50)]} menu="white" images={false}/>
    default:
      return null;
    }
  }

    render (){
      const {final_data,language,final_data_sec,tvf,tvl,language_sec,data,counter_data,pic_name_data,emp_code, errorCode, apiCode}=this.state;
      const t=[counter_data]
      var pic={uri:pic_name_data.profile_picture};
      const Options= [{Date:'Date',Status:'Status',First_Punch:'First punch',Last_Punch:'Last punch'}]
      const context=this;
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
      <View>
        <IOS_StatusBar color={gradient} barStyle="light-content"/>
          {this.renderScreenHeader(user)}
      <View style={{height:'100%'}}>
<View style={styles.department}>
<CustomPicker
  style={{left:10,top:2}}
  placeholder={'Select department'}
  options={this.state.tvl}
  getLabel={item => item.name}
  fieldTemplate={this.renderField}
  headerTemplate={this.renderHeader}
  onValueChange={value => {
    this.setState({
      language:value.id
    })||this.show_thrd();
  }}
/>
</View>
<View style={styles.employee}>

<CustomPicker
   style={{left:10,top:2}}
  placeholder={'Select Employee'}
  options={this.state.tvf}
  getLabel={item => item.fullname}
  fieldTemplate={this.renderField}
          headerTemplate={this.renderHeader_sec}
//      footerTemplate={this.renderFooter}
  onValueChange={value => {
    this.setState({
      language_sec:value.user_id
    })

  }}
/>
</View>
                      <View style={styles.pagecomponent_sec}>
                      <Text style={{top:0,right:'0%',fontSize:15}}>  From : </Text>
                      <DatePicker
                          style={{width: 125,right:'0%',top:0,}}
                          
                          date={this.state.from}
                          mode="date"
                          placeholder="YYYY-MM-DD"
                          format="YYYY-MM-DD"
                          minDate="2016-01"
                          maxDate="2022-12"
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          
                          onDateChange={(from) => {this.setState({from: from})}}
                        />
                        <Text style={{bottom:0,left:'0%',fontSize:15}}>  To : </Text>
                        <DatePicker
                            style={{width: 125,bottom:0,left:'0%'}}
                            date={this.state.to}
                            mode="date"
                            placeholder="YYYY-MM-DD"
                            format="YYYY-MM-DD"
                            minDate={this.state.from}
                            maxDate="2022-12"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            
                            onDateChange={(to) => {this.setState({to: to})}}
                          />

                      </View>
            <View style={{width:'20%',alignItems:'center',left:'40%',top:10}}>
            <TouchableOpacity style={styles.button} onPress={()=>this.show_four()}>

              <Text style={{textAlign: 'center', bottom:0, color:'white'}}>Search</Text>

            </TouchableOpacity>
            </View>
<Image source={pic} style={{left:'40%',top:15,height:80,width:80,borderRadius:75,borderColor:'black',alignItems:'center',borderColor:'rgb(19,111,232)',borderWidth:1}}/>
<Text style={{textAlign:'center',top:25}}>{pic_name_data.fullname}</Text>
<Text style={{textAlign:'center',top:25,color:'#bfbfbf'}}>{emp_code.employee_code}</Text>
{t.map((item) => {
return (
  <View style={{bottom:25}}>

  <Text style={[
  (this.time_conditional(item.Present))==""?styles.pre:styles.data_trd,
  styles.data_trd,
]}> Present:  {item.Present} </Text>
 <Text style={[
 (this.time_conditional(item.Absent))==""?styles.ab:styles.data_trd,
 styles.data_trd,
]}>Absent:  {item.Absent}</Text>
 <Text style={[
 (this.time_conditional(item.Leave))==""?styles.lea:styles.data_trd,
 styles.data_trd,
]}> Leave:  {item.Leave}</Text>
 <Text style={[
 (this.time_conditional(item.Holiday))==""?styles.holy:styles.data_trd,
 styles.data_trd,
]}>Holiday:  {item.Holiday}</Text>
 </View>);
})}
<View style={styles.drowline}>
</View>
<View style={styles.card_view}>
<Text style={{color:'#fcfeff',right:5}}>Monthly Days Details</Text>
</View>
<View style={styles.pagecomponent_thrd}>
{(this.state.loading) ?
  <View style={{
             flex:1,flexDirection:'row',width: '50%', backgroundColor: '#EFEFEF',
             alignItems: 'center', justifyContent: 'center',
             position: 'absolute', height:'20%',
             shadowOffset:{  width: 100,  height: 100,  },
             shadowColor: '#330000',
             shadowOpacity: 0,
             shadowRadius: 5,
             elevation: 10,
             left:'25%',
             top:'30%',
             overflow: "hidden"
         }}>

  <ActivityIndicator  size="large" color='rgb(19,111,232)' />
          <Text style={{fontSize:15,left:10}}>Loading..</Text>
  </View>
  : null}
<View style={{marginTop:'2%',marginBottom:'2%',backgroundColor:'#cdcfd1',height:'10%',width:'100%',borderRadius: 0}}>
{Options.map((item) => {
return (
  <View style={{width:'100%'}}>
  <Text style={{top:'5%',left:'5%'}}>{item.Date}</Text>
  <Text style={{bottom:'20%',left:'28%'}}>{item.Status}</Text>
  <Text style={{bottom:'45%',left:'50%'}}>{item.First_Punch}</Text>
  <Text style={{bottom:'70%',left:'75%'}}>{item.Last_Punch}</Text>
     </View>
);
})}
</View>
<ScrollView style={{width:'100%', marginBottom:'40%'}}>
{data.map((item) => {
return (
  <View>
 <Text style={{top:'20%',left:'2%'}}>{item.on_date}</Text>
 <Text style={[
   (this.conditional(item.status)=="Present")?styles.present:styles.data_sec,
   (this.conditional(item.status)=="Absent")?styles.absent:styles.data_sec,
   (this.conditional(item.status)=="Week-Off")?styles.week_off:styles.data_sec,
   (this.conditional(item.status)=="Holiday")?styles.Holiday:styles.data_sec,
   (this.conditional(item.status)=="Leave")?styles.Leave:styles.data_sec,
     styles.data_sec
 ]}>  {item.status.substring(0,1)}</Text>
   <Text style={{left:'50%',bottom:'30%'}}>{item.first_punch}</Text>
     <Text style={{left:'75%',bottom:'55%'}}>{item.last_punch}</Text>

   </View>
);
})}

</ScrollView>
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
      );
    }
    renderField(settings) {
      const { selectedItem, defaultText, getLabel, clear } = settings
      return (
        <View style={styles.container}>
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
          <Text>Select Department</Text>
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
    present:{backgroundColor:'#78b341',borderRadius:12,height:23,width:25,color:'white',overflow: "hidden"},
    absent:{backgroundColor:'#c11418',borderRadius:12,height:23,width:25,color:'white',overflow: "hidden"},
    week_off:{backgroundColor:'#ffbf80',borderRadius:12,height:23,width:25,color:'white',overflow: "hidden"},
    Holiday:{backgroundColor:'#adadad',borderRadius:12,height:23,width:25,color:'white',overflow: "hidden"},
    Leave:{backgroundColor:'#76cae4',borderRadius:12,height:23,width:25,color:'white',overflow: "hidden"},
    pre:{backgroundColor:'#78b341',color:'white',left:'0.5%',top:'80%',borderRadius:4,paddingLeft:4,width:'26%',overflow: "hidden"},
    ab:{backgroundColor:'red',color:'white',left:'28%',top:'55%',borderRadius:4,paddingLeft:4,width:'23%',overflow: "hidden"},
    lea:{backgroundColor:'#76cae4',color:'white',left:'52%',top:'30%',borderRadius:4,paddingLeft:4,width:'23%',overflow: "hidden"},
    holy:{backgroundColor:'#adadad',color:'white',left:'76%',top:'5%',marginBottom:0,borderRadius:4,paddingLeft:4,width:'23%',overflow: "hidden"},
    time:{color:'red'},
    data_sec:{
      bottom:0,
      left:'30%',
      alignItems:'center',
    },
    data_trd:{
      bottom:0
    },
    data:{
      margin:10,
      width:'100%',
    },

pagecomponent: {
                flex:0.2,
                marginTop:20,
                 marginLeft:0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:'#ffffff',
                borderRadius: 10,
                borderTopWidth: 1.5,
                borderBottomWidth:1.5,
                borderRightWidth:1.5,
                borderLeftWidth:1.5,
                borderColor: 'transparent',
                width:viewportWidth/1.1,
                  height: '10%',
                // shadowOffset:{  width: 100,  height: 100,  },
                shadowColor: '#330000',
                shadowOpacity: 0,
                // shadowRadius: 0,
                elevation: 5,
},
pagecomponent_sec: {
                   flexDirection:'row',
                  flex:0.3,
                  marginTop:10,
                   marginLeft:15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:'#ffffff',
                  borderRadius: 10,
                  borderTopWidth: 1.5,
                  borderBottomWidth:1.5,
                  borderRightWidth:1.5,
                  borderLeftWidth:1.5,
                  borderColor: 'transparent',
                  width:viewportWidth/1.1,
                    height: '10%',
                  // shadowOffset:{  width: 100,  height: 100,  },
                  shadowColor: '#330000',
                  shadowOpacity: 0,
                  // shadowRadius: 0,
                  elevation: 5,
},
pagecomponent_thrd: {
                  flex:1.6,
                  marginTop:0,
                  marginLeft:15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:'#ffffff',
                  borderRadius: 10,
                  borderTopWidth: 1.5,
                  borderBottomWidth:1.5,
                  borderRightWidth:1.5,
                  borderLeftWidth:1.5,
                  borderColor: 'transparent',
                  width:viewportWidth/1.1,
                  // shadowOffset:{  width: 100,  height: 100,  },
                  shadowColor: '#330000',
                  shadowOpacity: 0,
                  // shadowRadius: 0,
                  elevation: 5,
},
drowline: {
              bottom:15,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:'#cdcfd1',
              width:'100%',
              height: '0.1%',
              // shadowOffset:{  width: 100,  height: 100,  },
              // shadowColor: '#330000',
              shadowOpacity: 0,
              // shadowRadius: 0,
              elevation: 1,
},
card_view: {
              marginBottom:0,
              bottom:10,
              right:0,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomEndRadius: 150,
              borderTopWidth: 1.5,
              borderBottomWidth:1,
              borderRightWidth:1.5,
              borderLeftWidth:1.5,
              borderColor: 'rgb(19,111,232)',
              backgroundColor:'rgb(19,111,232)',
              width:'40%',
              height: '7%',
              // shadowOffset:{  width: 100,  height: 100,  },
              // shadowColor: '#330000',
              shadowOpacity: 0,
              // shadowRadius: 0,
              elevation: 5,
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
        text: {
          fontSize: 15
        },
        department:{
          height:'5%',
          top:'2.8%',
          left:'1%',
          backgroundColor:'#ffffff',
          borderRadius: 10,
          borderTopWidth: 1.5,
          borderBottomWidth:1.5,
          borderRightWidth:1.5,
          borderLeftWidth:1.5,
          borderColor: '#f1f1f1',
          width:'40%',
          // shadowOffset:{  width: 100,  height: 100,  },
          shadowColor: '#330000',
          shadowOpacity: 0,
          // shadowRadius: 0,
          elevation: 5,
        },
        employee:{
          height:'5%',
          left:'44%',
          bottom:'2.3%',
          backgroundColor:'#ffffff',
          borderRadius: 10,
          borderTopWidth: 1.5,
          borderBottomWidth:1.5,
          borderRightWidth:1.5,
          borderLeftWidth:1.5,
          borderColor: '#f1f1f1',
          width:'55%',
          // shadowOffset:{  width: 100,  height: 100,  },
          shadowColor: '#330000',
          shadowOpacity: 0,
          // shadowRadius: 0,
          elevation: 5,
        },
        headerFooterContainer: {
          padding: 10,
          alignItems: 'center'
        },

  });
