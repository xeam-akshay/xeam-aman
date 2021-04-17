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
import {CommonModal, IOS_StatusBar, WaveHeader, getWidthnHeight, getMarginTop} from '../KulbirComponents/common';
import { tr } from 'date-fns/locale';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class Leaves extends Component {

  constructor(props){
  super(props)
  this.state={
              employee_code:'',
              userPassword:'',
              device_id:'',
              device_type:'',
              loading: false,
              name:'',
              code:'',
              permissions:'',
              token:'',
              final_data:'',
              task_type:'',
              my_status:'',
              task_status:'',
              task:[],
              isChecked:false,
              checkedDefault: {},
              slideAnimationDialog: false,
              task_title:'',
              task_projects:[],
              departments:[],
              language:'',
              employees:[],
              task_projects_id:'',
              departments_id:'',
              employees_id:'',
              Task_title:'',
              Due_date:'',
              Task_Description:'',
              priority:'',
              reminder:'off',
              reminder_notification:'off',
              reminder_mail:'off',
              singleFileOBJ:'',
              reminder_dropdown:'',
              valueTaskProject:'',
              valueDepartment:'',
              valueEmployee:'',
              valueFrequency:'',
              baseURL: null,
              errorCode: null,
              apiCode: null,
              commonModal: false,
              taskProjectError: true,
              taskTitleError: true,
              priorityError: true,
              departmentError: true,
              employeeError: true,
              dateError: true,
              reminderError: true,
              reminderTypeError: true,
              frequencyError: true,
              descriptionError: true,
              createTask: false,
              noError: function(){
                return (!this.taskProjectError && !this.taskTitleError && !this.priorityError && !this.departmentError && !this.employeeError
                  && !this.dateError && !this.reminderError  && !this.frequencyError && !this.descriptionError)
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
  componentDidMount(){
      this.createTask().done();  
  }

  async extractLink(){
    await extractBaseURL().then((baseURL) => {
      this.setState({baseURL}, () => console.log("EXTRACT LINK: ", this.state.baseURL))
    })
  }

  save_task=async()=>{
    const {baseURL} = this.state;
    const context=this;
    this.showLoader();
    const _this = this;
    console.log("My_task")
    var user_token= await AsyncStorage.getItem('user_token');
    var permissions_fir= JSON.parse(user_token);
    var permissions_sec=permissions_fir.success.secret_token;
    console.log("permissions_sec",permissions_sec)
    var data = new FormData();
    data.append("task_project_id", this.state.task_projects_id);
    data.append("department_ids", this.state.departments_id);
    data.append("assigned_to[]", this.state.employees_id);
    data.append("title", this.state.Task_title);
    data.append("priority", this.state.priority);
    data.append("due_date", this.state.Due_date);
    data.append("description", this.state.Task_Description);
    data.append("reminder", this.state.reminder);
    data.append("reminder_days", this.state.reminder_dropdown);
    data.append("reminder_notification", this.state.reminder_notification);
    data.append("reminder_mail", this.state.reminder_mail);
    data.append("task_files", this.state.singleFileOBJ);
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState !== 4) {
        console.log(xhr.responseText)
        return;
}
      if(xhr.status===200){
        _this.hideLoader();
        var json_obj = JSON.parse(xhr.responseText);
        console.log(xhr.responseText)
        var msg = json_obj.success.message;
        Alert.alert(msg);
        _this.setState({valueTaskProject:''})
        _this.setState({valueDepartment:''})
        _this.setState({valueEmployee:''})
        _this.setState({task_projects_id:''})
        _this.setState({departments_id:''})
        _this.setState({employees_id:''})
        _this.setState({Task_title:''})
        _this.setState({Due_date:''})
        _this.setState({Task_Description:'', singleFileOBJ: ''})
        _this.setState({valueFrequency:'', priority: ''})
        _this.setState({reminder: 'off', reminder_notification: 'off', reminder_mail: 'off'})
        _this.setState({createTask: false, taskProjectError: true, taskTitleError: true, 
          priorityError: true, departmentError: true, employeeError: true, dateError: true, 
          reminderError: true, reminderTypeError: true, frequencyError: true, descriptionError: true
        })
    }
    else{
      console.log(xhr.responseText)
     _this.hideLoader();
     _this.enableModal(xhr.status, "023");
    }
    });
    
    xhr.open("POST", `${baseURL}/save-task`);
    xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);
    xhr.send(data);
  }
     My_task=async()=>{
      const {baseURL} = this.state;
      const context=this;
      const _this = this;
      this.showLoader();
      console.log("My_task")
      var user_token= await AsyncStorage.getItem('user_token');
      var permissions_fir= JSON.parse(user_token);
      var permissions_sec=permissions_fir.success.secret_token;
      var data = new FormData();
      data.append("task_type", this.state.task_type);
      data.append("my_status", this.state.my_status);
      data.append("task_status", this.state.task_status);
      
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState !== 4) {
          return;
}
        if(xhr.status===200){
          _this.hideLoader();
          var json_obj = JSON.parse(xhr.responseText);
          var task = json_obj.success.tasks;
          context.setState({task:task})
          {task.map((item) => {
            return (
                  context.setState({task_title:item.title})
            )})}
      }
      else{
        // console.log(xhr.responseText)
       _this.hideLoader();
       _this.enableModal(xhr.status, "024");
      }
      });
      
      xhr.open("POST", `${baseURL}/my-tasks`);
      xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);
      xhr.send(data);
     }
     taskWithComment(){
      const context=this;
      context.props.navigation.navigate("taskWithComment");
     }
     createTask=async()=>{
        await this.extractLink();
        const {baseURL} = this.state;
        const context=this;
        const _this = this;
        this.showLoader();
        console.log("My_task")
        var user_token= await AsyncStorage.getItem('user_token');
        var permissions_fir= JSON.parse(user_token);
        var permissions_sec=permissions_fir.success.secret_token;
        var data = new FormData();

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState !== 4) {
                return;
      }
              if(xhr.status===200){
                _this.hideLoader();
                var json_obj = JSON.parse(xhr.responseText);
                var task_projects = json_obj.success.task_projects;
                var departments = json_obj.success.departments;
                context.setState({task_projects:task_projects})
                context.setState({departments:departments})
                
            }
            else{
              // console.log(xhr.responseText)
             _this.hideLoader();
             _this.enableModal(xhr.status, "025");
            }
        });
        
        xhr.open("GET", `${baseURL}/create-task`);
        xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);
        xhr.send(data);
     }

     departments_wise_employees=async()=>{
        const {baseURL} = this.state;
        const b="departments_wise_employees";
        console.log(b)
      
        const context=this;
        const _this = this;
        this.showLoader();
        var user_token= await AsyncStorage.getItem('user_token');
        var permissions_fir= JSON.parse(user_token);
        var permissions_sec=permissions_fir.success.secret_token;
        var data = new FormData();
        const {language}=this.state;
      data.append("department_ids", this.state.departments_id);
      
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState !== 4) {
                            return;
       }
       if(xhr.status===200){
           _this.hideLoader();
          console.log(xhr.responseText)
         var json_obj = JSON.parse(xhr.responseText);
         var employees = json_obj.success.employees;
         context.setState({employees:employees});
       }
       else{
         return;
         console.log("inside error")
         _this.hideLoader();
         _this.enableModal(xhr.status, "026");
       }
      
      });
      xhr.open("POST", `${baseURL}/departments-wise-employees`);
      xhr.setRequestHeader("Content-Type", "multipart/form-data");
      xhr.setRequestHeader("Authorization", "Bearer  "+ permissions_sec);
      xhr.send(data);
      }

      Reminder = () => {
         if(this.state.reminder=='off'){
          this.setState({reminder:'on', reminderError: false});
         }if(this.state.reminder=='on'){
          this.setState({reminder:'off', reminderError: true});
         }
        
        // this.approveLeave();
        
      };
      Notification = () => {
        
        if(this.state.reminder_notification=='off'){
          this.setState({reminder_notification:'on', reminderTypeError: false});
         }if(this.state.reminder_notification=='on'){
          this.setState({reminder_notification:'off'}, () => {
            const {reminder_notification, reminder_mail} = this.state;
            if(reminder_notification === 'off' && reminder_mail === 'off'){
              this.setState({reminderTypeError: true})
            }
          });
         }
        // this.approveLeave();
      };
      Mail = () => {
        
        if(this.state.reminder_mail=='off'){
          this.setState({reminder_mail:'on', reminderTypeError: false});
        }if(this.state.reminder_mail=='on'){
          this.setState({reminder_mail:'off'}, () => {
            const {reminder_notification, reminder_mail} = this.state;
            if(reminder_notification === 'off' && reminder_mail === 'off'){
              this.setState({reminderTypeError: true})
            }
          });
        }
        // this.approveLeave();
      };
  
      async SingleFilePicker() {
        try {
          const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
          
          });
     
          this.setState({ singleFileOBJ: res });
     
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            Alert.alert('Canceled');
          } else {
            Alert.alert('Unknown Error: ' + JSON.stringify(err));
            console.log(JSON.stringify(err))
            throw err;
          }
        }
      }

