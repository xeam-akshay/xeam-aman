import React, {Component} from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Alert,

} from 'react-native';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,
} from 'react-native-card-view';
import Logo from './Image/logo.png';


export default class Header extends Component {
  static navigationOptions = {
    headerBackground:<View style={{alignItems:'center',justifyContent:'center'}}>
    <Image source={Logo} style={{height:30,width:120,marginTop:20,}}/>
    </View>,
     headerLeft:null,
    headerStyle: {
                    backgroundColor: '#0080FF',
                    borderBottomColor: '#b3b3b3',
                    borderBottomWidth: 3,
                    height:80,
                  },
  headerTintColor: '#fff',
  headerTitleStyle: {
                      fontWeight: 'bold',
                      width:'100%'
                    },
                  };
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
                  emp_code:''
              }
         }
  hideLoader = () => {
      this.setState({ loading: false });
    }

    showLoader = () => {
      this.setState({ loading: true });
    }

componentDidMount(){
  this.logOut().done();
}
logOut=async()=>{
  const context=this;
  // var userObj = JSON.parse(context.props.navigation.state.params.userObj);
  // var successToken={token:userObj.success.secret_token};
  // console.log("logout" ,successToken)

  const _this = this;
  this.showLoader();
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if (xhr.readyState !== 4) {
                      return;
 }
 if(xhr.status===200){
     _this.hideLoader();
    console.log(xhr.responseText)
    AsyncStorage.clear();
    context.props.navigation.navigate("login");
    var json_obj = JSON.parse(xhr.responseText);
    var success = json_obj.success;
    Alert.alert(success);
 }
 else{
   return;
   console.log("inside error")

_this.hideLoader();
 }
});

xhr.open("GET", "http://erp.xeamventures.com/api/v1/logout");
xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);

xhr.send();
}
    render () {

		return(
          <View style={{height:'100%'}}>
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
                       top:'25%'
                   }}>

            <ActivityIndicator  size="large" color='rgb(19,111,232)' />
                    <Text style={{fontSize:15,left:10}}>Loading..</Text>
            </View>
            : null}
            <Text style={{top:'30%',fontSize:25,left:'5%'}}>Clearing stored data please wait …{"\n"}
            </Text>
            <Text style={{top:'30%',fontSize:25,left:'15%'}}>
            If not logged out tap here</Text>
          <TouchableOpacity onPress={()=>this.logOut()} style={{alignItems:'center',top:'50%'}}>
          <View style={{ alignItems:'center', backgroundColor:'rgb(19,111,232)',width:'30%',height:'25%',borderRadius:10,}}>
           <Text style={{color:'white',top:'20%'}}>Log out</Text>
           </View>
          </TouchableOpacity>
          </View>

      );
    }
  }


  const styles = StyleSheet.create({


  });
