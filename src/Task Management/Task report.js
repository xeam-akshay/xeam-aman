import React, {Component, useRef, useEffect} from 'react';
import {
    Animated,
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
   SafeAreaView
} from 'react-native';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,
} from 'react-native-card-view';
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
import GradientButton from '../Components/Minus'
import GradientSubmitButton from '../Components/Gradient button'
import KeyboardShift from '../KeyboardShift'
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
import {CommonModal} from '../KulbirComponents/common';

const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  
    React.useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 1000,
        }
      ).start();
    }, [fadeAnim])
  
    return (
      <Animated.View                 // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {props.children}
      </Animated.View>
    );
  }
  

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class RequestedDateExtensionList extends Component {

  constructor(props){
  super(props)
  this.state={
                loading: false,
                slideAnimationDialog: false,
                 status:'',
                 remark:'',
                 mandatory:'0',
                 reson:'',
                 title:'',
                 assigned_date:'',
                 required_date:'',
                 final_status:'',
                 Data:[],
                 user_name:'',
                 user_remarks:'',
                 modal_required_date:'',
                 alloted_date:'',
                 modal_task_id:'',
                 modal_status:'',
                 modal_id:'',
                 comment:'',
                 hide:'false',
                 from_date:'',
                 to_date:'',
                 project:[],
                 departments:[],
                 employees:[],
                 departments_Value:'',
                 employees_Value:'',
                 taskReport:[],
                 employeeTaskData:[],
                 employeeComponentHide:'false',
                 task_report_user_id:'',
                 task_report_emp_id:'',
                 employeeTaskDetailsData:[],
                 employee_name:'',
                 employee_picture:'',
                 employee_points_obtained:'',
                 employee_task_points:'',
                 efficiency:'',
                 noDataScreen:'0',
                 baseURL: null,
                 errorCode: null,
                 apiCode: null,
                 commonModal: false
              }
         }
  static navigationOptions = {

                  };

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

show_approval_date_extension_list=async()=>{
    const {baseURL} = this.state;
    //this.detailPage();
    console.log(this.state.status)
    const context=this;
    const _this = this;
    this.showLoader();
    var user_token= await AsyncStorage.getItem('user_token');
    var permissions_fir= JSON.parse(user_token);
    var permissions_four=permissions_fir.success.secret_token;
    var name = permissions_fir.success.user.employee.fullname;
    var id = permissions_fir.success.user.id;
    this.setState({name:name})
   
    var data = new FormData();

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
    if (xhr.readyState !== 4) {
        return;
    }
     if(xhr.status===200){
         _this.hideLoader();
         console.log(xhr.responseText);
        var json_obj = JSON.parse(xhr.responseText);
        var Data = json_obj.data;
        context.setState({mandatory:'0'})
        context.setState({Data:Data})
        
         {Data.map((item) => {
          
            context.setState({title:item.task_name})
            context.setState({assigned_date:item.assigned_date})
            context.setState({required_date:item.required_date})
            context.setState({final_status:item.status})
          })}
        
    
     }
     else{
      console.log(xhr.responseText);
      context.setState({mandatory:'1'})
      console.log("inside error")
      _this.hideLoader();
      _this.enableModal(xhr.status, "047");
     }
});

xhr.open("GET", `${baseURL}/request-task-date-extension/` +id + "/" + this.state.status);
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
  const {baseURL} = this.state;
  console.log("detailpage")
  const {leaves,message,msg,xyz}= this.state;
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
  if (xhr.status == 200){
    _this.hideLoader();
      
    var adf = JSON.parse(xhr.responseText);
  var xyz = adf.success.leave_detail.id;
  console.log("xyz",xyz);
   context.props.navigation.navigate("Approve_leaves_detail_page",{data_sec:xhr.responseText});
   context.props.navigation.navigate("Approve_leaves_detail_page",{xyz:xyz});
  }
  else{
    _this.hideLoader();
    var data = JSON.parse(xhr.responseText);
    console.log(data)
    _this.enableModal(xhr.status, "048");
  }
});

