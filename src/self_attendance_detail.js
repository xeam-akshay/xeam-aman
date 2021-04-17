import React from 'react';
import {
          AsyncStorage,
        Dimensions,
        FlatList,
        Alert,
        PermissionsAndroid,
        ActivityIndicator,
        Image,
        StyleSheet,
        Text,
        TouchableOpacity,
        View,
        KeyboardAvoidingView,
        ImageBackground,
        ScrollView,
           Button
        } from 'react-native';
 // import {ListView} from 'deprecated-react-native-listview';
import ImagePicker from 'react-native-image-picker';
import Base_url from './Base_url';
// import Button from 'react-native-button';
import {
          Card,
          CardImage,
          CardTitle,
          CardContent,
          CardAction,
        } from 'react-native-card-view';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import DatePicker from 'react-native-datepicker';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import SwitchButton from 'switch-button-react-native';
import RNRestart from 'react-native-restart';
import Header from './cameraHeader';
import Year from './YearBox';
import Month from './MonthBox';
import User from './UserIdBox';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class monthlyreport extends React.Component {
  static navigationOptions = {
title: "Attendance Report",

    headerStyle: {
                  backgroundColor: '#0080FF',
                  borderBottomColor: '#b3b3b3',
                  borderBottomWidth: 3,
                  height:80,
                  },
   headerTintColor: '#fff',
   headerTitleStyle: {
                      justifyContent:'center',
                      textAlign:'center',
                      fontWeight: 'bold',
                      width:'80%',
                    },

  };

  constructor(props) {
    super(props)
    this.state = {
                  date:'',
                  user_id:'',
                  loading: false,
                  monthly:'',
                  name:'',
                  data:[],
                  counter_data:'',
                  pic_name_data:'',
                  s_date:'',
                  activeSwitch: [],
                  data_sec:'',
                  type:null,
                  data_self:'',
                  per:'',
                  userCode:''
                };

  }
componentDidMount(){
  this.detal().done();
}
detal=async()=>{
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_sec=permissions_fir.success.user.employee;
  var user_code=permissions_fir.success.user;
  this.setState({userCode:user_code})
  this.setState({per:permissions_sec})
}
  render() {
    const {per,userCode}=this.state;
    const context=this;
    var userObj = JSON.parse(context.props.navigation.state.params.hxf);

    const data = userObj.success.attendance_data;
var profile_picture={uri:per.profile_picture};
   const pic = per.profile_picture;
    return (

      <View style={{height:"100%"}}>

   {(this.state.loading) ?
     <View style={{
       flex:1,flexDirection:'row',width: '50%', backgroundColor: '#EFEFEF',
       alignItems: 'center', justifyContent: 'center',
       position: 'absolute', height:'10%',
       shadowOffset:{width:100,height:100},
       shadowColor: '#330000',
       shadowOpacity: 0,
       shadowRadius: 5,
       elevation: 10,
       left:'25%',
       top:'35%'
         }}>
    <ActivityIndicator size="large" color='rgb(19,111,232)' />
    <Text style={{fontSize:15,left:10}}>Loading..</Text>
    </View>
    : null}

      <View style={styles.pagecomponent_sec}>

<Image source={profile_picture} style={{bottom:50,height:150,width:150,borderRadius:75,borderColor:'black',alignItems:'center',borderColor:'rgb(19,111,232)',borderWidth:1}}/>
<Text style={{fontSize:20,color:'rgb(19,111,232)',bottom:50}}>{per.fullname}</Text>
<Text style={{fontSize:15,color:'#bfbfbf',bottom:50}}>{userCode.employee_code}</Text>
        <Text style={{bottom:30,fontSize:18,backgroundColor:'green',width:'30%',borderRadius:5,color:'white'}}>       {data.status}</Text>
<Text style={{left:50,bottom:10,fontSize:15,}}>  Date: </Text>
<Text style={{left:120,bottom:30,fontSize:15,color:'rgb(19,111,232)'}}> {data.on_date}</Text>
<Text style={{left:0,bottom:0,fontSize:15,backgroundColor:'#bfe3f2',width:'60%',height:'8%',paddingTop:10}}>        Replacement With: {data.replacement}</Text>
<View style={styles.card_view}>
<Text style={{color:'#fcfeff',right:5}}>Reason for leave:</Text>
</View>
<View style={styles.CardView_sec}>
<Text>{data.description}</Text>
</View>
      </View>
      </View>
    );
}
}

