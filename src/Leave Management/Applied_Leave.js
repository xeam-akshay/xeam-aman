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
import { NavigationContainer } from '@react-navigation/native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import RNPickerSelect from 'react-native-picker-select';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Button from 'react-native-button';
import DatePicker from 'react-native-datepicker';
import LeftSide from '../Image/side.png';
import RightSide from '../Image/side2.png';
import Search from '../Image/search.png';
import LeaveSectionDesign from '../LeaveSectionDesign';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';
import {extractBaseURL} from '../api/BaseURL';
import {CommonModal, IOS_StatusBar, WaveHeader, DateSelector, getWidthnHeight, getMarginTop, getMarginBottom} from '../KulbirComponents/common';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const now = moment();
const timeStamp = now.valueOf();

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
                from: null,
                to: null,
                counter_data:'',
                pic_name_data:'',
                emp_code:'',
                leaves:[],
                message:[],
                msg:[],
                xyz:'',
                slideAnimationDialog: false,
                employee:[],
                sender:[],
                name:'',
                data_found:'1',
                mandatory:'0',
                baseURL: null,
                errorCode: null,
                apiCode: null,
                commonModal: false
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

show_leaves=async()=>{
  await this.extractLink();
  const {language_sec,from,to, baseURL}=this.state;
  const context=this;
  const _this = this;
  this.showLoader();
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
  var name = permissions_fir.success.user.employee.fullname;
  this.setState({name:name})
  var data = new FormData();
data.append("from_date", this.state.from);
data.append("to_date", this.state.to);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if (xhr.readyState !== 4) {
    return;
 }
 if(xhr.status===200){
     _this.hideLoader();
    var json_obj = JSON.parse(xhr.responseText);
    var leaves = json_obj.success.leaves;
    var message = leaves.messages;
    context.setState({mandatory:'0'})
    console.log("json_obj",json_obj)
     context.setState({leaves:leaves})
     //context.props.navigation.navigate("AppliedLeaveDetailPage",{leaves:leaves});
     {leaves.map((item) => {
     return (
          context.setState({message:item.messages})
          )
        })
      }
     // context.setState({message:message})
 }else if(xhr.status === 204) {
  _this.hideLoader();
  Alert.alert("No Records Found")
 }
 else{
   console.log("inside error", xhr.responseText, xhr.status)
   context.setState({mandatory:'1'})
   _this.enableModal(xhr.status, "011");
   _this.hideLoader();
 }
});

xhr.open("POST", `${baseURL}/applied-leaves`);
xhr.setRequestHeader("Content-Type", "multipart/form-data");
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);


xhr.send(data);
}
conditional=(t)=>{

  if(t=="Approved"){
    return "Approved"
  }
  if(t=="Inprogress"){
    return "In-progress"
  }
  if(t=="Rejected"){
    return "Rejected"
  }
  if(t=="Cancelled"){
    return "Cancelled"
  }
}
conditional_next=(t)=>{

  if(t=="Approved"){
    return "Approved"
  }
  if(t=="Inprogress"){
    return "Inprogress"
  }
  if(t=="Rejected"){
    return "Rejected"
  }
  if(t=="Cancelled"){
    return "Cancelled"
  }
}
message=()=>{
  const {message,msg,leaves}=this.state;
     // console.log(leaves)
     // Alert.alert("leaves")


        <View>
        <View style={styles.container}>

          <Button
            title="Slide Animation Dialog"
            onPress={() => {
              this.setState({
                slideAnimationDialog: true,
              });
            }}
          />
        </View>



        <Dialog
          onDismiss={() => {
            this.setState({ slideAnimationDialog: false });
          }}
          onTouchOutside={() => {
            this.setState({ slideAnimationDialog: false });
          }}
          visible={this.state.slideAnimationDialog}
          dialogTitle={<DialogTitle title="Slide Animation Dialog Sample" />}
          dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}>
          <DialogContent>
            <Text>
              Here is an example of slide animation dialog. Please click outside
              to close the the dialog.
            </Text>
          </DialogContent>
        </Dialog>
        </View>



 //console.log(message)
  // Alert.alert({message}

  // )
}
detailPage=async()=>{
  const {leaves,message,msg,xyz, baseURL}= this.state;
  console.log("xyz detailPage",xyz, baseURL)
  const context=this;
  const _this = this;
  this.showLoader();
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;


  var data = new FormData();
data.append("applied_leave_id", this.state.xyz);
data.append("leave_approval_id", "0");

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState !== 4) {
    return;
  }
  if(this.status === 200){
    _this.hideLoader();
    var adf = JSON.parse(xhr.responseText);
    var xyz = adf.success.leave_detail.id;
    console.log("xyz",xyz);
    //  context.props.navigation.navigate("AppliedLeaveDetailPage",{data:xhr.responseText});
    //  context.props.navigation.navigate("AppliedLeaveDetailPage",{xyz:xyz});
     Actions.AppliedLeaveDetailPage({data: xhr.responseText, xyz: xyz, employer: _this.props.employer})
    } else {
      _this.hideLoader();
      _this.enableModal(xhr.status, "012");
    }
  });