xhr.open("POST", `${baseURL}/leave-detail`);
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
xhr.setRequestHeader("Content-Type", "multipart/form-data");
xhr.send(data);
}
approveRejectTaskDateExtension=async()=>{
  const {baseURL} = this.state;
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
  const _this = this;
  const context=this;
  this.showLoader();
  var data = new FormData();
    data.append("status", this.state.modal_status);
    data.append("task_id", this.state.modal_task_id);
    data.append("allot_date", this.state.alloted_date);
    data.append("comment", this.state.comment);
    data.append("id", this.state.modal_id);
  
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function() {
    if(this.readyState !== 4) {
      return;
      
    }if(xhr.status === 200) {
      _this.hideLoader();
      console.log("200",xhr.responseText)
      if(context.state.leave_approve_status == 0){
      Alert.alert("Leave Approved Successfully")
      context.setState({ slideAnimationDialog: false });
      }
      if(context.state.leave_approve_status == 1){
        Alert.alert("Leave Rejected Successfully")
        context.setState({ slideAnimationDialog: false });
        }
      //context.setState({remark:''})
    }else{
      _this.hideLoader();
     let error=xhr.responseText;
         let error_withOut_validation= error.error;
         let error_with_validation = error.validation_error;
      console.log("else",error)
      //context.setState({remark:''})
      if(error == '{"validation_error":{"remark":["The remark field is required."]}}'){
        Alert.alert("remark : The remark field is required.")
        }else{
          Alert.alert("You cannot approve leave for a previous month's date now.")
        }
        _this.enableModal(xhr.status, "049");
  } 
  
  });
  
  xhr.open("POST", `${baseURL}/approve-reject-task-date-extension`);
  xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
  
  xhr.send(data);
}

xyz(){
  this.show_approval_date_extension_list();
  this.abc();
}
goverment = () => {
  
  this.setState({button_value:0});
  this.approveRejectTaskDateExtension();
  
};
corporate = () => {
  this.setState({leave_approve_status:'0'})
  this.setState({button_value:1});
  this.approveRejectTaskDateExtension();
};
Rejected = () => {
  this.setState({leave_approve_status:'1'})
  this.setState({button_value:2});
  this.approveRejectTaskDateExtension();
};


componentDidMount(){
//   this.from_month();
//   this.to_month();
  this.initialize();
}

async initialize(){
  await this.extractLink();
  this._taskReport();
  this.projects();
  this.departments();
}

projects=async()=>{
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
      if(this.readyState !== 4) {
       return;
      }
      if(xhr.status == 200){
        _this.hideLoader();
        var data = JSON.parse(xhr.responseText);
        console.log(data)
        var project = data.data;
        _this.setState({project:project});
        
      }else{
        _this.hideLoader();
        var data = JSON.parse(xhr.responseText);
        console.log(data)
        _this.enableModal(xhr.status, "050");
      }
    });
    
    xhr.open("GET", `${baseURL}/projects`);
    xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
    
    xhr.send(data);

}

departments=async()=>{
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
        if(this.readyState !== 4) {
        return;
      }
      if(xhr.status == 200){
        _this.hideLoader();
        var data = JSON.parse(xhr.responseText);
        console.log(data)
       var departments = data.success.departments;
      _this.setState({departments:departments});
      }else{
        _this.hideLoader();
        var data = JSON.parse(xhr.responseText);
        console.log(data)
        _this.enableModal(xhr.status, "051");
      }
});

xhr.open("GET", `${baseURL}/departments`);
xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);

xhr.send(data);
}
employee=async()=>{
    const {baseURL} = this.state;
    var user_token= await AsyncStorage.getItem('user_token');
    var permissions_fir= JSON.parse(user_token);
    var permissions_four=permissions_fir.success.secret_token;
    const _this = this;
    const context=this;
    this.showLoader();
    var data = new FormData();
    data.append("department_ids", this.state.departments_Value);
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState !== 4) {
       return;
      }
      if(xhr.status == 200){
        _this.hideLoader();
        var data = JSON.parse(xhr.responseText);
        console.log(data)
    var employees = data.success.employees;
    _this.setState({employees:employees});
      }else{
        _this.hideLoader();
        var data = JSON.parse(xhr.responseText);
        console.log(data)
        _this.enableModal(xhr.status, "052");
      }
    });
    
    xhr.open("POST", `${baseURL}/departments-wise-employees`);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
    
    xhr.send(data);
}