const styles = StyleSheet.create({
  button: {
zIndex: 100,

    color: '#DCE4EF',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:20,
    backgroundColor:'rgb(19,111,232)',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'transparent',
    elevation: 0,
  },
  CardView: {
    marginTop:200,
    flex:0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderTopWidth: 1.5,
    borderBottomWidth:1.5,
    borderRightWidth:1.5,
    borderLeftWidth:1.5,
    borderColor: 'rgb(0,0,0)',
    width:viewportWidth/1.03,
    height: viewportHeight / 1.5,
    // shadowOffset:{  width: 100,  height: 100,  },
    shadowColor: '#330000',
    shadowOpacity: 0,
    // shadowRadius: 0,
    elevation: 5,
  },
  pagecomponent: {
    marginTop:10,
     marginLeft:15,
    flex:0.1,
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
    // height: '30%',
    // shadowOffset:{  width: 100,  height: 100,  },
    shadowColor: '#330000',
    shadowOpacity: 0,
    // shadowRadius: 0,
    elevation: 5,
  },
  pagecomponent_sec: {
    marginTop:20,
     marginLeft:15,
    flex:1,
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
    // height: '30%',
    // shadowOffset:{  width: 100,  height: 100,  },
    shadowColor: '#330000',
    shadowOpacity: 0,
    // shadowRadius: 0,
    elevation: 5,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width:viewportWidth,
    height:viewportHeight
  },
  info: {
    width:'20%',
        flexGrow: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 15,

    },
drowline: {
            bottom:10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'#cdcfd1',
            width:'100%',
            height: '0.1%',
            // shadowOffset:{  width: 100,  height: 100,  },
            // shadowColor: '#330000',
            shadowOpacity: 0,
            // shadowRadius: 0,
            elevation: 1,
          },
card_view: {
            top:45,
            right:'31%',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomEndRadius: 150,
            borderTopWidth: 1.5,
            borderBottomWidth:1,
            borderRightWidth:1.5,
            borderLeftWidth:1.5,
            borderColor: 'rgb(19,111,232)',
            backgroundColor:'rgb(19,111,232)',
            width:'40%',
            height: '7%',
            // shadowOffset:{  width: 100,  height: 100,  },
            // shadowColor: '#330000',
            shadowOpacity: 0,
            // shadowRadius: 0,
             elevation: 5,
           },
CardView_sec: {
           top:50,
           flex:0,
           justifyContent: 'center',
           alignItems: 'center',
           borderRadius: 0,
           borderTopWidth: 1.5,
           borderBottomWidth:1.5,
           borderRightWidth:1.5,
           borderLeftWidth:1.5,
           borderColor: 'rgb(19,111,232)',
           width:'95%',
           height: '20%',
           // shadowOffset:{  width: 100,  height: 100,  },
           // shadowColor: '#330000',
           shadowOpacity: 0,
           // shadowRadius: 0,
           // elevation: 5,
         },
 button1: {

           flex:0,
           margin: 0,
           color: '#DCE4EF',
           left: 0,

           top:'200%',


           paddingTop:0,
           paddingBottom:0,
           paddingLeft:0,
           paddingRight:0,
           backgroundColor:'rgb(19,111,232)',
           borderRadius:4,
           borderWidth: 1,
           borderColor: 'transparent',
           elevation: 0,
         },
 button2: {

           zIndex: 100,
           flex:0,
           margin: 0,
           marginTop:6,
           marginLeft:0,
           marginRight:0,

           right:0,
           color: '#DCE4EF',
           alignItems: 'center',
           justifyContent: 'center',
           marginLeft:10,
           paddingTop:0,
           paddingBottom:0,
           paddingLeft:0,
           paddingRight:0,
           backgroundColor:'rgb(19,111,232)',
           borderRadius:4,
           borderWidth: 1,
           borderColor: 'transparent',
           elevation: 0,
         },
  // commentbox: {
  //   widht:20,
  //   height:10,
  //   margin:4,
  //   shadowOffset:{  width: 100,  height: 100,  },
  //   shadowColor: '#330000',
  //   shadowOpacity: 0,
  //   shadowRadius: 5,
  //   elevation: 10,
  // },

});
