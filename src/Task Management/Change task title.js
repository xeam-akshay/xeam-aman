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
import {CommonModal} from '../KulbirComponents/common';

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
              name:'Change_task_title',
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
  componentDidMount(){
      this.createTask().done(); 
      
  }

  async extractLink(){
    await extractBaseURL().then((baseURL) => {
      this.setState({baseURL}, () => console.log("EXTRACT LINK: ", this.state.baseURL))
    })
  }

  shouldComponentUpdate(props,nextProps){
      console.log(props.route.name)
      if(props.route.name !== this.state.name){
          this.Task_Value();
      }
  }
  save_task=async()=>{
    const context=this;
    const {baseURL} = this.state;
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
        _this.setState({valueTaskProject:""})
        _this.setState({valueDepartment:""})
        _this.setState({valueEmployee:""})
        _this.setState({task_projects_id:""})
        _this.setState({departments_id:""})
        _this.setState({employees_id:""})
        _this.setState({Task_title:""})
        _this.setState({Due_date:""})
        _this.setState({Task_Description:""})
        _this.setState({valueFrequency:""})
       
        
    }
    else{
      console.log(xhr.responseText)
      Alert.alert("Please fill all required fields");
      _this.enableModal(xhr.status, "037");
     _this.hideLoader();
     
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
        _this.enableModal(xhr.status, "038");
        _this.hideLoader();
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
              _this.enableModal(xhr.status, "039");
             _this.hideLoader();
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
        _this.enableModal(xhr.status, "040")
        _this.hideLoader();
       }
      
      });
      xhr.open("POST", `${baseURL}/departments-wise-employees`);
      xhr.setRequestHeader("Content-Type", "multipart/form-data");
      xhr.setRequestHeader("Authorization", "Bearer  "+ permissions_sec);
      xhr.send(data);
      }

      Reminder = () => {
         if(this.state.reminder=='off'){
          this.setState({reminder:'on'});
         }if(this.state.reminder=='on'){
          this.setState({reminder:'off'});
         }
        
        // this.approveLeave();
        
      };
      Notification = () => {
        
        if(this.state.reminder_notification=='off'){
          this.setState({reminder_notification:'on'});
         }if(this.state.reminder_notification=='on'){
          this.setState({reminder_notification:'off'});
         }
        // this.approveLeave();
      };
      Mail = () => {
        
        if(this.state.reminder_mail=='off'){
          this.setState({reminder_mail:'on'});
         }if(this.state.reminder_mail=='on'){
          this.setState({reminder_mail:'off'});
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
createSaveTask(){
  this.save_task();
  this.dropDownValueChange();
}
Task_Value(){
    var task_value = this.props.route.params.value;
   
    // this.setState({ Task_title:task_value.title })    
             
    console.log("value",task_value)
}

    render (){
            const context=this;
            const {task,task_title,task_projects_id,employees_id,errorCode, apiCode}= this.state;
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
		return(
      <KeyboardShift>
        {() => (
            <View style={{height:viewportHeight,width:viewportWidth,backgroundColor:'white'}}>
            <View style={{backgroundColor:'rgb(19,111,232)',height:'10%'}}>
            <View style={{flexDirection:'row',justifyContent:'center',top:hp('5%'),}}>
             <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Add Task Form</Text>
              </View>
            <TouchableOpacity style={{right:'0%',top:hp('0%')}} onPress={() => context.props.navigation.toggleDrawer()}>
                        {/*Donute Button Image */}
                        <Image
                          source={require('../Image/menu.png')}
                          style={{ width: 35, height: 35, marginLeft: 10,top:0 }}
                        />
                      </TouchableOpacity>
            </View>
            <View style={{height:hp('90%'),margin:hp(0.5)}}>
            <ScrollView>
            
            {(this.state.loading) ?
            <View style={{
                       flex:1,flexDirection:'row',width: '45%', backgroundColor: '#EFEFEF',
                       alignItems: 'center', justifyContent: 'center',
                       position: 'absolute', height:'6%',
                       shadowOffset:{  width: 100,  height: 100,  },
                       shadowColor: '#330000',
                       shadowOpacity: 0,
                       shadowRadius: 5,
                       elevation: 10,
                       left:'25%',
                       top:'25%'
                   }}>

            <ActivityIndicator  size="large" color='rgb(19,111,232)' />
                    <Text style={{fontSize:15,left:10}}>Loading..</Text>
            </View>
            : null}
            <TextInput
                   style={{ height: hp(6), borderColor: 'rgb(19,111,232)', borderBottomWidth:1, top:0,width:'88%',fontSize:15,left:'5%' }}
                   placeholder={'Task Title Here'}
                   keyboardType="default"
                   onChangeText={Task_title => this.setState({ Task_title })}
                   value={this.state.Task_title}
                 />
                
                <Text style={{left:'5%',top:hp(1),fontSize:15}}>Priority:</Text>
                <View style={{flexDirection:'row',marginLeft:'5%',marginRight:'5%',top:hp(2)}}>
                  {this.state.priority!=='H1' ?
                    <TouchableOpacity style={{backgroundColor:'#fffdd0',borderColor:'transparent',borderWidth:2,width:'20%',height:'200%',}} onPress={()=>this.setState({priority:"H1"})}>
                        <Text style={{color:'black',textAlign:'center',top:'20%'}}>H1</Text>
                    </TouchableOpacity>:null}
                    {this.state.priority=='H1' ?
                    <TouchableOpacity style={{backgroundColor:'#fffdd0',borderColor:'rgb(19,111,232)',borderWidth:2,width:'20%',height:'200%',}} onPress={()=>this.setState({priority:"H1"})}>
                        <Text style={{color:'black',textAlign:'center',top:'20%'}}>H1</Text>
                    </TouchableOpacity>:null}

                    {this.state.priority!=='H2' ?
                    <TouchableOpacity style={{backgroundColor:'#ffff00',borderColor:'transparent',borderWidth:2,width:'20%',height:'200%',}} onPress={()=>this.setState({priority:"H2"})}>
                        <Text style={{color:'black',textAlign:'center',top:'20%'}}>H2</Text>
                    </TouchableOpacity>:null}
                    {this.state.priority=='H2' ?
                    <TouchableOpacity style={{backgroundColor:'#ffff00',borderColor:'rgb(19,111,232)',borderWidth:2,width:'20%',height:'200%',}} onPress={()=>this.setState({priority:"H2"})}>
                        <Text style={{color:'black',textAlign:'center',top:'20%'}}>H2</Text>
                    </TouchableOpacity>:null}

                    {this.state.priority!=='H3' ?
                    <TouchableOpacity style={{backgroundColor:'#00ffff',borderColor:'transparent',borderWidth:2,width:'20%',height:'200%',}} onPress={()=>this.setState({priority:"H3"})}>
                        <Text style={{color:'black',textAlign:'center',top:'20%'}}>H3</Text>
                    </TouchableOpacity>:null}
                    {this.state.priority=='H3' ?
                    <TouchableOpacity style={{backgroundColor:'#00ffff',borderColor:'rgb(19,111,232)',borderWidth:2,width:'20%',height:'200%',}} onPress={()=>this.setState({priority:"H3"})}>
                        <Text style={{color:'black',textAlign:'center',top:'20%'}}>H3</Text>
                    </TouchableOpacity>:null}

                    {this.state.priority!=='H4' ?
                    <TouchableOpacity style={{backgroundColor:'#ffa500',borderColor:'transparent',borderWidth:2,width:'20%',height:'200%',}} onPress={()=>this.setState({priority:"H4"})}>
                        <Text style={{color:'black',textAlign:'center',top:'20%'}}>H4</Text>
                    </TouchableOpacity>:null}
                    {this.state.priority=='H4' ?
                    <TouchableOpacity style={{backgroundColor:'#ffa500',borderColor:'rgb(19,111,232)',borderWidth:2,width:'20%',height:'200%',}} onPress={()=>this.setState({priority:"H4"})}>
                        <Text style={{color:'black',textAlign:'center',top:'20%'}}>H4</Text>
                    </TouchableOpacity>:null}

                    {this.state.priority!=='H5' ?
                    <TouchableOpacity style={{backgroundColor:'#ff0000',borderColor:'transparent',borderWidth:2,width:'20%',height:'200%',}} onPress={()=>this.setState({priority:"H5"})}>
                        <Text style={{color:'black',textAlign:'center',top:'20%'}}>H5</Text>
                    </TouchableOpacity>:null}
                    {this.state.priority=='H5' ?
                    <TouchableOpacity style={{backgroundColor:'#ff0000',borderColor:'rgb(19,111,232)',borderWidth:2,width:'20%',height:'200%',}} onPress={()=>this.setState({priority:"H5"})}>
                        <Text style={{color:'black',textAlign:'center',top:'20%'}}>H5</Text>
                    </TouchableOpacity>:null}

                </View>
                <View style={styles.pagecomponent_nine}>
                <View style={{left:'0%',bottom:hp(1.5),alignItems:'center'}}>
              <Text style={{top:'0%',backgroundColor:'white',color:'rgb(19,111,232)',}}>   Assigner Person Details   </Text>
              </View>
             
             <View style={{flexDirection:'column',bottom:hp(0),left:'0%',alignItems:'center'}}>
           
            <Dropdown
              containerStyle={{width:'90%',left:'0%'}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={this.state.departments}
              value={this.state.valueDepartment}
              valueExtractor={({id})=> id}
              labelExtractor={({name})=> name}
              label='Departments'
              onChangeText={departments_id => this.setState({ departments_id })||this.departments_wise_employees()}
            />
            <Dropdown
              containerStyle={{width:'90%',left:'0%'}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={this.state.employees}
              value={this.state.valueEmployee}
              valueExtractor={({user_id})=> user_id}
              labelExtractor={({fullname})=> fullname}
              label='Employees'
              onChangeText={employees_id => this.setState({ employees_id })}
            />
            </View>
            </View>
            <View style={{top:hp(10),left:'0%',}}>
            <DatePicker
                  style={{width: '85%',borderColor:'rgb(19,111,232)',left:'7%',top:'15%',borderBottomWidth:1,}}
                  date={this.state.Due_date}
                  
                  mode="date"
                  placeholder="Due Date"
                  format="DD-MM-YYYY"
                  minDate="2016-01"
                  maxDate="2022-12"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  
                  onDateChange={(date) => {this.setState({Due_date: date})}}
                />
                
              </View>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',top:hp(15),margin:0}}>

         <TouchableOpacity style={{right:'0%',top:'0%'}} onPress={context.Reminder}>
            {this.state.reminder=== 'off' ?
            <Image source={require('../Image/unchecked.png')} style={{ width: wp(7), height: hp(4), marginLeft:wp(0),top:0 }}/>
            : null}
            { this.state.reminder=== 'on' ?
        <Image source={require('../Image/checked.png')} style={{ width: wp(7), height:hp(4), marginLeft: wp(0),top:0 }}/>
           :null}
           
            </TouchableOpacity> 
            <Text style={{color:'rgb(19,111,232)'}}>Reminder</Text>

            <TouchableOpacity style={{right:'0%',top:'0%'}} onPress={context.Notification}>
            {this.state.reminder_notification=== 'off' ?
            <Image source={require('../Image/unchecked.png')} style={{ width: wp(7), height: hp(4), marginLeft:wp(0),top:0 }}/>
            : null}
            { this.state.reminder_notification=== 'on' ?
        <Image source={require('../Image/checked.png')} style={{ width: wp(7), height:hp(4), marginLeft: wp(0),top:0 }}/>
           :null}
           
            </TouchableOpacity> 
            
            <Text style={{color:'rgb(19,111,232)'}}>Notification</Text>
            

            <TouchableOpacity style={{right:'0%',top:'0%'}} onPress={context.Mail}>
            {this.state.reminder_mail=== 'off' ?
            <Image source={require('../Image/unchecked.png')} style={{ width: wp(7), height: hp(4), marginLeft:wp(0),top:0 }}/>
            : null}
            { this.state.reminder_mail=== 'on' ?
        <Image source={require('../Image/checked.png')} style={{ width: wp(7), height:hp(4), marginLeft: wp(0),top:0 }}/>
           :null}
           
            </TouchableOpacity> 
            <Text style={{color:'rgb(19,111,232)'}}>Mail</Text>
       </View>
       
          <View style={{top:hp(15),left:wp(5)}}> 
          { this.state.reminder == 'on' ?
          <Dropdown
              containerStyle={{width:'85%',left:'2%'}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
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
               } }
            />
            : null}
            { this.state.reminder == 'off' ?
            <Dropdown
              containerStyle={{width:'85%',left:'2%'}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={blank_reminder_dropdown}
              
              label='Reminder not selected'
              
            />
            :null}
          </View>
          <View style={{top:hp(20),left:'5%'}}>
                 
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.file_button}
          onPress={this.SingleFilePicker.bind(this)}>
          <Text style={{color:'white',top:'15%',left:'0%',textAlign:'center'}}>
          {this.state.singleFileOBJ.name ? this.state.singleFileOBJ.name : 'Choose file (Optional)'}
          </Text>
        </TouchableOpacity>
        </View>

              <View style={styles.TaskDescription}>
              
                   <TextInput
                   style={{ height: 110, borderColor: 'rgb(19,111,232)', borderWidth: 1, bottom:'0%',width:'100%',fontSize:15,keyboardAppearance:'light',borderRadius:10 }}
                   placeholder={'Task Description'}
                   multiline
                 numberOfLines={4}
                 editable
                 maxLength={190}
                   keyboardType="default"
                   onChangeText={Task_Description => this.setState({ Task_Description })}
                   value={this.state.Task_Description}
                 />
                 
                   </View>
                   <View style={{top:hp(30),marginBottom:hp('45%')}}>
                       <TouchableOpacity style={{alignItems:'center',}} onPress={()=>this.createSaveTask()}>
                           <Text style={{backgroundColor:'rgb(19,111,232)',color:'white',paddingLeft:'5%',paddingRight:'5%',paddingTop:'2%',paddingBottom:'2%',borderRadius:10}}>Create</Text>
                       </TouchableOpacity>
                       
                   </View>
                   </ScrollView>
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
    left:'5%',
    width:'100%',
    height:'100%',
    },
    scrollView: {
    backgroundColor: 'transparent',
    marginHorizontal: 0,
    marginVertical: 0,
    height:'0%',
    top:'0%',
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

                      bottom:'15%',
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
                      left:'0%',
                      bottom:'0%',
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
                      left:'0%',
                      bottom:'55%',
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
                      left:'0%',
                      bottom:'40%',
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
                      left:'0%',
                      bottom:'30%',
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
                      top:'-3%',
                      left:'0%',
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
                      flex:0,
                      left:wp(5),
                      top:hp(8),
                      
                      margin:'5%',
                      marginBottom:'0%',
                      marginLeft:0,
                      
                      backgroundColor:'transparent',
                      borderRadius: 10,
                      borderTopWidth: 1,
                      borderBottomWidth:1,
                      borderRightWidth:1,
                      borderLeftWidth:1,
                      borderColor: 'rgb(19,111,232)',
                      width:'90%',
                      height:hp(25),
                      // shadowOffset:{  width: 100,  height: 100,  },
                      // shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 0,

    },
    pagecomponent_ten: {
                      top:'-2%',
                      left:'0%',
                      bottom:'0%',
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
                      top:'-8%',
                      left:'0%',
                      bottom:'0%',
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
                      top:'-15%',
                      flex:0,
                      left:'0%',
                      bottom:'3%',
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
                      top:'-17%',
                      flex:0,
                      left:'0%',
                      bottom:'3%',
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
    card_view_sec: {
                  marginBottom:0,
                  top:'-7%',
                  right:'0%',
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
                  top:'-20%',
                  left:'1%',
                  right:'0%',
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
                   left:'0%',
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
      bottom:'5%'
    },
    radioStyle: {

    },
    TaskDescription: {
        flex:0,
        left:wp(5),
        top:hp(25),
        flexDirection:'row',
        margin:'0%',
        marginBottom:'0%',
        marginLeft:0,
        
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
},
  });
