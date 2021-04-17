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
import {withNavigation} from 'react-navigation';
import {Actions} from 'react-native-router-flux';
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
import {CommonModal, IOS_StatusBar, getWidthnHeight, getMarginTop, FloatingTitleTextInputField} from '../KulbirComponents/common';

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
        user_id:'',
        is_completed:'',
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
      }if(xhr.status == 200){
        console.log(this.responseText);
        var json_obj = JSON.parse(xhr.responseText);
        var msg = json_obj.success;
        Alert.alert(msg);
        _this.setState({commentsLeadView:''})
        Actions.popTo('List of lead')
        //_this.props.navigation.navigate("List of lead")
        _this.hideLoader();
      }
      if(xhr.status == 403){
        console.log(this.responseText);
        var json_obj = JSON.parse(xhr.responseText);
        var msg = json_obj.error;
        Alert.alert(msg);
        _this.hideLoader();
      }else {
        _this.enableModal(xhr.status, "089");
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

    Viewlead=async()=>{
      const context=this;
      var user_token= await AsyncStorage.getItem('user_token');
      var permissions_fir= JSON.parse(user_token);
      var permissions_four=permissions_fir.success.secret_token;
      var user_id=permissions_fir.success.user.id;
      this.setState({user_id:user_id})
      var hodId = (context.props.hodId);
      var ViewLead = (context.props.view_lead); 
      this.setState({lead_idLeadView:ViewLead.id})
      this.setState({hodId:hodId})
      this.setState({is_completed:ViewLead.is_completed})
    }
  render (){
        const {errorCode, apiCode} = this.state;
        const {screen} = this.props;
        const context=this;
        console.log("USERID & HODID: ", this.props.userId, this.props.hodId, this.props.canApprove, this.props.view_lead.is_completed, this.props.view_lead.status)
        let status = [{value: 'all',}, {value: 'Today Tasks',}, {value: 'Delayed Tasks',},{value: 'Upcoming Tasks', },{value: "This Week's Tasks",},{value: "This Month's Tasks",},];
        console.log("PROPS CHECK FOR LEAD: ", this.props.view_lead.due_date, Actions.currentScene)
        var ViewLead = (context.props.view_lead); 
        var hodId = (context.props.hodId); 
        var userId = (context.props.userId);
        var canApprove = (context.props.canApprove);
        var name = (context.props.view_lead.lead_executives !== null ? context.props.view_lead.lead_executives.fullname : "--");
        var Comment = (context.props.view_lead.comments);
        var employeeFullname = (context.props.employeeFullname !== null ? context.props.employeeFullname : "--");
        let gradient = ['#E5314E', '#E5314E'];
  return (

    <KeyboardShift>
            {()=>(
                <View style={{flex: 1,backgroundColor:'#e6e6e6'}}>
                  <IOS_StatusBar color={gradient} barStyle="light-content"/>
                    <Header titleFirstFloor='Lead' titleGroundFloor='View' onPress={() => Actions.popTo(screen)} source={require('../Image/icons8-back-26.png')} style={{width: 20, height: 20, marginLeft: 10}}/>
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
                <SafeAreaView style={[styles.MainContainer, getMarginTop(8)]}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 20}}>
                        <View style={{marginTop: 10}}> 
                          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
                            <Text style={{color:'#e5314e', textAlign: 'center'}}>{ViewLead.name_of_prospect}</Text> 
                          </View>
                          <View style={[{borderWidth: 0, borderColor: 'red', justifyContent: 'space-evenly'}, getWidthnHeight(90, 25)]}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#c4c4c4'}}>
                                <Text style={{color:'#c4c4c4'}}>Business Type</Text>
                                <Text>{ViewLead.business_type == 1 ? "Government" : "Corporate"}</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#c4c4c4'}}>
                                <Text style={{color:'#c4c4c4'}}>Source</Text>
                                <Text>{ViewLead.source.source_name}</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#c4c4c4'}}>
                                <Text style={{color:'#c4c4c4'}}>Industry</Text>
                                <Text>{ViewLead.industry == null ? '--' : ViewLead.industry.industry_name }</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#c4c4c4'}}>
                                <Text style={{color:'#c4c4c4'}}>Date & Time</Text>
                                <Text>{ViewLead.due_date}</Text>
                            </View>
                          </View>

                          <View style={[{borderColor:'#c4c4c4',borderWidth:1,borderRadius:10,marginTop: 20, alignItems: 'center', justifyContent: 'space-between'}, getWidthnHeight(90, 27)]}>
                              <View style={{backgroundColor:'#e5314e',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'80%',borderRadius:10}}>
                                  <Text style={{color:'white'}}>CONTACT PERSON DETAILS</Text>
                              </View>
                              <View style={[{justifyContent: 'space-evenly', flex: 1}, getWidthnHeight(85)]}>
                                  <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#c4c4c4', alignItems: 'center'}}>
                                      <Image source={require('../Image/grayUser.png')} style={{ width: 10, height: 13, marginLeft: 0}} />
                                      <Text style={{paddingLeft: 20}} numberOfLines = {1} >{ViewLead.contact_person_name == null ? '--' : ViewLead.contact_person_name}</Text>
                                  </View>
                                  <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#c4c4c4', alignItems: 'center'}}>
                                      <Image source={require('../Image/grayMail.png')} style={{ width: 14, height: 10.5, marginLeft: 0}} />
                                      <Text style={{paddingLeft: 20}} numberOfLines = {1} >{ViewLead.email == null ? '--' : ViewLead.email}</Text>
                                  </View>
                                  <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#c4c4c4', alignItems: 'center'}}>
                                      <Image source={require('../Image/grayPhone.png')} style={{ width: 8, height: 14, marginLeft: 0}} />
                                      <Text style={{paddingLeft: 20}} numberOfLines = {1} >{ViewLead.contact_person_no == null ? '--' : ViewLead.contact_person_no}</Text>
                                  </View>
                                  <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#c4c4c4', alignItems: 'center'}}>
                                      <Image source={require('../Image/grayLocation.png')} style={{ width: 10, height: 13, marginLeft: 0}} />
                                      <Text style={{paddingLeft: 20}} numberOfLines = {2} >{ViewLead.address_location == null ? '--' : ViewLead.address_location}</Text>
                                  </View>
                              </View>
                          </View>

                          <View style={{margin: 10}}>
                              <Text style={{color:'#c4c4c4'}}>Service Required</Text>
                              <Text numberOfLines = {10}>{ViewLead.service_required}</Text>
                          </View>
                          <View style={{margin: 10}}>
                              <Text style={{color:'#c4c4c4'}}>Service Description</Text>
                                  <Text numberOfLines = {10}>{ViewLead.service_description}</Text>
                          </View>

                          <TouchableOpacity style={[{borderColor: 'green', borderWidth: 0, marginHorizontal: 10, marginTop: 10}, getWidthnHeight(50)]} onPress={() => {
                            //context.props.navigation.navigate("LeadComments",{Comment:Comment,name:employeeFullname})
                            Actions.LeadComments({Comment:Comment,name:employeeFullname, screen: Actions.currentScene})
                            //console.log("TOUCHED")
                          }}>
                              <Text style={{color:'#E5314E',textDecorationLine: 'underline',fontSize:11}}>VIEW PREVIOUS COMMENTS</Text>
                          </TouchableOpacity>
                          <View style={{alignItems: 'center'}}>
                            <View style={{marginVertical: 10,flexDirection:'column',justifyContent:'center',alignItems:'center',borderBottomWidth:3,borderBottomColor:'#e5314e',width:60}}/> 
                          </View>
                          {((hodId == userId)||(canApprove == true)) && ((ViewLead.is_completed == 1 ) || (ViewLead.status == 3)) ?
                              <View>
                                <FloatingTitleTextInputField
                                    attrName = 'addnewcomments'
                                    title = 'Add New Comments'
                                    value={this.state.commentsLeadView}
                                    titleActiveColor = '#E5214E'
                                    titleInactiveColor = 'dimgrey'
                                    updateMasterState = {(attrName, commentsLeadView) => {
                                      this.setState({commentsLeadView})
                                      console.log("ATTRNAME: ", attrName)
                                    }}
                                    textInputStyles = {[{ // here you can add additional TextInput styles
                                      color: 'black',
                                      fontSize: 14,
                                    }, getWidthnHeight(undefined, 10)]}
                                    containerStyle = {[getWidthnHeight(90, 12)]}
                                />
                                  {/* {<RedBox
                                      placeholder={"Add New Comments"}
                                      onChangeText={commentsLeadView => this.setState({commentsLeadView})}
                                      value={this.state.commentsLeadView}
                                      style={[getWidthnHeight(90, 12)]}
                                  />} */}
                              </View>
                          :null}            
                        </View>
                    </ScrollView>
                    {((hodId == userId)||(canApprove == true)) && ((ViewLead.is_completed == 1 ) || (ViewLead.status == 3)) ?
                        <View style={[{justifyContent:'space-between', alignItems: 'center', borderWidth: 0, borderTopColor: '#e5314e'}, getWidthnHeight(100, 7)]}>
                            <View style={[{height: 1, borderTopWidth: 1, borderTopColor: '#e5314e'}, getWidthnHeight(70)]}/>
                            <View style={[{flexDirection:'row',justifyContent:'space-around', alignItems: 'center'}, getWidthnHeight(100, 6)]}>
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
                        </View>
                    :null}
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
        flex: 1,
        alignItems: 'center',
        backgroundColor:'white',
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
    }
});

export default withNavigation(App);
