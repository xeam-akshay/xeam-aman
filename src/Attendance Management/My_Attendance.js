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
        } from 'react-native';
import { withNavigation } from "react-navigation";
import {Actions} from 'react-native-router-flux';
 // import {ListView} from 'deprecated-react-native-listview';
import ImagePicker from 'react-native-image-picker';
import Button from 'react-native-button';
import Base_url from '../Base_url';
import { Dropdown } from 'react-native-material-dropdown';
import {
          Card,
          CardImage,
          CardTitle,
          CardContent,
          CardAction,
        } from 'react-native-card-view';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DatePicker from 'react-native-datepicker';
import Logo from '../Image/logo.png';
import Search from '../Image/search.png';
//import Header from '../cameraHeader';
import Year from '../YearBox';
import Month from '../MonthBox';
import User from '../UserIdBox';
import {extractBaseURL} from '../api/BaseURL';
import {Header, getWidthnHeight, CommonModal, IOS_StatusBar, WaveHeader} from '../KulbirComponents/common';
import { BackHandler } from 'react-native';
import { ToastAndroid } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
var today = new Date();
const {dd} = today.getDate();

const mm = today.getMonth()+1; 
const yyyy = today.getFullYear();

class monthlyreport extends React.Component {
  // static navigationOptions = {

  //   headerLeft: null,
  //   headerStyle: {
  //                 backgroundColor: '#0080FF',
  //                 borderBottomColor: '#b3b3b3',
  //                 borderBottomWidth: 3,
  //                 height:80,
  //                 },
  //  headerTintColor: '#fff',
  //  headerTitleStyle: {
  //                     justifyContent:'center',
  //                     textAlign:'center',
  //                     fontWeight: 'bold',
  //                     width:viewportWidth/1.1,
  //                   },
  // };

  constructor(props) {
    super(props)
    this.state = {
                  date:'',
                  user_id:'',
                  loading: false,
                  monthly:'',
                  uri:'',
                  name:'',
                  data:[],
                  counter_data:'',
                  pic_name_data:'',
                  s_date:'',
                  color:"p",
                  value:'',
                  status:'',
                  status_data:'',
                  backgroundColor:'',
                  week_off:'Week-Off',
                  Month:mm,
                  Year:yyyy,
                  baseURL: null,
                  errorCode: null,
                  apiCode: null,
                  commonModal: false
                 };
  }
data_submit=async()=>{
}


show_fast(){
  this.show();
  this.show_last();
}
show_last=()=>{
  const {data,value,status}=this.state;
  console.log("status")
  if(status==="Present"){

    this.setState({color:'green'})
  }else if (status==="Week-Off") {
    this.setState({status_data:"w"})
  }
}
  hideLoader = () => {
      this.setState({ loading: false });
    }

    showLoader = () => {
      this.setState({ loading: true });
    }
    
   show =async() =>{
     const {user_id, baseURL} = this.state;
     console.log("I am going to call show api")
     var data = JSON.stringify({
       // we will pass our input data to server
       year: this.state.year,
       month: this.state.month,
       user_id: this.state.user_id,
      })

      const _this = this;
      this.showLoader();
      const context=this;
      var data = await AsyncStorage.getItem('userObj');
      var userObj = JSON.parse(data);
      var successToken=(userObj.success.secret_token);
      var userid =(userObj.success.user.employee.user_id);
      console.log(userid);
      console.log(successToken);
      var data = new FormData();


      console.log("year",this.state.Year);
      console.log("Month",this.state.Month);

      data.append("year", this.state.Year);
      data.append("month", this.state.Month);
      data.append("user_id", userid);

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.status === 200) {
          _this.hideLoader();
          console.log("Successfully200")
          var json_obj = JSON.parse(xhr.responseText);
          var c = json_obj.success.user.monthly_data;
          var counter=json_obj.success.user.counter_data;
          var pic_name=json_obj.success.user.employee;
          context.setState({counter_data:counter});
          context.setState({pic_name_data:pic_name});
          context.setState({data:c});
          {c.map((item) => {
            return(
              context.setState({status:item.status})
            );
          })}
          // context.props.navigation.navigate("welcome");
          // console.log(xhr.responseText);
          // var abc=xhr.responseText;
          // context.props.navigation.navigate("ShowMonthlyReport",{abc});
        }

