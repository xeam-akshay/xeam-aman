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
import {Actions} from 'react-native-router-flux';
// import Base_url from './Base_url';
import Icon from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LeftSide from '../Image/side.png';
import RightSide from '../Image/side2.png';
import Logo from '../Image/logo.png';
import CheckBox from 'react-native-check-box';
import { CustomPicker } from 'react-native-custom-picker';
import {extractBaseURL} from '../api/BaseURL';
import {CommonModal} from '../KulbirComponents/common';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class Leaves extends Component {

  constructor(props){
  super(props)
  this.state={
              loading: false,
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
              value_thrd:'',
              baseURL: null,
              errorCode: null,
              apiCode: null,
              commonModal: false
              }
         }
  static navigationOptions = {

                  };

  componentDidMount(){
    this.extractLink();
  }

  async extractLink(){
    await extractBaseURL().then((baseURL) => {
      this.setState({baseURL}, () => console.log("EXTRACT LINK: ", this.state.baseURL))
    })
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
      const {baseURL} = this.state;
      const context=this;
      const _this = this;
      console.log("My_task")
      var user_token= await AsyncStorage.getItem('user_token');
      var permissions_fir= JSON.parse(user_token);
      var permissions_sec=permissions_fir.success.secret_token;
      var task_id = JSON.parse(_this.props.task_id);
      console.log(task_id)
      var data = new FormData();
      data.append("task_ids", task_id);
data.append("selected_status", this.state.task_status);
data.append("comment", this.state.value_thrd);
      
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
          _this.enableModal(xhr.status, "066");
      }
      });
      
      xhr.open("POST", `${baseURL}/change-my-task-status`);
      xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);
      xhr.send(data);
     }
     back(){
      const context=this;
      Actions.pop();
      //context.props.navigation.navigate("MyTask");
     }
    render (){
            const context=this;
            const {task, errorCode, apiCode} = this.state;
            console.log(this.state.task_type)
            const value=[{status:"Mark as improgress"},
                         {status:"Mark as Done"},]
          
            
		return(
            <View style={{height:viewportHeight,width:viewportWidth,backgroundColor:'white'}}>
             
             <View style={{backgroundColor:'rgb(19,111,232)',height:'10%'}}>
            <View style={{left:'12%',top:'36%'}}>
             <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Update Task</Text>
              </View>
            <TouchableOpacity style={{right:'0%',top:'0%'}} onPress={() => this.back()}>
                        {/*Donute Button Image */}
                        <Image
                          source={require('../Image/back.png')}
                          style={{ width: 25, height: 25, marginLeft: 10,top:0 }}
                        />
                      </TouchableOpacity>
            </View>
            {(this.state.loading) ?
              <View style={{
                         flex:1,flexDirection:'row',width: '50%', backgroundColor: 'black',
                         alignItems: 'center', justifyContent: 'center',
                         position: 'absolute', height:'5%',
                         shadowOffset:{  width: 100,  height: 100,},
                         shadowColor: '#330000',
                         shadowOpacity: 0,
                         shadowRadius: 5,
                         elevation: 10,
                         left:'25%',
                         top:'50%'
                     }}>

              <ActivityIndicator  size="large" color='rgb(19,111,232)'/>
                      <Text style={{fontSize:15,left:10}}>Loading..</Text>
              </View>
              : null}
            <View style={styles.pagecomponent_nine}>
              <View style={{left:'220%',bottom:'2%',}}>
              <Text style={{top:'0%',backgroundColor:'white',color:'rgb(19,111,232)',}}>  Select Task status  </Text>
              </View>
             </View> 
             <View style={{flexDirection:'column',bottom:'5%',left:'0%',alignItems:'center'}}>
            <CustomPicker
              style={{left:"0%",top:'0%'}}
              placeholder={'Select Task status'}
              options={value}
              getLabel={item => item.status}
              fieldTemplate={this.renderField}
              headerTemplate={this.renderHeader}
              onValueChange={value => {
                this.setState({
                  task_status:value.status
                })
              }}
            />
            </View>
            <View style={styles.pagecomponent_one_thrd}>
              <Text style={{right:'40%',top:'10%'}}>Comment:</Text>
              <TextInput
                   style={{ height: 110, borderColor: 'transparent', borderWidth: 1, top:0,width:'100%',fontSize:15,left:5 }}
                   placeholder={'Enter Comment'}
                   keyboardType="default"
                   onChangeText={value_thrd => this.setState({ value_thrd })}
                   value={this.state.value_thrd}
                 />
                 
              </View>
              <View style={{width:'20%',alignItems:'center',left:'40%',top:'5%'}}>
              <TouchableOpacity style={{backgroundColor:'rgb(19,111,232)',borderRadius: 4,paddingLeft:10,paddingRight:10,paddingTop:5,paddingBottom:5}} onPress={() =>this.My_task()}>
            <Text style={{color:'white'}} >Submit</Text>
            </TouchableOpacity>
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
          <Text>Task Status</Text>
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
                      left:'2.5%',
                      top:'5%',
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
                      width:'89%',
                      height:'10%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
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
                      left:'5%',
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
                  top:'-14%',
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
  });