dropDownValueChange(value){
  console.log("value",value)
  this.setState({valueTaskProject:"Task project"})
  this.setState({valueDepartment:"Departments"})
  this.setState({valueEmployee:"Employees"})
  this.setState({valueFrequency:"Frequency of reminder"})
  
  
}

confirmNoError(){
  this.setState({createTask: true})
  const noError = this.state.noError();
  if(noError){
    if(noError && !this.state.reminderTypeError){
      this.createSaveTask();
    }else{
      Alert.alert("Please check atleast one/both:", "Notification / WhatsApp")
    }
  }else {
    Alert.alert("Please fill the fields highlighted in RED")
  }
}

createSaveTask(){
  this.save_task();
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
          title='Add Task Form'
          //version={`Version ${this.state.deviceVersion}`}
        />
            );
    case "Lehri HO":
      return (
        <WaveHeader
          wave={Platform.OS ==="ios" ? false : false} 
          //logo={require('../Image/Logo-164.png')}
          menu='white'
          title='Add Task Form'
          //version={`Version ${this.state.deviceVersion}`}
        />
            );
    case "Aarti Drugs Ltd":
      return <Header navigation={this.props.navigation} title='Add Task Form' width={[getWidthnHeight(50)]} menu="white" images={false}/>
    default:
      return null;
    }
  }

    render (){
            const context=this;
            const {errorCode, apiCode, taskProjectError, taskTitleError, priorityError, departmentError,
              employeeError, dateError, reminderError, reminderTypeError, frequencyError, descriptionError, createTask
              } = this.state;
            // console.log(this.state.task_projects_id);
            // console.log(this.state.departments_id);
            // console.log(this.state.employees_id);
            // console.log(this.state.Task_title);
            // console.log(this.state.priority);
            // console.log(this.state.Due_date);
            // console.log(this.state.Task_Description);
            // console.log(this.state.reminder);
            // console.log(this.state.reminder_dropdown);
            // console.log(this.state.reminder_notification);
            // console.log(this.state.reminder_mail);
            // console.log(this.state.singleFileOBJ);
           
            
            const value=[{task_type:"all",my_status:"all",task_status:"all"},
                         {task_type:"Today's Tasks ",my_status:"Not-Started",task_status:"Open"},
                         {task_type:"Delayed Tasks",my_status:"Inprogress",task_status:"Inprogress"},
                         {task_type:"Upcoming Tasks",my_status:"Unassigned",task_status:"Reopened"},
                         {task_type:"This Week's Tasks",my_status:"Done",task_status:"Completed"},
                         {task_type:"This Month's Tasks",task_status:"Unassigned"}]

            let reminder_dropdown = [{value: 'Twice per day',leave_status:'0'}, 
                          {value: 'Once everyday',leave_status:'1'}, 
                          {value: 'Once every 2 days',leave_status:'2'},
                          {value: 'Once every 5 days',leave_status:'2'},
                          {value: 'Once every 10 days',leave_status:'2'},
                          {value: 'Once every month',leave_status:'2'},];
           
                          let blank_reminder_dropdown = [{value: '',leave_status:'0'}, ]
                          //console.log(this.state.button_value_one);
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
      <KeyboardShift>
        {() => (
            <View style={{height:viewportHeight,width:viewportWidth,backgroundColor:'white'}}>
            <IOS_StatusBar color={gradient} barStyle="light-content"/>
              {this.renderScreenHeader(user)}
            <View style={{alignItems: 'center', flex: 1, borderColor: 'purple', borderWidth: 0}}>
            <ScrollView contentContainerStyle={{alignItems: 'center'}} showsVerticalScrollIndicator={true} horizontal={false}>
            <View style={[{flexDirection:'column', alignItems: 'center'}, getWidthnHeight(100)]}>
              
            
            <Dropdown
              containerStyle={[getWidthnHeight(90)]}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor: (createTask && taskProjectError)? 'red' : 'rgb(19,111,232)'}}
              data={this.state.task_projects}
              value={this.state.valueTaskProject}
              valueExtractor={({id})=> id}
              labelExtractor={({name})=> name}
              label='Task project'
              onChangeText={task_projects_id => this.setState({task_projects_id, taskProjectError: false})}
            />
            </View>
            {(this.state.loading) ?
              <View style={[{
                flex:1,flexDirection:'row', backgroundColor: '#EFEFEF',
                alignItems: 'center', justifyContent: 'center',
                position: 'absolute', borderRadius: 10,
                shadowOffset:{  width: 0,  height: 5,  },
                shadowColor: '#000000',
                shadowOpacity: 0.3,
                shadowRadius: 5,
                elevation: 10,
                zIndex: 10
                }, getWidthnHeight(45, 10), getMarginTop(30)]}>

                <ActivityIndicator  size="large" color='rgb(19,111,232)' />
                <Text style={{fontSize:15,left:10}}>Loading..</Text>
              </View>
              : null}
            <TextInput
                   style={{ height: hp(6), borderColor: (createTask && taskTitleError)? 'red' : 'rgb(19,111,232)', borderBottomWidth:1, width:'88%',fontSize:14, marginVertical: 10 }}
                   placeholder={'Task Title Here'}
                   keyboardType="default"
                   onChangeText={Task_title => {
                     this.setState({ Task_title })
                     if(Task_title === ''){
                       this.setState({taskTitleError: true})
                     }else {
                      this.setState({taskTitleError: false})
                     }
                    }}
                   value={this.state.Task_title}
                 />
                <View style={[{justifyContent: 'space-evenly', alignItems: 'center', borderColor: (createTask && priorityError)? 'red' : 'transparent', borderWidth: 1, borderRadius: 10}, getWidthnHeight(90, 15)]}>
                  <Text style={{fontSize:15, color: 'rgb(19,111,232)'}}>Priority:</Text>
                  <View style={{flexDirection:'row'}}>
                    {this.state.priority!=='H1' ?
                      <TouchableOpacity style={{backgroundColor:'#fffdd0',borderColor:'transparent',borderWidth:2, width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.setState({priority:"H1", priorityError: false})}>
                          <Text style={{color:'black',textAlign:'center'}}>H1</Text>
                      </TouchableOpacity>:null}
                      {this.state.priority=='H1' ?
                      <TouchableOpacity style={{backgroundColor:'#fffdd0',borderColor:'rgb(19,111,232)',borderWidth:2, width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.setState({priority:"H1", priorityError: false})}>
                          <Text style={{color:'black',textAlign:'center'}}>H1</Text>
                      </TouchableOpacity>:null}

                      {this.state.priority!=='H2' ?
                      <TouchableOpacity style={{backgroundColor:'#ffff00',borderColor:'transparent',borderWidth:2, width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.setState({priority:"H2", priorityError: false})}>
                          <Text style={{color:'black',textAlign:'center'}}>H2</Text>
                      </TouchableOpacity>:null}
                      {this.state.priority=='H2' ?
                      <TouchableOpacity style={{backgroundColor:'#ffff00',borderColor:'rgb(19,111,232)',borderWidth:2, width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.setState({priority:"H2", priorityError: false})}>
                          <Text style={{color:'black',textAlign:'center'}}>H2</Text>
                      </TouchableOpacity>:null}

                      {this.state.priority!=='H3' ?
                      <TouchableOpacity style={{backgroundColor:'#00ffff',borderColor:'transparent',borderWidth:2, width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.setState({priority:"H3", priorityError: false})}>
                          <Text style={{color:'black',textAlign:'center'}}>H3</Text>
                      </TouchableOpacity>:null}
                      {this.state.priority=='H3' ?
                      <TouchableOpacity style={{backgroundColor:'#00ffff',borderColor:'rgb(19,111,232)',borderWidth:2, width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.setState({priority:"H3", priorityError: false})}>
                          <Text style={{color:'black',textAlign:'center'}}>H3</Text>
                      </TouchableOpacity>:null}

                      {this.state.priority!=='H4' ?
                      <TouchableOpacity style={{backgroundColor:'#ffa500',borderColor:'transparent',borderWidth:2, width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.setState({priority:"H4", priorityError: false})}>
                          <Text style={{color:'black',textAlign:'center'}}>H4</Text>
                      </TouchableOpacity>:null}
                      {this.state.priority=='H4' ?
                      <TouchableOpacity style={{backgroundColor:'#ffa500',borderColor:'rgb(19,111,232)',borderWidth:2, width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.setState({priority:"H4", priorityError: false})}>
                          <Text style={{color:'black',textAlign:'center'}}>H4</Text>
                      </TouchableOpacity>:null}

                      {this.state.priority!=='H5' ?
                      <TouchableOpacity style={{backgroundColor:'#ff0000',borderColor:'transparent',borderWidth:2, width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.setState({priority:"H5", priorityError: false})}>
                          <Text style={{color:'black',textAlign:'center'}}>H5</Text>
                      </TouchableOpacity>:null}
                      {this.state.priority=='H5' ?
                      <TouchableOpacity style={{backgroundColor:'#ff0000',borderColor:'rgb(19,111,232)',borderWidth:2, width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.setState({priority:"H5", priorityError: false})}>
                          <Text style={{color:'black',textAlign:'center'}}>H5</Text>
                      </TouchableOpacity>:null}

                  </View>
                </View>
                <View style={[styles.pagecomponent_nine, getWidthnHeight(100)]}>
                  <View style={[{borderWidth: 1, borderColor: 'rgb(19,111,232)', justifyContent: 'center', borderRadius: 10},getWidthnHeight(90)]}>
                    <View style={{bottom:hp(1.5),alignItems:'center'}}>
                        <Text style={{backgroundColor:'white',color:'rgb(19,111,232)',}}>   Assigner Person Details   </Text>
                    </View>
                  
                    <View style={{flexDirection:'column',alignItems:'center'}}>
                        <Dropdown
                          containerStyle={[getWidthnHeight(80)]}
                          inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor: (createTask && departmentError)? 'red' : 'rgb(19,111,232)'}}
                          data={this.state.departments}
                          value={this.state.valueDepartment}
                          valueExtractor={({id})=> id}
                          labelExtractor={({name})=> name}
                          label='Departments'
                          onChangeText={async(departments_id) => {
                            this.setState({ 
                              valueEmployee: 'Employee', departments_id, 
                              departmentError: false, employees: [], 
                              employeeError: true
                            })
                            await this.departments_wise_employees();
                            this.setState({valueEmployee: ''})
                            }}
                        />
                        <Dropdown
                          containerStyle={[getWidthnHeight(80)]}
                          inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor: (createTask && employeeError)? 'red' : 'rgb(19,111,232)'}}
                          data={this.state.employees}
                          value={this.state.valueEmployee}
                          valueExtractor={({user_id})=> user_id}
                          labelExtractor={({fullname})=> fullname}
                          label='Employee'
                          onChangeText={employees_id => this.setState({ employees_id, employeeError: false })}
                        />
                    </View>
                  </View>
                </View>
                <View style={[{alignItems: 'center', marginTop: 10, marginBottom: 20}, getWidthnHeight(100)]}>
                    <DatePicker
                        style={[getWidthnHeight(60)]}
                        customStyles={{
                          dateInput: {
                            borderColor: (createTask && dateError)? 'red' : 'rgb(19,111,232)',
                            borderRadius: 5,
                            borderWidth: 1,
                          }
                        }}
                        date={this.state.Due_date}
                        mode="date"
                        placeholder="Due Date"
                        format="DD-MM-YYYY"
                        minDate="2016-01"
                        maxDate="2022-12"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date) => {this.setState({Due_date: date, dateError: false})}}
                    />
                    
                </View>
              <View style={[{alignItems:'center',borderWidth: 0, borderColor: 'green', marginBottom: 10}, getWidthnHeight(100)]}>
                <View style={[{flexDirection: 'row', justifyContent: 'space-evenly', borderColor: 'lightgrey', borderWidth: 0}, getWidthnHeight(95,6)]}>
                  <View style={[{flexDirection: 'row', alignItems: 'center',borderWidth: 0, borderColor: 'red'}, getWidthnHeight(30)]}>
                    <TouchableOpacity onPress={context.Reminder}>
                        {this.state.reminder=== 'off' ?
                          <Image source={require('../Image/unchecked.png')} style={{ width: wp(7), height: hp(4), marginLeft:wp(0) }}/>
                        : null}
                        { this.state.reminder=== 'on' ?
                          <Image source={require('../Image/checked.png')} style={{ width: wp(7), height:hp(4), marginLeft: wp(0) }}/>
                        :null}
                    </TouchableOpacity> 
                    
                    <Text style={{color:(createTask && reminderError)? 'red' : 'rgb(19,111,232)'}}>Reminder</Text>
                  </View>
                  {(this.state.reminder === 'on')?
                  <View style={{flexDirection: 'row', borderWidth: 1, borderColor: (createTask && reminderTypeError)? 'red' : 'transparent'}}>
                    <View style={[{flexDirection: 'row', alignItems: 'center',borderLeftWidth: 0, borderRightWidth: 0,borderColor: 'lightgrey'}, getWidthnHeight(30)]}>
                      <TouchableOpacity onPress={context.Notification}>
                          {this.state.reminder_notification=== 'off' ?
                          <Image source={require('../Image/unchecked.png')} style={{ width: wp(7), height: hp(4), marginLeft:wp(0) }}/>
                          : null}
                          { this.state.reminder_notification=== 'on' ?
                          <Image source={require('../Image/checked.png')} style={{ width: wp(7), height:hp(4), marginLeft: wp(0) }}/>
                            :null}
                      </TouchableOpacity> 
                          
                      <Text style={{color:'rgb(19,111,232)'}}>Notification</Text>
                    </View>   

                    <View style={[{flexDirection: 'row',  alignItems: 'center',borderWidth: 0, borderColor: 'pink'}, getWidthnHeight(30)]}>
                      <TouchableOpacity onPress={context.Mail}>
                          {this.state.reminder_mail=== 'off' ?
                          <Image source={require('../Image/unchecked.png')} style={{ width: wp(7), height: hp(4), marginLeft:wp(0) }}/>
                          : null}
                          { this.state.reminder_mail=== 'on' ?
                          <Image source={require('../Image/checked.png')} style={{ width: wp(7), height:hp(4), marginLeft: wp(0) }}/>
                            :null}
                      </TouchableOpacity> 
                          
                      <Text style={{color:'rgb(19,111,232)'}}>WhatsApp</Text>
                    </View>
                  </View>
                  : null
                  }
                </View>
              </View>
       
          <View style={[{alignItems: 'center'}, getWidthnHeight(100)]}> 
            { this.state.reminder == 'on' ?
              <Dropdown
                  containerStyle={{width:'85%'}}
                  inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:(createTask && frequencyError)? 'red' : 'rgb(19,111,232)'}}
                  data={reminder_dropdown}
                  value={this.state.valueFrequency}
                  label='Frequency of reminder'
                  onChangeText={ reminder_dropdown =>{
                    if(reminder_dropdown==='Twice per day'){
                      context.setState({reminder_dropdown:'0.5'})
                    }
                    if(reminder_dropdown==='Once everyday'){
                      context.setState({reminder_dropdown:'1'})
                    }
                    if(reminder_dropdown==='Once every 2 days'){
                      context.setState({reminder_dropdown:'5'})
                    }
                    if(reminder_dropdown==='Once every 5 days'){
                      context.setState({reminder_dropdown:'7'})
                    }
                    if(reminder_dropdown==='Once every 10 days'){
                      context.setState({reminder_dropdown:'15'})
                    }
                    if(reminder_dropdown==='Once every month'){
                      context.setState({reminder_dropdown:'30'})
                    }
                    this.setState({frequencyError: false})
                  } }
                />
                : null}
          </View>
        <View>    
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.file_button, getWidthnHeight(50)]}
            onPress={this.SingleFilePicker.bind(this)}>
            <Text style={{color:'white',textAlign:'center'}}>
            {this.state.singleFileOBJ.name ? this.state.singleFileOBJ.name : 'Choose file (Optional)'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.TaskDescription}>
          <TextInput
            style={[{borderColor: (createTask && descriptionError)? 'red' : 'rgb(19,111,232)', borderWidth: 1, keyboardAppearance:'light',borderRadius:10, marginBottom: 10, padding: 10}, getWidthnHeight(90, 15)]}
            placeholder={'Task Description'}
            multiline
            numberOfLines={4}
            editable
            maxLength={190}
            keyboardType="default"
            onChangeText={Task_Description => {
              this.setState({ Task_Description})
              if(Task_Description === ''){
                this.setState({descriptionError: true})
              }else{
                this.setState({descriptionError: false})
              }
            }}
            value={this.state.Task_Description}
          />
        </View>
        </ScrollView>
        <View style={[{alignItems: 'center', justifyContent: 'center', borderColor: 'grey', borderTopWidth: 1.5}, getWidthnHeight(100, 6)]}>
          <TouchableOpacity style={[{alignItems:'center',borderRadius: 10,backgroundColor:'rgb(19,111,232)', justifyContent: 'center'}, getWidthnHeight(30, 5)]} onPress={()=>this.confirmNoError()}>
              <Text style={{color:'white'}}>Create</Text>
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
  }

  const styles = StyleSheet.create({
    container: {
    flex: 0,
    flexDirection:'column',
    width:'100%',
    height:'100%',
    },
    scrollView: {
    backgroundColor: 'transparent',
    marginHorizontal: 0,
    marginVertical: 0,
    height:'0%',
    },
    pagecomponent_sec: {
                      flex:0.4,
                      bottom:40,
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
                      height: '10%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 5,
    },
    pagecomponent_thrd: {
                      marginTop:0,
                      marginLeft:5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'#ffffff',
                      borderRadius: 10,
                      borderTopWidth: 1.5,
                      borderBottomWidth:1.5,
                      borderRightWidth:1.5,
                      borderLeftWidth:1.5,
                      borderColor: 'transparent',
                      width:viewportWidth/1.03,
                       height:'75%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 5,
                      overflow: "hidden"
    },
    pagecomponent_fifth: {
                      marginTop:0,
                      marginLeft:0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'#ffffff',
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
    pagecomponent_sixth: {
                      marginTop:0,
                      marginLeft:0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'#ffffff',
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
                      marginTop:0,
                      marginLeft:0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'#ffffff',
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
                      marginTop:0,
                      marginLeft:0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'#ffffff',
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
                      bottom:'0%',
                      margin:20,
                      marginLeft:0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'#ffffff',
                      borderRadius: 10,
                      borderTopWidth: 1,
                      borderBottomWidth:1,
                      borderRightWidth:1,
                      borderLeftWidth:1,
                      borderColor: 'rgb(19,111,232)',
                      width:'90%',
                     height:'5%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 1,
                      overflow: "hidden"
    },

    pagecomponent_nine: {
                      alignItems: 'center',
                      marginTop: 20,
                      marginBottom: 10
    },
    pagecomponent_ten: {
                      margin:0,
                      marginBottom:'20%',
                      marginLeft:0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'#ffffff',
                      borderRadius: 10,
                      borderTopWidth: 1,
                      borderBottomWidth:1,
                      borderRightWidth:1,
                      borderLeftWidth:1,
                      borderColor: 'rgb(19,111,232)',
                      width:'90%',
                     height:'5%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 0,
                      overflow: "hidden"
    },
    pagecomponent_one_one: {
                      margin:0,
                      marginBottom:'20%',
                      marginLeft:0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'#ffffff',
                      borderRadius: 10,
                      borderTopWidth: 1,
                      borderBottomWidth:1,
                      borderRightWidth:1,
                      borderLeftWidth:1,
                      borderColor: 'rgb(19,111,232)',
                      width:'90%',
                     height:'10%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 0,
    },
    pagecomponent_one_two: {
                      margin:'5%',
                      marginBottom:'0%',
                      marginLeft:0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'#ffffff',
                      borderRadius: 10,
                      borderTopWidth: 1,
                      borderBottomWidth:1,
                      borderRightWidth:1,
                      borderLeftWidth:1,
                      borderColor: 'rgb(19,111,232)',
                      width:'90%',
                      height:'10%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 1,
    },
    pagecomponent_one_thrd: {
                      margin:'5%',
                      marginBottom:'0%',
                      marginLeft:0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'#ffffff',
                      borderRadius: 10,
                      borderTopWidth: 1,
                      borderBottomWidth:1,
                      borderRightWidth:1,
                      borderLeftWidth:1,
                      borderColor: 'rgb(19,111,232)',
                      width:'90%',
                      height:'12%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 1,
    },
    card_view: {
                  marginBottom:0,
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
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomEndRadius: 0,

                  backgroundColor:'#3280e4',
                  width:'40%',
                  height: '2%',
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
                  width:'20%',
                  height: '4%',
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
                  backgroundColor:'#ffffff',
                  borderRadius: 10,
                  borderTopWidth: 1.5,
                  borderBottomWidth:1.5,
                  borderRightWidth:1.5,
                  borderLeftWidth:1.5,
                  borderColor: 'green',
            },
    date_component: {

    },
    task_list:{
                  margin:10,
                  borderRadius: 0,
                  borderTopWidth: 1.5,
                  borderBottomWidth:1.5,
                  borderRightWidth:1.5,
                  borderLeftWidth:1.5,
                   borderColor: 'black',
                  shadowOffset:{  width: 100,  height: 100,  },
                    shadowColor: '#330000',
                   paddingTop:10,
                   paddingBottom:10,
                   width:'95%',
                   overflow: "hidden"
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
      alignItems: 'center',
      marginBottom: 40,
    },
    radioStyle: {

    },
    TaskDescription: {
        backgroundColor:'transparent',
        width:'90%',
        height:'10%',
        // shadowOffset:{  width: 100,  height: 100,  },
        // shadowColor: '#330000',
        shadowOpacity: 0,
        // shadowRadius: 0,
        elevation: 0,

},
file_button:{
  width:'90%',
  height:hp(5),
  backgroundColor:'rgb(19,111,232)',
  borderRadius: 15,
  justifyContent: 'center',
  marginTop: 20,
  marginBottom: 10
},
  });