        else{
            console.log("inside error")
            _this.hideLoader();
            _this.setState({errorCode: xhr.status})
            _this.setState({apiCode: "006"})
            _this.setState({commonModal: true})
        }
      });

      xhr.open("POST", `${baseURL}/monthly-attendance-report`);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Authorization", "Bearer " + successToken);
      xhr.send(data);
   }

  onDecline(){
    this.setState({commonModal: false})
  }

   _menu = '';

     setMenuRef = ref => {
       this._menu = ref;
     };

     hideMenu = () => {
       const value = this.value;
       this.setState({value});
       console.log(value);
     };

     showMenu = () => {
       this._menu.show();
     };

conditional=(t)=>{

  if(t=="Present"){
    return "Present"
  }if(t=="Absent"){
    return "Absent"
  }if(t=="Week-Off"){
    return "Week-Off"
  }if(t=="Holiday"){
    return "Holiday"
  }if(t=="Leave"){
    return "Leave"
  }
}
time_conditional=(t)=>{
  if(t ==""){
    return ""
  }if(t !==""){
    return ""
  }
}


to_month(){
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  // if(dd<10) 
  // {
  //     dd='0'+dd;
  // } 

  // if(mm<10) 
  // {
  //     mm='0'+mm;
  // } 
  today = yyyy+'-'+mm+'-'+'30';
  this.setState({Year:yyyy})
  this.setState({Month:mm})
  console.log("mm",mm);
  console.log("yyyy",yyyy);
}

// componentDidMount(){
//   this.to_month();
//   this.show().done();
// }
componentDidMount(){
  const {navigation} = this.props;
  BackHandler.addEventListener('hardwareBackPress', () => {
    (Actions.currentScene === "MyAttendance") ? Actions.popTo('First') : null;
  })
        this._unsubscribe = navigation.addListener("didFocus", async() => {
          this.to_month();
          await this.extractLink();
          this.show().done();
        })
}

async extractLink(){
  await extractBaseURL().then((baseURL) => {
    this.setState({baseURL}, () => console.log("EXTRACT LINK: ", this.state.baseURL))
  })
}

UNSAFE_componentWillUnmount(){
  this._unsubscribe().remove();
  BackHandler.removeEventListener('hardwareBackPress', () => {
    (Actions.currentScene === "MyAttendance") ? Actions.popTo('First') : null;
  })
}

getAsyncData = async(callback) => {
  const user_token = await AsyncStorage.getItem('user_token');
  const permissions_fir= JSON.parse(user_token);
  console.log("ASYNC DATA: ", permissions_fir.success.project)
  callback(permissions_fir.success.project, permissions_fir.success.user.employee_code)
}

