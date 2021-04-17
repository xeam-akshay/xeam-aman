//CREATED TASKS - TASK LIST
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
  TextInput,
  TouchableNativeFeedback,
  Keyboard,
  Button,
  TouchableWithoutFeedback
} from 'react-native';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';
import LeftSide from '../Image/side.png';
import RightSide from '../Image/side2.png';
import Logo from '../Image/logo.png';
import DatePicker from 'react-native-datepicker';
import CheckBox from 'react-native-check-box';
import { CustomPicker } from 'react-native-custom-picker';
import { Hoshi } from 'react-native-textinput-effects';
import { Dropdown } from 'react-native-material-dropdown';
import Ripple from 'react-native-material-ripple';
import DocumentPicker from 'react-native-document-picker';
import NameBottomBorder from '../Components/Name bottom border'
import TitleBox from '../Components/title box'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import ActionModal from 'react-native-modal';
import {extractBaseURL} from '../api/BaseURL';
import {CommonModal, IOS_StatusBar, WaveHeader, getWidthnHeight, Spinner, getMarginTop, Input} from '../KulbirComponents/common';
import { searchText } from '../actions';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
let EmpNameData = [];
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
              task_type:'all',
              my_status:'all',
              task_status:'all',
              task_type_sec:'all',
              my_status_sec:'all',
              task_status_sec:'all',
              task:[],
              isChecked:false,
              checkedDefault: {},
              slideAnimationDialog: false,
              slideAnimationDialog_sec:false,
              slideAnimationDialog_CreatedTask:false,
              task_title:[],
              taskoverview_title:'',
              taskoverview_due_date:'',
              dataToShow_sec:[],
              button_value:'',
              show: true,
              show_sec: true,
              singleFileOBJ: '',
              model_close:false,
              defaultAnimationModal: false,
              task_id:'',
              status:'',
              task_status_comment:'',
              priority:'',
              due_date:'',
              task_title_textinput:'',
              update_description:'',
              taskoverview_project:'',
              taskoverview_id:'',
              comment_text:'',
              priority:'',
              priority_value:'',
              self_show:'',
              self_show_sec:'',
              self_task:[],
              self_task_title:[],
              Emp_search:'',
              modal_view_status:'status',
              valueTaskTitle:'',
              valueStatus:'',
              modal_task_title:'',
              mandatory:'0',
              mandatory_sec:'0',
              changeEmployeeTask_id:'',
              change_employee_task_status_comment:'',
              changeEpmloyeeTaskStatus:'',
              EmployeeValueStatus:'',
              myCreateTaskModalStatus:'',
              myCreatedTaskModalValue:'',
              Task_title:'',
              my_created_task_priority:'',
              my_created_Due_date:'',
              my_created_task_update_description:'',
              EmpName:[],
              userId:'',
              modal_task_status:'',
              createdTaskDueDate:'',
              createdTaskDescription:'',
              createdTaskPriority:'',
              TaskStatus:'',
              MyData:'',
              AnotherValue:'',
              baseURL: null,
              searchText: '',
              empty: true,
              enableSearch: false,
              errorCode: null,
              apiCode: null,
              commonModal: false,
              saveStatus: false,
              statusError: true,
              taskStatusCommentError: true,
              anyTaskStatusError: function(){
                return (this.statusError === true || this.taskStatusCommentError === true)
              },
              noTaskStatusError: function(){
                return (this.statusError === false && this.taskStatusCommentError === false)
              },
              saveTaskDetail: false, //Initially Button is not pressed
              taskTitleError: false, //Because we are always receiving Task_Title from API
              upDateCommentError: false, //Because we are always receiving comment from API
              anyTaskDetailError: function(){
                return (this.taskTitleError === true || this.upDateCommentError === true)
              },
              noTaskDetailError: function(){
                return (this.taskTitleError === false && this.upDateCommentError === false)
              },
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
     My_task=async()=>{
      await this.extractLink();
      const {baseURL} = this.state;
      const context=this;
      this.showLoader();
      const _this = this;
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
          console.log("******MY TASKS: ",json_obj)
          context.setState({mandatory:'0'})
        context.setState({task_title:JSON.stringify(task)})
          
      }
      else{
        // console.log(xhr.responseText)
        context.setState({mandatory:'1'})
        _this.hideLoader();
        _this.enableModal(xhr.status, "030");
      }
      });
      
      xhr.open("POST", `${baseURL}/my-tasks`);
      xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);
      xhr.send(data);
     }
     My_task_status=async()=>{
      const {baseURL} = this.state;
      const context=this;
      const _this = this;
      this.showLoader();
      console.log("My_task_status")
      var user_token= await AsyncStorage.getItem('user_token');
      var permissions_fir= JSON.parse(user_token);
      var permissions_sec=permissions_fir.success.secret_token;
      
      console.log(this.state.task_id)
      var data = new FormData();
      data.append("task_ids", this.state.task_id);
      data.append("selected_status", this.state.status);
      data.append("comment", this.state.task_status_comment);
      
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState !== 4) {
          return;
}
        if(xhr.status===200){
          _this.hideLoader();
          var json_obj = JSON.parse(xhr.responseText);
          context.setState({task_status_comment:''})
          context.setState({valueStatus:""}) 
          context.setState({ slideAnimationDialog_sec: false });
          var msg = json_obj.success.message;
          console.log(msg)
          Alert.alert(msg);
     
      }
      else{
          context.setState({ slideAnimationDialog_sec: false });
          console.log(xhr.responseText)
          Alert.alert("Please fill the all field");
          _this.enableModal(xhr.status, "031");
          _this.hideLoader();
      }
      });
      
      xhr.open("POST", `${baseURL}/change-my-task-status`);
      xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);
      xhr.send(data);
     }
      
     confirmReset(){
      this.setState({self_task: [], searchText: '', enableSearch: false, empty: true}, () => {
        const {empty} = this.state;
        if(empty){
          this.self_team();
        }
      })
     }

     self_team = async()=>{
                const {baseURL} = this.state;
                const context=this;
                const _this = this;
                Keyboard.dismiss();
                this.showLoader();
                console.log("self_team")
                var user_token= await AsyncStorage.getItem('user_token');
                var permissions_fir= JSON.parse(user_token);
                var permissions_sec=permissions_fir.success.secret_token;
                var data = new FormData();
                data.append("task_type", this.state.task_type_sec);
                data.append("task_status", this.state.my_status_sec);
                data.append("user_status", this.state.task_status_sec);
                data.append("user_id", this.state.userId);
                var xhr = new XMLHttpRequest();
                xhr.withCredentials = true;

                xhr.addEventListener("readystatechange", function() {
                    if (xhr.readyState !== 4) {
          
                        return;
              }
                      if(xhr.status===200){
                        _this.hideLoader();
                        var json_obj = JSON.parse(xhr.responseText);
                        //console.log("JSON DATA: ", json_obj)
                        var task = json_obj.success.tasks;
                        if(task !== [] && task !== null && task.length !== null && task.length > 0){
                          context.setState({mandatory_sec:'0', enableSearch: true})
                          console.log("##### SELF TEAM: ", task)
                          context.setState({self_task:task})
                          context.setState({self_task_title:JSON.stringify(task)})
                        
                          task.forEach((element) => {
                            EmpNameData.push({name:element.task_user.user.employee.fullname,id:element.task_user.user.employee.id})
                          })
                          _this.setState({EmpName: EmpNameData})
                        }else{
                          console.log("##### EMPTY ARRAY: ", task)
                          context.setState({self_task:task})
                          context.setState({mandatory_sec:'1', enableSearch: false})
                          _this.setState({EmpName: []})
                        }
                        
                    }
                    else{
                      console.log(xhr.responseText)
                      context.setState({mandatory_sec:'1', enableSearch: false});
                      _this.hideLoader();
                      _this.enableModal(xhr.status, "032");
                    }
                });

                xhr.open("POST", `${baseURL}/view-tasks`);
                xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);
                xhr.send(data);

     }
    

     update_task=async()=>{
      const {baseURL} = this.state;
      const context=this;
      const _this = this;
      this.showLoader();
      console.log("update_task")
      var user_token= await AsyncStorage.getItem('user_token');
      var permissions_fir= JSON.parse(user_token);
      var permissions_sec=permissions_fir.success.secret_token;


      var data = new FormData();
      data.append("task_id", this.state.task_id);
      data.append("on_date", this.state.due_date);
      data.append("task_comment", this.state.update_description);
      
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState !== 4) {
          return;
}
        if(xhr.status===200){
          _this.hideLoader();
          console.log(xhr.responseText)
          var json_obj = JSON.parse(xhr.responseText);
          context.setState({valueTaskTitle:""})
          context.setState({update_description:""})
          context.setState({ slideAnimationDialog_sec: false });
          var msg = json_obj.message;
          console.log(msg)
          var textRequired = "The task comment must be at least 10 characters.";
          Alert.alert(msg?msg:textRequired);
     
      }
      else{
           console.log(xhr.responseText)
           var json_obj = JSON.parse(xhr.responseText);
           context.setState({valueTaskTitle:""})
          context.setState({update_description:""})
          var msg = json_obj.validation_error.task_comment;
          {msg.map((item)=>{
              Alert.alert(item);
          })}
          _this.enableModal(xhr.status, "033");
          _this.hideLoader();
      }
      });
      
      xhr.open("POST", `${baseURL}/save-task-update`);
      xhr.setRequestHeader("Authorization", "Bearer "+ permissions_sec);
      
      xhr.send(data);

     }

     confirmTaskUpdate(){
      this.setState({saveTaskDetail: true})
      const anyTaskDetailError = this.state.anyTaskDetailError();
      const noTaskDetailError = this.state.noTaskDetailError();
      if(anyTaskDetailError){
        Alert.alert("Please fill the fields highlighted in RED")
      }
      if(noTaskDetailError){
        this.my_created_update_task();
      }
    }

     my_created_update_task=async()=>{
      const {baseURL} = this.state;
      const context=this;
      const _this = this;
      this.showLoader();
      console.log("update_task")
      var user_token= await AsyncStorage.getItem('user_token');
      var permissions_fir= JSON.parse(user_token);
      var permissions_sec=permissions_fir.success.secret_token;
      console.log("changeEmployeeTask_id")
      var data = new FormData();
      data.append("title", this.state.Task_title);
      data.append("priority", this.state.my_created_task_priority);
      data.append("due_date", this.state.my_created_Due_date);
      data.append("description", this.state.my_created_task_update_description);
      data.append("task_id", this.state.changeEmployeeTask_id);
      
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState !== 4) {
          return;
}
        if(xhr.status===200){
          _this.hideLoader();
          var json_obj = JSON.parse(xhr.responseText);
          context.setState({my_created_Due_date:""})
          context.setState({my_created_task_update_description:""})
          _this.setState({change_employee_task_status_comment: ""})
          context.setState({mandatory_sec: '1', self_task: []})
          context.setState({ slideAnimationDialog_CreatedTask: false });
          var msg = json_obj.success.message;
          context.initialize();
          console.log(msg)
          Alert.alert("Task description updated");
      }else if(xhr.status === 405){
        _this.hideLoader();
        var json_obj = JSON.parse(xhr.responseText);
        _this.setState({change_employee_task_status_comment: ""})
        context.setState({ slideAnimationDialog_CreatedTask: false });
        context.setState({my_created_Due_date:""})
        context.setState({my_created_task_update_description:""})
        var msg = json_obj.error;
        Alert.alert(msg);
      }else{
           console.log(xhr.responseText)
           var json_obj = JSON.parse(xhr.responseText);
           context.setState({ slideAnimationDialog_CreatedTask: false });
           context.setState({my_created_Due_date:""})
           context.setState({my_created_task_update_description:""})
           _this.setState({change_employee_task_status_comment: ""})
          var msg = json_obj.error;
          Alert.alert(msg);
          _this.enableModal(xhr.status, "034");
          _this.hideLoader();
      }
      });
      
      xhr.open("POST", `${baseURL}/update-task`);
      xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);
      
      xhr.send(data);
     }

     comment =async()=>{
      const {baseURL} = this.state;
      const context=this;
      const _this = this;
      this.showLoader();
      console.log("comment")
      var user_token= await AsyncStorage.getItem('user_token');
      var permissions_fir= JSON.parse(user_token);
      var permissions_sec=permissions_fir.success.secret_token;
      var data = new FormData();
      data.append("task_id", this.state.task_id);
      data.append("comment_text", this.state.comment_text);
      data.append("comment_file", "");
       
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function() {
        if(this.readyState !== 4){
          return;
        } 
        if(this.status === 200){
          console.log(this.responseText);
          context.setState({comment_text:''})
          Alert.alert("Task comment updated successfully");
          context.setState({ slideAnimationDialog_sec: false });
        } else {
          _this.enableModal(xhr.status, "035");
        }
      });
      
      xhr.open("POST", `${baseURL}/save-chat`);
      xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);
      xhr.send(data);
     }

     taskWithComment(){
      const context=this;
      context.props.navigation.navigate("taskWithComment");
     }

     ShowHideComponent_short = () => {
      this.setState({modal_view_status:"status"});
      this.setState({button_value:0});
      
      if (this.state.show == false) {
        this.setState({ show: true });
      }
      if (this.state.show_sec == true) {
        this.setState({ show_sec: false });
      }
    };
    ShowHideComponent_half = () => {
      this.setState({modal_view_status:"update"});
      this.setState({button_value:1});
      
      if (this.state.show == true) {
        this.setState({ show: false });
      }
      if (this.state.show_sec == false) {
        this.setState({ show_sec: true });
      }
    };
    ShowHideComponent_full = () => {
      this.setState({modal_view_status:"comment"});
      this.setState({button_value:2});
      
      if (this.state.show == true) {
        this.setState({ show: false });
      }
      if (this.state.show_sec == true) {
        this.setState({ show_sec: false });
      }
    };
    self = () => {
        this.setState({priority:"self"});
        this.setState({priority_value:0});
        
        if (this.state.self_show == false) {
          this.setState({ self_show: true });
        }
        if (this.state.self_show_sec == true) {
          this.setState({ self_show_sec: false });
        }
      };
      team = () => {
        this.setState({priority:"team"});
        this.setState({priority_value:1});
        
        if (this.state.self_show == true) {
          this.setState({ self_show: false });
        }
        if (this.state.self_show_sec == false) {
          this.setState({ self_show_sec: true });
        }
      };
      myCreatedTaskShowHideComponentButtonFirst = () => {
        this.setState({myCreateTaskModalStatus:"status"});
        this.setState({myCreatedTaskModalValue:0});
        
        if (this.state.show == false) {
          this.setState({ show: true });
        }
        if (this.state.show_sec == true) {
          this.setState({ show_sec: false });
        }
      };
      myCreatedTaskShowHideComponentBottonSec = () => {
        this.setState({myCreateTaskModalStatus:"update"});
        this.setState({myCreatedTaskModalValue:1});
        
        if (this.state.show == true) {
          this.setState({ show: false });
        }
        if (this.state.show_sec == false) {
          this.setState({ show_sec: true });
        }
      };
      
    componentDidMount(){
      this.initialize();  
    }

    async initialize(){
      await this.My_task();
      this.ShowHideComponent_short();
      this.myCreatedTaskShowHideComponentButtonFirst();
      this.self();
      this.self_team();
    }

      async extractLink(){
        await extractBaseURL().then((baseURL) => {
          this.setState({baseURL}, () => console.log("EXTRACT LINK: ", this.state.baseURL))
        })
      }

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
      handleClose = () => {
        this.setState({ model_close: false })
    }
    taskOverViewComment(){
      const context=this;
      Actions.taskOverViewComment({data:this.state.MyData,AnotherValue:this.state.AnotherValue});
      this.setState({ slideAnimationDialog: false });
     }
     taskOverViewUpdate(){
      const context=this;
      Actions.taskOverViewUpdate({data:this.state.MyData,AnotherValue:this.state.AnotherValue});
      this.setState({ slideAnimationDialog: false });
     }
     taskOverViewHistory(){
      const context=this;
      Actions.taskOverViewHistory({data:this.state.MyData,AnotherValue:this.state.AnotherValue});
      this.setState({ slideAnimationDialog: false });
     }
    // taskOverViewComment(){
    //   const context=this;
    //   context.props.navigation.navigate("taskOverViewComment_sec",{id:this.state.taskoverview_id});
    //   this.setState({ slideAnimationDialog: false });
    //  }
    //  taskOverViewUpdate(){
    //   const context=this;
    //   context.props.navigation.navigate("taskOverViewUpdate_sec",{id:this.state.taskoverview_id});
    //   this.setState({ slideAnimationDialog: false });
    //  }
    //  taskOverViewHistory(){
    //   const context=this;
    //   context.props.navigation.navigate("taskOverViewHistory_sec",{id:this.state.taskoverview_id});
    //   this.setState({ slideAnimationDialog: false });
    //  }
     onDismiss(){
      this.setState({ defaultAnimationDialog: false });
     }
     
     dropDownValueChange(value){
      console.log("value",value)
      this.setState({valueStatus:"Task Status"}) 
      this.setState({valueTaskTitle:"Task Title"}) 
      this.setState({EmployeeValueStatus:"Task Status"}) 
      
    }
    confirmTaskStatus(){
      this.setState({saveStatus: true})
      const anyTaskStatusError = this.state.anyTaskStatusError();
      const noTaskStatusError = this.state.noTaskStatusError();
      if(anyTaskStatusError){
        Alert.alert("Please fill the fields highlighted in RED")
      }
      if(noTaskStatusError){
        this.changeEmployeeTaskStatus();
      }
    }
    changeEmployeeTaskStatus=async()=>{
      const {baseURL} = this.state;
      const context=this;
      const _this = this;
      this.showLoader();
      console.log("comment")
      var user_token= await AsyncStorage.getItem('user_token');
      var permissions_fir= JSON.parse(user_token);
      var permissions_sec=permissions_fir.success.secret_token;
      var data = new FormData();
      console.log("this.state.changeEmployeeTask_id",this.state.changeEmployeeTask_id)
data.append("task_id", this.state.changeEmployeeTask_id);
data.append("selected_status", this.state.changeEpmloyeeTaskStatus);
data.append("comment", this.state.change_employee_task_status_comment);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState !== 4) {
    return;
  } if(xhr.status===200){
    _this.hideLoader();
    var json_obj = JSON.parse(xhr.responseText);
    console.log(json_obj)
    context.setState({change_employee_task_status_comment:''})
    context.setState({EmployeeValueStatus:""})
    context.setState({saveStatus: false})
    context.setState({statusError: true})
    context.setState({taskStatusCommentError: true}) 
    context.setState({mandatory_sec: '1', self_task: []})
    context.setState({ slideAnimationDialog_CreatedTask: false });
    var msg = json_obj.success.message;
    context.initialize();
    console.log("changeEmployeeTaskStatus",msg)
    Alert.alert(msg);
}else if(xhr.status === 405){
  _this.hideLoader();
  var json_obj = JSON.parse(xhr.responseText);
  console.log(json_obj)
  context.setState({change_employee_task_status_comment:''})
  context.setState({EmployeeValueStatus:""}) 
  context.setState({saveStatus: false})
  context.setState({statusError: true})
  context.setState({taskStatusCommentError: true}) 
  context.setState({ slideAnimationDialog_CreatedTask: false });
  var msg = json_obj.error;
  Alert.alert(msg);
}else{
  context.setState({saveStatus: false})
  context.setState({statusError: true})
  context.setState({taskStatusCommentError: true}) 
  context.setState({ slideAnimationDialog_CreatedTask: false });
  var json_obj = JSON.parse(xhr.responseText);
  console.log(xhr.responseText); 
  _this.hideLoader();
  _this.enableModal(xhr.status, "036");
}
});

