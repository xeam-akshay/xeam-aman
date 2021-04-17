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
import {Actions} from 'react-native-router-flux';
import {withNavigation} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import { SegmentedControls } from 'react-native-radio-buttons'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import { Hoshi } from 'react-native-textinput-effects';
// import time from '../Image/menu.png'
import Header from '../Components/New header'
import LeftSide from '../Image/side.png';
import RedBox from '../Components/redBox'
import RedButton from '../Components/normalButton';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import KeyboardShift from '../KeyboardShift';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {extractBaseURL} from '../api/BaseURL';
import {CommonModal, IOS_StatusBar} from '../KulbirComponents/common';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
class App extends Component {
  constructor() {
    super();
    this.state = {
        Prospect_name:'',
        button_value:'',
        leadIndustryOptions_id:'',
        leadSourceOptions_id:'',
        eadSourceOptions:[],
        leadIndustryOptions:[],
        service_description:'',
        name_of_prospect:'',
        address_location:'',
        business_type:'',
        contact_person_name:'',
        contact_person_email:'',
        contact_person_mobile_number:'',
        contact_person_alternate_mobile_number:'',
        services_required:'',
        lead_idLeadView:'',
        statusLeadView:'',
        loading: false,
        commentsLeadView:'',
        hodId:'',
        baseURL: null,
        errorCode: null,
        apiCode: null,
        commonModal: false        
    };
  }


  componentDidMount(){
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener("didFocus", async() => {
      await this.extractLink();
      this.Viewlead();
    })
  }

  async extractLink(){
    await extractBaseURL().then((baseURL) => {
    this.setState({baseURL}, () => console.log("EXTRACT LINK: ", this.state.baseURL))
    })
  }

  UNSAFE_componentWillUnmount(){
    this._unsubscribe().remove();
  }


