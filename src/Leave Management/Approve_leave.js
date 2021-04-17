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
   ScrollView,
   TextInput,
   SafeAreaView,
   Keyboard
} from 'react-native';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,
} from 'react-native-card-view';
import ActionModal from 'react-native-modal';
import Base_url from '../Base_url';
import Icon from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import RNPickerSelect from 'react-native-picker-select';
import { Dropdown } from 'react-native-material-dropdown';
import Button from 'react-native-button';
import DatePicker from 'react-native-datepicker';
import LeftSide from '../Image/side.png';
import RightSide from '../Image/side2.png';
import Search from '../Image/search.png';
import NameBottomBorder from '../Components/Name bottom border'
import LinearGradient from 'react-native-linear-gradient';
import TitleBox from '../Components/title box'
import Header from '../Components/Header'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LeaveSectionDesign from '../LeaveSectionDesign';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import {extractBaseURL} from '../api/BaseURL';
import {CommonModal, getWidthnHeight, IOS_StatusBar, WaveHeader, getMarginTop} from '../KulbirComponents/common';

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
                leaves:[],
                message:[],
                msg:[],
                xyz:'',
                slideAnimationDialog: false,
                employee:[],
                sender:[],
                name:'',
                status:'0',
                Month:'',
                Year:'',
                leave_approvals_id:'',
                applied_leave_id:'',
                slideAnimationDialog:'',
                button_value:'0',
                remark:'',
                leave_approval_id:'',
                mandatory:'0',
                leave_approve_status:'',
                reson:'',
                baseURL: null,
                errorCode: null,
                apiCode: null,
                commonModal: false,
                isActionVisible: false,
                editable: true,
                saveRemark: false,
                remarkError: true,
                leaveStatus: null
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


show_leaves=async()=>{
  //this.detailPage();
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
  data.append("leave_status", this.state.status);
  data.append("month", this.state.Month);
  data.append("year", this.state.Year);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if (xhr.readyState !== 4) {
    return;
}
 if(xhr.status===200){
     _this.hideLoader();
     console.log("##### LEAVE DATA", xhr.responseText);
    var json_obj = JSON.parse(xhr.responseText);
    var leaves = json_obj.success.leave_approvals;
    context.setState({mandatory:'0'})
    

    // console.log(leaves)
     context.setState({leaves:leaves})
     {leaves.map((item) => {
      
        context.setState({leave_approvals_id:item.id})
        context.setState({applied_leave_id:item.applied_leave_id})
      })}
     //context.props.navigation.navigate("AppliedLeaveDetailPage",{leaves:leaves});
     


     // context.setState({message:message})

 }else if(xhr.status === 204){
    _this.hideLoader();
    context.setState({mandatory:'1'})
    context.setState({leaves:[]})
    Alert.alert("No Records Found")
 }
 else{
    context.setState({mandatory:'1'})
    context.setState({leaves:[]})
    console.log("inside error")
    _this.hideLoader();
    _this.enableModal(xhr.status, "020");
 }
});

xhr.open("POST", `${baseURL}/approve-leaves`);
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
  console.log("detailpage")
  const {leaves,message,msg,xyz, baseURL}= this.state;
  console.log(xyz)
  const context=this;
  const _this = this;
  this.showLoader();
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;

 console.log("this.state.applied_leave_id",this.state.applied_leave_id)
 console.log("this.state.leave_approvals_id",this.state.leave_approvals_id)
  var data = new FormData();
data.append("applied_leave_id",this.state.applied_leave_id );
data.append("leave_approval_id", this.state.leave_approvals_id);

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
     context.props.navigation.navigate("Approve_leaves_detail_page",{data_sec:xhr.responseText});
     context.props.navigation.navigate("Approve_leaves_detail_page",{xyz:xyz});
  }else {
    _this.enableModal(xhr.status, "021");
  }
});