_taskReport=async()=>{
    const {baseURL} = this.state;
    console.log("task report")
    var user_token= await AsyncStorage.getItem('user_token');
    var permissions_fir= JSON.parse(user_token);
    var permissions_four=permissions_fir.success.secret_token;
    const _this = this;
    const context=this;
    this.showLoader();
    var data = new FormData();
data.append("from_date", this.state.from_date );
data.append("to_date", this.state.to_date);
data.append("no_days", "30");
data.append("weekends", "0");
data.append("holidays", "0");
data.append("department", this.state.departments_Value);
data.append("project", this.state.status);
data.append("employee_id", this.state.employees_Value);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState !== 4) {
    return;
  }
  if(xhr.status == 200){
    _this.hideLoader();
    var data = JSON.parse(xhr.responseText);
    //console.log(data)
    console.log("SUCCESS: ", xhr.status);
    var taskReport = data.data;
    _this.setState({taskReport:taskReport})
    _this.setState({noDataScreen:'0'});
  }else{
    _this.hideLoader();
    var data = JSON.stringify(xhr.responseText);
    console.log("ERROR: ", xhr.status, data);
    _this.setState({noDataScreen:'1'});
    _this.enableModal(xhr.status, "053");
  }
});

xhr.open("POST", `${baseURL}/task-report`);
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);

xhr.send(data);
}
employeeTaskDetails=async()=>{
    const {baseURL} = this.state;
    console.log("employeeTaskDetails")
    var user_token= await AsyncStorage.getItem('user_token');
    var permissions_fir= JSON.parse(user_token);
    var permissions_four=permissions_fir.success.secret_token;
    const _this = this;
    const context=this;
    this.showLoader();
    var data = new FormData();
data.append("from_date", this.state.from_date);
data.append("to_date", this.state.to_date);
data.append("user_id", this.state.task_report_user_id);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState !== 4) {
    return;
  }
  if(xhr.status == 200){
    _this.hideLoader();
    var data = JSON.parse(xhr.responseText);
    var employeeTaskDetailsData = data.data;
    _this.setState({employeeTaskDetailsData:employeeTaskDetailsData})
    
  }else{
    _this.hideLoader();
    var data = JSON.parse(xhr.responseText);
    console.log(data)
    _this.enableModal(xhr.status, "054");
    
  }
});

xhr.open("POST", `${baseURL}/user-task-report`);
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);

xhr.send(data);
}