  Approve_lead=async()=>{
    const {baseURL} = this.state;
    const _this = this;
    this.showLoader();
var user_token= await AsyncStorage.getItem('user_token');
var permissions_fir= JSON.parse(user_token);
var permissions_four=permissions_fir.success.secret_token;
var user_id=permissions_fir.success.user.id;
this.setState({user_id:user_id})
    var data = new FormData();
    data.append("lead_id", this.state.lead_idLeadView);
    data.append("status", this.state.statusLeadView);
    data.append("comments", this.state.commentsLeadView);
    data.append("hod_id", this.state.hodId);
   
    console.log("lead_id",this.state.lead_idLeadView)
    console.log("status",this.state.statusLeadView)
    console.log("comments",this.state.commentsLeadView)
    console.log("hod_id",this.state.hodId)
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState !== 4) {
        return;
      }if(xhr.status==200){
        console.log(this.responseText);
        var json_obj = JSON.parse(xhr.responseText);
        var msg = json_obj.success;
        Alert.alert(msg);
        _this.setState({commentsLeadView:''})
        Actions.popTo('List of lead');
        //_this.props.navigation.navigate("List of lead")
        _this.hideLoader();
      }if(xhr.status == 403){
        console.log(this.responseText);
        var json_obj = JSON.parse(xhr.responseText);
        var msg = json_obj.error;
        Alert.alert(msg);
        _this.hideLoader();
      }else {
        _this.enableModal(xhr.status, "081");
      }
    });
    
    xhr.open("POST", `${baseURL}/lead-approval`);
    xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
    
    xhr.send(data);
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

    Viewlead(){
      const context=this;
      var hodId = (context.props.hodId);
      var ViewLead = (context.props.view_lead); 
      this.setState({lead_idLeadView:ViewLead.id})
      this.setState({hodId:hodId})
    }
  render (){
         const {errorCode, apiCode} = this.state;
         const context=this;
         console.log(this.state.leadSourceOptions_id)
         let status = [{value: 'all',}, {value: 'Today Tasks',}, {value: 'Delayed Tasks',},{value: 'Upcoming Tasks', },{value: "This Week's Tasks",},{value: "This Month's Tasks",},];

        var ViewLead = (context.props.view_lead); 
        var hodId = (context.props.hodId);
        var canApprove = (context.props.canApprove);
        var name = (context.props.view_lead.lead_executives !== null ? context.props.view_lead.lead_executives.fullname : "--");
        var Comment = (context.props.view_lead.comments);
        console.log("ViewLead", this.props.hodId, this.props.userId, ViewLead.status);
        let gradient = ['#E5314E', '#E5314E'];
  return (

    <KeyboardShift>
            {()=>(
                <View style={{height:viewportHeight,width:viewportWidth,backgroundColor:'e6e6e6'}}>
                  {(this.state.loading) ?
                                  <View style={{
                                                  flex:1,flexDirection:'row',width: '65%', backgroundColor: '#EFEFEF',
                                                  alignItems: 'center', justifyContent: 'center',
                                                  position: 'absolute', height:'40%',
                                                  shadowOffset:{  width: 100,  height: 100,  },
                                                  shadowColor: '#330000',
                                                  shadowOpacity: 0,
                                                  shadowRadius: 5,
                                                  elevation: 10,
                                                  left:'25%',
                                                  top:'50%'
                                                    }}>

                                  <ActivityIndicator  size="large" color='#e5314e' />
                                    <Text style={{fontSize:15,left:10}}>Loading..</Text>
                                  </View>
                                    : null}
                  {/* {this.setState({ViewLeadId:ViewLead.id})} */}
                  <IOS_StatusBar color={gradient} barStyle="light-content"/>
                    <Header titleFirstFloor='Lead' titleGroundFloor='View' onPress={() => Actions.pop()} source={require('../Image/icons8-back-26.png')} style={{width: 20, height: 20, marginLeft: 10,top:0 }}/>
                        <SafeAreaView style={styles.MainContainer}> 
                        
                        <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{marginBottom:'100%'}}> 
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',top:20,}}>
                            <Text style={{color:'#e5314e'}}>{ViewLead.name_of_prospect}</Text> 
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',top:40,borderBottomWidth:1,borderBottomColor:'#c4c4c4'}}>
                                <Text style={{color:'#c4c4c4'}}>Business Type</Text>
                                <Text>{ViewLead.business_type == 1 ? "Government" : "Corporate"}</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',top:50,borderBottomWidth:1,borderBottomColor:'#c4c4c4'}}>
                                <Text style={{color:'#c4c4c4'}}>Source</Text>
                                <Text>{ViewLead.source.source_name}</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',top:60,borderBottomWidth:1,borderBottomColor:'#c4c4c4'}}>
                                <Text style={{color:'#c4c4c4'}}>Industry</Text>
                                <Text>{ViewLead.industry == null ? '--' : ViewLead.industry.industry_name }</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',top:70,borderBottomWidth:1,borderBottomColor:'#c4c4c4'}}>
                                <Text style={{color:'#c4c4c4'}}>Date & Time</Text>
                                <Text>{ViewLead.due_date}</Text>
                            </View>

                                <View style={{borderColor:'#c4c4c4',borderWidth:1,top:110,borderRadius:10,height:"37%"}}>
                                  <View>
                                      
                                      </View>
                                      <View style={{alignItems:'center',paddingLeft:10,paddingRight:10,paddingTop:0,paddingBottom:40}}>
                                          <View style={{backgroundColor:'#e5314e',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'80%',borderRadius:10,bottom:10}}>
                                              <Text style={{color:'white'}}>CONTACT PERSON DETAILS</Text>
                                          </View>
                                          <View style={{top:10,width:'100%'}} >
                                      <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#c4c4c4',height:20}}>
                                      <Image source={require('../Image/grayUser.png')} style={{ width: 10, height: 13, marginLeft: 0,top:4 }} />
                                                <Text style={{left:10}} numberOfLines = {1} >{ViewLead.contact_person_name == null ? '--' : ViewLead.contact_person_name}</Text>
                                                    </View>

                                                    <View style={{flexDirection:'row',top:15,borderBottomWidth:1,borderBottomColor:'#c4c4c4',height:20}}>
                                                    <Image source={require('../Image/grayMail.png')} style={{ width: 14, height: 10.5, marginLeft: 0,top:6 }} />
                                                <Text style={{left:10}} numberOfLines = {1} >{ViewLead.email == null ? '--' : ViewLead.email}</Text>
                                                    </View>

                                                    <View style={{flexDirection:'row',top:25,borderBottomWidth:1,borderBottomColor:'#c4c4c4',height:20}}>
                                                    <Image source={require('../Image/grayPhone.png')} style={{ width: 8, height: 14, marginLeft: 0,top:2 }} />
                                                <Text style={{left:10}} numberOfLines = {1} >{ViewLead.contact_person_no == null ? '--' : ViewLead.contact_person_no}</Text>
                                                    </View>

                                                    <View style={{flexDirection:'row',top:35,borderBottomWidth:0,borderBottomColor:'#c4c4c4',height:40}}>
                                                    <Image source={require('../Image/grayLocation.png')} style={{ width: 10, height: 13, marginLeft: 0,top:3 }} />
                                                <Text style={{left:10}} numberOfLines = {2} >{ViewLead.address_location == null ? '--' : ViewLead.address_location}</Text>
                                                    </View>
                                      </View>
                                      </View>
                                </View>

                                <View style={{top:130}}>
                                    <Text style={{color:'#c4c4c4'}}>Service Requierd</Text>
                                        <Text numberOfLines = {10}>{ViewLead.service_required}</Text>
                                </View>
                                <View style={{top:140}}>
                                    <Text style={{color:'#c4c4c4'}}>Service Description</Text>
                                        <Text numberOfLines = {10}>{ViewLead.service_description}</Text>
                                </View>

                                <View style={{top:150}}>
                                    <TouchableOpacity onPress={() => Actions.LeadComments({Comment:Comment,name:name})}>
                                    <Text style={{color:'#E5314E',textDecorationLine: 'underline',fontSize:11}}>VIEW PREVIOUS COMMENTS</Text>
                                       </TouchableOpacity>
                                </View>
                                  <View style={{top:160,flexDirection:'column',justifyContent:'center',alignItems:'center',borderBottomWidth:3,borderBottomColor:'#e5314e',width:60,left:130}}/>
                                    
                                    <View style={{top:190,height:50,width:'90%'}}/>
                                    
                                  
                                        { ((ViewLead.status == '3' ) || (ViewLead.status == '4')) ?
                                   <View>
                                  <RedBox
                                        placeholder={"Add New Comments"}
                                        onChangeText={commentsLeadView => this.setState({commentsLeadView})}
                                        value={this.state.commentsLeadView}
                                        style={{top:140,height:80,width:'90%'}}
                                    
                                        
                                    />
                                    <View style={{flexDirection:'row',justifyContent:'space-around',top:180}}>
                                    <RedButton
                                         onPress={()=>this.setState({statusLeadView:4})||this.Approve_lead()}
                                        title={'REJECT'}
                                        style={{backgroundColor:'#e5314e', width:140,}}
                                        />
                                        <RedButton
                                         onPress={()=>this.setState({statusLeadView:5})||this.Approve_lead()}
                                        title={'APPROVE'}
                                        style={{backgroundColor:'green', width:140,}}
                                        />
                                        </View>
                                        </View>:null}
                               </View>
                                </ScrollView>
                                
                            </SafeAreaView>
                            <CommonModal 
                              title="Something went wrong"
                              subtitle= {`Error Code: ${errorCode}${apiCode}`}
                              visible={this.state.commonModal}
                              onDecline={this.onDecline.bind(this)}
                              buttonColor={['#0E57CF', '#25A2F9']}
                            />
                                </View>
                                 )}
                                 </KeyboardShift>
    );
}

}
const styles = StyleSheet.create({
    MainContainer:{
        flexDirection:'column',
        
        backgroundColor:'white',
        height:'75%',
        top:'15%',
        paddingLeft:20,
        paddingRight:20,
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10
    },
  container: {
    flex: 0,
    flexDirection:'column',
    left:'0%',
    width:wp('100%'),
    height:hp('90%'),

  },
  scrollView: {
    margin:100,
    
    backgroundColor: 'transparent',
    marginHorizontal: 0,
    marginVertical: 0,
    height:'0%',
    top:'0%',
   

  },
  pagecomponent_nine: {
    
    left:'4%',
    top:'0%',
    padding:10,
    margin:'15%',
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
    width:wp('90%'),
    
    // shadowOffset:{  width: 100,  height: 100,  },
    shadowColor: '#330000',
    shadowOpacity: 0,
    // shadowRadius: 0,
    elevation: 1,

},
pagecomponent_thrd: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
    // borderRadius: 10,
    // borderTopWidth: 1.5,
    // borderBottomWidth:1.5,
    // borderRightWidth:1.5,
    // borderLeftWidth:1.5,
    borderColor: 'transparent',
    width:wp('100%'),
    height:hp('90%'),
     
     
    // shadowOffset:{  width: 100,  height: 100,  },
    // shadowColor: '#330000',
    shadowOpacity: 0,
    // shadowRadius: 0,
    elevation: 0,
    overflow: "hidden"
},
card_view_thrd: {
    top:'0%',
    right:'0%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 0,

    backgroundColor:'#3280e4',
    width:wp('40%'),
    height:hp ('5%'),
    // shadowOffset:{  width: 100,  height: 100,  },
    // shadowColor: '#330000',
    shadowOpacity: 0,
    // shadowRadius: 0,
},
});

export default withNavigation(App);
