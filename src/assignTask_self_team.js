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
  Keyboard
} from 'react-native';
import Base_url from './Base_url';
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
import LeftSide from '../src/Image/side.png';
import RightSide from '../src/Image/side2.png';
import Logo from './Image/logo.png';
import CheckBox from 'react-native-check-box';
import { CustomPicker } from 'react-native-custom-picker';
import { Hoshi } from 'react-native-textinput-effects';
import { Dropdown } from 'react-native-material-dropdown';
import Ripple from 'react-native-material-ripple';
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
import style from 'react-native-datepicker/style';
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
              task_type_sec:'',
              my_status_sec:'',
              task_status_sec:'',
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
              priority:'',
              priority_value:'',
              self_show:'',
              self_show_sec:'',
              self_task:[],
              self_task_title:[],
              Emp_search:'',

              }
         }
  static navigationOptions = {

                  };
  hideLoader = () => {
    this.setState({ loading: false });
  }

  showLoader = () => {
    this.setState({ loading: true });
  }
     My_task=async()=>{
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
          console.log(json_obj)
            
        context.setState({task_title:JSON.stringify(task)})
          
      }
      else{
        // console.log(xhr.responseText)
        Alert.alert("No data found");
       _this.hideLoader();
      }
      });
      
      xhr.open("POST", "http://erp.xeamventures.com/api/v1/my-tasks");
      xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);
      xhr.send(data);
     }
     My_task_status=async()=>{
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
          
          var msg = json_obj.success.message;
          console.log(msg)
          Alert.alert(msg);
     
      }
      else{
           console.log(xhr.responseText)
           Alert.alert("Please fill the all field");
          _this.hideLoader();
      }
      });
      
      xhr.open("POST", "http://erp.xeamventures.com/api/v1/change-my-task-status");
      xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);
      xhr.send(data);
     }
      
     self_team = async()=>{
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
                data.append("user_name", this.state.Emp_search);
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
                        console.log(json_obj)
                        context.setState({self_task:task})
                        context.setState({self_task_title:JSON.stringify(task)})
                        
                    }
                    else{
                      // console.log(xhr.responseText)
                      Alert.alert("No data found");
                     _this.hideLoader();
                    }
                });

                xhr.open("POST", "http://erp.xeamventures.com/api/v1/view-tasks");
                xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);
                xhr.send(data);

     }
    

     update_task=async()=>{
      const context=this;
      const _this = this;
      this.showLoader();
      console.log("update_task")
      var user_token= await AsyncStorage.getItem('user_token');
      var permissions_fir= JSON.parse(user_token);
      var permissions_sec=permissions_fir.success.secret_token;

      var data = new FormData();
      data.append("title", this.state.task_title_textinput);
      data.append("priority", this.state.priority);
      data.append("due_date", this.state.due_date);
      data.append("description", this.state.update_description);
      data.append("task_id", this.state.task_id);
      
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState !== 4) {
          return;
}
        if(xhr.status===200){
          _this.hideLoader();
          var json_obj = JSON.parse(xhr.responseText);
          
          var msg = json_obj.success.message;
          console.log(msg)
          Alert.alert("Task description updated");
     
      }
      else{
           console.log(xhr.responseText)
           var json_obj = JSON.parse(xhr.responseText);
          var msg = json_obj.error;
          Alert.alert(msg);
          _this.hideLoader();
      }
      });
      
      xhr.open("POST", "http://erp.xeamventures.com/api/v1/update-task");
      xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);
      
      xhr.send(data);
     }
     comment =async()=>{
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
        if(this.readyState === 4) {
          console.log(this.responseText);
          Alert.alert("Task comment updated successfully");
        }
      });
      
      xhr.open("POST", "http://erp.xeamventures.com/api/v1/save-chat");
      xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);
      xhr.send(data);
     }

     taskWithComment(){
      const context=this;
      context.props.navigation.navigate("taskWithComment");
     }

     ShowHideComponent_short = () => {
      this.setState({leaveType:"Short"});
      this.setState({button_value:0});
      
      if (this.state.show == false) {
        this.setState({ show: true });
      }
      if (this.state.show_sec == true) {
        this.setState({ show_sec: false });
      }
    };
    ShowHideComponent_half = () => {
      this.setState({leaveType:"Half"});
      this.setState({button_value:1});
      
      if (this.state.show == true) {
        this.setState({ show: false });
      }
      if (this.state.show_sec == false) {
        this.setState({ show_sec: true });
      }
    };
    ShowHideComponent_full = () => {
      this.setState({leaveType:"Full"});
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
    componentDidMount(){
      
      this.ShowHideComponent_short();
      this.self();
      
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
      context.props.navigation.navigate("taskOverViewComment_sec",{id:this.state.taskoverview_id});
      this.setState({ slideAnimationDialog: false });
     }
     taskOverViewUpdate(){
      const context=this;
      context.props.navigation.navigate("taskOverViewUpdate_sec",{id:this.state.taskoverview_id});
      this.setState({ slideAnimationDialog: false });
     }
     taskOverViewHistory(){
      const context=this;
      context.props.navigation.navigate("taskOverViewHistory_sec",{id:this.state.taskoverview_id});
      this.setState({ slideAnimationDialog: false });
     }
     onDismiss(){
      this.setState({ defaultAnimationDialog: false });
     }
     
    render (){
            const context=this;
            const {task,task_title,taskoverview_id,button_value,priority_value,self_task}= this.state;
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
          const status=[{value:"Mark as improgress"},{value:"Mark as Done"},];
          // const data = JSON.stringify(task_title);
          // const data_sec = data.title;
          // const dataToShow = task_title.filter((value,index) => index === taskoverview_id)
          
          // console.log("dataToShow",dataToShow[0])
		return(
            <View style={{height:viewportHeight,width:viewportWidth,backgroundColor:'white'}}>
            <View style={{backgroundColor:'rgb(19,111,232)',height:'10%'}}>
            <View style={{top:hp('5%'),left:'15%'}}>
             <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Task List</Text>
              </View>
            <TouchableOpacity style={{right:'0%',top:hp('0%')}} onPress={() => context.props.navigation.toggleDrawer()}>
                        {/*Donute Button Image */}
                        <Image
                          source={require('../src/Image/menu.png')}
                          style={{ width: 35, height: 35, marginLeft: 10,top:0 }}
                        />
                      </TouchableOpacity>
            </View>
            <Dialog
        onDismiss={() => {
          this.setState({ slideAnimationDialog_sec: false });
        }}
        onTouchOutside={() => {
          this.setState({ slideAnimationDialog_sec: false });
        }}
        visible={this.state.slideAnimationDialog_sec}
        dialogTitle={<DialogTitle title="Take An Action" />}
        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
        width={viewportWidth}
        height={'100%'}
        footer={
          <View>
           {this.state.show ? ( 
          <DialogFooter style={{bottom:'50%'}}>
            <DialogButton
              text="CANCEL"
              onPress={() => {this.setState({ slideAnimationDialog_sec: false });}}
            />
            <DialogButton
              text="OK"
              onPress={() => {}}
            />
          </DialogFooter>
           ):null}
          </View>
        }>
          
        <DialogContent>
          
          <View style={{top:'10%'}}>
          <View style={styles.compo}>
            <TouchableOpacity style={{right:'32%',top:'11.4%'}} onPress={this.ShowHideComponent_short}>
            <Text style={[button_value=== 0 ? styles.button_value_one :styles.button_value_sec ]}>
               Task Status
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{left:'0%',bottom:'22%'}} onPress={this.ShowHideComponent_half}>
            <Text  style={[button_value=== 1 ? styles.button_value_one :styles.button_value_sec ]}>
               Task Update
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{left:'31%',bottom:'55.4%'}} onPress={this.ShowHideComponent_full}> 
              <Text style={[button_value=== 2 ? styles.button_value_one :styles.button_value_sec ]}>
               Comment
              </Text>
            </TouchableOpacity>
             </View>
             <View style={{backgroundColor:'#f1f1f1',height:'2%',width:'100%',bottom:'65%'}}/>
             {this.state.show ? (
              
               <View style={{height:'72%'}}>
             <View style={{bottom:'15%'}}>
             <Dropdown
               containerStyle={{width:'90%',left:'5%',}}
               inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)",fontSize:10 }}
               data={status}
               label='Task status'
               onChangeText={status => this.setState({ status })}
             />
             </View>
             <View style={{bottom:'13%',left:'4%'}}>
             <Text style={{right:'0%',bottom:'2%'}}>Comment:</Text>
             <View style={styles.pagecomponent_one_thrd}>
             
              <TextInput
                   style={{ height: 110, borderColor: 'transparent', borderWidth: 1, top:0,width:'100%',fontSize:15,left:5 }}
                   placeholder={'Enter Comment'}
                   keyboardType="default"
                   onChangeText={task_status_comment => this.setState({ task_status_comment })}
                   value={this.state.task_status_comment}
                 />
                 </View>
                
             </View>
             <View style={{flexDirection:'row',bottom:'45%',right:'1.5%'}}>
             
               <View style={{borderTopWidth: 1,
                      borderBottomWidth:0,
                      borderRightWidth:1,
                      borderLeftWidth:0,
                      borderColor: '#818181',
                      width:'55.5%',
                      height:'150%',
                      alignItems:'center'}}>
                        
                        <TouchableOpacity style={{left:'0%',}} onPress={this.My_task_status}>
                        
               <Text style={{fontSize:20,color:'rgb(19,111,232)'}}>Save</Text>
               
               </TouchableOpacity>
               
               </View>
             
             
             <View style={{borderTopWidth: 1,
                      borderBottomWidth:0,
                      borderRightWidth:0,
                      borderLeftWidth:1,
                      borderColor: '#818181',
                      width:'55.5%',
                      height:'150%',
                      alignItems:'center'}}>
                        <TouchableOpacity style={{left:'0%'}} onPress={() => {
                  this.setState({ slideAnimationDialog_sec: false });
                }}>
               <Text style={{fontSize:20,color:'rgb(19,111,232)'}}>Cancel</Text>
               </TouchableOpacity>
               </View>
             
             </View>
             </View>
              ) : null}
              {this.state.show_sec ? (
                <View style={{height:'72%'}}>
                <Hoshi
                        style={{bottom:hp('25%'),width:wp('80%'),borderBottomColor:'rgb(19,111,232)',marginLeft:wp(2),borderBottomWidth:hp(0.1),}}
                        label={'Task Title'}
                        borderColor={'rgb(19,111,232)'}
                        borderHeight={1}
                        inputPadding={16}
                        height={hp(5)}
                        labelStyle={{ fontSize:hp(2) }}
                        inputStyle={{ color: 'black',fontSize:hp(2.5), }}
                        backgroundColor={'transparent'}
                        onChangeText={task_title_textinput => this.setState({ task_title_textinput })}
                                      value={this.state.task_title_textinput}
                      />
                  
                  <View style={{bottom:'10%',left:'5%'}}>
             <Text style={{right:'0%',bottom:'2%'}}>Update:</Text>
             <View style={styles.taskupdate}>
             
              <TextInput
                   style={{ height: 50, borderColor: 'transparent', borderWidth: 1, top:0,width:'100%',fontSize:15,left:5 }}
                   placeholder={'Enter Comment'}
                   keyboardType="default"
                   onChangeText={update_description => this.setState({ update_description })}
                   value={this.state.update_description}
                 />
                 </View>
             </View>
             <View style={{flexDirection:'row',bottom:'66%',right:'1.5%'}}>
             
               <View style={{borderTopWidth: 1,
                      borderBottomWidth:0,
                      borderRightWidth:1,
                      borderLeftWidth:0,
                      borderColor: '#818181',
                      width:'55.5%',
                      height:'150%',
                      alignItems:'center'}}>
                        
                        <TouchableOpacity style={{left:'0%',}} onPress={this.update_task}>
                        
               <Text style={{fontSize:20,color:'rgb(19,111,232)'}}>Save</Text>
               
               </TouchableOpacity>
              
               </View>
             
             
             <View style={{borderTopWidth: 1,
                      borderBottomWidth:0,
                      borderRightWidth:0,
                      borderLeftWidth:1,
                      borderColor: '#818181',
                      width:'55.5%',
                      height:'150%',
                      alignItems:'center'}}>
                        <TouchableOpacity style={{left:'0%'}} onPress={() => {
                  this.setState({ slideAnimationDialog_sec: false });
                }}>
               <Text style={{fontSize:20,color:'rgb(19,111,232)'}}>Cancel</Text>
               </TouchableOpacity>
               </View>
             
             </View>
                  </View>
                  ) : null}
                  
                 <View style={{height:'72%'}}>
                    <View style={{bottom:'23%',left:'5%'}}>
                  <Text style={{bottom:'5%'}}>
          File Name: {this.state.singleFileOBJ.name ? this.state.singleFileOBJ.name : ''}
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.button}
          onPress={this.SingleFilePicker.bind(this)}>
          <Text style={{color:'white',top:'15%',left:'30%'}}>
           Choose file (Optional)
          </Text>
        </TouchableOpacity>
        </View>
        <View style={{bottom:'35%',left:'5%'}}>
             <Text style={{right:'0%',bottom:'2%'}}>Update:</Text>
             <View style={styles.comment}>
             
              <TextInput
                   style={{ height: 50, borderColor: 'transparent', borderWidth: 1, top:0,width:'100%',fontSize:15,left:5 }}
                   placeholder={'Enter Comment'}
                   keyboardType="default"
                   onChangeText={comment_text => this.setState({ comment_text })}
                   value={this.state.comment_text}
                 />
                 </View>
             </View>
                  
                  </View>
                  <View style={{flexDirection:'row',bottom:'20%',right:'1.5%'}}>
             
               <View style={{borderTopWidth: 1,
                      borderBottomWidth:0,
                      borderRightWidth:1,
                      borderLeftWidth:0,
                      borderColor: '#818181',
                      width:'55.5%',
                      height:'150%',
                      alignItems:'center'}}>
                        
                        <TouchableOpacity style={{left:'0%',}} onPress={() => this.comment()}>
                        
               <Text style={{fontSize:20,color:'rgb(19,111,232)'}}>Save</Text>
               
               </TouchableOpacity>
             
               </View>
             
             
             <View style={{borderTopWidth: 1,
                      borderBottomWidth:0,
                      borderRightWidth:0,
                      borderLeftWidth:1,
                      borderColor: '#818181',
                      width:'55.5%',
                      height:'150%',
                      alignItems:'center'}}>
                        <TouchableOpacity style={{left:'0%'}} onPress={() => {
                  this.setState({ slideAnimationDialog_sec: false });
                }}>
               <Text style={{fontSize:20,color:'rgb(19,111,232)'}}>Cancel</Text>
               </TouchableOpacity>
               </View>
             
             </View>
          </View>
     
        </DialogContent>
        
      </Dialog>
      
           
           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',top:'5%',right:'1%',}}>
            <TouchableOpacity style={{right:'0%',top:'0%',width:hp('20%')}} onPress={context.self}>
            <Text style={[priority_value=== 0 ? styles.button_value_one :styles.button_value_sec ]}>
              My Task
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{left:'0%',bottom:'0%',width:hp('20%')}} onPress={this.team}>
            <Text  style={[priority_value=== 1 ? styles.button_value_one :styles.button_value_sec ]}>
               My Created Task
              </Text>
            </TouchableOpacity>
            
             </View>
           {(this.state.self_show) ? 
           <View style={{flex:1, height:'100%',width:'100%',top:'5%'}}>
           <View style={styles.pagecomponent_nine}>
            <View style={{alignItems:'center',left:'100%',bottom:'3%'}}>
              <Text style={{top:'0%',backgroundColor:'white',color:'rgb(19,111,232)'}}>  Search For Particular Tasks  </Text>
              </View>
              </View>
            <View style={{flexDirection:'row',bottom:'25%',left:'4%',alignItems:'center',}}>
              
            <Dropdown
               
              containerStyle={{width:'26%',left:'5%',}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)",fontSize:10 }}
              
              data={task_type}
              label='Task Type'
              onChangeText={task_type => this.setState({ task_type })}
            />
            <Dropdown
              containerStyle={{width:'25%',left:'20%'}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={my_status}
              label='My status'
              onChangeText={my_status => this.setState({ my_status })}
              
            />
            <Dropdown
              containerStyle={{width:'28%',left:'30%'}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={task_status}
              label='Task status'
              onChangeText={task_status => this.setState({ task_status })}
            />
           
            </View>
            <View style={{width:'20%',alignItems:'center',left:'40%',bottom:hp('7%')}}>
            <TouchableOpacity style={{backgroundColor:'rgb(19,111,232)',top:'5%',borderRadius: 4,paddingLeft:10,paddingRight:10,paddingTop:5,paddingBottom:5}} onPress={() =>this.My_task()}>
            <Text style={{color:'white'}} >Search</Text>
            </TouchableOpacity>
            </View>
            <View style={{backgroundColor:'#f1f1f1',height:'0.4%',width:'100%',bottom:hp('6%')}}/>
              
              <View style={styles.card_view_thrd}>
              <Text style={{color:'#fcfeff',left:'10%'}}>Task List: </Text>
              </View>
              <Image source={LeftSide} style={{left:'21%',bottom:'9%',height:'4%',width:50,borderColor:'black',alignItems:'center'}}/>
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
            <View style={{
                       flex:1,flexDirection:'row',width: '45%', backgroundColor: '#EFEFEF',
                       alignItems: 'center', justifyContent: 'center',
                       position: 'absolute', height:'15%',
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
      
            <ScrollView style={{bottom:'15%',margin:0,height:hp('50%')}}>
            
            {task.map((item,key) => {
              let date = item.due_date;
              let day = item.due_date.substring(8,10);
              let month = item.due_date.substring(5,7);
              let year = item.due_date.substring(0,4);
              let dueDate = day+"/"+month+"/"+year;
              
      return (
              <View style={styles.task_list}>
                
        
                <TouchableOpacity onPress={() => {
                  this.setState({
                    slideAnimationDialog_sec: true,
                    task_id: item.id,
                    priority:item.priority,
                    due_date:item.due_date,

                    
                  });
                }}>
                <Text style={{fontWeight:'bold',left:'0%'}}>  {item.title} </Text>
                </TouchableOpacity>
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
                <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>  My Status: </Text>
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
            </ScrollView>
          
                </View>
                </View>:null}

               
                {(this.state.self_show_sec) ? 
           <View style={{flex:1, height:'100%',width:'100%',top:'5%'}}>
           <View style={styles.pagecomponent_nine}>
            <View style={{alignItems:'center',left:'100%',bottom:'3%'}}>
              <Text style={{top:'0%',backgroundColor:'white',color:'rgb(19,111,232)'}}>  Search For Particular Tasks  </Text>
              </View>
              </View>
            <View style={{flexDirection:'row',bottom:'25%',left:'4%',alignItems:'center',}}>
              
            <Dropdown
               
              containerStyle={{width:'26%',left:'5%',}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)",fontSize:10 }}
              
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
              containerStyle={{width:'25%',left:'20%'}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={my_status}
              label='My status'
              
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
              containerStyle={{width:'28%',left:'30%'}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={task_status}
              label='User status'
             
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
            <View style={{width:'20%',alignItems:'center',left:'40%',bottom:hp('7.5%')}}>
            <TouchableOpacity style={{backgroundColor:'rgb(19,111,232)',top:'5%',borderRadius: 4,paddingLeft:10,paddingRight:10,paddingTop:5,paddingBottom:5}} onPress={() =>this.self_team()}>
            <Text style={{color:'white'}} >Search</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.searchBox}>
                <View style={{flexDirection:'row'}}>
            <TextInput
                   style={{ height: 50, borderColor: 'transparent', borderWidth: 1, bottom:10,width:'90%',fontSize:15,left:5 }}
                   placeholder={'Search Employee Name'}
                   keyboardType="default"
                   onChangeText={Emp_search => this.setState({ Emp_search })}
                   value={this.state.Emp_search}
                 />
                 <TouchableOpacity  onPress={()=>this.self_team()}>
                        <Image
                          source={require('../src/Image/search_two.png')}
                          style={{ width: 20, height: 20, marginLeft: 0,top:5,borderRadius:0,bottom:0, }}
                        />
                </TouchableOpacity>
                </View>
                </View>
            <View style={{backgroundColor:'#f1f1f1',height:'0.4%',width:'100%',bottom:'6.5%'}}/>
              
              <View style={styles.card_view_thrd}>
              <Text style={{color:'#fcfeff',left:'10%'}}>Task List: </Text>
              </View>
              <Image source={LeftSide} style={{left:'21%',bottom:'9%',height:'4%',width:50,borderColor:'black',alignItems:'center'}}/>
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
            <View style={{
                       flex:1,flexDirection:'row',width: '45%', backgroundColor: '#EFEFEF',
                       alignItems: 'center', justifyContent: 'center',
                       position: 'absolute', height:'15%',
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
      
            <ScrollView style={{bottom:'15%',margin:0,height:hp('42%')}}>
            
            {self_task.map((item,key) => {
              let date = item.due_date;
              let day = item.due_date.substring(8,10);
              let month = item.due_date.substring(5,7);
              let year = item.due_date.substring(0,4);
              let dueDate = day+"/"+month+"/"+year;
      return (
              <View style={styles.task_list}>
               
                <Text style={{fontWeight:'bold',left:'0%'}}>  {item.title} </Text>
                
                <View style={{flexDirection:'row',margin:10}}>
                
                 <View style={{left:'0%',flexDirection:'row',top:'15%'}}>
                <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>To: </Text>
                <Text style={{fontSize:10,}}>{item.task_user.user.employee.fullname}  |</Text>
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
                <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>  My Status: </Text>
                <Text style={[
                  (item.task_user.status == 'Not-Started') ? styles.notStart:styles.none && 
                  (item.task_user.status == 'Inprogress') ? styles.improgress:styles.none && 
                  (item.task_user.status == 'Done') ? styles.done:styles.none
                ]}>{item.task_user.status}</Text>
                
                <Text style={{fontSize:10,color:'rgb(19,111,232)',textDecorationLine: 'underline'}}>  TASK OVERVIEW </Text>
                
                </View>
              </View>
      )})}
            </ScrollView>
          
                </View>
                </View>:null}


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
                      flex:0,
                      left:'2%',
                      top:'0%',
                      flexDirection:'row',
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
                      width:'92%',
                      height:viewportHeight/7,
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
      width:'100%',
      alignItems: 'center',
      
      top:'0%'
    },
    radioStyle: {

    },
    button:{
      width:'90%',
      height:'30%',
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
    compo: {
     
      alignItems: 'center',
      marginBottom: 40,
      bottom:'5%'
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
        flex:0,
        left:'3%',
        top:'-8%',
        margin:'0%',
        marginLeft:0,
        backgroundColor:'transparent',
        borderRadius: 20,
        borderTopWidth: 1,
        borderBottomWidth:1,
        borderRightWidth:1,
        borderLeftWidth:1,
        borderColor: 'rgb(19,111,232)',
        width:'92%',
        height:'5%',
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
}
  });