xhr.open("POST", `${baseURL}/change-task-status`);
xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);

xhr.send(data);
    }

    taskHistory=async()=>{
      const {baseURL} = this.state;
      const context=this;
      const _this = this;
      this.showLoader();
      console.log("update_task")
      var user_token= await AsyncStorage.getItem('user_token');
      var permissions_fir= JSON.parse(user_token);
      var permissions_sec=permissions_fir.success.secret_token;
      // var task_id = JSON.parse(context.props.route.params.id);
      const name = permissions_fir.success.user.employee.fullname;
      var image = {uri:permissions_fir.success.user.employee.profile_picture}
      this.setState({name:name})
      //this.setState({image:image})
      // this.setState({task_id:task_id});
      console.log("######update_task", this.state.taskoverview_id)
      this.setState({
        AnotherValue: permissions_fir
      });
    var data = new FormData();
    data.append("task_id", this.state.taskoverview_id);
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState !== 4) {
          
            return;
  }
          if(xhr.status===200){
            _this.hideLoader();
            console.log("sahi chal raha hai")
            var json_obj = JSON.parse(xhr.responseText);
           _this.setState({MyData:json_obj})
           _this.setState({
            slideAnimationDialog: true,
          })
        }
        else{
          // console.log(xhr.responseText)
         _this.hideLoader();
         _this.enableModal(xhr.status, "109");
        }
    });
    
    xhr.open("POST", `${baseURL}/task-detail`);
    xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);
    xhr.send(data);
}

    renderScreenHeader(employer){
      switch(employer){
        case "XEAMHO":
          return (
            <WaveHeader
              wave={Platform.OS ==="ios" ? false : false} 
              //logo={require('../Image/Logo-164.png')}
              menu='white'
              title='Task List'
              //version={`Version ${this.state.deviceVersion}`}
            />
                );
        case "Lehri HO":
          return (
            <WaveHeader
              wave={Platform.OS ==="ios" ? false : false} 
              //logo={require('../Image/Logo-164.png')}
              menu='white'
              title='Task List'
              //version={`Version ${this.state.deviceVersion}`}
            />
                );
        case "Aarti Drugs Ltd":
          return <Header navigation={this.props.navigation} title='Task List' width={[getWidthnHeight(50)]} menu="white" images={false}/>
        default:
          return null;
        }
      }
      getUniqueListBy(EmpName, key) {
        return [...new Map(EmpName.map(item => [item[key], item])).values()]
      }

      resetState4Modal(){
        this.setState({
          changeEpmloyeeTaskStatus: '', change_employee_task_status_comment: '',
          saveStatus: false, statusError: true, taskStatusCommentError: true,
          saveTaskDetail: false, taskTitleError: false, upDateCommentError: false,
        }, () => this.setState({ slideAnimationDialog_CreatedTask: false }))
      }

      searchEmpName(empArray, searchName, callBack){
        const filterNames = empArray.filter((data) => {
            const empName = data.task_user.user.employee.fullname.toLowerCase().includes(searchName.toLowerCase())
            return empName
        })
        if(filterNames.length < 1){
            console.log("NO RESULTS TO DISPLAY")
            return;
        }

        console.log("FILTER NAME: ", filterNames[0]['task_user']['user']['employee']['fullname'])
        //console.log("*******FILTER NAMES: ", filterNames, searchName.split(''), typeof filterNames.length)
        const splitArray = searchName.toLowerCase().split('');
        const searchLength = splitArray.length;
        let data = [];
        //console.log("SPLIT SEARCH: ", splitArray, searchLength)
        for(let i = 0; i <= filterNames.length - 1; i++){
            const empName = filterNames[i]['task_user']['user']['employee']['fullname'];
            const splitEmpName = empName.toLowerCase().split('');
            //console.log("INSIDE LOOP: ", splitArray, splitEmpName)
                for(let j = 0; j < searchLength; j++){
                    //console.log("INSIDE FOR LOOP****: ", j)
                    if(splitArray[j] !== splitEmpName[j]){
                        break;
                    }
                    if(j === searchLength - 1 && splitArray[j] === splitEmpName[j]){
                        data.push(filterNames[i])
                        console.log("FOR LOOP DATA: ", data)
                        callBack(data)
                    }
                }
        }
    }

      multipleCards(){
        const {self_task, searchText, empty} = this.state;
        //console.log("SELF TASK: ", self_task)
        let empArray = self_task;
        let data = [];
        const searchName = searchText;
        //console.log("BEFORE FILTER*****: ", empArray, empArray.length, searchName)
        if(searchName){
            this.searchEmpName(empArray, searchName, (dataArray) => {
              if(dataArray !== [] && dataArray !== null && dataArray.length !== null && dataArray.length > 0){
                data = dataArray
                console.log("CALLBACK DATA: ", data)
              }
            });
            console.log("IF STATEMENT: ", searchName, data)
            // if(data === []){
            //     console.log("DATA LENGTH: ", data.length)
            // }
        }
        if(data !== [] && data !== null && data.length !== null && data.length > 0 && empty === false){
          //console.log("SEARCH RESULT FOUND")
          return data.map((item,key) => {
            let date = item.due_date;
            let splitDate = date.split('-')
            let dueDate = splitDate[2]+'/'+splitDate[1]+'/'+splitDate[0]
            console.log("DUE DATE: ", dueDate)
            if(item.priority=='H1'){
              var color = '#fffdd0';
             }
             if(item.priority=='H2'){
              var color = 'yellow';
             }
             if(item.priority=='H3'){
              var color = 'aqua';
             }
             if(item.priority=='H4'){
              var color = 'orange';
             }
             if(item.priority=='H5'){
              var color = 'red';
             }
      return (
            <View style={[styles.cardStyle, {borderColor: color}]} key={key}>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={{width:'90%'}} onPress={()=>{
                    if(item.status !== 'Completed'){
                      this.setState({ 
                      slideAnimationDialog_CreatedTask: true ,
                      changeEmployeeTask_id: item.id,
                      Task_title:item.title,
                      my_created_Due_date:item.due_date,
                      my_created_task_update_description:item.description,
                      my_created_task_priority:item.priority,
                      TaskStatus:item.task_user.status,
                      })
                    }else{
                      Alert.alert("Not Allowed", "When TASK STATUS is set to COMPLETED")
                    }
                }}>
                  <Text style={{fontWeight:'bold',left:'0%',}}>  {item.title} </Text>
                </TouchableOpacity>
              </View>
              
              <NameBottomBorder/>
              
              <View style={{flexDirection:'row',margin:10}}>
                <View style={{left:'0%',flexDirection:'row',top:'15%'}}>
                  <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>To: </Text>
                  <Text style={{fontSize:10,}}>{item.task_user.user.employee.fullname}  |</Text>
                  <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>  DD: </Text>
                  <Text style={{fontSize:10,}}>{dueDate} |</Text>
                  <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>  Priority: </Text>
                  <Text style={[
                    (item.priority=='H1')?styles.h1:styles.none &&
                    (item.priority=='H2')?styles.h2:styles.none &&
                    (item.priority=='H3')?styles.h3:styles.none &&
                    (item.priority=='H4')?styles.h4:styles.none &&
                    (item.priority=='H5')?styles.h5:styles.none 
                  ]}>{item.priority}</Text>
                </View>
              </View>
              <View style={{flexDirection:'row',left:'0%'}}>
                <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>   Task Status: </Text>
                <Text style={{fontSize:10,}}>{item.status} |</Text>
                <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>  User Status: </Text>
                <Text style={[
                  (item.task_user.status == 'Not-Started') ? styles.notStart:styles.none && 
                  (item.task_user.status == 'Inprogress') ? styles.improgress:styles.none && 
                  (item.task_user.status == 'Done') ? styles.done:styles.none
                ]}>{item.task_user.status}</Text>
                <TouchableOpacity onPress={() => {
                  this.setState({
                    taskoverview_project:item.task_project.name,
                    taskoverview_title:item.title,
                    taskoverview_due_date:item.due_date,
                    taskoverview_id:item.id,
                  })|| this.taskHistory();
                }}>
                  <Text style={{fontSize:10,color:'rgb(19,111,232)',textDecorationLine: 'underline'}}>  TASK OVERVIEW </Text>
                </TouchableOpacity>
              </View>
            </View>
          )})
        }else if(data.length === 0 && empty === false){
          return (
            <View style={{alignItems: 'center', marginTop: 30}}>
              <Text style={{color: 'grey'}}>No such name found</Text>
            </View>
          );
        }else if(empty){
        return (
          self_task.map((item,key) => {
            let date = item.due_date;
            let splitDate = date.split('-')
            let dueDate = splitDate[2]+'/'+splitDate[1]+'/'+splitDate[0]
            if(item.priority=='H1'){
              var color = '#fffdd0';
             }
             if(item.priority=='H2'){
              var color = 'yellow';
             }
             if(item.priority=='H3'){
              var color = 'aqua';
             }
             if(item.priority=='H4'){
              var color = 'orange';
             }
             if(item.priority=='H5'){
              var color = 'red';
             }
      return (
            <View style={[styles.cardStyle, {borderColor: color}]} key={key}>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={{width:'90%'}} onPress={()=>{
                    if(item.status !== 'Completed'){
                      this.setState({ 
                      slideAnimationDialog_CreatedTask: true ,
                      changeEmployeeTask_id: item.id,
                      Task_title:item.title,
                      my_created_Due_date:item.due_date,
                      my_created_task_update_description:item.description,
                      my_created_task_priority:item.priority,
                      TaskStatus:item.task_user.status,
                      })
                    }else{
                      Alert.alert("Not Allowed", "When TASK STATUS is set to COMPLETED")
                    }
                }}>
                  <Text style={{fontWeight:'bold',left:'0%',}}>  {item.title} </Text>
                </TouchableOpacity>
              </View>
              
              <NameBottomBorder/>
              
              <View style={{flexDirection:'row',margin:10}}>
                <View style={{left:'0%',flexDirection:'row',top:'15%'}}>
                  <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>To: </Text>
                  <Text style={{fontSize:10,}}>{item.task_user.user.employee.fullname}  |</Text>
                  <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>  DD: </Text>
                  <Text style={{fontSize:10,}}>{dueDate} |</Text>
                  <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>  Priority: </Text>
                  <Text style={[
                    (item.priority=='H1')?styles.h1:styles.none &&
                    (item.priority=='H2')?styles.h2:styles.none &&
                    (item.priority=='H3')?styles.h3:styles.none &&
                    (item.priority=='H4')?styles.h4:styles.none &&
                    (item.priority=='H5')?styles.h5:styles.none 
                  ]}>{item.priority}</Text>
                </View>
              </View>
              <View style={{flexDirection:'row',left:'0%'}}>
                <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>   Task Status: </Text>
                <Text style={{fontSize:10,}}>{item.status} |</Text>
                <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>  User Status: </Text>
                <Text style={[
                  (item.task_user.status == 'Not-Started') ? styles.notStart:styles.none && 
                  (item.task_user.status == 'Inprogress') ? styles.improgress:styles.none && 
                  (item.task_user.status == 'Done') ? styles.done:styles.none
                ]}>{item.task_user.status}</Text>
                <TouchableOpacity onPress={() => {
                  this.setState({
                    taskoverview_project:item.task_project.name,
                    taskoverview_title:item.title,
                    taskoverview_due_date:item.due_date,
                    taskoverview_id:item.id,
                  })|| this.taskHistory();
                }}>
                  <Text style={{fontSize:10,color:'rgb(19,111,232)',textDecorationLine: 'underline'}}>  TASK OVERVIEW </Text>
                </TouchableOpacity>
              </View>
            </View>
          )})
        )}
      }

    render (){
            const context=this;
            const {
              task, button_value, self_task, myCreatedTaskModalValue, EmpName, my_created_task_update_description, errorCode, apiCode, 
              slideAnimationDialog_sec, slideAnimationDialog_CreatedTask, saveStatus, statusError, taskStatusCommentError, taskTitleError,
              upDateCommentError, saveTaskDetail,
            } = this.state;
            // console.log(task_title)
            // console.log(this.state.taskoverview_id)
            const value=[{task_type:"All",my_status:"All",task_status:"All"},
                         {task_type:"Today's Tasks ",my_status:"Not-Started",task_status:"Open"},
                         {task_type:"Delayed Tasks",my_status:"Inprogress",task_status:"Inprogress"},
                         {task_type:"Upcoming Tasks",my_status:"Unassigned",task_status:"Reopened"},
                         {task_type:"This Week's Tasks",my_status:"Done",task_status:"Completed"},
                         {task_type:"This Month's Tasks",task_status:"Unassigned"}]
              
          let task_type = [{value: 'All',}, {value: 'Today Tasks',}, {value: 'Delayed Tasks',},{value: 'Upcoming Tasks', },{value: "This Week's Tasks",},{value: "This Month's Tasks",},];
          let my_status = [{value: 'All',}, {value: 'Not-Started',}, {value: 'Inprogress',},{value: 'Unassigned', },{value: "Done",}];
          let task_status = [{value: 'All',}, {value: 'Open',}, {value: 'Inprogress',},{value: 'Reopened', },{value: "Completed",},{value: "Unassigned",},];
          // console.log(this.state.task_type_sec)
          // console.log(this.state.my_status_sec)
          // console.log(this.state.task_status_sec)
          const status=[{value:"Mark as improgress",id:"Inprogress"},{value:"Mark as Done",id:"Done"},];
          const changeEpmloyeeTaskStatus=[{value:"Mark as Completed",id:"Completed"},{value:"Mark as Reopened",id:"Reopened"},{value:"Mark as Unassigned",id:"Unassigned"}];
          const data = this.getUniqueListBy(EmpNameData, 'name')
        function removeTags(str) {
          if ((str===null) || (str===''))
          return false;
          else
          str = str.toString();
          return str.replace( /(<([^>]+)>)/ig, '');
       }
       var htmlTagRemove = removeTags( my_created_task_update_description);
        console.log("htmlTagRemove",htmlTagRemove)
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
              <ActionModal 
                isVisible={slideAnimationDialog_sec}
                style={{justifyContent: 'flex-end', alignItems: 'center'}}
                avoidKeyboard={true}
                onBackdropPress={() => this.setState({slideAnimationDialog_sec: false})}
              >
                <View style={[{alignItems: 'center', backgroundColor: 'white', borderRadius: 10}, getWidthnHeight(85, 45)]}>
          <View style={styles.compo}>
            <TouchableOpacity style={[button_value=== 0 ? styles.modal_button_value_one :styles.modal_button_value_sec ]} onPress={this.ShowHideComponent_short}>
            <Text style={{color:'white',fontSize:9}} >
               Task Status
              </Text>
            </TouchableOpacity>
            {this.state.modal_task_status == 'Inprogress' ?
            <TouchableOpacity style={[button_value=== 1 ? styles.modal_button_value_one :styles.modal_button_value_sec ]} onPress={this.ShowHideComponent_half}>
            <Text style={{color:'white',fontSize:9}} >
               Task Update
              </Text>
            </TouchableOpacity>:null}
            <TouchableOpacity style={[button_value=== 2 ? styles.modal_button_value_one :styles.modal_button_value_sec ]} onPress={this.ShowHideComponent_full}> 
              <Text style={{color:'white',fontSize:9}}>
               Comment
              </Text>
            </TouchableOpacity>
             </View>
             {(this.state.loading) ? 
              <Spinner loading={this.state.loading} style={[styles.loadingStyle, getWidthnHeight(45, 10)]}/> 
            : null
            }

             {this.state.modal_view_status == 'status' ? (
               
               <View style={{justifyContent: 'space-evenly', flex: 1, borderWidth: 0, borderColor: 'red'}}>
             <View>
             <Dropdown
               containerStyle={[getWidthnHeight(70)]}
               inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)",fontSize:10 }}
               data={status}
               valueExtractor={({id})=> id}
              labelExtractor={({value})=> value}
               value={this.state.valueStatus}
               label='Task status'
               onChangeText={status => this.setState({ status })}
             />
             </View>
             <View>
             <Text>Comment:</Text>
            
             
              <TextInput
                  style={[{alignItems: 'center' , borderColor: 'rgb(19,111,232)', borderWidth: 1,fontSize:12, borderRadius: 5}, getWidthnHeight(70, 10)]}
                  //  placeholder={'Enter Comment'}
                   multiline
                  numberOfLines={4}
                  editable
                  maxLength={190}
                   keyboardType="default"
                   onChangeText={task_status_comment => this.setState({ task_status_comment })}
                   value={this.state.task_status_comment}
                 />
                
                
             </View>
             <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
             
                        <TouchableOpacity style={{
                          backgroundColor:'green',
                          paddingLeft:10,
                          paddingRight:10,
                          paddingBottom:10,
                          paddingTop:10,
                          borderRadius:10,
                          width:'30%'
                          }} onPress={this.My_task_status}>
                        
                              <Text style={{fontSize:12,color:'white',textAlign:'center'}}>Save</Text>
               
                        </TouchableOpacity>
             
                        <TouchableOpacity style={{
                          backgroundColor:'red',
                          paddingLeft:10,
                          paddingRight:10,
                          paddingBottom:10,
                          paddingTop:10,
                          borderRadius:10,
                          width:'30%'
                        }} onPress={() => {
                                      this.setState({ slideAnimationDialog_sec: false });
                                        }}>
                               <Text style={{fontSize:12,color:'white',textAlign:'center'}}>Cancel</Text>
                        </TouchableOpacity>
             
             </View>
             </View>
           
              ) : null}
            
              {this.state.modal_view_status == 'update' ? (
                <View style={{justifyContent: 'space-evenly', flex: 1, borderWidth: 0, borderColor: 'red'}}>
                <View style={[{flexDirection:'column', alignItems: 'flex-start', borderColor: 'black', borderWidth: 0}, getWidthnHeight(70)]}>
                  <Text style={{color:'gray'}}>
                    Task Title
                  </Text>
                  <Text style={{borderBottomWidth:2,borderColor:'rgb(19,111,232)'}}>{this.state.modal_task_title}</Text>
                </View>
                  
                  <View style={{bottom:'0%'}}>
             <Text style={{right:'0%',bottom:'0%'}}>Update (Minimum 25 Characters):</Text>
             
             
              <TextInput
                  style={[{borderColor: 'rgb(19,111,232)', borderWidth: 1,fontSize:12,borderRadius: 5}, getWidthnHeight(70, 10)]}
                  //  placeholder={'Enter Comment'}
                   multiline
                  numberOfLines={4}
                  editable
                  maxLength={190}
                   keyboardType="default"
                   onChangeText={update_description => this.setState({ update_description })}
                   value={this.state.update_description}
                 />
                 
             </View>
             <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
             
                        <TouchableOpacity style={{
                          backgroundColor:'green',
                          paddingLeft:10,
                          paddingRight:10,
                          paddingBottom:10,
                          paddingTop:10,
                          borderRadius:10,
                          width:'30%'
                        }} onPress={this.update_task}>
                        
               <Text style={{fontSize:12,color:'white',textAlign:'center'}}>Save</Text>
               
               </TouchableOpacity>
              
                        <TouchableOpacity style={{
                          backgroundColor:'red',
                          paddingLeft:10,
                          paddingRight:10,
                          paddingBottom:10,
                          paddingTop:10,
                          borderRadius:10,
                          width:'30%'
                        }} onPress={() => {
                  this.setState({ slideAnimationDialog_sec: false });
                }}>
               <Text style={{fontSize:12,color:'white',textAlign:'center'}}>Cancel</Text>
               </TouchableOpacity>
              
             
             </View>
                  </View>
                  ) : null}
                  
                  {this.state.modal_view_status == 'comment' ? (
                 <View style={{justifyContent: 'space-evenly', flex: 1, borderColor: 'red' ,borderWidth: 0}}>
                   
                 
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.chooseFileButton, getWidthnHeight(70, 5)]}
          onPress={this.SingleFilePicker.bind(this)}>
          <Text style={{color:'white',left:'0%',textAlign:'center'}}>
          {this.state.singleFileOBJ.name ? this.state.singleFileOBJ.name : 'Choose file (Optional)'}
          </Text>
        </TouchableOpacity>
        
        <View>
             <Text>Comment:</Text>
            
             
              <TextInput
                  style={[{borderColor: 'rgb(19,111,232)', borderWidth: 1,fontSize:12, borderRadius: 5}, getWidthnHeight(70, 10)]}
                  //  placeholder={'Enter Comment'}
                   multiline
                  numberOfLines={4}
                  editable
                  maxLength={190}
                   keyboardType="default"
                   onChangeText={comment_text => this.setState({ comment_text })}
                   value={this.state.comment_text}
                 />
                 
             </View>
                  
                 
             <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                       
                        <TouchableOpacity style={{
                          backgroundColor:'green',
                          paddingLeft:10,
                          paddingRight:10,
                          paddingBottom:10,
                          paddingTop:10,
                          borderRadius:10,
                          width:'30%'
                        }} onPress={() => this.comment()}>
                        
               <Text style={{fontSize:12,color:'white',textAlign:'center'}}>Save</Text>
               
               </TouchableOpacity>
        
                        <TouchableOpacity style={{
                          backgroundColor:'red',
                          paddingLeft:10,
                          paddingRight:10,
                          paddingBottom:10,
                          paddingTop:10,
                          borderRadius:10,
                          width:'30%'
                        }} onPress={() => {
                  this.setState({ slideAnimationDialog_sec: false });
                }}>
               <Text style={{fontSize:12,color:'white',textAlign:'center'}}>Cancel</Text>
               </TouchableOpacity>
               
             
             </View>
             
          </View>
          ) : null}
                </View>
              </ActionModal>
      
        <ActionModal 
          isVisible={slideAnimationDialog_CreatedTask}
          style={{justifyContent: 'flex-end', alignItems: 'center'}}
          avoidKeyboard={true}
          onBackdropPress={() => this.resetState4Modal()}
        >
        <View style={[{alignItems: 'center', backgroundColor: 'white', borderRadius: 10}, getWidthnHeight(85, 50)]}>
            {(this.state.loading) ? 
              <Spinner loading={this.state.loading} style={[styles.loadingStyle, getWidthnHeight(45, 10)]}/> 
            : null
            }
          <View style={[{backgroundColor:'#F1F1F1', justifyContent: 'center'}, getWidthnHeight(85, 7)]}>
            <Text style={{textAlign: 'center', fontWeight: 'bold', textAlignVertical: 'center'}}>Take an Action</Text>
          </View>
          
          <View style={styles.compo_Sec}>
          
            <TouchableOpacity style={[myCreatedTaskModalValue=== 0 ? styles.modal_button_value_one :styles.modal_button_value_sec ]} onPress={this.myCreatedTaskShowHideComponentButtonFirst}>
              <Text style={{color:'white',fontSize:9}} >
                Task Status
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[myCreatedTaskModalValue=== 1 ? styles.modal_button_value_one :styles.modal_button_value_sec ]} onPress={this.myCreatedTaskShowHideComponentBottonSec}>
            <Text style={{color:'white',fontSize:9}} >
              Task Detail
              </Text>
            </TouchableOpacity>
            
             </View>
              
             {this.state.myCreateTaskModalStatus == 'status' ? (
               
            <View style={{justifyContent: 'space-evenly', flex: 1, borderWidth: 0, borderColor: 'red'}}>
            <View>
              <Dropdown
                  containerStyle={[getWidthnHeight(70)]}
                  inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor: (saveStatus && statusError)? 'red' : 'rgb(19,111,232)',fontSize:10 }}
                  data={changeEpmloyeeTaskStatus}
                  valueExtractor={({id})=> id}
                  labelExtractor={({value})=> value}
                  value={this.state.EmployeeValueStatus}
                  label='Task status'
                  onChangeText={changeEpmloyeeTaskStatus=> {
                    this.setState({ changeEpmloyeeTaskStatus })
                    this.setState({statusError: false})
                  }}
              />
             </View>

             <View>
            <Text>Comment:</Text>
              <TextInput
                style={[{alignItems: 'center' , borderColor: (saveStatus && taskStatusCommentError)? 'red' : 'rgb(19,111,232)', borderWidth: 1,fontSize:12, borderRadius: 5}, getWidthnHeight(70, 10)]}
                //  placeholder={'Enter Comment'}
                multiline
                numberOfLines={4}
                editable
                maxLength={190}
                keyboardType="default"
                onChangeText={change_employee_task_status_comment => {
                  this.setState({ change_employee_task_status_comment })
                  this.setState({taskStatusCommentError: false})
                  if(change_employee_task_status_comment === ''){
                    this.setState({taskStatusCommentError: true})
                  }
                }}
                value={this.state.change_employee_task_status_comment}
              />
                
                
             </View>
             <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
             
                        <TouchableOpacity style={{
                          backgroundColor:'green',
                          paddingLeft:10,
                          paddingRight:10,
                          paddingBottom:10,
                          paddingTop:10,
                          borderRadius:10,
                          width:'30%'
                          }} onPress={this.confirmTaskStatus.bind(this)}>
                        
                              <Text style={{fontSize:12,color:'white',textAlign:'center'}}>Save</Text>
               
                        </TouchableOpacity>
             
                        <TouchableOpacity style={{
                          backgroundColor:'red',
                          paddingLeft:10,
                          paddingRight:10,
                          paddingBottom:10,
                          paddingTop:10,
                          borderRadius:10,
                          width:'30%'
                          }} 
                          onPress={() => this.resetState4Modal()}>
                            <Text style={{fontSize:12,color:'white',textAlign:'center'}}>Cancel</Text>
                        </TouchableOpacity>
             
             </View>
            
             </View>
           
              ) : null}
              
              {this.state.myCreateTaskModalStatus == 'update' ? (
                <View style={[{alignItems: 'center', flex: 1, borderWidth: 0, borderColor: 'green', marginTop: 10}, getWidthnHeight(85)]}>
                  <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[{alignItems: 'center'}, getWidthnHeight(85)]}>
                <TextInput
                    style={[{borderColor: (saveTaskDetail && taskTitleError)? 'red' : 'rgb(19,111,232)', borderBottomWidth:1,fontSize:15}, getWidthnHeight(70)]}
                    placeholder={'Task Title Here'}
                    keyboardType="default"
                    value={this.state.Task_title}
                    onChangeText={Task_title => {
                      this.setState({ Task_title })
                      this.setState({taskTitleError: false})
                      if(Task_title === ''){
                        this.setState({taskTitleError: true})
                      }
                    }}
                />
                <View style={{marginTop: 20}}>
                <Text style={{fontSize:15}}>Priority:</Text>
                <View style={[{flexDirection:'row'}, getWidthnHeight(70)]}>
                  {this.state.my_created_task_priority!=='H1' ?
                    <TouchableOpacity style={{backgroundColor:'#fffdd0',borderColor:'transparent',borderWidth:2,width:'20%',height:'100%',}} onPress={()=>this.setState({my_created_task_priority:"H1"})}>
                        <Text style={{color:'black',textAlign:'center'}}>H1</Text>
                    </TouchableOpacity>:null}
                    {this.state.my_created_task_priority=='H1' ?
                    <TouchableOpacity style={{backgroundColor:'#fffdd0',borderColor:'rgb(19,111,232)',borderWidth:2,width:'20%',height:'100%',}} onPress={()=>this.setState({my_created_task_priority:"H1"})}>
                        <Text style={{color:'black',textAlign:'center'}}>H1</Text>
                    </TouchableOpacity>:null}

                    {this.state.my_created_task_priority!=='H2' ?
                    <TouchableOpacity style={{backgroundColor:'#ffff00',borderColor:'transparent',borderWidth:2,width:'20%',height:'100%',}} onPress={()=>this.setState({my_created_task_priority:"H2"})}>
                        <Text style={{color:'black',textAlign:'center'}}>H2</Text>
                    </TouchableOpacity>:null}
                    {this.state.my_created_task_priority=='H2' ?
                    <TouchableOpacity style={{backgroundColor:'#ffff00',borderColor:'rgb(19,111,232)',borderWidth:2,width:'20%',height:'100%',}} onPress={()=>this.setState({my_created_task_priority:"H2"})}>
                        <Text style={{color:'black',textAlign:'center'}}>H2</Text>
                    </TouchableOpacity>:null}

                    {this.state.my_created_task_priority!=='H3' ? 
                    <TouchableOpacity style={{backgroundColor:'#00ffff',borderColor:'transparent',borderWidth:2,width:'20%',height:'100%',}} onPress={()=>this.setState({my_created_task_priority:"H3"})}>
                        <Text style={{color:'black',textAlign:'center'}}>H3</Text>
                    </TouchableOpacity>:null}
                    {this.state.my_created_task_priority=='H3' ?
                    <TouchableOpacity style={{backgroundColor:'#00ffff',borderColor:'rgb(19,111,232)',borderWidth:2,width:'20%',height:'100%',}} onPress={()=>this.setState({my_created_task_priority:"H3"})}>
                        <Text style={{color:'black',textAlign:'center'}}>H3</Text>
                    </TouchableOpacity>:null}

                    {this.state.my_created_task_priority!=='H4' ?
                    <TouchableOpacity style={{backgroundColor:'#ffa500',borderColor:'transparent',borderWidth:2,width:'20%',height:'100%',}} onPress={()=>this.setState({my_created_task_priority:"H4"})}>
                        <Text style={{color:'black',textAlign:'center'}}>H4</Text>
                    </TouchableOpacity>:null}
                    {this.state.my_created_task_priority=='H4' ?
                    <TouchableOpacity style={{backgroundColor:'#ffa500',borderColor:'rgb(19,111,232)',borderWidth:2,width:'20%',height:'100%',}} onPress={()=>this.setState({my_created_task_priority:"H4"})}>
                        <Text style={{color:'black',textAlign:'center'}}>H4</Text>
                    </TouchableOpacity>:null}

                    {this.state.my_created_task_priority!=='H5' ?
                    <TouchableOpacity style={{backgroundColor:'#ff0000',borderColor:'transparent',borderWidth:2,width:'20%',height:'100%',}} onPress={()=>this.setState({my_created_task_priority:"H5"})}>
                        <Text style={{color:'black',textAlign:'center'}}>H5</Text>
                    </TouchableOpacity>:null}
                    {this.state.my_created_task_priority=='H5' ?
                    <TouchableOpacity style={{backgroundColor:'#ff0000',borderColor:'rgb(19,111,232)',borderWidth:2,width:'20%',height:'100%',}} onPress={()=>this.setState({my_created_task_priority:"H5"})}>
                        <Text style={{color:'black',textAlign:'center'}}>H5</Text>
                    </TouchableOpacity>:null}

                </View>
                </View>
                <View style={[{alignItems: 'center', marginVertical: 20}, getWidthnHeight(70)]}>
            <DatePicker
                  style={[{borderColor:'rgb(19,111,232)',borderBottomWidth:1,}, getWidthnHeight(70)]}
                  date={this.state.my_created_Due_date}
                  
                  mode="date"
                  placeholder="Due Date"
                  format="YYYY/MM/DD"
                  minDate="2016/01/01"
                  maxDate="2022/12/30"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  
                  onDateChange={(date) => {this.setState({my_created_Due_date: date}, () => console.log("DATE CHANGED: ", this.state.my_created_Due_date))}}
                />
                
              </View>
              <View style={{marginBottom: 20}}>
              <Text>Update (Minimum 25 Characters):</Text>
             
             
              <TextInput
                   style={[{borderColor: (saveTaskDetail && upDateCommentError)? 'red' : 'rgb(19,111,232)', borderWidth: 1,fontSize:12 }, getWidthnHeight(70)]}
                  //  placeholder={'Enter Comment'}
                   multiline
                  numberOfLines={4}
                  editable
                  maxLength={190}
                   keyboardType="default"
                   onChangeText={my_created_task_update_description => {
                      this.setState({ my_created_task_update_description })
                      this.setState({upDateCommentError: false})
                      if(my_created_task_update_description === ''){
                        this.setState({upDateCommentError: true})
                      }
                  }}
                   value={htmlTagRemove} 
                 />
                 
             </View>
             </ScrollView>
             <View style={[{alignItems:'center', borderColor: 'grey', borderTopWidth: 1, justifyContent: 'center'}, getWidthnHeight(85, 6)]}>
             <View style={[{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}, getWidthnHeight(70)]}>
                        <TouchableOpacity style={[{
                          backgroundColor:'green',
                          paddingLeft:10,
                          paddingRight:10,
                          paddingBottom:10,
                          paddingTop:10,
                          borderRadius:10,
                          width: '30%'
                        }, getWidthnHeight(undefined, 5)]} onPress={this.confirmTaskUpdate.bind(this)}>
                        
               <Text style={{fontSize:12,color:'white',textAlign:'center'}}>Save</Text>
               
               </TouchableOpacity>
              
                        <TouchableOpacity style={[{
                          backgroundColor:'red',
                          paddingLeft:10,
                          paddingRight:10,
                          paddingBottom:10,
                          paddingTop:10,
                          borderRadius:10,
                          width: '30%'
                        }, getWidthnHeight(undefined, 5)]} 
                          onPress={() => this.resetState4Modal()}
                        >
               <Text style={{fontSize:12,color:'white',textAlign:'center'}}>Cancel</Text>
               </TouchableOpacity>
               </View>
             </View>
                  </View>
                  ) : null}
                  
                 
           </View>
        </ActionModal>
           
          
           {(this.state.self) ? 
           <View>
           <View style={styles.pagecomponent_nine}>
            <View style={[{alignItems:'center', flex: 1}, getWidthnHeight(100)]}>
              <Text style={{backgroundColor:'white',color:'rgb(19,111,232)', textAlign: 'center'}}>  Search For Particular Tasks  </Text>
              </View>
              </View>
            <View style={{flexDirection:'row',alignItems:'center',}}>
              
            <Dropdown
               
              containerStyle={{width:'26%',}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)",fontSize:10 }}
              value={'All'}
              data={task_type}
              label='Task Type'
              onChangeText={task_type => this.setState({ task_type })}
            />
            <Dropdown
              containerStyle={{width:'25%',}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={my_status}
              value={'All'}
              label='My status'
              onChangeText={my_status => this.setState({ my_status })}
              
            />
            <Dropdown
              containerStyle={{width:'28%',}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={task_status}
              value={'All'}
              label='Task status'
              onChangeText={task_status => this.setState({ task_status })}
            />
           
            </View>
            <View style={{width:'20%',alignItems:'center'}}>
            <TouchableOpacity style={{backgroundColor:'rgb(19,111,232)',top:'5%',borderRadius: 4,paddingLeft:10,paddingRight:10,paddingTop:5,paddingBottom:5}} onPress={() =>this.My_task()}>
            <Text style={{color:'white'}} >Search</Text>
            </TouchableOpacity>
            </View>
            <View style={{backgroundColor:'#f1f1f1',height:'0.4%',width:'100%'}}/>
              
              <View style={styles.card_view_thrd}>
              <Text style={{color:'#fcfeff',}}>Task List: </Text>
              </View>
              <Image source={LeftSide} style={{height:'4%',width:50,}}/>
              <View>
              <Dialog
        onDismiss={() => {
          this.setState({ slideAnimationDialog: false });
        }}
        onTouchOutside={() => {
          this.setState({ slideAnimationDialog: false });
        }}
        visible={this.state.slideAnimationDialog}
        
        dialogTitle={<DialogTitle title="Task OverView" />}
        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}>
        <DialogContent>
          <View>
          <View style={{flexDirection:'row'}}>
          <Text style={{color:'rgb(19,111,232)'}}> Task Project: </Text>
          <Text> {this.state.taskoverview_project} {"\n"} </Text>
          </View>
          <View style={{flexDirection:'row'}}>
          <Text style={{color:'rgb(19,111,232)'}}> Task title: </Text>
          <Text> {this.state.taskoverview_title} {"\n"} </Text>
          </View>
          <View style={{flexDirection:'row'}}>
          <Text style={{color:'rgb(19,111,232)'}}> Due Date: </Text>
          <Text> {this.state.taskoverview_due_date} {"\n"} </Text>
          </View>
          
          <View style={{flexDirection:'row'}}>
          <Text style={{color:'rgb(19,111,232)'}}> Comment: </Text>
          <TouchableOpacity onPress={() =>this.taskOverViewComment()}>
          <Text style={{textDecorationLine: 'underline'}}> See all comments {"\n"} </Text>
          </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row'}}>
          <Text style={{color:'rgb(19,111,232)'}}> Task Update </Text>
          <TouchableOpacity onPress={() =>this.taskOverViewUpdate()}>
          <Text style={{textDecorationLine: 'underline'}}> See if you any updation in given task {"\n"} </Text>
          </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row'}}>
          <Text style={{color:'rgb(19,111,232)'}}> Task History </Text>
          <TouchableOpacity onPress={() =>this.taskOverViewHistory()}>
          <Text style={{textDecorationLine: 'underline'}}> See all task History {"\n"} </Text>
          </TouchableOpacity>
          </View>
          <View style={{borderTopWidth: 1,
                      borderBottomWidth:0,
                      borderRightWidth:0,
                      borderLeftWidth:0,
                      borderColor: '#818181',
                      width:'120%',
                      right:'10%',
                      alignItems:'center'}}>
                        <TouchableOpacity style={{left:'0%'}} onPress={() => {
                  this.setState({ slideAnimationDialog: false });
                }}>
               <Text style={{fontSize:20,color:'rgb(19,111,232)'}}>Cancel</Text>
               </TouchableOpacity>
               </View>
           </View>
        </DialogContent>
      </Dialog>
      {(this.state.loading) ?
            <View style={styles.loadingStyle}>

            <ActivityIndicator  size="large" color='rgb(19,111,232)' />
                    <Text style={{fontSize:15,left:10}}>Loading..</Text>
            </View>
            : null}
      
            <ScrollView style={{bottom:'15%',margin:0,height:hp('50%')}}>
            {this.state.mandatory == '0' ?
               <View>
            {task.map((item,key) => {
              let date = item.due_date;
              let day = item.due_date.substring(8,10);
              let month = item.due_date.substring(5,7);
              let year = item.due_date.substring(0,4);
              let dueDate = day+"/"+month+"/"+year;
              
      return (
              <View style={styles.task_list}>
                
                {item.status == 'Unassigned' ? 
               <Text style={{fontWeight:'bold',left:'0%'}}>  {item.title} </Text>:
                <TouchableOpacity onPress={() => {
                  this.setState({
                    slideAnimationDialog_sec: true,
                    task_id: item.id,
                    priority:item.priority,
                    due_date:item.due_date,
                    modal_task_title:item.title,
                    modal_task_status:item.task_user.status,
                    button_value:0,
                    modal_view_status:"status"
                    
                  });
                }}>
                <Text style={{fontWeight:'bold',left:'0%'}}>  {item.title} </Text>

                </TouchableOpacity>}
                <NameBottomBorder/>
                <View style={{flexDirection:'row',margin:10}}>
                
                 <View style={{left:'0%',flexDirection:'row',top:'15%'}}>
                <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>By: </Text>
                <Text style={{fontSize:10,}}>{item.user.employee.fullname}  |</Text>
                <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>  DD: </Text>
                <Text style={{fontSize:10,}}>{dueDate} |</Text>
                <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>  priority: </Text>
                <Text style={[
                  (item.priority=='H1')?styles.h1:styles.none &&
                  (item.priority=='H2')?styles.h2:styles.none &&
                  (item.priority=='H3')?styles.h3:styles.none &&
                  (item.priority=='H4')?styles.h4:styles.none &&
                  (item.priority=='H5')?styles.h5:styles.none 
                ]}>{item.priority}</Text>
                </View>
                </View>
                <View style={{flexDirection:'row',left:'0%'}}>
                <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>   Task Status: </Text>
                <Text style={{fontSize:10,}}>{item.status} |</Text>
                <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>  User Status: </Text>
                <Text style={[
                  (item.task_user.status == 'Not-Started') ? styles.notStart:styles.none && 
                  (item.task_user.status == 'Inprogress') ? styles.improgress:styles.none && 
                  (item.task_user.status == 'Done') ? styles.done:styles.none
                ]}>{item.task_user.status}</Text>
                <TouchableOpacity onPress={() => {
                  this.setState({
                    slideAnimationDialog: true,
                    taskoverview_project:item.task_project.name,
                    taskoverview_title:item.title,
                    taskoverview_due_date:item.due_date,
                    taskoverview_id:item.id,
                  });
                }}>
                <Text style={{fontSize:10,color:'rgb(19,111,232)',textDecorationLine: 'underline'}}>  TASK OVERVIEW </Text>
                </TouchableOpacity>
                </View>
              </View>
      )})}
       </View>
      :
      <View style={{flexDirection:'row',justifyContent:'center',bottom:'0%',}}>
        <Text style={{color:'gray',fontSize:20}}>No data</Text>
      </View>
      
      }
            </ScrollView>
          
                </View>
                </View>:null}

               
                {(this.state.self_show) ? 
           <View style={{flex:1, height:'100%',width:'100%', alignItems: 'center', marginVertical: 10}}>
           <View style={[styles.pagecomponent_nine, getWidthnHeight(90, 18)]}>
                <View style={[{backgroundColor: 'rgb(19,111,232)', borderBottomStartRadius: (Platform.OS === 'android')? 20 : 5, borderBottomEndRadius: (Platform.OS === 'android')? 20 : 5, alignItems: 'center'}, getWidthnHeight(60)]}>
                  <Text style={{color:'white', textAlign: 'center'}}>  Search For Particular Tasks  </Text>
                </View>
              <View style={[{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}, getWidthnHeight(90)]}>
              
                <Dropdown
                  containerStyle={[getWidthnHeight(25)]}
                  labelFontSize={10}
                  fontSize={12}
                  pickerStyle={[getWidthnHeight(40)]}
                  inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
                  value={'All'}
                  data={task_type}
                  label='Task Type'
                  onChangeText={task_type_sec => 
                    {
                      if(task_type_sec==='All'){
                        context.setState({task_type_sec:'all'}) 
                      }else{
                        context.setState({task_type_sec:task_type_sec}) 
                      }
                    }
                  }
                />
                <Dropdown
                  containerStyle={[getWidthnHeight(25)]}
                  labelFontSize={10}
                  fontSize={12}
                  inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
                  data={task_status}
                  label='Task Status'
                  value={'All'}
                  onChangeText={my_status_sec => 
                    {
                      if(my_status_sec==='All'){
                        context.setState({my_status_sec:'all'}) 
                      }else{
                        context.setState({my_status_sec:my_status_sec}) 
                      }
                    }
                  }
                />
                <Dropdown
                  containerStyle={[getWidthnHeight(25)]}
                  labelFontSize={10}
                  fontSize={12}
                  inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
                  data={my_status}
                  label='User Status'
                  value={'All'}
                  onChangeText={task_status_sec => 
                    {
                      if(task_status_sec==='All'){
                        context.setState({task_status_sec:'all'}) 
                      }else{
                        context.setState({task_status_sec:task_status_sec})
                      }
                    }
                  }
                />
           
            </View>

            <View style={{alignItems:'center', marginBottom: 5}}>
              <TouchableOpacity style={[{backgroundColor:'rgb(19,111,232)',borderRadius: 5, alignItems: 'center', justifyContent: 'center'}, getWidthnHeight(20, 4)]} onPress={this.confirmReset.bind(this)}>
              <Text style={{color:'white'}} >Search</Text>
              </TouchableOpacity>
            </View>
              
              </View>
              
              <View style={[{justifyContent: 'center', alignItems: 'center', borderColor: 'rgb(19,111,232)', borderWidth: 1, marginVertical: 10,borderRadius: 5}, getWidthnHeight(90, 10)]}>
                  <TextInput
                      style={[{alignItems: 'center' , borderColor: 'grey', borderWidth: 1,fontSize:16, borderRadius: 5, paddingLeft: 10}, getWidthnHeight(80, 6)]}
                      placeholder={(!this.state.enableSearch)? 'Disabled' : 'Search Employee Name'}
                      keyboardType="default"
                      editable={this.state.enableSearch}
                      onChangeText={(searchText) => {
                        this.setState({searchText})
                        if(searchText === ''){
                          this.setState({empty: true})
                        }else{
                          this.setState({empty: false})
                        }
                      }}
                      value={this.state.searchText}
                      onSubmitEditing={Keyboard.dismiss}
                  />
              </View>
              {/* {<View style={styles.searchBox}> 
                <Dropdown
                  containerStyle={[{bottom:10,paddingLeft:10,paddingRight:10}, getWidthnHeight(80)]}
                  inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
                  data={data}
                  valueExtractor={({id})=> id}
                  labelExtractor={({name})=> name}
                  label='Select Employee Name'
                  value={this.state.userId}
                  onChangeText={ userId =>{ context.setState({ userId }) || this.self_team()}}
                  
                />
            </View>} */}
               
            <View style={{backgroundColor:'#f1f1f1',height:'0.4%',width:'100%'}}/>
              
            <View style={[{alignItems: 'flex-start'}, getWidthnHeight(100)]}>
            <TitleBox lable='Task List'/>
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

              <View style={[{flex: 1, borderWidth: 0, borderColor: 'red'}, getWidthnHeight(100)]}>
              <Dialog
        onDismiss={() => {
          this.setState({ slideAnimationDialog: false });
        }}
        onTouchOutside={() => {
          this.setState({ slideAnimationDialog: false });
        }}
        visible={this.state.slideAnimationDialog}
        dialogTitle={<DialogTitle title="Task OverView" />}
        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}>
        <DialogContent>
          <View>
          <View style={{flexDirection:'row'}}>
          <Text style={{color:'rgb(19,111,232)'}}> Task Project: </Text>
          <Text> {this.state.taskoverview_project} {"\n"} </Text>
          </View>
          <View style={{flexDirection:'row'}}>
          <Text style={{color:'rgb(19,111,232)'}}> Task title: </Text>
          <Text> {this.state.taskoverview_title} {"\n"} </Text>
          </View>
          <View style={{flexDirection:'row'}}>
          <Text style={{color:'rgb(19,111,232)'}}> Due Date: </Text>
          <Text> {this.state.taskoverview_due_date} {"\n"} </Text>
          </View>
          
          <View style={{flexDirection:'row'}}>
          <Text style={{color:'rgb(19,111,232)'}}> Comment: </Text>
          <TouchableOpacity onPress={() =>this.taskOverViewComment()}>
          <Text style={{textDecorationLine: 'underline'}}> See all comments {"\n"} </Text>
          </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row'}}>
          <Text style={{color:'rgb(19,111,232)'}}> Task Update </Text>
          <TouchableOpacity onPress={() => this.taskOverViewUpdate()}>
          <Text style={{textDecorationLine: 'underline'}}> See if any updation in given task {"\n"} </Text>
          </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row'}}>
          <Text style={{color:'rgb(19,111,232)'}}> Task History </Text>
          <TouchableOpacity onPress={() =>this.taskOverViewHistory()}>
          <Text style={{textDecorationLine: 'underline'}}> See all task History {"\n"} </Text>
          </TouchableOpacity>
          </View>
          <View style={{borderTopWidth: 1,
                      borderBottomWidth:0,
                      borderRightWidth:0,
                      borderLeftWidth:0,
                      borderColor: '#818181',
                      width:'120%',
                      right:'10%',
                      alignItems:'center'}}>
                        <TouchableOpacity style={{left:'0%'}} onPress={() => {
                  this.setState({ slideAnimationDialog: false });
                }}>
               <Text style={{fontSize:20,color:'rgb(19,111,232)'}}>Cancel</Text>
               </TouchableOpacity>
               </View>
           </View>
        </DialogContent>
      </Dialog>
      
            <ScrollView style={{margin:0,height:hp('45%')}}>
            {this.state.mandatory_sec == '0' ?
            <View>
            {this.multipleCards()}
            </View>
            :
            <View style={{flexDirection:'row',justifyContent:'center',bottom:'0%',}}>
              <Text style={{color:'gray',fontSize:20}}>No data</Text>
            </View>
            
            }
            </ScrollView>
          
                </View>
                </View>:null}

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
    renderOption(settings) {
      const { item, getLabel } = settings
      return (
        <View style={styles.optionContainer}>
          <View style={styles.innerContainer}>
            <View style={[styles.box, { backgroundColor: item.color }]} />
            <Text style={{ color: item.color, alignSelf: 'flex-start' }}>{getLabel(item)}</Text>
          </View>
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
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 10,
      borderTopWidth: 1,
      borderBottomWidth:1,
      borderRightWidth:1,
      borderLeftWidth:1,
      borderColor: 'rgb(19,111,232)',

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
                      top:'0%',
                      flex:0,
                      left:'0%',
                      bottom:'0%',
                      margin:'0%',
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
                      height:'30%',
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
                  bottom:'10%',
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
                  paddingTop:10,
                  paddingBottom:10,
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
    dropdown:{
                  
      flexDirection: 'row',
                    left:'0%',
                    backgroundColor:'#ffff',
                    borderRadius: 0,
                    borderTopWidth: 1,
                    borderBottomWidth:1,
                    borderRightWidth:1,
                    borderLeftWidth:1,
                    borderColor: 'rgb(19,111,232)',
                    width:'30%',
                    height:'35%',
                    // shadowOffset:{  width: 100,  height: 100,  },
                    // shadowColor: '#330000',
                    shadowOpacity: 0,
                    // shadowRadius: 0,
                    elevation: 0,

    },
    compo: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      width:'100%',
      marginTop: 10
    },
    compo_Sec: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      width:'100%',
      marginTop: 10
    },
    radioStyle: {

    },
    button:{
      width:'90%',
      height:'20%',
      alignItems:'center',
      left:'3%',
      backgroundColor:'rgb(19,111,232)',
      borderRadius: 15,
    },
    taskupdate:{
      
        top:'0%',
        flex:0,
        left:'0%',
        bottom:'0%',
        margin:'0%',
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
        height:'30%',
        // shadowOffset:{  width: 100,  height: 100,  },
        shadowColor: '#330000',
        shadowOpacity: 0,
        // shadowRadius: 0,
        elevation: 1,
    },
    comment:{
      
      top:'0%',
      flex:0,
      left:'0%',
      bottom:'0%',
      margin:'0%',
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
      height:'50%',
      // shadowOffset:{  width: 100,  height: 100,  },
      shadowColor: '#330000',
      shadowOpacity: 0,
      // shadowRadius: 0,
      elevation: 1,
  },
    button_value_one:{
      textAlign:'center',
      fontSize:9,
      backgroundColor:'rgb(19,111,232)',
      color:'white',
      paddingTop:5,
      paddingBottom:5,
      paddingLeft:30,
      paddingRight:30,
      borderRadius: 0,
      overflow: "hidden"
    },
    modal_button_value_one:{
      
      textAlign:'center',
      
      backgroundColor:'rgb(19,111,232)',
      color:'white',
      paddingTop:5,
      paddingBottom:5,
      paddingLeft:10,
      paddingRight:10,
      borderRadius: 0,
      overflow: "hidden"
    },
   
    modal_button_value_sec:{
     
      textAlign:'center',
     
        backgroundColor:'#adadad',
        color:'white',
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
        borderRadius: 0,
        overflow: "hidden" 
      },
      button_value_sec:{
        textAlign:'center',
          fontSize:9,
          backgroundColor:'#adadad',
          color:'white',
          paddingTop:5,
          paddingBottom:5,
          paddingLeft:30,
          paddingRight:30,
          borderRadius: 0,
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
     // width:'160%',
      flexDirection: 'column',
       alignItems: 'stretch'
    },
    text: {
      fontSize:16,
    },
    
    radioStyle: {

    },
    optionInnerContainer: {
      flex: 1,
      flexDirection: 'row'
    },
    box: {
      width: 20,
      height: 20,
      marginRight: 10
    },
    searchBox: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        backgroundColor:'transparent',
        borderRadius: 5,
        borderTopWidth: 1,
        borderBottomWidth:1,
        borderRightWidth:1,
        borderLeftWidth:1,
        borderColor: 'rgb(19,111,232)',
        width:'91%',
        height:'10%',
        // shadowOffset:{  width: 100,  height: 100,  },
        // shadowColor: '#330000',
        shadowOpacity: 0,
        // shadowRadius: 0,
        elevation: 0,

},
h1:{
  backgroundColor:'#fffdd0',
  fontSize:10,
  color:'black',
  paddingTop:2,
  paddingBottom:2,
  paddingLeft:5,
  paddingRight:5,
  borderRadius:5
},
h2:{
  backgroundColor:'yellow',
  fontSize:10,
  color:'black',
  paddingTop:2,
  paddingBottom:2,
  paddingLeft:5,
  paddingRight:5,
  borderRadius:5
},
h3:{
  backgroundColor:'aqua',
  fontSize:10,
  color:'black',
  paddingTop:2,
  paddingBottom:2,
  paddingLeft:5,
  paddingRight:5,
  borderRadius:5
},
h4:{
  backgroundColor:'orange',
  fontSize:10,
  color:'black',
  paddingTop:2,
  paddingBottom:2,
  paddingLeft:5,
  paddingRight:5,
  borderRadius:5
},
h5:{
  backgroundColor:'red',
  fontSize:10,
  color:'black',
  paddingTop:2,
  paddingBottom:2,
  paddingLeft:5,
  paddingRight:5,
  borderRadius:5
},
none:{
  fontSize:10,
  color:'black',
  paddingTop:2,
  paddingBottom:2,
  paddingLeft:5,
  paddingRight:5,
  borderRadius:5
},
notStart:{
  backgroundColor:'grey',
  fontSize:10,
  color:'white',
  paddingTop:2,
  paddingBottom:2,
  paddingLeft:5,
  paddingRight:5,
  borderRadius:5
},
improgress:{
  backgroundColor:'#FF4500',
  fontSize:10,
  color:'white',
  paddingTop:2,
  paddingBottom:2,
  paddingLeft:5,
  paddingRight:5,
  borderRadius:5
},
done:{
  backgroundColor:'green',
  fontSize:10,
  color:'white',
  paddingTop:2,
  paddingBottom:2,
  paddingLeft:5,
  paddingRight:5,
  borderRadius:5
},
loadingStyle: {
  flex:0,
  flexDirection:'row', 
  backgroundColor: '#EFEFEF',
  alignItems: 'center', 
  justifyContent: 'center',
  position: 'absolute', 
  borderRadius: 10,
  shadowOffset:{ width: 0, height: 5},
  shadowColor: '#000000',
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 10,
  zIndex: 10
},
chooseFileButton:{
  alignItems:'center',
  backgroundColor:'rgb(19,111,232)',
  borderRadius: 20,
  justifyContent: 'center'
},
cardStyle:{
  margin:5,
  backgroundColor:'white',
  borderRadius: 1,
  borderTopWidth:1,
  borderBottomWidth:1,
  borderRightWidth:1,
  borderLeftWidth:5,
  paddingTop:10,
  paddingBottom:10,
  width:'95%',
  left:'0%',
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.34,
  shadowRadius: 6.27,
  elevation: 10,
},
inputStyle: {
  flex: null, 
  borderColor: 'gray', 
  borderWidth: 1, 
  borderRadius: 5,
  textAlign: 'left',
  height: 50,
  width: 370,
  justifyContent: 'center'
},
  });
