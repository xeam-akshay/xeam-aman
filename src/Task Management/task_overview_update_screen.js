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
import {extractBaseURL} from '../api/BaseURL';
import {CommonModal, IOS_StatusBar, WaveHeader} from '../KulbirComponents/common';
import { Actions } from 'react-native-router-flux';
// import Base_url from './Base_url';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class App extends Component {
  constructor() {
    super();
    this.state = {
        image:'',
        update_comment:[],
        name:'',
        task_id:'',
        open:false,
        update:'',
        baseURL: null,
        errorCode: null,
        apiCode: null,
        commonModal: false
    };
  }
  show_data(){
    
    this.taskUpdate().done();
    
  }
  componentDidMount(){
    // this.taskUpdate().done();
    this.extractLink();
  }

  async extractLink(){
    await extractBaseURL().then((baseURL) => {
      this.setState({baseURL}, () => console.log("EXTRACT LINK: ", this.state.baseURL))
    })
  }
//   shouldComponentUpdate(nextProps,nextState){
    
//       if(nextProps.route.params.id != this.props.route.params.id){
//     this.taskUpdate().done();
//     this.value().done();
//       return true;
//       }

     
//     return false;
// }

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

taskUpdate=async()=>{
      const {baseURL} = this.state;
      const update="5";
      this.setState({update:update})
      const context=this;
      const _this = this;
      this.showLoader();
      console.log("update_task")
      
      var user_token= await AsyncStorage.getItem('user_token');
      var permissions_fir= JSON.parse(user_token);
      var permissions_sec=permissions_fir.success.secret_token;
      var task_id = JSON.parse(_this.props.id);
      const name = permissions_fir.success.user.employee.fullname;
      var image = {uri:permissions_fir.success.user.employee.profile_picture}
      this.setState({name:name})
      this.setState({image:image})
      console.log("user_token",name)
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
            var update_comment = json_obj.success.task.task_updates;
            console.log("update_comment",update_comment)
            context.setState({update_comment:update_comment})
           
        }
        else{
          // console.log(xhr.responseText)
          _this.hideLoader();
          _this.enableModal(xhr.status, "060");
        }
    });
    
    xhr.open("POST", `${baseURL}/task-detail`);
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
    const {errorCode, apiCode} = this.state;
    const pic=this.state.image;
    var data = (this.props.data);
    var history = data.success.task.task_updates;
    var AnotherValue = (this.props.AnotherValue);
    const name = AnotherValue.success.user.employee.fullname;
    var image = {uri:AnotherValue.success.user.employee.profile_picture}
    const url = data['success']['urls']['uploaded_pic'];
    const gradient = ['#0E57CF', '#25A2F9'];
    //console.log("myDaya",history[0]['user']['employee'])
  return (
    <View style={{height:viewportHeight,width:viewportWidth,backgroundColor:'white'}}>
    <IOS_StatusBar color={gradient} barStyle="light-content"/>
    <WaveHeader
              wave={Platform.OS ==="ios" ? false : false} 
              //logo={require('../Image/Logo-164.png')}
              menu='white'
              menuState={false}
              title='Task Update'
            />
    <View style={{height:'85%'}}>
    
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


      <ScrollView>
     {history.map((item) => {
        var date, TimeType, hour, minutes, seconds, fullTime;
        date = new Date();
        hour = item.created_at.substring(11,13)
        if(hour <= 11)
        {
          TimeType = 'AM';
        }
        else{
          TimeType = 'PM';
        }
        if( hour > 12 )
        {
          hour = hour - 12;
        }
        if( hour == 0 )
        {
            hour = 12;
        }
        minutes = item.created_at.substring(14,16)
        if(minutes < 10)
        {
          minutes = minutes.toString();
        }
        seconds = date.getSeconds();
        if(seconds < 10)
        {
          seconds = '0' + seconds.toString();
        }
        fullTime = hour.toString() +':'+ minutes.toString() +' ' + TimeType.toString();

        var year = item.created_at.substring(0,4)
       var month = item.created_at.substring(5,7)
       var day = item.created_at.substring(8,10)
       var date = day+'/'+month+'/'+year;
       const imageURL = `${url+item.user.employee.profile_picture}`
       console.log("ITEM: ", item.user.employee.fullname, item.user.employee.profile_picture)
         return(
                 <View style={{flexDirection:'row'}}>
                     <View>
                     <Image source={{uri: imageURL}} style={{left:'5%',bottom:0,height:40,width:40,borderRadius:75,borderColor:'black',alignItems:'center',borderColor:'transparent',borderWidth:1,top:'50%'}}/>
                     </View>
                     <View style={{width:'80%',left:'10%',top:'5%'}}> 
                     <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingBottom:20}}>
                     <Text style={{color:'gray',fontStyle: 'italic'}}>{date}</Text>
                     </View>
                     <View style={{flexDirection:'row'}}>
                      <Text style={{color:'rgb(19,111,232)',width:'80%'}}>{item.user.employee.fullname}</Text>
                      <Text style={{color:'gray',fontStyle: 'italic'}}>{fullTime}</Text>
                      </View>
                      <View>
                     <Text>
                         {item.comment} {"\n"}{"\n"}
                     </Text>
                     </View>
                     </View>
                 </View>
         );
     })}
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