renderHeader(employer){
  switch(employer){
    case "XEAMHO":
      return (
        <WaveHeader
          wave={Platform.OS ==="ios" ? false : false} 
          //logo={require('../Image/Logo-164.png')}
          menu='white'
          title='My Attendance'
          //version={`Version ${this.state.deviceVersion}`}
        />
            );
    case "Lehri HO":
      return (
        <WaveHeader
          wave={Platform.OS ==="ios" ? false : false} 
          //logo={require('../Image/Logo-164.png')}
          menu='white'
          title='My Attendance'
          //version={`Version ${this.state.deviceVersion}`}
        />
            );
    case "Aarti Drugs Ltd":
      return <Header navigation={this.props.navigation} title="My Attendance" width={[getWidthnHeight(50)]} menu="white" images={false}/>
    default:
      return null;
  }
}

  render() {
    const {errorCode, apiCode} = this.state;
    const card = {card: {width: '100%', height: '100%',bottom:'35%'}};
    const {monthly,uri,name,data,counter_data,pic_name_data,date,s_date,status,status_data,backgroundColor}=this.state;
    const t=[counter_data]
    const Options= [{Date:'Date',Status:'Status',First_Punch:'First punch',Last_Punch:'Last punch'}]
    var pic={uri:pic_name_data.profile_picture};
    const context=this;
    let Month = [{value: 'January',leave_status:'0'}, {value: 'February',leave_status:'1'}, {value: 'March',leave_status:'2'},{value: 'April',leave_status:'2'},{value: 'May',leave_status:'2'},{value: 'June',leave_status:'2'},{value: 'July',leave_status:'2'},{value: 'August',leave_status:'2'},{value: 'September',leave_status:'2'},{value: 'October',leave_status:'2'},{value: 'November',leave_status:'2'},{value: 'December',leave_status:'2'},];
    let Year = [{value: '2016',leave_status:'0'}, {value: '2017',leave_status:'1'}, {value: '2018',leave_status:'2'}, {value: '2019',leave_status:'2'}, {value: '2020',leave_status:'2'}, {value: '2021',leave_status:'2'}, {value: '2022',leave_status:'2'}, {value: '2023',leave_status:'2'}];
    //console.log("****PROPS: ", this.props.employer)
    var today = new Date();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    let user = this.props.employer;
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

if(mm==1) 
 {
     mm='January';
 } 
 if(mm==2) 
 {
     mm='February';
 }
 if(mm==3) 
 {
     mm='March';
 }
 if(mm==4) 
 {
     mm='April';
 }
 if(mm==5) 
 {
     mm='May';
 }
 if(mm==6) 
 {
     mm='June';
 }
 if(mm==7) 
 {
     mm='July';
 }
 if(mm==8) 
 {
     mm='August';
 }
 if(mm==9) 
 {
     mm='September';
 }
 if(mm==10) 
 {
     mm='October';
 }

 if(mm==11) 
 {
   mm='November';
 } 
 if(mm==12) 
 {
   mm='December';
 } 
 
// var date ="";
//   for (i = 0; i < monthly.length; i++) {
//       date += monthly[i].on_date.split('').join('')+'\n'+'\n';
//   };
//       var status ="";
//         for (i = 0; i < monthly.length; i++) {
//             status += monthly[i].status.split().join('')+'\n'+'\n';
//
//         };
//       //
//           var first_punch ="";
//             for (i = 0; i < monthly.length; i++) {
//                 first_punch += monthly[i].first_punch.split().join('')+'\n'+'\n';
//             };
//                   var last_punch ="";
//                     for (i = 0; i < monthly.length; i++) {
//                         last_punch+=monthly[i].last_punch.split().join('')+'\n'+'\n';
//                     };
  // console.log(last_punch);

    return (
      <View style={{height:viewportHeight}}>
      <IOS_StatusBar color={gradient} barStyle="light-content"/>
      {this.renderHeader(user)}
      <CommonModal 
          title="Something went wrong"
          subtitle= {`Error Code: ${errorCode}${apiCode}`}
          visible={this.state.commonModal}
          onDecline={this.onDecline.bind(this)}
          buttonColor={['#0E57CF', '#25A2F9']}
      />
      <View>
         <View style={styles.pagecomponent}>
           
            <TouchableOpacity style={{top:45,left:'35%'}} onPress={()=>this.show()}>
            <View style={[{borderRadius: 5}, searchButton]}>
                <Text style={{borderRadius: 8,color:'white',paddingTop:5,paddingBottom:5,paddingLeft:10,paddingRight:10,overflow: "hidden"}}>Search</Text>
            </View>
            </TouchableOpacity>
          
         
        <View style={{flexDirection:'row',margin:0,right:'50%',bottom:6}}>
        <Dropdown
              containerStyle={{width:'30%',right:10,bottom:10}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={Month}
              value={mm}
              label='Month'
              onChangeText={ Month =>{
                if(Month==='January'){
                  context.setState({Month:'1'})
                }
                if(Month==='February'){
                  context.setState({Month:'2'})
                }
                if(Month==='March'){
                  context.setState({Month:'3'})
                }
                if(Month==='April'){
                  context.setState({Month:'4'})
                }
                if(Month==='May'){
                  context.setState({Month:'5'})
                }
                if(Month==='June'){
                  context.setState({Month:'6'})
                }
                if(Month==='July'){
                  context.setState({Month:'7'})
                }
                if(Month==='August'){
                  context.setState({Month:'8'})
                }
                if(Month==='September'){
                  context.setState({Month:'9'})
                }
                if(Month==='October'){
                  context.setState({Month:'10'})
                }
                if(Month==='November'){
                  context.setState({Month:'11'})
                }
                if(Month==='December'){
                  context.setState({Month:'12'})
                }
               } }
              
            />

<Dropdown
              containerStyle={{width:'30%',left:'0%',bottom:10}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={Year}
              value={yyyy}
              label='Year'
              onChangeText={ Year =>{ context.setState({ Year }) } }
              
            />

          </View>
      </View>
      <View style={{top:'3%',alignItems:'center'}}>
      <Image source={pic} style={{height:80,width:80,borderRadius:75,borderColor:'black',}}/>
      <Text style={{fontSize:20, color: 'black',top:'6%',alignItems: 'center',textAlignVertical:'center',textAlign:'right',marginBottom:'0%'}}>{pic_name_data.fullname}</Text>
      </View>
      
      {t.map((item) => {
      return (
        <View style={{marginLeft:5,marginRight:5}}>
        <Text style={[
        (this.time_conditional(item.Present))==""?styles.pre:styles.data_trd,
        styles.data_trd,
      ]}> Present:{item.Present} </Text>
       <Text style={[
       (this.time_conditional(item.Absent))==""?styles.ab:styles.data_trd,
       styles.data_trd,
     ]}>Absent:{item.Absent}</Text>
       <Text style={[
       (this.time_conditional(item.Leave))==""?styles.lea:styles.data_trd,
       styles.data_trd,
     ]}> Leave:{item.Leave}</Text>
       <Text style={[
       (this.time_conditional(item.Holiday))==""?styles.holy:styles.data_trd,
       styles.data_trd,
     ]}>Holiday:{item.Holiday}</Text>
       </View>);
      })}
      <View style={styles.drowline}/>
            <View style={[styles.card_view, searchButton, borderColor]}>
            <Text style={{color:'#fcfeff',right:5,top:'0%'}}>Monthly Days Details</Text>
            </View>
             <View style={[styles.CardView_sec, borderColor]}>
             {(this.state.loading) ?
               <View style={{
                          flex:1,flexDirection:'row',width: '50%', backgroundColor: '#EFEFEF',
                          alignItems: 'center', justifyContent: 'center',
                          position: 'absolute', height:'20%',
                          shadowOffset:{  width: 100,  height: 100,  },
                          shadowColor: '#330000',
                          shadowOpacity: 0,
                          shadowRadius: 5,
                          elevation: 10,
                          left:'25%',
                          top:'30%'
                      }}>

               <ActivityIndicator  size="large" color='rgb(19,111,232)' />
                       <Text style={{fontSize:15,left:10}}>Loading..</Text>
               </View>
               : null}
            <View style={{marginTop:'2%',marginBottom:'2%',backgroundColor:'#cdcfd1',height:'15%',width:'100%',borderRadius: 0}}>
            {Options.map((item) => {
            return (
              <View style={{width:'100%'}}>
              <Text style={{top:10,left:'5%'}}>{item.Date}</Text>
              <Text style={{bottom:'10%',left:'30%'}}>{item.Status}</Text>
              <Text style={{bottom:'35%',left:'55%'}}>{item.First_Punch}</Text>
              <Text style={{bottom:'60%',left:'80%'}}>{item.Last_Punch}</Text>
                 </View>
            );
            })}
            </View>

<ScrollView style={{width:'100%',marginBottom:'10%'}} >
{data.map((item) => {
return (
     <View>
    <Text style={{top:'20%',left:'2%'}}>{item.on_date}</Text>
    <Text style={[
      (this.conditional(item.status)=="Present")?styles.present:styles.data_sec,
      (this.conditional(item.status)=="Absent")?styles.absent:styles.data_sec,
      (this.conditional(item.status)=="Week-Off")?styles.week_off:styles.data_sec,
      (this.conditional(item.status)=="Holiday")?styles.Holiday:styles.data_sec,
      (this.conditional(item.status)=="Leave")?styles.Leave:styles.data_sec,
        styles.data_sec
    ]}>  {item.status.substring(0,1)}</Text>
      <Text style={{left:'55%',bottom:'30%'}}>{item.first_punch}</Text>
        <Text style={{left:'80%',bottom:'55%'}}>{item.last_punch}</Text>
      </View>
);
})}
      </ScrollView>
      </View>
      </View>
      </View>

    );
}
}

const styles = StyleSheet.create({
  present:{backgroundColor:'#78b341',borderRadius:12,height:23,width:25,color:'white',overflow: "hidden"},
  absent:{backgroundColor:'#c11418',borderRadius:12,height:23,width:25,color:'white',overflow: "hidden"},
  week_off:{backgroundColor:'#ffbf80',borderRadius:12,height:23,width:25,color:'white',overflow: "hidden"},
  Holiday:{backgroundColor:'#adadad',borderRadius:12,height:23,width:25,color:'white',overflow: "hidden"},
  Leave:{backgroundColor:'#76cae4',borderRadius:12,height:23,width:25,color:'white',overflow: "hidden"},
  pre:{backgroundColor:'#78b341',color:'white',left:'0.5%',top:'80%',borderRadius:4,paddingLeft:4,width:'26%',overflow: "hidden"},
    ab:{backgroundColor:'red',color:'white',left:'28%',top:'55%',borderRadius:4,paddingLeft:4,width:'23%',overflow: "hidden"},
    lea:{backgroundColor:'#76cae4',color:'white',left:'52%',top:'30%',borderRadius:4,paddingLeft:4,width:'23%',overflow: "hidden"},
    holy:{backgroundColor:'#adadad',color:'white',left:'76%',top:'5%',marginBottom:0,borderRadius:4,paddingLeft:4,width:'23%',overflow: "hidden"},
  time:{color:'red'},
  data_sec:{
    top:0,
    alignItems:'center',
    left:'32%',
  },
  data_trd:{
    bottom:0
  },
  data:{
    margin:10,
    width:'100%',
  },

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
  button_sec: {
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
    top:'2%',
     left:'1%',
    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#ffffff',
    borderRadius: 10,
    borderTopWidth: 1.5,
    borderBottomWidth:1.5,
    borderRightWidth:1.5,
    borderLeftWidth:1.5,
    borderColor: 'transparent',
    width:viewportWidth/1.02,
    height: '10%',
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
          top:10,
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
            marginTop:'5%',
            marginBottom:'2%',
            right:'0%',
            //flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomEndRadius: 150,
            borderTopWidth: 1.5,
            borderBottomWidth:1,
            borderRightWidth:1.5,
            borderLeftWidth:1.5,
            borderColor: 'rgb(19,111,232)',
            backgroundColor:'rgb(19,111,232)',
            width:'55%',
            height: '7%',
            borderWidth: 1,
            // shadowOffset:{  width: 100,  height: 100,  },
            // shadowColor: '#330000',
            shadowOpacity: 0,
            // shadowRadius: 0,
             elevation: 5,
           },
CardView_sec: {
           top:20,
           flex:0,
           justifyContent: 'center',
           alignItems: 'center',
           borderRadius: 0,
           borderTopWidth: 1.5,
           borderBottomWidth:1.5,
           borderRightWidth:1.5,
           borderLeftWidth:1.5,
           borderColor: 'rgb(19,111,232)',
           width:viewportWidth,
           height: '50%',
           // shadowOffset:{  width: 100,  height: 100,  },
           // shadowColor: '#330000',
           shadowOpacity: 0,
           // shadowRadius: 0,
           // elevation: 5,
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

export default withNavigation(monthlyreport);