xhr.open("POST", `${baseURL}/leave-detail`);
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
xhr.setRequestHeader("Content-Type", "multipart/form-data");
xhr.send(data);
}
approveLeave=async()=>{
  const {baseURL} = this.state;
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
  const _this = this;
  const context=this;
  this.showLoader();
  var data = new FormData();
  data.append("remark", this.state.remark);
  data.append("leave_approval_id", this.state.leave_approval_id);
  data.append("leave_status", this.state.button_value);
  
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function() {
    if(this.readyState !== 4) {
      return;
      
    }if(xhr.status === 200) {
      _this.hideLoader();
      console.log("200",xhr.responseText)
      context.setState({remark:'', saveRemark: false, remarkError: true})
      if(context.state.leave_approve_status == 0){
        Alert.alert("Leave Approved Successfully")
        context.setState({ slideAnimationDialog: false });
      }
      if(context.state.leave_approve_status == 1){
        Alert.alert("Leave Rejected Successfully")
        context.setState({ slideAnimationDialog: false });
      }
      _this.initialize();
    }else if(xhr.status === 405){
      _this.hideLoader();
      context.setState({remark:'', saveRemark: false, remarkError: true})
      context.setState({ slideAnimationDialog: false });
      Alert.alert("You cannot approve leave for previous month's date now")
    }else{
      _this.hideLoader();
      let error=xhr.responseText;
      let error_withOut_validation= error.error;
      let error_with_validation = error.validation_error;
      console.log("else",error)
      context.setState({remark:'', saveRemark: false, remarkError: true})
      context.setState({ slideAnimationDialog: false });
      _this.enableModal(xhr.status, "022");
  } 
  
  });
  
  xhr.open("POST", `${baseURL}/leave-approval`);
  xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
  
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
xyz(){
  this.show_leaves();
  this.abc();
}
goverment = () => {
  
  this.setState({button_value:0});
  this.approveLeave();
  
};
confirmCorporate(){
  this.setState({saveRemark: true})
  if(this.state.remarkError === true){
    Alert.alert("Please fill the field highlighted in RED")
  }else{
    this.corporate();
  }
}
corporate = () => {
  this.setState({leave_approve_status:'0'})
  this.setState({button_value:1});
  this.approveLeave();
};

confirmReject(){
  this.setState({saveRemark: true})
  if(this.state.remarkError === true){
    Alert.alert("Please fill the field highlighted in RED")
  }else{
    this.Rejected();
  }
}
Rejected = () => {
  this.setState({leave_approve_status:'1'})
  this.setState({button_value:2});
  this.approveLeave();
};

from_month(){
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  // if(mm==1) 
  // {
  //     mm='January';
  // } 
  // if(mm==2) 
  // {
  //     mm='February';
  // }
  // if(mm==3) 
  // {
  //     mm='March';
  // }
  // if(mm==4) 
  // {
  //     mm='April';
  // }
  // if(mm==5) 
  // {
  //     mm='May';
  // }
  // if(mm==6) 
  // {
  //     mm='June';
  // }
  // if(mm==7) 
  // {
  //     mm='July';
  // }
  // if(mm==8) 
  // {
  //     mm='August';
  // }
  // if(mm==9) 
  // {
  //     mm='September';
  // }
  // if(mm==10) 
  // {
  //     mm='October';
  // }

  // if(mm<11) 
  // {
  //   mm='November';
  // } 
  // if(mm<12) 
  // {
  //   mm='December';
  // } 
  today = yyyy+'-'+mm+'-'+'01';
  this.setState({Month:mm})
  console.log(mm);
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
  today = yyyy+'-'+mm+'-'+'30';
  this.setState({Year:yyyy})
  console.log(yyyy);
}

componentDidMount(){
  this.initialize();
}

async initialize(){
  await this.extractLink();
  this.from_month();
  this.to_month();
  this.show_leaves();
}

async extractLink(){
  await extractBaseURL().then((baseURL) => {
    this.setState({baseURL}, () => console.log("EXTRACT LINK: ", this.state.baseURL))
  })
}

