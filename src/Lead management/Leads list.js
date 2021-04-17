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
  TouchableNativeFeedback
} from 'react-native';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,
} from 'react-native-card-view';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LeftSide from '../Image/side.png';
import RightSide from '../Image/side2.png';
import Logo from '../Image/logo.png';
import CheckBox from 'react-native-check-box';
import { CustomPicker } from 'react-native-custom-picker';
import { Hoshi } from 'react-native-textinput-effects';
import { Dropdown } from 'react-native-material-dropdown';
import Ripple from 'react-native-material-ripple';
import DocumentPicker from 'react-native-document-picker';
import {connect} from 'react-redux'
import {extractBaseURL} from '../api/BaseURL';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class Lead_List extends Component {

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
              Lead_list:[],
              baseURL: null
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

  componentWillMount(){
    this.extractLink();
  }

  async extractLink(){
    await extractBaseURL().then((baseURL) => {
    this.setState({baseURL}, () => console.log("EXTRACT LINK: ", this.state.baseURL))
    })
  }

     Lead_list=async()=>{
      const {baseURL} = this.state;
      const context=this;
      this.showLoader();
      const _this = this;
      var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
  var data = new FormData();
data.append("lead_status", "2");
data.append("lead_type", "all");
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.addEventListener("readystatechange", function() {
                if (xhr.readyState !== 4) {
                    
                    return;
            }
                if(xhr.status===200){
                    _this.hideLoader();
                    // console.log("lead list",xhr.responseText)
                    var json_obj = JSON.parse(xhr.responseText);
                    
                    var Lead_list = json_obj.success.leadList;
                    context.setState({Lead_list:Lead_list});
                    // console.log("json_obj",Lead_list)
                }
                else{
                console.log(xhr.responseText)
                
                _this.hideLoader();
                }
            });

            xhr.open("POST", `${baseURL}/list-lead`);
            xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);

            xhr.send();
       
     }
    
     
      handleClose = () => {
        this.setState({ model_close: false })
    }
    taskOverViewComment(){
      const context=this;
      context.props.navigation.navigate("taskOverViewComment",{id:this.state.taskoverview_id});
      this.setState({ slideAnimationDialog: false });
     }
     taskOverViewUpdate(){
      const context=this;
      context.props.navigation.navigate("taskOverViewUpdate",{id:this.state.taskoverview_id});
      this.setState({ slideAnimationDialog: false });
     }
     taskOverViewHistory(){
      const context=this;
      context.props.navigation.navigate("taskOverViewHistory",{id:this.state.taskoverview_id});
      this.setState({ slideAnimationDialog: false });
     }
     onDismiss(){
      this.setState({ defaultAnimationDialog: false });
     }
     
    render (){
            const context=this;
            const {Lead_list,task_title,taskoverview_id,button_value}= this.state;
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
          
          const status=[{value:"Mark as improgress"},{value:"Mark as Done"},];
          // const data = JSON.stringify(task_title);
          // const data_sec = data.title;
          // const dataToShow = task_title.filter((value,index) => index === taskoverview_id)
          
          //console.log("dataToShow",Lead_list)
		return(
            <View style={{height:viewportHeight,width:viewportWidth,backgroundColor:'white'}}>
            <View style={{backgroundColor:'rgb(19,111,232)',height:'10%'}}>
            <View style={{top:'45%',left:'15%'}}>
             <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Lead Listing</Text>
              </View>
            <TouchableOpacity style={{right:'0%',top:'0%'}} onPress={() => context.props.navigation.toggleDrawer()}>
                        {/*Donute Button Image */}
                        <Image
                          source={require('../Image/menu.png')}
                          style={{ width: 35, height: 35, marginLeft: 10,top:0 }}
                        />
                      </TouchableOpacity>
            </View>
           
      
           <View style={{flex:1, height:'100%',width:'100%',top:'5%'}}>
         
            {/* <View style={styles.pagecomponent_nine}>
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
            <View style={{width:'20%',alignItems:'center',left:'40%',bottom:'10%'}}>
            <TouchableOpacity style={{backgroundColor:'rgb(19,111,232)',top:'5%',borderRadius: 4,paddingLeft:10,paddingRight:10,paddingTop:5,paddingBottom:5}} onPress={() =>this.My_task()}>
            <Text style={{color:'white'}} >Search</Text>
            </TouchableOpacity>
            </View>
            <View style={{backgroundColor:'#f1f1f1',height:'0.4%',width:'100%',bottom:'8%'}}/>
               */}
              <View style={styles.card_view_thrd}>
              <Text style={{color:'#fcfeff',left:'10%'}}>Lead List: </Text>
              </View>
              <Image source={LeftSide} style={{left:'21%',bottom:'9%',height:'4%',width:50,borderColor:'black',alignItems:'center'}}/>
              <View>
              
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
      
            <ScrollView style={{bottom:'8%',margin:0,height:'78%'}}>
            
            {Lead_list.map((item,key) => {
      return (
              <View style={styles.task_list}>
                
                 <View style={{flexDirection:'row',justifyContent:'flex-start',}}>
                 <Text style={{fontWeight:'bold',fontSize:12,width:'70%',textAlign:'center',}}>  {item.name_of_prospect} </Text>
                <TouchableOpacity >
                <Image source={require('../Image/Unassign.png')} style={{  marginLeft: wp(0) }}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>context.props.navigation.navigate("View_lead",{view_lead:item})}>
                <Image source={require('../Image/eye.png')} style={{  left: wp(2)}}/>
                </TouchableOpacity>
                <TouchableOpacity >
                <Image source={require('../Image/pencil(edit).png')} style={{  left: wp(4) }}/>
                </TouchableOpacity>
                
                </View>
                
                <View style={{flexDirection:'row',margin:10,left:'5%'}}>
                
                 <View style={{left:'0%',flexDirection:'row',top:'15%'}}>
                <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>ULN: </Text>
                <Text style={{fontSize:10,}}>{item.lead_code}  |</Text>
                <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>  Type: </Text>
                <Text style={{fontSize:10,}}>{item.business_type=='1'?'Goverment':'Corporate'} </Text>
                
                </View>
                </View>
                <View style={{flexDirection:'row',left:'5%'}}>
                <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>   To: </Text>
                <Text style={{fontSize:10,}}> |</Text>
                <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>  Status: </Text>
                <Text style={{fontSize:10,}}>{item.my_status} |</Text>
                <Text style={{fontSize:10,color:'rgb(19,111,232)'}}>  priority: </Text>
                <Text style={{fontSize:10,}}>{item.priority == '0' ? 'Low' : 'High'}</Text>
                
                </View>
              </View>
      )})}
            </ScrollView>
            <TouchableOpacity style={{left:wp(75)}} onPress={() =>context.props.navigation.navigate("Create_Lead")}>
            <LinearGradient 
                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                colors={['#5434ff', '#21bbff']} 
                style={{flexDirection:'row',borderRadius:100,width:wp(18),height:hp(9.5),bottom:hp(5),justifyContent:'center',}}>
                        <Text style={{fontSize:70,color:'white',bottom:16}}>+</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                </View>
                </View>
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

//   function mapStateToProps(state){
//   return{
//     counter:state.counter
//   }
// }

// function mapDispatchToProps(dispatch){
//   return{

//   }
// }

// export default connect(mapStateToProps)(Lead_List)

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
                    borderRightWidth:3,
                    borderLeftWidth:1.5,
                    
                    borderLeftColor:'green',
                    borderTopColor:'transparent',
                    borderBottomColor:'transparent',
                    borderRightColor:'transparent',
                    shadowOffset:{  width: 100,  height: 100,  },
                    shadowColor: '#330000',
                    paddingTop:10,
                    paddingBottom:10,
                    width:'95%',
                    left:'0%',
                   
                       shadowOpacity: 0,
                       shadowRadius: 5,
                       elevation: 2,
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
    }
  });
