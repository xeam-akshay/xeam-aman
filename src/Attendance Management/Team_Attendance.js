import React from 'react';
import {
        AsyncStorage,
        Dimensions,
        FlatList,
        Alert,
        PermissionsAndroid,
        ActivityIndicator,
        Image,
        StyleSheet,
        Text,
        TouchableOpacity,
        View,
        KeyboardAvoidingView,
        ImageBackground,
        ScrollView,
        Button
        } from 'react-native';
 // import {ListView} from 'deprecated-react-native-listview';
import ImagePicker from 'react-native-image-picker';
import Base_url from '../Base_url';
// import Button from 'react-native-button';
import {
          Card,
          CardImage,
          CardTitle,
          CardContent,
          CardAction,
        } from 'react-native-card-view';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DatePicker from 'react-native-datepicker';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { DrawerItems } from 'react-navigation-drawer';
import {createStackNavigator,StackNavigator} from 'react-navigation-stack';
import SwitchButton from 'switch-button-react-native';
import RNRestart from 'react-native-restart';
import Header from '../cameraHeader';
import Year from '../YearBox';
import Month from '../MonthBox';
import User from '../UserIdBox';
import {extractBaseURL} from '../api/BaseURL';
import {CommonModal, IOS_StatusBar, WaveHeader, getWidthnHeight} from '../KulbirComponents/common';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const today = new Date();
  const dd = today.getDate();

  const mm = today.getMonth()+1; 
  const yyyy = today.getFullYear();
  
 const todays = yyyy+'-'+mm+'-'+dd;
export default class monthlyreport extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
                  date:todays,
                  user_id:'',
                  loading: false,
                  monthly:'',
                  name:'',
                  data:[],
                  counter_data:'',
                  pic_name_data:'',
                  s_date:'',
                  activeSwitch: [],
                  data_sec:'',
                  type:null,
                  data_self:'',
                  baseURL: null,
                  errorCode: null,
                  apiCode: null,
                  commonModal: false
                };

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
componentDidMount(){
  this.team();
}

async extractLink(){
  await extractBaseURL().then((baseURL) => {
    this.setState({baseURL}, () => console.log("EXTRACT LINK: ", this.state.baseURL))
  })
}

view_sec=()=>{
  const a="jarwal";
  console.log(a)
}

team_one=()=>{
  const a="team";
  this.setState({type:a})
}

self_one=()=>{
  const a="self";
  this.setState({type:a})
}

   team =async() =>{
     await this.extractLink();
     const {baseURL} = this.state;
     const context=this;
     const _this = this;
     this.showLoader();
     var user_token= await AsyncStorage.getItem('user_token');
     var permissions_fir= JSON.parse(user_token);
     var permissions_sec=permissions_fir.success.secret_token;
     var data = new FormData();
     const {date,type}=this.state;
     console.log(type)
     if(date===""){
       Alert.alert("Please select date")
     }else{

     }
data.append("on_date", date);
data.append("attendance_type", "team");

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
   var d = json_obj.success.attendance_data;
   context.setState({data:c});
   context.setState({data_self:d});

  }
  else{
    console.log("inside error")
    _this.hideLoader();
    _this.enableModal(xhr.status, "010");
  }
});

xhr.open("POST", `${baseURL}/attendance-detail`);
xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);