xhr.open("POST", `${baseURL}/leave-detail`);
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
xhr.setRequestHeader("Content-Type", "multipart/form-data");
xhr.send(data);
}
abc=()=>{
  // const {message}= this.state;
  // console.log("sender");
  // {message.map((item) => {
  // return (
  //   this.setState({sender:item.sender.employee})
  // )})}
}
from_month(){
  const year = moment().year();
  const month = moment().month() + 1;
  const day = 1;
  const from = `${year}-${month}-${day}`
  this.setState({from}, () => console.log("FROM DATE: ", this.state.from))
}

to_month(){
  const year = moment().year();
  const month = moment().month() + 1;
  const day = moment().daysInMonth();
  const to = `${year}-${month}-${day}`
  this.setState({to}, () => console.log("TO DATE: ", this.state.to))
}

xyz(){
  this.show_leaves();
  this.abc();
}
componentDidMount(){
  
  this.from_month();
  this.to_month();
  this.show_leaves();

}
checkDateValidation() {
  console.log('abc')
  // check the dates
  if ((new Date(this.state.from) > new Date(this.state.to)) || (new Date(this.state.to) < new Date(this.state.from))) {
    // set date error validation true 
    Alert.alert("abc")
  } else {
    // null or false date error validation 
  }
}
search(){
  this.checkDateValidation();
  this.show_leaves();
}

// componentDidUpdate(prevProps) {
//   // console.log("prevState.isFocused",prevProps.route.name)
//   //   console.log("this.satate.isFocused",this.state.name)
//   if (prevProps.route.name == this.state.name) {
//     // this.show_leaves();
//     // Use the `this.props.isFocused` boolean
//     // Call any action
//   }
// }