combineFunctions(){
    this.projects();
    this.departments();
}

    render (){
          const {leaves,message,msg,xyz,employee,sender,name,from, errorCode, apiCode}= this.state;
          const context=this;
          let Extension_status = [{name: 'Pending',id:'pending'}, {name: 'Approved',id:'approved'}, {name: 'Rejected',id:'rejected'},];
          
		return(
      <View style={{height:viewportHeight,width:viewportWidth,backgroundColor:'white'}}>
         <Header title='Task Report' onPress={() => {this.props.navigation.toggleDrawer()}}/>
      <View style={{height:'100%',top:'0%',backgroundColor:'white'}}>
     
      <Dialog
        onDismiss={() => { 
          this.setState({ slideAnimationDialog: false });
        }}
        onTouchOutside={() => {
          this.setState({ slideAnimationDialog: false });
        }} 
        containerStyle={{paddingLeft:'10%',paddingRight:'10%',backgroundColor: 'transparent',zIndex: 10, elevation: 10}}
        // overlayBackgroundColor={'transparent'}
        visible={this.state.slideAnimationDialog}
        dialogTitle={<DialogTitle title="Remarks" />}
        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
       >
        <DialogContent>
          <View style={{height:'40%',marginLeft:'5%',marginRight:'5%',}}>
          
          {(this.state.loading) ?
        <View style={{
                   flex:1,flexDirection:'row',width: '50%', backgroundColor: '#EFEFEF',
                   alignItems: 'center', justifyContent: 'center',
                   position: 'absolute', height:'50%',
                   shadowOffset:{  width: 100,  height: 100,  },
                   shadowColor: '#330000',
                   shadowOpacity: 0,
                   shadowRadius: 5,
                   elevation: 10,
                   left:'25%',
                   top:'100%'
               }}>

        <ActivityIndicator  size="large" color='rgb(19,111,232)' />
                <Text style={{fontSize:15,left:10}}>Loading..</Text>
        </View>
        : null}
          <View style={{top:hp(2),}}>
         
         
          <Text style={{color:'rgb(19,111,232)'}}>{this.state.user_name}</Text>
            <View style={{flexDirection:'column',backgroundColor:'#f1f1f1', borderWidth: 0,top:10,width:'100%'}}>
                         
                  <Text style={{margin:5,fontSize:12,width:'75%'}}>{this.state.user_remarks}</Text>
                  
                </View>
                </View>
      
           </View>
        </DialogContent>
      </Dialog>
     
      {this.state.hide == 'false' ?
         <View style={styles.date_component}>
             
            
             <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                 <Text style={{width:'80%'}}>
                      Generate Report
                 </Text>
                 <GradientButton 
                 style={{paddingTop:0,
                  paddingBottom:0,
                  paddingLeft:14,
                  paddingRight:14,
                  height:28,
                borderRadius:30}}
                  onPress={ () => this.setState({hide:'ture'}) }
                 />
                 <TouchableOpacity onPress={ () => this.setState({hide:'ture'}) }>
                 <Text style={{ color:'white',fontSize:35,bottom:2,right:21}}>-</Text>
                 </TouchableOpacity>
             </View>
              
         <View style={{flexDirection:'row',justifyContent:'space-around',top:8}}>
              <View>
            <DatePicker
                  style={{top:'0%',left:'0%',}}
                  date={this.state.from_date}
                  ref={input => { this.textDate = input }}
                  mode="date"
                  placeholder="From Date"
                  format="YYYY-MM-DD"
                  minDate="2016-01"
                  maxDate="2022-12"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  
                  onDateChange={(date) => {this.setState({from_date: date})}}
                />
                <View style={{backgroundColor:'rgb(19,111,232)',height:'1.4%',width:'92%',top:'0%',left:'5%'}}/>
                </View>

                <View>
              <DatePicker
                  style={{top:'0%',left:'0%'}}
                  date={this.state.to_date}
                  ref={input => { this.textDate = input }}
                  mode="date"
                  placeholder="To date"
                  format="YYYY-MM-DD"
                  minDate="2016-01"
                  maxDate="2022-12"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                 
                  onDateChange={(date) => {this.setState({to_date: date}) || this.combineFunctions()}}
                />
                <View style={{backgroundColor:'rgb(19,111,232)',height:'1.4%',width:'92%',top:'0%',left:'5%'}}/>
                </View>
            </View>
     <Dropdown
              containerStyle={{width:'90%'}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={this.state.project}
              valueExtractor={({id})=> id}
              labelExtractor={({name})=> name}
              label='Projects'
              value={this.state.status}
              onChangeText={ status =>{ context.setState({ status }) }}
              
            />

<View style={{flexDirection:'column',width:'90%'}}>
                  <Dropdown
              containerStyle={{left:'0%'}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={this.state.departments}
              value={this.state.replacement_person_a}
              valueExtractor={({id})=> id}
              labelExtractor={({name})=> name}
              label='Depatment (optional)'
              onChangeText={departments_Value => this.setState({ departments_Value }) || this.employee()}
             
            />
              
               <Dropdown
              containerStyle={{left:'0%'}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)", }}
              data={this.state.employees}
              value={this.state.replacement_person_b}
              valueExtractor={({user_id})=> user_id}
              labelExtractor={({fullname})=> fullname}
             
              overflow= 'hidden'
              label='Employee (optional)'
              onChangeText={employees_Value => this.setState({ employees_Value })}
            />
            </View>
           <GradientSubmitButton
           style={{fontSize:0,paddingTop:10,
            paddingBottom:10,
            paddingLeft:30,
            paddingRight:30,
            borderRadius:30}}
            lable={'SUBMIT'}
            onPress={ () => this._taskReport() }/>


        
      
      </View>
      : 
      <FadeInView>
      <View style={styles.date_component}>
            
             <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                 <Text style={{width:'80%'}}>
                      Genarate Report
                 </Text>
                 <GradientButton 
                 style={{paddingTop:0,
                    paddingBottom:0,
                    paddingLeft:14,
                  paddingRight:14,
                    height:28,
                  borderRadius:30}}
                  
                  onPress={ () => this.setState({hide:'false'}) }
                 />
                 <TouchableOpacity onPress={ () => this.setState({hide:'false'}) }>
                 <Text style={{ color:'white',fontSize:30,bottom:3,right:22.5}}>+</Text>
                 </TouchableOpacity>
             </View>
              
      </View>
      </FadeInView>
      }
      <View style={{top:'5%',height:'100%',}}>
      
        <TitleBox lable='Task Report List'/>
       
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
                   top:'18%'
               }}>

        <ActivityIndicator  size="large" color='rgb(19,111,232)' />
                <Text style={{fontSize:15,left:10}}>Loading..</Text>
        </View>
        : null}
           
           <View style={{height: '65%',top:10,left:'0%'}} >
               
           {this.state.employeeComponentHide == 'true' ?
           <View style={{paddingLeft:10,paddingRight:10,height:'100%'}}>
           <View style={{flexDirection:'column',justifyContent:'space-between',borderColor:'rgb(19,111,232)',borderWidth:1,borderRadius:5,paddingBottom:40}}>
           <View style={{flexDirection:'row',paddingTop:10}}>
                       <Image source={{uri:this.state.employee_picture}} style={{left:'5%',bottom:0,height:50,width:50,borderRadius:75,borderColor:'rgb(19,111,232)',alignItems:'center',borderColor:'transparent',borderWidth:1,bottom:0}}/>
                            <View style={{flexDirection:'column',width:'70%'}}>
                            <Text style={{left:'5%',color:'rgb(19,111,232)',fontSize:15}}>{this.state.employee_name}</Text>
                                <Text style={{left:'5%',color:'gray',fontSize:11}}>{this.state.task_report_emp_id}</Text>
                                </View>
                                <GradientButton 
                                            style={{paddingTop:0,
                                                paddingBottom:0,
                                                paddingLeft:14,
                                                paddingRight:14,
                                                height:28,
                                            borderRadius:30}}
                                            onPress={ () => this.setState({employeeComponentHide:'false'}) }
                                            />
                          <TouchableOpacity onPress={ () => this.setState({employeeComponentHide:'false'}) }>
                        <Text style={{ color:'white',fontSize:25,top:7,right:20}}>x</Text>
                        </TouchableOpacity>
                        </View>

                        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:10,marginBottom:10}}>
                            <View style={{backgroundColor:'rgb(22,179,235)',flexDirection:'row',paddingTop:5,paddingBottom:5,paddingLeft:10,paddingRight:10,borderRadius:5}}>
                                <Text style={{color:'white',fontSize:10}}>Task Points    </Text>
                                <Text style={{backgroundColor:'white',fontSize:8}}>{this.state.employee_task_points}</Text>
                            </View>
                            <View style={{backgroundColor:'rgb(20,153,72)',flexDirection:'row',paddingTop:5,paddingBottom:5,paddingLeft:10,paddingRight:10,borderRadius:5}}>
                                <Text style={{color:'white',fontSize:10}}>Point Obtained    </Text>
                                <Text style={{backgroundColor:'white',fontSize:8}}>{this.state.employee_points_obtained}</Text>
                            </View>
                            <View style={{backgroundColor:'rgb(238,138,18)',flexDirection:'row',paddingTop:5,paddingBottom:5,paddingLeft:10,paddingRight:10,borderRadius:5}}>
                                <Text style={{color:'white',fontSize:10}}>Efficiency    </Text>
                                <Text style={{backgroundColor:'white',fontSize:8,}}>{this.state.efficiency}%</Text>
                            </View>
                        </View>

                        <TitleBox lable='All Task'/>
                         
                        <View style={{height: '75%',top:10,left:'0%',}} >
                        <ScrollView >
                        
       <View>
       {this.state.employeeTaskDetailsData.map((item) => {
         if(item.task_user.is_delayed == '0'){
             var isactive_value = "On Time";
             var backgroundColor = 'green'
         }
         if(item.task_user.is_delayed == '1'){
            var isactive_value = "Overdue";
            var backgroundColor = 'red'
        }
        if(item.priority == 'H1'){
           
            var priorityColor = '#fffdd0'
        }
        if(item.priority == 'H2'){
            
            var priorityColor = '#ffff00'
        }
        if(item.priority == 'H3'){
            
            var priorityColor = '#00ffff'
        }
        if(item.priority == 'H4'){
            
            var priorityColor = '#ffa500'
        }
        if(item.priority == 'H5'){
            
            var priorityColor = '#ff0000'
        }

       
       return (
         
                 <View>
                    <View style={ styles.Approved }>
                        <View style={{flexDirection:'row'}}>
                    <View style={{backgroundColor:backgroundColor,paddingTop:0,width:'20%',borderRadius:5,top:10,left:5}}>
                        <Text style={{color:'white',left:5}}>{isactive_value}</Text>
                    </View>
                    <View style={{backgroundColor:priorityColor,paddingTop:0,width:'10%',borderRadius:5,top:10,left:15}}>
                        <Text style={{left:5}}>{item.priority}</Text>
                    </View>
                    </View>
                    <View style={{flexDirection:'row',paddingTop:10}}> 
                    <Text style={{fontSize:12,fontWeight:'bold',paddingTop:5,width:'90%'}}>  {item.title}</Text>
                    {/* <TouchableOpacity 
                 onPress={() => { 
                     this.setState({
                         employeeComponentHide:'true'
                       }) || this.employeeTaskDetails()
                  }}
                 style={{top:hp('2%'),right: wp('1%')}}
                 >
                 <Image source={require('../Image/eye.png')}/>
                 </TouchableOpacity> */}
                 
                 </View>
                 <NameBottomBorder/>
                 <View style={{flexDirection:'row',paddingTop:10,paddingBottom:10}}>
                 <Text style={{margin:5,fontSize:11,color:'gray'}}>Task Status :</Text>
                 <Text style={{margin:5,fontSize:11,right:8}}>{item.status}   |</Text>
                 <Text style={{margin:5,fontSize:11,color:'gray',right:15}}> User Status :</Text>
                 <Text style={{margin:5,fontSize:11,right:22}}>{item.task_user.status}</Text>
                 </View>
 
                 <View style={{flexDirection:'row',paddingBottom:10}}>
                 <Text style={{margin:5,fontSize:11,color:'gray'}}> Task Points  : </Text>
                 <Text style={{margin:5,fontSize:11}}>{item.points}  |</Text> 
                 <Text style={{margin:5,fontSize:11,color:'gray'}}> Task Obtained  : </Text>
                 <Text style={{margin:5,fontSize:11}}>{item.points_obtained}</Text>
                 </View>
  
  
                 
                 </View>
                 
                 </View>
                 
                 
             )
     })}
     </View>
     
 
 </ScrollView >
 </View>

                        </View>
                        </View>:null}
      <ScrollView >
      {this.state.noDataScreen == 0 ?   
        <View>
      {this.state.employeeComponentHide == 'false' ?
     <View>
       
      {this.state.taskReport.map((item) => {
        
      return (
        
                <View>
                   <View style={ styles.Approved }>
                   <View style={{flexDirection:'row',paddingTop:10}}> 
                   <Text style={{fontSize:12,fontWeight:'bold',paddingTop:5,width:'90%'}}>  {item.department}</Text>
                   <TouchableOpacity 
                onPress={() => { 
                    this.setState({
                        employeeComponentHide:'true',
                        task_report_user_id:item.user_id,
                        task_report_emp_id:item.employee_code,
                        employee_name:item.fullname,
                        employee_picture:item.profile_picture,
                        employee_task_points:item.task_points,
                        employee_points_obtained:item.points_obtained,
                        efficiency:item.efficiency
                      }) || this.employeeTaskDetails()
                 }}
                style={{top:hp('2%'),right: wp('1%')}}
                >
                <Image source={require('../Image/eye.png')}/>
                </TouchableOpacity>
                

                </View>
               
                <Text style={{fontSize:15,fontWeight:'bold',paddingTop:0,width:'90%'}}>  {item.fullname}</Text>
                <NameBottomBorder/>
                
                
                <View style={{flexDirection:'row',paddingTop:10,paddingBottom:10}}>
                <Text style={{margin:5,fontSize:11,color:'gray'}}>XEAM CODE :</Text>
                <Text style={{margin:5,fontSize:11,right:8}}>{item.employee_code}   |</Text>
                <Text style={{margin:5,fontSize:11,color:'gray',right:15}}> No.of Tasks :</Text>
                <Text style={{margin:5,fontSize:11,right:22}}>{item.task_count}</Text>
                </View>

                <View style={{flexDirection:'row',paddingBottom:10}}>
                <Text style={{margin:5,fontSize:11,color:'gray'}}> Task Points  : </Text>
                <Text style={{margin:5,fontSize:11}}>{item.task_points}  |</Text> 
                <Text style={{margin:5,fontSize:11,color:'gray'}}> Task Obtained  : </Text>
                <Text style={{margin:5,fontSize:11}}>{item.points_obtained}</Text>
                </View>
 
 
                
                </View>
                
                </View>
                
                
            )
    })}
</View>
 :
null
 
 }
 </View>
 :
      <View style={{flexDirection:'row',justifyContent:'center',}}>
      <Text style={{color:'gray',fontSize:20}}>No data </Text>
    </View>}
    
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
      backgroundColor:'white',
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
      shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.34,
                  shadowRadius: 6.27,
                  elevation: 10,
    },
    
    
    date_component: {
      
      left:'5%',
      paddingTop:10,
      paddingBottom:10,
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