xhr.send(data);
   }

   functionCombined() {
                   this.team();


                   // this.displayData();
                 }
    renderHeader(employer){
      switch(employer){
        case "XEAMHO":
          return (
            <WaveHeader
              wave={Platform.OS ==="ios" ? false : false} 
              //logo={require('../Image/Logo-164.png')}
              menu='white'
              title='Team Attendance'
              //version={`Version ${this.state.deviceVersion}`}
            />
                );
        case "Lehri HO":
          return (
            <WaveHeader
              wave={Platform.OS ==="ios" ? false : false} 
              //logo={require('../Image/Logo-164.png')}
              menu='white'
              title='Team Attendance'
              //version={`Version ${this.state.deviceVersion}`}
            />
                );
        case "Aarti Drugs Ltd":
          return <Header navigation={this.props.navigation} title="Team Attendance" width={[getWidthnHeight(50)]} menu="white" images={false}/>
        default:
          return null;
        }
    }
  render() {
    const {data,date,data_sec,data_self, errorCode, apiCode}=this.state;
    console.log(data_self)
    // console.log(data)
    const punch=[{in:"IN",out:"OUT"}]
    const context=this;
    let user = this.props.employer;
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

    return (
        <View>
          <IOS_StatusBar color={gradient} barStyle="light-content"/>
          {this.renderHeader(user)}
      <View style={{height:"100%"}}>
      <View style={styles.pagecomponent}>
        
    <Text style={{right:'0%',top:0,fontSize:15}}>Select Date :  </Text>
   <View style={{margin:0,right:'0%',bottom:0}}>
   <DatePicker
       style={{width: 125}}
       date={this.state.date}
       mode="date"
       placeholder="YYYY-MM-DD"
       format="YYYY-MM-DD"
       minDate="2016-01-01"
       maxDate="2022-12-01"
       confirmBtnText="Confirm"
       cancelBtnText="Cancel"
       
       onDateChange={(date) => {this.setState({date: date})}}
     />

       </View>
       <TouchableOpacity style={{top:0,left:20}} onPress={()=>this.team()}>
           <Text style={{borderRadius: 8,color:'white',backgroundColor:'rgb(19,111,232)',paddingTop:5,paddingBottom:5,paddingLeft:10,paddingRight:10,overflow: "hidden"}}>Search</Text>
        </TouchableOpacity>
   </View>


      <View style={styles.pagecomponent_sec}>
      {(this.state.loading) ?
        <View style={{
          flex:1,flexDirection:'row',width: '50%', backgroundColor: '#EFEFEF',
          alignItems: 'center', justifyContent: 'center',
          position: 'absolute', height:'10%',
          shadowOffset:{width:100,height:100},
          shadowColor: '#330000',
          shadowOpacity: 0,
          shadowRadius: 5,
          elevation: 10,
          left:'25%',
          top:'30%'
            }}>
       <ActivityIndicator size="large" color='rgb(19,111,232)' />
       <Text style={{fontSize:15,left:10}}>Loading..</Text>
       </View>
       : null}
      <ScrollView style={{width:'100%',height:'100%',marginBottom:'60%'}}>
      {data.map((item) => {
      return (

         <View style={{margin:-30,width:'100%',left:30,top:35,}} >

        <Image source={{uri:item.profile_picture}} style={{left:'2%',height:50,width:50,borderRadius:75,borderColor:'rgb(19,111,232)',borderWidth:1}}/>
        <Text style={{left:'17%' ,bottom:'35%',color:'rgb(19,111,232)'}}>{item.fullname}</Text>
        <Text style={{left:'17%' ,bottom:'30%',color:'#bfbfbf'}}>{item.employee_code}</Text>
        {punch.map((item) => {
        return (
          <View>
          <View style={{left:'65%',bottom:'320%'}}>
          <Text style={{fontSize:10}}>{item.in}</Text>
          </View>
          <View style={{left:'85%',bottom:'370%'}}>
          <Text style={{fontSize:10}}>{item.out}</Text>
          </View>
          </View>
        );
        })}
        <Text style={{left:'55%' ,bottom:'62%',fontSize:12,backgroundColor:'green',width:'20%',borderRadius:4,color:'white',overflow: "hidden"}}>  {item.attendance_data.first_punch}</Text>
        <Text style={{left:'78%' ,bottom:'73%',fontSize:12,backgroundColor:'#a32e2e',width:'20%',borderRadius:4,color:'white',overflow: "hidden"}}>  {item.attendance_data.last_punch}</Text>
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
}

const styles = StyleSheet.create({
  button: {
zIndex: 100,

    color: '#DCE4EF',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:20,
    backgroundColor:'rgb(19,111,232)',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'transparent',
    elevation: 0,
  },
  CardView: {
    marginTop:200,
    flex:0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderTopWidth: 1.5,
    borderBottomWidth:1.5,
    borderRightWidth:1.5,
    borderLeftWidth:1.5,
    borderColor: 'rgb(0,0,0)',
    width:viewportWidth/1.03,
    height: viewportHeight / 1.5,
    // shadowOffset:{  width: 100,  height: 100,  },
    shadowColor: '#330000',
    shadowOpacity: 0,
    // shadowRadius: 0,
    elevation: 5,
  },
  pagecomponent: {
    flexDirection:'row',
    marginTop:10,
     marginLeft:15,
    flex:0.1,
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
    // height: '30%',
    // shadowOffset:{  width: 100,  height: 100,  },
    shadowColor: '#330000',
    shadowOpacity: 0,
    // shadowRadius: 0,
    elevation: 5,
  },
  pagecomponent_sec: {
    marginTop:20,
     marginLeft:15,
    flex:0.9,
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
    // height: '30%',
    // shadowOffset:{  width: 100,  height: 100,  },
    shadowColor: '#330000',
    shadowOpacity: 0,
    // shadowRadius: 0,
    elevation: 5,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width:viewportWidth,
    height:viewportHeight
  },
  info: {
    width:'20%',
        flexGrow: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 15,

    },
drowline: {
            bottom:10,
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
            marginBottom:'2%',
            right:'31%',
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
CardView_sec: {
           marginTop:0,
           flex:0,
           justifyContent: 'center',
           alignItems: 'center',
           borderRadius: 0,
           borderTopWidth: 1.5,
           borderBottomWidth:1.5,
           borderRightWidth:1.5,
           borderLeftWidth:1.5,
           borderColor: 'rgb(19,111,232)',
           width:viewportWidth,
           height: '50%',
           // shadowOffset:{  width: 100,  height: 100,  },
           // shadowColor: '#330000',
           shadowOpacity: 0,
           // shadowRadius: 0,
           // elevation: 5,
         },
 button1: {

           flex:0,
           margin: 0,
           color: '#DCE4EF',
           left: 0,

           top:'200%',


           paddingTop:0,
           paddingBottom:0,
           paddingLeft:0,
           paddingRight:0,
           backgroundColor:'rgb(19,111,232)',
           borderRadius:4,
           borderWidth: 1,
           borderColor: 'transparent',
           elevation: 0,
         },
 button2: {

           zIndex: 100,
           flex:0,
           margin: 0,
           marginTop:6,
           marginLeft:0,
           marginRight:0,

           right:0,
           color: '#DCE4EF',
           alignItems: 'center',
           justifyContent: 'center',
           marginLeft:10,
           paddingTop:0,
           paddingBottom:0,
           paddingLeft:0,
           paddingRight:0,
           backgroundColor:'rgb(19,111,232)',
           borderRadius:4,
           borderWidth: 1,
           borderColor: 'transparent',
           elevation: 0,
         },
  // commentbox: {
  //   widht:20,
  //   height:10,
  //   margin:4,
  //   shadowOffset:{  width: 100,  height: 100,  },
  //   shadowColor: '#330000',
  //   shadowOpacity: 0,
  //   shadowRadius: 5,
  //   elevation: 10,
  // },

});
