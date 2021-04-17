import React, { Component } from 'react';
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
  TouchableNativeFeedback
} from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import Base_url from './Base_url';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class App extends Component {
  constructor() {
    super();
    this.state = {
        image:'',
        history_comment:[],
        name:'',
        uri:'',
        task_id:'545343'
    };
  }
show_data(){
  const _this = this;
  _this.hideLoader();
    this.taskHistory().done();
    this.value().done();
}
// shouldComponentUpdate(nextProps,nextState){
//   // console.log("nextProps",nextProps.route.params.id )
//   // console.log("nextState",nextState.task_id)
//   if(nextProps.route.params.id != this.props.route.params.id){
//     this.taskHistory().done();
//     this.value().done();
//     return true;
//     }
//   return false;
// }
hideLoader = () => {
    this.setState({ loading: false });
  }

  showLoader = () => {
    this.setState({ loading: true });
  }

taskHistory=async()=>{
    const context=this;
      const _this = this;
      this.showLoader();
      console.log("update_task")
      var user_token= await AsyncStorage.getItem('user_token');
      var permissions_fir= JSON.parse(user_token);
      var permissions_sec=permissions_fir.success.secret_token;

      var task_id = JSON.parse(context.props.route.params.id);
      // this.setState({task_id:task_id});
      console.log(task_id)
    var data = new FormData();
    data.append("task_id", task_id);
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState !== 4) {
            return;
  }
          if(xhr.status===200){
            _this.hideLoader();
            var json_obj = JSON.parse(xhr.responseText);
            var history_comment = json_obj.success.task.taskHistory;
            {history_comment.map((item) => {
                return(
                    
                    context.setState({uri:item.sender.employee.profile_picture})
                );
            })}

            context.setState({history_comment:history_comment})
        }
        else{
          // console.log(xhr.responseText)
          Alert.alert("No data found");
         _this.hideLoader();
        }
    });
    
    xhr.open("POST", "http://erp.xeamventures.com/api/v1/task-detail");
    xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);
    xhr.send(data);
}
value=async()=>{
  const context=this;
    var value= await AsyncStorage.getItem('userObj');
    var user_token= await AsyncStorage.getItem('user_token');
    var permissions_fir= JSON.parse(user_token);
    var userObj = JSON.parse(value);
    var task_id = JSON.parse(context.props.route.params.id);
      this.setState({task_id:task_id});
    const name = userObj.success.user.employee.fullname;
    this.setState({name:name});
    if(userObj!==null){
      var profile_picture={uri:userObj.success.user.employee.profile_picture};
      this.setState({image:profile_picture});
    }else(userObj===null)
     
    
  }
  
  back(){
    const context=this;
    context.props.navigation.navigate("Task");
    
   }
  render (){
      const context=this;
    const pic=this.state.uri;
    console.log(pic);
  return (
    <View style={{height:viewportHeight,width:viewportWidth,backgroundColor:'white'}}>
    <View style={{backgroundColor:'rgb(19,111,232)',height:'10%'}}>
    <View style={{left:'12%',top:'36%'}}>
     <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Task History</Text>
      </View>
    <TouchableOpacity style={{right:'0%',top:'0%'}} onPress={() => context.back()}>
                {/*Donute Button Image */}
                <Image
                  source={require('../src/Image/back.png')}
                  style={{ width: 25, height: 25, marginLeft: 10,top:0 }}
                />
              </TouchableOpacity>
    </View>
    <View style={{height:'85%'}}>
      <View style={{
        flexDirection:'row',
        borderColor:'transparent',
        borderTopWidth:1,
        borderBottomWidth:1,
        borderLeftWidth:1,
        borderRightWidth:1,
        margin:10,
        height:'8%',
        alignItems:'center',
        justifyContent:'center',
        shadowColor: 'black',
                      // shadowOpacity: 0,
                      //  shadowRadius: 20,
                      elevation: 3
        }}>
        <Text >
          View Task History   
        </Text>
        <TouchableOpacity style={{left:40,}} onPress={()=>{this.show_data()}}>
        <Text style={{
          backgroundColor:'rgb(19,111,232)',
          borderRadius:5,
          color:'white',
          paddingLeft:5,
          paddingRight:5,
          }}>
            Show Data
        </Text>
        </TouchableOpacity>
      </View>
    {(this.state.loading) ?
            <View style={{
                       flex:1,flexDirection:'row',width: '45%', backgroundColor: '#EFEFEF',
                       alignItems: 'center', justifyContent: 'center',
                       position: 'absolute', height:'8%',
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
           {this.state.history_comment=='' ?
       <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',top:'50%'}}>
       <Text style={{fontSize:18,color:'#adadad'}}>No data</Text>
    </View>
      :
      <ScrollView>

     {this.state.history_comment.map((item) => {
         return(
                 <View style={{flexDirection:'row'}}>
                     <View>
                     <Image source={pic} style={{left:'5%',bottom:0,height:40,width:40,borderRadius:75,borderColor:'black',alignItems:'center',borderColor:'transparent',borderWidth:1,top:'25%'}}/>
                     </View>
                     <View style={{width:'80%',left:'30%',top:'5%'}}> 
                     <View style={{flexDirection:'row'}}>
                      <Text style={{color:'rgb(19,111,232)'}}>{item.sender.employee.fullname}</Text>
                      <Text style={{marginLeft:'45%'}}>{item.created_at.substring(11,16)}</Text>
                      </View>
                      <View style={{flexDirection:'column',width:'60%'}}>
                     <Text style={{fontWeight: 'bold'}}>
                         {item.label} - 
                     </Text>
                     <Text>
                         {item.message} {"\n"}{"\n"}
                     </Text>
                     </View>
                     </View>
                 </View>
         );
     })}
     </ScrollView>
  }

    </View>
    </View>
    );
}

}
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
});