renderScreenHeader(employer){
  switch(employer){
    case "XEAMHO":
      return (
        <WaveHeader
          wave={Platform.OS ==="ios" ? false : false} 
          //logo={require('../Image/Logo-164.png')}
          menu='white'
          title='Approve Leaves List'
          //version={`Version ${this.state.deviceVersion}`}
        />
            );
    case "Lehri HO":
      return (
        <WaveHeader
          wave={Platform.OS ==="ios" ? false : false} 
          //logo={require('../Image/Logo-164.png')}
          menu='white'
          title='Approve Leaves List'
          //version={`Version ${this.state.deviceVersion}`}
        />
            );
    case "Aarti Drugs Ltd":
      return <Header navigation={this.props.navigation} title='Approve Leaves List' width={[getWidthnHeight(50)]} menu="white" images={false}/>
    default:
      return null;
    }
  }

    render (){
          const {leaves,message,msg,xyz,employee,sender,name,from, errorCode, apiCode, slideAnimationDialog, saveRemark, remarkError, leaveStatus}= this.state;
           const context=this;
           //console.log(leaves.secondary_final_status)
            
           
           console.log("leave_approval_id",this.state.leave_approval_id)
           let status = [{value: 'Pending',leave_status:'0'}, {value: 'Approved',leave_status:'1'}, {value: 'Rejected',leave_status:'2'},];
           let Month = [{value: 'January',leave_status:'0'}, {value: 'February',leave_status:'1'}, {value: 'March',leave_status:'2'},{value: 'April',leave_status:'2'},{value: 'May',leave_status:'2'},{value: 'June',leave_status:'2'},{value: 'July',leave_status:'2'},{value: 'August',leave_status:'2'},{value: 'September',leave_status:'2'},{value: 'October',leave_status:'2'},{value: 'November',leave_status:'2'},{value: 'December',leave_status:'2'},];
           let Year = [{value: '2016',leave_status:'0'}, {value: '2017',leave_status:'1'}, {value: '2018',leave_status:'2'}, {value: '2019',leave_status:'2'}, {value: '2020',leave_status:'2'}, {value: '2021',leave_status:'2'}, {value: '2022',leave_status:'2'}, {value: '2023',leave_status:'2'}];
           // console.log(employee)
           var today = new Date();
           var mm = today.getMonth()+1; 
            var yyyy = today.getFullYear();
            if(mm==1) 
            {
                mm='January';
            } 
            if(mm==2) 
            {
                mm='February';
            }
            if(mm==3) 
            {
                mm='March';
            }
            if(mm==4) 
            {
                mm='April';
            }
            if(mm==5) 
            {
                mm='May';
            }
            if(mm==6) 
            {
                mm='June';
            }
            if(mm==7) 
            {
                mm='July';
            }
            if(mm==8) 
            {
                mm='August';
            }
            if(mm==9) 
            {
                mm='September';
            }
            if(mm==10) 
            {
                mm='October';
            }

            if(mm==11) 
            {
              mm='November';
            } 
            if(mm==12) 
            {
              mm='December';
            } 
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
      <View style={{height:'100%',top:'0%',backgroundColor:'white'}}>
      
      <ActionModal 
        isVisible={slideAnimationDialog}
        style={{justifyContent: 'flex-end', alignItems: 'center'}}
        avoidKeyboard={true}
        onBackdropPress={() => this.setState({
          remark: '', saveRemark: false, remarkError: true
        }, () => this.setState({slideAnimationDialog: false}))
        }
      >
        <View style={[{alignItems: 'center', backgroundColor: 'white', borderRadius: 10}, getWidthnHeight(85, 40)]}>
        {(this.state.loading) ?
            <View style={[{
              flex:0,flexDirection:'row', backgroundColor: '#EFEFEF',
              alignItems: 'center', justifyContent: 'center',
              position: 'absolute', borderRadius: 10,
              shadowOffset:{  width: 0,  height: 5,  },
              shadowColor: '#000000',
              shadowOpacity: 0.3,
              shadowRadius: 5,
              elevation: 10,
              zIndex: 10
              }, getWidthnHeight(45, 10), getMarginTop(10)]}>

              <ActivityIndicator  size="large" color='rgb(19,111,232)' />
              <Text style={{fontSize:15,left:10}}>Loading..</Text>
            </View>
        : null}
        <View style={[{backgroundColor:'#F1F1F1', justifyContent: 'center'}, getWidthnHeight(85, 7)]}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', textAlignVertical: 'center'}}>Action for Leave</Text>
        </View>
        <View style={[{justifyContent: 'space-evenly', backgroundColor: 'white', alignItems: 'center', flex: 1}, getWidthnHeight(75)]}>
        <TextInput
                  style={[{backgroundColor: 'white' ,borderColor: (saveRemark && remarkError)? 'red' : 'rgb(19,111,232)', borderWidth: 1, fontSize:14}, getWidthnHeight(75, 12)]}
                  placeholder={'Remarks'}
                  multiline
                  numberOfLines={4}
                  editable
                  maxLength={190}
                  onChangeText={remark => {
                    this.setState({
                      remark, 
                      remarkError: false
                    })
                    if(remark === ''){
                      this.setState({remarkError: true})
                    }
                  }}
                  value={this.state.remark}
                />
                
            <View style={{flexDirection:'row',backgroundColor:'#f1f1f1', width:'100%', marginVertical: 10}}>
                <Text style={{margin:5,fontSize:12,}}> Reason:</Text>
                  <Text style={{margin:5,fontSize:12,width:'75%'}}>{this.state.reson}</Text>
                </View>
                 
            <View style={[{flexDirection:'row',alignItems:'center',justifyContent:'space-around',}, getWidthnHeight(75)]}>
              {(leaveStatus === '0' || leaveStatus === '2')?
              <TouchableOpacity style={{
                backgroundColor:'green',
                paddingLeft:5,
                paddingRight:5,
                paddingTop:5,
                paddingBottom:5,
                borderRadius:5,
                width:'40%'}} onPress={this.confirmCorporate.bind(this)}>
                  <Text style={{color:'white',textAlign:'center'}}>Approve</Text>
              </TouchableOpacity> 
              : null }
              {(leaveStatus === '0' || leaveStatus === '1')?
              <TouchableOpacity style={{
                backgroundColor:'red',
                paddingLeft:5,
                paddingRight:5,
                paddingTop:5,
                paddingBottom:5,
                borderRadius:5,
                width:'40%'}} onPress={this.confirmReject.bind(this)}>
                <Text style={{color:'white',textAlign:'center'}}>Reject</Text>
              </TouchableOpacity> 
              : null}
            </View>
          </View>
        </View>
      </ActionModal>
      <View style={{alignItems: 'center'}}>
        <Dropdown
          containerStyle={{width:'50%'}}
          inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
          data={status}
          label='Status'
          value={'Pending'}
          onChangeText={ status =>{
            if(status==='Pending'){
              context.setState({status:'0'}) ||this.show_leaves()
            }
            if(status==='Approved'){
              context.setState({status:'1'}) ||this.show_leaves()
            }
            if(status==='Rejected'){
              context.setState({status:'2'}) ||this.show_leaves()
            }
            } }
        />
      </View>  
         <View style={styles.date_component}>
              <Text style={{bottom:'6%',backgroundColor:'white',color:'rgb(19,111,232)'}}>    Search for Particular Date    </Text>
<View style={{flexDirection:'row',top:0}}>
      
<Dropdown
              containerStyle={{width:'30%',right:10,bottom:10}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={Month}
              fontSize={14}
              value={mm}
              label='Month'
              onChangeText={ Month =>{
                if(Month==='January'){
                  context.setState({Month:'1'})
                }
                if(Month==='February'){
                  context.setState({Month:'2'})
                }
                if(Month==='March'){
                  context.setState({Month:'3'})
                }
                if(Month==='April'){
                  context.setState({Month:'4'})
                }
                if(Month==='May'){
                  context.setState({Month:'5'})
                }
                if(Month==='June'){
                  context.setState({Month:'6'})
                }
                if(Month==='July'){
                  context.setState({Month:'7'})
                }
                if(Month==='August'){
                  context.setState({Month:'8'})
                }
                if(Month==='September'){
                  context.setState({Month:'9'})
                }
                if(Month==='October'){
                  context.setState({Month:'10'})
                }
                if(Month==='November'){
                  context.setState({Month:'11'})
                }
                if(Month==='December'){
                  context.setState({Month:'12'})
                }
               } }
              
            />

            <Dropdown
              containerStyle={{width:'30%',left:'0%',bottom:10}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={Year}
              fontSize={14}
              value={yyyy}
              label='Year'
              onChangeText={ Year =>{ context.setState({ Year }) } }
              
            />
       
          <TouchableOpacity style={{top:20}} onPress={()=>this.show_leaves()}>
          <Image
                          source={require('../Image/search.png')}
                          style={{ width: 35, height: 35, marginLeft: 20,top:0,borderRadius:0 }}
                        />
      </TouchableOpacity>
    </View>
    
      </View>
      
      <View style={{top:'5%',height:'100%',}}>
      
        <TitleBox lable='Task List'/>
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
           
           <View style={{height: '55%',top:10}} >
      <ScrollView >
        
      {this.state.mandatory == 0 ?
     <View>
       
      {leaves.map((item) => {
         console.log("LEAVE STATUS: ", item.leave_status, typeof item.leave_status)
         let from_day = item.applied_leave.from_date.substring(8,10);
         let from_month = item.applied_leave.from_date.substring(5,7);
         let from_year = item.applied_leave.from_date.substring(0,4);
         let from_date = from_day+"/"+from_month+"/"+from_year;
        
         let to_day = item.applied_leave.to_date.substring(8,10);
         let to_month = item.applied_leave.to_date.substring(5,7);
         let to_year = item.applied_leave.to_date.substring(0,4);
         let to_date = to_day+"/"+to_month+"/"+to_year;
      return (
        
                <View>
                   <View style={ styles.Approved }>
               <View style={{flexDirection:'row'}}> 
                <Text style={{fontSize:18,fontWeight:'bold',paddingTop:10,width:'90%',}}>  {item.user.employee.fullname}  ({item.user.employee_code}) </Text>
                
                <TouchableOpacity 
                  onPress={() => {
                    this.setState({leaveStatus: item.leave_status})
                    this.setState({
                      slideAnimationDialog: true,
                      leave_approval_id:item.id,
                      reson:item.applied_leave.reason
                    });
                  }}
                  style={{top:hp('2%'),right: wp('1%')}}
                >
                <Image source={require('../Image/eye.png')}/>
                </TouchableOpacity>
                

                </View>
                <NameBottomBorder/>
                
                <View style={{flexDirection:'row'}}>
                <Text style={{margin:5,fontSize:12,color:'gray'}}> From : </Text>
                <Text style={{margin:5,fontSize:12}}>{from_date}    |</Text>
                <Text style={{margin:5,fontSize:12,color:'gray'}}> To : </Text>
                <Text style={{margin:5,fontSize:12}}>{to_date} </Text>
                </View>

                <View style={{flexDirection:'row'}}>
                <Text style={{margin:5,fontSize:12,color:'gray'}}> No. of days  : </Text>
                <Text style={{margin:5,fontSize:12}}>{item.applied_leave.number_of_days}</Text>
                </View>
 
 
                
                </View>
                
                </View>
                
                
            )
    })}
</View>
 :
 <View style={{flexDirection:'row',justifyContent:'center',bottom:'0%',}}>
   <Text style={{color:'gray',fontSize:20}}>No data </Text>
 </View>
 
 }
    
    </ScrollView>
    </View>
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
   
    Approved:{
      flexDirection:'column',
      
      width:'95%',
      backgroundColor:'transparent',
      borderRadius: 0,
      borderTopWidth: 1,
      borderBottomWidth:1,
      borderRightWidth:1,
      borderLeftWidth:5.5,
      borderLeftColor: '#85b3d1',
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent',
      margin:10,
      shadowColor: '#330000',
      shadowOffset:{  width: 100,  height: 150,  },
                      shadowOpacity: 5,
                      // shadowRadius: 0,
                      elevation: 3,
                      overflow: "hidden"
    },
    
    
    date_component: {
      
      left:'5%',
      top:20,
       flexDirection:'column',
      margin:'0%',
      marginBottom:'0%',
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
   

    
   
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    

  });