renderScreenHeader(employer){
  switch(employer){
    case "XEAMHO":
      return (
        <WaveHeader
          wave={Platform.OS ==="ios" ? false : false} 
          //logo={require('../Image/Logo-164.png')}
          menu='white'
          title='Applied Leaves List'
          //version={`Version ${this.state.deviceVersion}`}
        />
            );
    case "Lehri HO":
      return (
        <WaveHeader
          wave={Platform.OS ==="ios" ? false : false} 
          //logo={require('../Image/Logo-164.png')}
          menu='white'
          title='Applied Leaves List'
          //version={`Version ${this.state.deviceVersion}`}
        />
            );
    case "Aarti Drugs Ltd":
      return <Header navigation={this.props.navigation} title='Applied Leaves List' width={[getWidthnHeight(50)]} menu="white" images={false}/>
    default:
      return null;
    }
  }

    render (){
          const {leaves,message,msg,xyz,employee,sender,name,from,data_found, errorCode, apiCode}= this.state;
           const context=this;
           console.log("data found",this.state.xyz)
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
          //console.log("YEAR / MONTH: ", typeof moment().month(), ", " , moment().year(), moment().daysInMonth())
		return(
      <View>
      <IOS_StatusBar color={gradient} barStyle="light-content"/>
        {this.renderScreenHeader(user)}
      <View style={[{height:'100%',top:'0%',backgroundColor:'white'}, getMarginTop(0)]}>
      <Dialog
        onDismiss={() => {
          this.setState({ slideAnimationDialog: false });
        }}
        onTouchOutside={() => {
          this.setState({ slideAnimationDialog: false });
        }}
        visible={this.state.slideAnimationDialog}
        dialogTitle={<DialogTitle title="Messages List" />}
        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}>
        <DialogContent>
        {message.map((item) => {
        return (
          <View>
          <Text>
          Send by :   {item.sender.employee.fullname}{"\n"}{"\n"}Received by:   {name}{"\n"}{"\n"}{item.message}{"\n"}{"\n"}{"\n"}
          </Text>
          </View>
        )})}
        </DialogContent>
      </Dialog>
           <View style={{alignItems:'center',}}>
         <LeaveSectionDesign/>
         </View>
         <View style={[{alignItems: 'center'}, getWidthnHeight(100), getMarginBottom(2)]}>
            <View style={[styles.date_component, getWidthnHeight(90, 12)]}>
              <Text style={{backgroundColor:'white',color:'rgb(19,111,232)'}}>    Search for Particular Date    </Text>
              <View style={[{flexDirection:'row',borderColor: 'black', borderWidth: 0, justifyContent: 'space-evenly', alignItems: 'center'}, getWidthnHeight(90)]}>
                
                <DateSelector 
                    style={[getWidthnHeight(35)]}
                    date={this.state.from}
                    androidMode='default'
                    mode='date'
                    placeholder='From Date'
                    format='YYYY-MM-DD'
                    minDate='2019-08'
                    maxDate='2025-08'
                    onDateChange={(from) => {
                        console.log('Selected: ', from)
                        this.setState({from})
                    }} 
                />

                <DateSelector 
                    style={[getWidthnHeight(35)]}
                    date={this.state.to}
                    androidMode='default'
                    mode='date'
                    placeholder='From Date'
                    format='YYYY-MM-DD'
                    minDate='2019-08'
                    maxDate='2025-08'
                    onDateChange={(to) => {
                        console.log('Selected: ', to )
                        this.setState({to})
                    }} 
                />   
                
                <TouchableOpacity  onPress={()=>this.search()}>
                  <Image
                    source={require('../Image/search.png')}
                    style={{ width: 35, height: 35, marginLeft: 0,top:0,borderRadius:0 }}
                  />
                </TouchableOpacity>
              
              </View>
            </View>
          </View>
      
      <View style={styles.pagecomponent_thrd}>
      {(this.state.loading) ?
        <View style={{
                   flex:1,flexDirection:'row',width: '50%', backgroundColor: '#EFEFEF',
                   alignItems: 'center', justifyContent: 'center',
                   position: 'absolute', height:'8%',
                   shadowOffset:{  width: 100,  height: 100,  },
                   shadowColor: '#330000',
                   shadowOpacity: 0,
                   shadowRadius: 5,
                   elevation: 10,
                   left:'25%',
                   top:'28%'
               }}>

        <ActivityIndicator  size="large" color='rgb(19,111,232)' />
                <Text style={{fontSize:15,left:10}}>Loading..</Text>
        </View>
        : null}
      <ScrollView style={{width:'100%'}}>
      {this.state.mandatory == 0 ?
      <View>
      {leaves.map((item) => {
      return (
        
          <View>
           
                <View style={{flexDirection:'row',margin:20,marginTop:'3%',marginLeft:'3%',backgroundColor:'transparent'}}>
                 
                <View style={[
                  (this.conditional_next(item.secondary_final_status)=="Approved")?styles.Approved:styles.sc,
                  (this.conditional_next(item.secondary_final_status)=="Inprogress")?styles.Approved_sec:styles.sc,
                  (this.conditional_next(item.secondary_final_status)=="Rejected")?styles.Approved_thrd:styles.sc,
                  (this.conditional_next(item.secondary_final_status)=="Cancelled")?styles.Approved_frth:styles.sc,
                  ]}>
                <TouchableOpacity onPress={()=>this.setState({xyz:item.id})||this.detailPage()}>
                <Text style={{margin:5,fontSize:12}}> From: {item.from_date}     To:  {item.to_date}</Text>
                <Text style={{margin:5,fontSize:12}}> Leave Type  :  {item.leave_type.name}</Text>
                <Text style={{margin:5,fontSize:12}}> Applied At  :  {item.created_at}</Text>  
                <Text style={{margin:5,fontSize:12}}> No. of days  :  {item.number_of_days}</Text>
                </TouchableOpacity>
                </View>

                <View style={{top:'9%',left:'10%'}}>
                <TouchableOpacity onPress={() => {
                  this.setState({
                    slideAnimationDialog: true,
                  });
                }} >
                <Text style={[
                  (this.conditional(item.secondary_final_status)=="Approved")?styles.Approved_first:styles.Approved.Deflt,
                  (this.conditional(item.secondary_final_status)=="In-progress")?styles.In_Progress:styles.Approved.Deflt,
                  (this.conditional(item.secondary_final_status)=="Rejected")?styles.rejected:styles.Approved.Deflt,
                  (this.conditional(item.secondary_final_status)=="Cancelled")?styles.cancelled:styles.Approved.Deflt,
                ]}>   {item.secondary_final_status.substring(0,1)}</Text>
                </TouchableOpacity>
                </View>
               
                </View>
               
              </View>
            )
    })}
</View>
 :
 <View style={{flexDirection:'row',justifyContent:'center',top:'0%'}}>
   <Text style={{color:'gray',fontSize:20}}>No data </Text>
 </View>
 
 }
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
    Approved_first:{ left:'0%',backgroundColor:'#78b341',borderRadius:25,height:50,width:50,color:'white',fontSize:25,paddingTop:5,paddingLeft:2,overflow: "hidden"},
    In_Progress:{ left:'0%',backgroundColor:'#cc6600',borderRadius:25,height:50,width:50,color:'white',fontSize:25,paddingTop:5,paddingLeft:2,overflow: "hidden"},
    rejected:{ left:'0%',backgroundColor:'#c11418',borderRadius:25,height:50,width:50,color:'white',fontSize:25,paddingTop:5,paddingLeft:2,overflow: "hidden"},
    cancelled:{ left:'0%',backgroundColor:'#adadad',borderRadius:25,height:50,width:50,color:'white',fontSize:25,paddingTop:5,paddingLeft:2,overflow: "hidden"},

    Approved_Deflt:{backgroundColor:'black',borderRadius:12,height:50,width:50,color:'white'},
    Approved:{
      width:'75%',
      backgroundColor:'transparent',
      borderRadius: 10,
      borderTopWidth: 1.5,
      borderBottomWidth:1.5,
      borderRightWidth:1.5,
      borderLeftWidth:5.5,
      borderColor: '#78b341',
    },
    Approved_sec:{
      width:'75%',
      backgroundColor:'transparent',
      borderRadius: 10,
      borderTopWidth: 1.5,
      borderBottomWidth:1.5,
      borderRightWidth:1.5,
      borderLeftWidth:5.5,
      borderColor: '#cc6600',
    },
    Approved_thrd:{
      width:'75%',
      backgroundColor:'transparent',
      borderRadius: 10,
      borderTopWidth: 1.5,
      borderBottomWidth:1.5,
      borderRightWidth:1.5,
      borderLeftWidth:5.5,
      borderColor: '#c11418',
    },
    Approved_frth:{
      width:'75%',
      backgroundColor:'transparent',
      borderRadius: 10,
      borderTopWidth: 1.5,
      borderBottomWidth:1.5,
      borderRightWidth:1.5,
      borderLeftWidth:5.5,
      borderColor: '#adadad',
      overflow: "hidden"
    },
    pagecomponent_sec: {
                      flexDirection:'row',
                      flex:0,
                      bottom:'5%',
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
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 5,
    },
    pagecomponent_thrd: {
                      flex:0.7,
                      bottom:2,
                      marginTop:0,
                      marginLeft:5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'transparent',
                      // borderRadius: 10,
                      // borderTopWidth: 1.5,
                      // borderBottomWidth:1.5,
                      // borderRightWidth:1.5,
                      // borderLeftWidth:1.5,
                      borderColor: 'transparent',
                      width:viewportWidth/1.03,
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: 'transparent',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 0,
    },
    date_component: {
      flexDirection:'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor:'transparent',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'rgb(19,111,232)',
      // shadowOffset:{  width: 100,  height: 100,  },
      shadowColor: '#330000',
      shadowOpacity: 0,
      // shadowRadius: 0,
      elevation: 0,

},
    card_view: {
                  marginBottom:0,
                  top:'0.8%',
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
    button: {
              width:'20%',
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
   
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

  });
