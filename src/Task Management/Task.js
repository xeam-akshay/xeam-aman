import React, {Component} from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableNativeFeedback
} from 'react-native';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,
} from 'react-native-card-view';
import ActionModal from 'react-native-modal';
import {Actions} from 'react-native-router-flux';
// import Base_url from '../Base_url';
import Icon from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import TitleBox from '../Components/title box'
import LeftSide from '../Image/side.png';
import RightSide from '../Image/side2.png';
import Logo from '../Image/logo.png';
import CheckBox from 'react-native-check-box';
import { CustomPicker } from 'react-native-custom-picker';
import { Hoshi } from 'react-native-textinput-effects';
import { Dropdown } from 'react-native-material-dropdown';
import Ripple from 'react-native-material-ripple';
import DocumentPicker from 'react-native-document-picker';
import NameBottomBorder from '../Components/Name bottom border'
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
import { Platform } from 'react-native';

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
              task_type:'all',
              my_status:'all',
              task_status:'all',
              task:[],
              isChecked:false,
              checkedDefault: {},
              slideAnimationDialog: false,
              slideAnimationDialog_sec:false,
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
              modal_view_status:'status',
              valueTaskTitle:'',
              valueStatus:'',
              modal_task_title:'',
              mandatory:'0',
              modal_task_status:'',
              MyData:'',
              AnotherValue:'',
              baseURL: null,
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
              updateError: true,
              saveUpdate: false,
              anyUpdateError: function(){
                return (this.updateError === true)
              },
              noUpdateError: function(){
                return (this.updateError === false)
              },
              commentError: true,
              saveComment: false,
              anyCommentError: function(){
                return (this.commentError === true)
              },
              noCommentError: function(){
                return (this.commentError === false)
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
       
  
  //   For history, update, comments //
  
  
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
      this.setState({image:image})
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
         _this.enableModal(xhr.status, "061");
        }
    });
    
    xhr.open("POST", `${baseURL}/task-detail`);
    xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);
    xhr.send(data);
}


     My_task=async()=>{
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
          context.setState({mandatory:'0'})
            
        context.setState({task_title:JSON.stringify(task)})
          
      }else if(xhr.status===204){
        _this.hideLoader();
        context.setState({mandatory:'1'})
        context.setState({task:[]})
        Alert.alert("No Records to Display")
      }
      else{
        // console.log(xhr.responseText)
        context.setState({mandatory:'1'})
        context.setState({task:[]})
       _this.hideLoader();
       _this.enableModal(xhr.status, "062");
      }
      });
      
      xhr.open("POST", `${baseURL}/my-tasks`);
      xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);
      xhr.send(data);
     }

    confirmTaskStatus(){
        this.setState({saveStatus: true})
        const anyTaskStatusError = this.state.anyTaskStatusError();
        const noTaskStatusError = this.state.noTaskStatusError();
        if(anyTaskStatusError){
          Alert.alert("Please fill the fields highlighted in RED")
        }
        if(noTaskStatusError){
          this.My_task_status();
        }
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
          context.setState({valueStatus:''})
          context.resetState4Modal();
          var msg = json_obj.success.message;
          console.log("SUCCESS MESSAGE: ", msg)
          Alert.alert(msg);
          context.initialize();
      }else if(xhr.status === 405){
          _this.hideLoader();
          var json_obj = JSON.parse(xhr.responseText);
          console.log(json_obj)
          context.setState({valueStatus:''})
          context.resetState4Modal();
        var msg = json_obj.error;
        Alert.alert(msg);
      }else{
          console.log(xhr.responseText)
          context.setState({valueStatus:''})
          context.resetState4Modal();
          //const error = JSON.parse(xhr.responseText);
          //Alert.alert("Please fill the all field");
          _this.hideLoader();
          _this.enableModal(xhr.status, "063");
      }
      });
      
      xhr.open("POST", `${baseURL}/change-my-task-status`);
      xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);
      xhr.send(data);
     }

    confirmUpdateTask(){
    const anyUpdateError = this.state.anyUpdateError();
    const noUpdateError = this.state.noUpdateError();
    this.setState({saveUpdate: true})
    if(anyUpdateError){
      Alert.alert("Please fill the fields highlighted in RED")
    }
    if(noUpdateError){
      this.update_task();
    }
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
          context.resetState4Modal()
          var msg = json_obj.message;
          console.log(msg)
          var textRequired = "The task comment must be at least 10 characters.";
          Alert.alert(msg?msg:textRequired);
     
      }
      else{
          console.log(xhr.responseText)
          var json_obj = JSON.parse(xhr.responseText);
          context.setState({valueTaskTitle:""})
          context.resetState4Modal()
          var msg = json_obj.validation_error.task_comment;
          {msg.map((item)=>{
              Alert.alert(item);
          })}
          _this.hideLoader();
          _this.enableModal(xhr.status, "064");
      }
      });
      
      xhr.open("POST", `${baseURL}/save-task-update`);
      xhr.setRequestHeader("Authorization", "Bearer "+ permissions_sec);
      
      xhr.send(data);

     }

    confirmComment(){
      const anyCommentError = this.state.anyCommentError();
      const noCommentError = this.state.noCommentError();
      this.setState({saveComment: true})
      if(anyCommentError){
        Alert.alert("Please fill the fields highlighted in RED")
      }
      if(noCommentError){
        this.comment();
      }
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
      data.append("comment_file", this.state.singleFileOBJ);
       
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function() {
        if(this.readyState !== 4) {
          return;
        }
        if(xhr.status === 200){
          _this.hideLoader();
          console.log(this.responseText);
          context.setState({comment_text:''})
          context.resetState4Modal()
          Alert.alert("Task comment updated successfully");
        }else{
          _this.hideLoader();
          console.log(this.responseText);
          context.resetState4Modal()
          _this.enableModal(xhr.status, "065");
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
    componentDidMount(){
      this.initialize();
    }

    async initialize(){
      await this.extractLink();
      this.My_task();
      this.ShowHideComponent_short();
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
     onDismiss(){
      this.setState({ defaultAnimationDialog: false });
     }
     
     dropDownValueChange(value){
      console.log("value",value)
      this.setState({valueStatus:"Task Status"}) 
      this.setState({valueTaskTitle:"Task Title"})
      
    }
    renderScreenHeader(employer){
      switch(employer){
        case "XEAMHO":
          return (
            <WaveHeader
              wave={Platform.OS ==="ios" ? false : false} 
              //logo={require('../Image/Logo-164.png')}
              menu='white'
              title='My Task'
              //version={`Version ${this.state.deviceVersion}`}
            />
                );
        case "Lehri HO":
          return (
            <WaveHeader
              wave={Platform.OS ==="ios" ? false : false} 
              //logo={require('../Image/Logo-164.png')}
              menu='white'
              title='My Task'
              //version={`Version ${this.state.deviceVersion}`}
            />
                );
        case "Aarti Drugs Ltd":
          return <Header navigation={this.props.navigation} title='My Task' width={[getWidthnHeight(50)]} menu="white" images={false}/>
        default:
          return null;
        }
      }

    resetState4Modal(){
      this.setState({
        status: '', task_status_comment: '', statusError: true,
        taskStatusCommentError: true, saveStatus: false,
        update_description: '', updateError: true, saveUpdate: false,
        comment_text: '', commentError: true, saveComment: false
      }, () => {
        const {saveStatus, saveUpdate, saveComment} = this.state;
        if(!saveStatus && !saveUpdate && !saveComment){
          this.setState({slideAnimationDialog_sec: false})
        }
        
    })
    }

    render (){
            const context=this;
            const {
              task,task_title,taskoverview_id,button_value,AnotherValue, errorCode, apiCode, slideAnimationDialog_sec,
              saveStatus, statusError, taskStatusCommentError, saveUpdate, updateError, saveComment, commentError
            }= this.state;
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
          
          const status=[{value:"Mark as inprogress",id:"Inprogress"},{value:"Mark as Done",id:"Done"},];
          // const data = JSON.stringify(task_title);
          // const data_sec = data.title;
          // const dataToShow = task_title.filter((value,index) => index === taskoverview_id)
          
         //console.log("dataToShow",AnotherValue)
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
          onBackdropPress={() => this.resetState4Modal()}
        >
        <View style={[{alignItems: 'center', backgroundColor: 'white', borderRadius: 10}, getWidthnHeight(85, 45)]}>
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
          <Text style={{textAlign: 'center', fontWeight: 'bold', textAlignVertical: 'center'}}>Take an Action</Text>
        </View>
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
        <View style={[{justifyContent: 'space-evenly', backgroundColor: 'white', alignItems: 'center', flex: 1, borderColor: 'black', borderWidth: 0}, getWidthnHeight(75)]}>
          
            {this.state.modal_view_status == 'status' ? (
              
            <View style={{justifyContent: 'space-evenly', flex: 1, borderWidth: 0, borderColor: 'red'}}>
            <View>
            <Dropdown
              containerStyle={[getWidthnHeight(70)]}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor: (saveStatus && statusError)? 'red' : 'rgb(19,111,232)',fontSize:10 }}
              data={status}
              value={this.state.valueStatus}
              valueExtractor={({id})=> id}
              labelExtractor={({value})=> value}
              label='Task status'
              onChangeText={status => {
                this.setState({ status }, () => console.log("TASK STATUS: ", status))
                this.setState({statusError: false})
              }}
            />
            </View>
            <View>
            <Text>Comment:</Text>
            <TextInput
                style={[{alignItems: 'center' , borderColor: (saveStatus && taskStatusCommentError)? 'red' : 'rgb(19,111,232)', borderWidth: 1,fontSize:12, borderRadius: 5}, getWidthnHeight(70, 10)]}
                placeholder='Enter Comment'
                multiline
                numberOfLines={4}
                editable
                maxLength={190}
                keyboardType="default"
                onChangeText={task_status_comment => {
                  this.setState({ task_status_comment })
                  this.setState({taskStatusCommentError: false})
                  if(task_status_comment === ''){
                    this.setState({taskStatusCommentError: true})
                  }
                }}
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
                       }} onPress={() => this.resetState4Modal()}>
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
                style={[{borderColor: (saveUpdate && updateError) ? 'red': 'rgb(19,111,232)', borderWidth: 1,fontSize:12,borderRadius: 5}, getWidthnHeight(70, 10)]}
                placeholder={'Enter Comment'}
                multiline
                numberOfLines={4}
                editable
                maxLength={190}
                keyboardType="default"
                onChangeText={update_description => {
                  this.setState({ update_description })
                  this.setState({updateError: false})
                  if(update_description === ''){
                    this.setState({updateError: true})
                  }
              }}
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
                       }} onPress={this.confirmUpdateTask.bind(this)}>
                       
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
                 
                 {this.state.modal_view_status == 'comment' ? (
                <View style={{justifyContent: 'space-evenly', flex: 1, borderColor: 'red' ,borderWidth: 0}}>
                         
       <TouchableOpacity
         style={[styles.chooseFileButton, getWidthnHeight(70, 5)]}
         onPress={this.SingleFilePicker.bind(this)}>
         <Text style={{color:'white',textAlign:'center', textAlignVertical: 'center'}}>
         {this.state.singleFileOBJ.name ? this.state.singleFileOBJ.name : 'Choose file (Optional)'}
         </Text>
       </TouchableOpacity>
       <View>
            <Text>Comment:</Text>
           
            
            <TextInput
                style={[{borderColor: (saveComment && commentError) ? 'red': 'rgb(19,111,232)', borderWidth: 1,fontSize:12, borderRadius: 5}, getWidthnHeight(70, 10)]}
                placeholder='Enter Comment'
                multiline
                numberOfLines={4}
                editable
                maxLength={190}
                keyboardType="default"
                onChangeText={comment_text => {
                  this.setState({ comment_text })
                  this.setState({commentError: false})
                  if(comment_text === ''){
                    this.setState({commentError: true})
                  }
              }}
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
                       }} onPress={() => this.confirmComment()}>
                       
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
        </View>
        </View>
      </ActionModal>
      
           <View style={{flex:1, height:'100%',width:'100%', alignItems: 'center'}}>
            <View style={[styles.pagecomponent_nine, getWidthnHeight(90, 18)]}>
                <View style={[{alignItems:'center', backgroundColor: 'rgb(19,111,232)', borderBottomStartRadius: (Platform.OS === 'android')? 20 : 5, borderBottomEndRadius: (Platform.OS === 'android')? 20 : 5}, getWidthnHeight(60)]}>
                  <Text style={{color:'white'}}>  Search For Particular Tasks  </Text>
                </View>
              
                <View style={[{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}, getWidthnHeight(90)]}>
                  
                  <Dropdown
                    
                    containerStyle={{width:'26%',left:'0%',}}
                    inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)",fontSize:10 }}
                    value={'All'}
                    data={task_type}
                    label='Task Type'
                    onChangeText={task_type => this.setState({ task_type })}
                  />
                  <Dropdown
                    containerStyle={{width:'25%',left:'0%'}}
                    inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
                    data={my_status}
                    value={'All'}
                    label='My status'
                    onChangeText={my_status => this.setState({ my_status })}
                    
                  />
                  <Dropdown
                    containerStyle={{width:'28%',left:'0%'}}
                    inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
                    data={task_status}
                    value={'All'}
                    label='Task status'
                    onChangeText={task_status => this.setState({ task_status })}
                  />
              
                </View>

                <View style={[{alignItems:'center', marginBottom: 5}, getWidthnHeight(90)]}>
                  <TouchableOpacity style={[{backgroundColor:'rgb(19,111,232)',borderRadius: 4, alignItems: 'center', justifyContent: 'center'}, getWidthnHeight(20, 4)]} onPress={() =>this.My_task()}>
                    <Text style={{color:'white', textAlignVertical: 'center', alignItems: 'center'}} >Search</Text>
                  </TouchableOpacity>
                </View>
            </View>
            <View style={{backgroundColor:'lightgrey',height: 2,width:'100%', marginVertical: 5}}/>
              <View style={[{alignItems: 'flex-start', marginBottom: 10}, getWidthnHeight(100)]}>
                <TitleBox lable='My Task'/>
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
      
            <View style={{flex: 1, position: 'relative'}}>
            <ScrollView style={[getWidthnHeight(100)]}>
            {this.state.mandatory == '0' ?
               <View>
            {task.map((item,key) => {
              let date = item.due_date;
              let day = item.due_date.substring(8,10);
              let month = item.due_date.substring(5,7);
              let year = item.due_date.substring(0,4);
              let dueDate = day+"/"+month+"/"+year;

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
              <View style={{
                
                margin:5,
                backgroundColor:'white',
                borderRadius: 1,
                borderTopWidth:1,
                borderBottomWidth:1,
                borderRightWidth:1,
                borderLeftWidth:5,
                 borderColor: color,
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
                }}>
                
               {item.status == 'Unassigned' ? 
               <Text style={{fontWeight:'bold',left:'0%', borderColor: 'red', borderWidth: 0}}>  {item.title} </Text>:
                <TouchableOpacity onPress={() => {
                  if(item.task_user.status === 'Inprogress' || item.task_user.status === 'Not-Started'){
                    this.setState({
                      slideAnimationDialog_sec: true,
                      task_id: item.id,
                      priority:item.priority,
                      due_date:item.due_date,
                      modal_task_title:item.title,
                      modal_task_status:item.task_user.status,
                      button_value : 0,
                      modal_view_status:"status"
                    });
                  }else Alert.alert("Not Allowed", "When MY STATUS is set to DONE")
                }}>
                <Text style={{fontWeight:'bold',left:'0%'}}>  {item.title} </Text>
                </TouchableOpacity>}
                <NameBottomBorder/>
                <View style={{flexDirection:'row',margin:10}}>
                
                 <View style={{left:'0%',flexDirection:'row'}}>
                <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>By: </Text>
                <Text style={{fontSize:10,}}>{item.user.employee.fullname}  |</Text>
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
                <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>  My Status: </Text>
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
                } }>
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
                  bottom:'5%',
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
                  color: '#DCE4EF',
                  backgroundColor:'rgb(19,111,232)',
                  borderRadius: 5,
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: 'black'
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
                  backgroundColor:'transparent',
                  borderRadius: 0,
                  borderTopWidth: 1.5,
                  borderBottomWidth:1.5,
                  borderRightWidth:1.5,
                  borderLeftWidth:3.5,
                   borderColor: 'transparent',
                  shadowOffset:{  width: 100,  height: 100,  },
                    shadowColor: '#330000',
                   paddingTop:10,
                   paddingBottom:10,
                   width:'95%',
                   left:'0%',
                   overflow: "hidden",
                   elevation: 3,
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
   
    radioStyle: {

    },
    chooseFileButton:{
      alignItems:'center',
      backgroundColor:'rgb(19,111,232)',
      borderRadius: 20,
      justifyContent: 'center'
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
      
      fontSize:12,
      backgroundColor:'#adadad',
      color:'white',
      paddingTop:5,
      paddingBottom:5,
      paddingLeft:30,
      paddingRight:30,
      borderRadius: 0,
      overflow: "hidden"
    },
    button_value_sec:{
      fontSize:12,
      backgroundColor:'rgb(19,111,232)',
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
    compo: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      width:'100%',
      marginTop: 10
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
  });
