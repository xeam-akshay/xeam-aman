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
  TouchableHighlight,
  TouchableNativeFeedback
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {withNavigation} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import RNImagePicker from 'react-native-image-picker';
import { RNCamera } from 'react-native-camera';
import { SegmentedControls } from 'react-native-radio-buttons'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import { Hoshi } from 'react-native-textinput-effects';
import time from '../Image/menu.png'
import LeftSide from '../Image/side.png';
import DocumentPicker from 'react-native-document-picker';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Header from '../Components/New header'
import RedBox from '../Components/redBox'
import DropdownRedBox from '../Components/dropdownRedBox'
import RadioEnableComponent from '../Components/radioEnableComponent'
import RadioDisableComponent from '../Components/radioDisableComponent'
import NewsPaper from '../Components/NewsPaper';
import DateTime from '../Components/dateNtimeRedbox';
import RedButton from '../Components/normalButton';
import {extractBaseURL} from '../api/BaseURL';
import KeyboardShift from '../KeyboardShift';
import ClickPicture from '../Components/ClickPicture'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {CommonModal, IOS_StatusBar, getWidthnHeight, getMarginTop, getMarginVertical, FloatingTitleTextInputField, getMarginBottom} from '../KulbirComponents/common';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
        Prospect_name:'',
        button_value:'',
        leadIndustryOptions_id:'',
        leadSourceOptions_id:'1',
        leadSourceOptions:[],
        leadIndustryOptions:[],
        service_description:'',
        name_of_prospect:null,
        address_location:'',
        business_type:'1',
        contact_person_name:'',
        contact_person_email:'',
        contact_person_mobile_number:'',
        contact_person_alternate_mobile_number:'',
        services_required:'',
        singleFileOBJ: '',
        singleFileOBJAttechment:'',
        dateTime:'',
        radioComponentStatus:'true',
        container:'newsPaper',
        otherSource:'',
        Time:'',
        lead_id:'',
        Newcomments:'',
        show_is_completed:'',
        file:'',
        chooseFileStatus:'true',
        chooseFileView:'true',
        path: null,
        image:'',
        status:'false',
        baseURL: null,
        errorCode: null,
        apiCode: null,
        commonModal: false,
        radioPreBidStatus: false,
        tenure: null,
        volume: null,
        value: null,
        emdAmount: null
    };
  }
  

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };
  renderCamera() {
    return (
      <RNCamera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        // aspect={RNCamera.constants.Aspect.fill}
        // captureTarget={RNCamera.constants.CaptureTarget.disk}
      >
        <TouchableHighlight
          style={styles.capture}
          onPress={this.takePicture.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <View />
        </TouchableHighlight>
      </RNCamera>
    );
  }

  renderImage() {
    return (
      <View>
        <Image
          source={{ uri: this.state.path }}
          style={styles.preview}
        />
        <Text
          style={styles.cancel}
          onPress={() => this.setState({ path: null })}
        >Cancel
        </Text>
      </View>
    );
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

  goverment = () => {
    this.setState({leaveType:"Short"});
    this.setState({button_value:0}); 
    this.setState({business_type:1});

  };
  corporate = () => {
    this.setState({leaveType:"Short"});
    this.setState({button_value:1});
    this.setState({business_type:2});
    
  };

  chooseFile = () => {
    this.setState({chooseFileView:'true'})
     console.log("chooseFile")
  };
  takeAPicture = () => {
    this.setState({chooseFileView:'false'})
    console.log("takeAPicture")
  };

  selectPhotoTapped() {
    const options = {

      quality: 0.5,
      maxWidth: 400,
      maxHeight: 400,
      cameraType:'front',
      storageOptions: {
       waitUntilSaved: true,
       cameraRoll: true,
       skipBackup : true,
      },
    };
    try{
      RNImagePicker.launchCamera(options, (response)  => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri:response.uri,type:response.type,name:response.fileName};
        console.log(source)
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          singleFileOBJ: source,
          file_sec: response.data
        });
      }
    });}
    catch(e) { console.error(e); }
  }

  // imageUrl(){
  //   const context=this;
    
  //   var image = (this.state.status==true?context.props.route.params.image:'');
  //   var name = (this.state.status==true?"capture.jpg":'')
  //   const _this=this;
  //   const file=({uri:image,name:name, type: 'image/jpg'})
  //   _this.setState({singleFileOBJ:file.uri})
  //   _this.setState({status:true})
  // }

LeadEdit(){
  const context=this;
  var ViewLead = (this.props.view_lead);
 
  console.log("LeadEdit",ViewLead)
  const _this=this;
 
  _this.setState({leadSourceOptions_id:(ViewLead.source_id !== 'null' ? ViewLead.source_id : "")})
  _this.setState({service_description:(ViewLead.service_description !== 'null' ? ViewLead.service_description : "")})
  _this.setState({name_of_prospect:(ViewLead.name_of_prospect !== 'null' ? ViewLead.name_of_prospect :"")})
  _this.setState({contact_person_name:(ViewLead.contact_person_name !== 'null' ? ViewLead.contact_person_name : "")})
  _this.setState({contact_person_mobile_number:(ViewLead.contact_person_no !== 'null' ? ViewLead.contact_person_no : "")})
  _this.setState({leadIndustryOptions_id:(ViewLead.industry_id !== 'null' ? ViewLead.industry_id : "")})
  _this.setState({dateTime:(ViewLead.due_date !== 'null' ? ViewLead.due_date : "")})
  _this.setState({address_location:(ViewLead.address_location !== 'null' ? ViewLead.address_location : '')})
  _this.setState({contact_person_email:(ViewLead.email !== 'null' ? ViewLead.email : "")})
  _this.setState({contact_person_alternate_mobile_number:(ViewLead.alternate_contact_no !== 'null' ? ViewLead.alternate_contact_no : "")})
  _this.setState({services_required:(ViewLead.service_required !== 'null' ?ViewLead.service_required : '')})
  _this.setState({business_type:ViewLead.business_type}) 
  _this.setState({lead_id:ViewLead.id})
}

 componentDidMount(){
  const {navigation} = this.props;
  this._unsubscribe = navigation.addListener("didFocus", async() => {
    await this.extractLink();
    this.dropdown_api();
    this.LeadEdit();
    // this.imageUrl();
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

dropdown_api=async()=>{
  const {baseURL} = this.state;
  console.log("naveen")
  const context=this;
  const _this = this;
this.showLoader();
var user_token= await AsyncStorage.getItem('user_token');
var permissions= await AsyncStorage.getItem('permissions');
var permissions_fir= JSON.parse(user_token);
var permissions_four=permissions_fir.success.secret_token;
var user_permission= permissions_fir.success.user.permissions;
// console.log("permission",user_permission)
  var data = new FormData();

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
if(this.readyState !== 4) {
  return;
}if(xhr.status == 200){
  var json_obj = JSON.parse(xhr.responseText);
  
  _this.hideLoader();
      var leadSourceOptions = json_obj.success.leadSourceOptions;
      var leadIndustryOptions = json_obj.success.leadIndustryOptions;
      // console.log("json_obj 200",leadIndustryOptions);
      context.state.leadSourceOptions.push({leadSourceOptions});
      context.state.leadIndustryOptions.push({leadIndustryOptions});
      _this.setState({leadIndustryOptionsId:leadIndustryOptions})
}else{
  var json_obj = JSON.parse(xhr.responseText);
  console.log("json_obj else",json_obj);
  _this.enableModal(xhr.status, "075");
}
});

xhr.open("GET", `${baseURL}/create-lead`);
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
xhr.send(data);
}

  store_lead=async()=>{
    const {baseURL} = this.state;
    const context=this;
    const _this = this;
  this.showLoader();
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
    var data = new FormData();
data.append("sources", this.state.leadSourceOptions_id);
data.append("service_description", this.state.service_description);
data.append("name_of_prospect", this.state.name_of_prospect);
data.append("contact_person_name", this.state.contact_person_name);
data.append("contact_person_mobile", this.state.contact_person_mobile_number);
data.append("industry_id", this.state.leadIndustryOptions_id);
data.append("due_date", this.state.dateTime);
data.append("business_type", this.state.business_type);
data.append("address_location", this.state.address_location);
data.append("contact_person_email", this.state.contact_person_email);
data.append("contact_person_alternate", this.state.contact_person_mobile_number);
data.append("service_required", this.state.services_required);
data.append("lead_id", this.state.lead_id);
data.append("attachment", this.state.singleFileOBJAttechment);
data.append("comments", this.state.Newcomments);
data.append("file_name", this.state.singleFileOBJ);

if(this.state.show_is_completed == true){
  console.log("is_completed",this.state.show_is_completed)
  data.append("is_completed", "1")
}
// (this.state.show_is_completed == true ? data.append("is_completed ", "1") : null)
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if (xhr.readyState !== 4) {
    return;
  }
if (xhr.status === 200) {
  var json_obj = JSON.parse(xhr.responseText);
  var msg = json_obj.success.message
  Actions.popTo('List of lead');
  //_this.props.navigation.navigate("List of lead")
  Alert.alert(msg);
  
_this.hideLoader();
// console.log(this.responseText);

}if(xhr.status == 400){
  console.log(xhr.responseText)
  Alert.alert("Please Fill All Fields")
  _this.hideLoader();
}if(xhr.status == 403){
  console.log(xhr.responseText)
  Alert.alert("The comments field is required.")
  _this.hideLoader();
}else{
  console.log(xhr.responseText)
var error = xhr.responseText
console.log(error)
if(error == '{"validation_error":{"sources":["The sources field is required."],"service_description":["The services description field is required."]}}'){
  alert("1) Sources : The sources field is required\n 2) Service Description : The services description field is required");
}
_this.hideLoader();
_this.enableModal(xhr.status, "076");
}
});

xhr.open("POST", `${baseURL}/update-lead`);
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);

xhr.send(data);
  }

  async SingleFilePicker() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      
      });
       console.log("res",res)
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
  async SingleFilePickerAttechment() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      
      });
      console.log("res",res)
      this.setState({ singleFileOBJAttechment: res });
 
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
myCapture(){
  return(
    <ClickPicture/>
  )
}
  render (){
         const {errorCode, apiCode} = this.state;
         const context=this;
         console.log("VERTICAL MARGIN: ", getMarginVertical(2.5), "TIME: ", this.state.Time)
         let status = [{value: 'all',}, {value: 'Today Tasks',}, {value: 'Delayed Tasks',},{value: 'Upcoming Tasks', },{value: "This Week's Tasks",},{value: "This Month's Tasks",},];
         var ViewLead = (this.props.view_lead);
         var name = (this.props.view_lead.lead_executives !== null ? this.props.view_lead.lead_executives.fullname : "--");
         var Comment = (this.props.view_lead.comments);
         let gradient = ['#E5314E', '#E5314E'];
         return (
            <View style={{flex: 1,backgroundColor:'#e6e6e6'}}>
                <IOS_StatusBar color={gradient} barStyle="light-content"/>
                <Header titleFirstFloor='Lead' titleGroundFloor='Edit' onPress={() => Actions.pop()} source={require('../Image/icons8-back-26.png')} style={{width: 20, height: 20, marginLeft: 10,top:0 }}/>
            
                <View style={[{flexDirection:'row',justifyContent:'center',alignItems:'center', marginBottom: 10}, getMarginTop(6)]}>
                    <Text style={{color:'#e5314e'}}>Note</Text>
                    <Text>: Fields with </Text>
                    <Image source={require('../Image/red_icon/asterisk.png')} style={{ width: 10, height: 14, marginLeft: 0,justifyContent: 'flex-end'}} />
                    <Text> are mandatory</Text>
                </View>
                    
              <View style={styles.MainContainer}> 
                  <ScrollView style={[getMarginTop(2.5)]}>
                      {(this.state.loading) ?
                        <View style={{
                          flex:1,flexDirection:'row',width: '45%', backgroundColor: '#EFEFEF',
                          alignItems: 'center', justifyContent: 'center',
                          position: 'absolute', height:'5%',
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

                      <View style={[getMarginBottom(2.5)]}>
                          {this.state.chooseFileStatus == 'true' ? 
                              <View style={{flexDirection:'row',justifyContent:'space-around'}}> 
                                  <RadioEnableComponent title={"Choose file"} onPress={()=>{this.setState({chooseFileStatus:'false'}) || this.chooseFile()}}/>
                                  <RadioDisableComponent title={"Take a picture"} onPress={()=>{this.setState({chooseFileStatus:'false'}) || this.takeAPicture()}}/>
                              </View>
                          :
                              <View style={{flexDirection:'row',justifyContent:'space-around'}}> 
                                  <RadioDisableComponent title={"Choose file"} onPress={()=>{this.setState({chooseFileStatus:'true'}) || this.chooseFile()}}/>
                                  <RadioEnableComponent title={"Take a picture"} onPress={()=>{this.setState({chooseFileStatus:'true'})|| this.takeAPicture()}}/>
                              </View>
                          }
                      </View>
       
                      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                          {this.state.chooseFileView === 'true' ?
                              <TouchableOpacity
                                  activeOpacity={0.5}
                                  style={styles.button}
                                  onPress={this.SingleFilePicker.bind(this)}
                              >
                                
                                  {this.state.singleFileOBJ ? 
                                      <Text numberOfLines={1} style={{color:'white',width:'100%',height:'100%',textAlign:'center'}}>{this.state.singleFileOBJ.name}</Text>
                                  : 
                                      <View style={{flexDirection:'row'}}>
                                          <Image source={require('../Image/white_icon/upload.png')} style={{ width: 20, height: 20}} />
                                          <Text style={{color:'white'}}>  Choose file</Text>
                                      </View>
                                  }
                              </TouchableOpacity>
                              :
                              <TouchableOpacity
                                  activeOpacity={0.5}
                                  style={styles.button}
                                  onPress={this.selectPhotoTapped.bind(this)}
                              >
                                  {this.state.singleFileOBJ ? 
                                      <Text numberOfLines={1} style={{color:'white',width:'100%',height:'100%',textAlign:'center'}}>{this.state.singleFileOBJ.name}</Text>
                                  : 
                                      <View style={{flexDirection:'row'}}>
                                          <Image source={require('../Image/white_icon/upload.png')} style={{ width: 20, height: 20}} />
                                          <Text style={{color:'white'}}>  Take a picture</Text>
                                      </View>
                                  }
                              </TouchableOpacity> 
                          }
                      </View>
        
                      <View style={[{ borderWidth: 0, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}, getMarginTop(2.5), getWidthnHeight(100)]}>
                          <RedBox
                              placeholder={"Name of Prospect"}
                              onChangeText={name_of_prospect => this.setState({name_of_prospect})}
                              value={this.state.name_of_prospect}
                              style={[{flex: 1, justifyContent: 'center', paddingHorizontal: 10, borderRadius: 10}, getWidthnHeight(90, 7)]}
                          />
                      </View>

                      {/* {<RedBox
                          placeholder={"Name Of Prospect"}
                          onChangeText={name_of_prospect => this.setState({name_of_prospect})}
                          value={this.state.name_of_prospect}
                          style={{top:20,height:50,width:'90%'}}
                      />} */}
                      <View style={[{borderColor: 'red', borderWidth: 0}, getMarginTop(2.5)]}>
                          {this.state.radioComponentStatus === 'true' ? 
                              <View style={{flexDirection:'row',justifyContent:'space-around'}}> 
                                  <RadioEnableComponent title={"Government"} onPress={()=>{this.setState({radioComponentStatus:'true'})|| this.goverment()}}/>
                                  <RadioDisableComponent title={"Corporate"} onPress={()=>{this.setState({radioComponentStatus:'false'})|| this.corporate()}}/>
                              </View>
                          :
                              <View style={{flexDirection:'row',justifyContent:'space-around'}}> 
                                  <RadioDisableComponent title={"Government"} onPress={()=>{this.setState({radioComponentStatus:'true'})}}/>
                                  <RadioEnableComponent title={"Corporate"} onPress={()=>{this.setState({radioComponentStatus:'false'})}}/>
                              </View>
                          }
                      </View>
                      <View style={[{borderWidth: 0, borderColor: 'black',flexDirection:'row',justifyContent:'center',}, getMarginVertical(2), getWidthnHeight(undefined, 9)]}>
                          {this.state.container == 'newsPaper' ? 
                              <NewsPaper 
                                  title={"NEWS PAPER"} 
                                  source={require('../Image/newspaper.png')} 
                                  style={{backgroundColor:'#e5214e',borderColor:'#e5214e',}} 
                                  TextStyle={{color:'white',}} 
                                  circle={{ backgroundColor:'white',borderColor:'#e5214e'}}
                                  onPress={()=>{}} />
                          : 
                              <NewsPaper 
                                  title={"NEWS PAPER"} 
                                  source={require('../Image/blackiconnewspaper.png')} 
                                  style={{backgroundColor:'white',borderColor:'#c4c4c4',}} 
                                  TextStyle={{color:'#c4c4c4',}} 
                                  circle={{ backgroundColor:'#c4c4c4',borderColor:'#c4c4c4',}}
                                  onPress={()=>{this.setState({container:'newsPaper'})}} />
                          }
                              
                          {this.state.container == 'Website' ? 
                              <NewsPaper 
                                  title={"WEBSITE"} 
                                  source={require('../Image/website.png')} 
                                  style={{backgroundColor:'#e5214e',borderColor:'#e5214e',}} 
                                  TextStyle={{color:'white',}} 
                                  circle={{ backgroundColor:'white',borderColor:'#e5214e'}}
                                  onPress={()=>{}} /> 
                          : 
                              <NewsPaper 
                                  title={"WEBSITE"} 
                                  source={require('../Image/blackiconwebsite.png')} 
                                  style={{backgroundColor:'white',borderColor:'#c4c4c4',}} 
                                  TextStyle={{color:'#c4c4c4',}} 
                                  circle={{ backgroundColor:'#c4c4c4',borderColor:'#c4c4c4',}}
                                  onPress={()=>{this.setState({container:'Website'})}} />
                          }

                          {this.state.container == 'Friend' ? 
                              <NewsPaper 
                                  title={"FRIEND"} 
                                  source={require('../Image/friends.png')} 
                                  style={{backgroundColor:'#e5214e',borderColor:'#e5214e',}} 
                                  TextStyle={{color:'white',}} 
                                  circle={{ backgroundColor:'white',borderColor:'#e5214e'}}
                                  onPress={()=>{}} /> 
                          : 
                              <NewsPaper 
                                  title={"FRIEND"} 
                                  source={require('../Image/blackiconfriends.png')} 
                                  style={{backgroundColor:'white',borderColor:'#c4c4c4',}} 
                                  TextStyle={{color:'#c4c4c4',}} 
                                  circle={{ backgroundColor:'#c4c4c4',borderColor:'#c4c4c4',}}
                                  onPress={()=>{this.setState({container:'Friend'})}} />
                          }

                          {this.state.container == 'Other' ? 
                              <NewsPaper 
                                  title={"OTHERS"} 
                                  source={require('../Image/others.png')} 
                                  style={{backgroundColor:'#e5214e',borderColor:'#e5214e',}} 
                                  TextStyle={{color:'white',}} 
                                  circle={{ backgroundColor:'white',borderColor:'#e5214e'}}
                                  onPress={()=>{}} /> 
                          : 
                              <NewsPaper 
                                  title={"OTHERS"} 
                                  source={require('../Image/blackiconothers.png')} 
                                  style={{backgroundColor:'white',borderColor:'#c4c4c4',}} 
                                  TextStyle={{color:'#c4c4c4',}} 
                                  circle={{ backgroundColor:'#c4c4c4',borderColor:'#c4c4c4',}}
                                  onPress={()=>{this.setState({container:'Other'})}} />
                          }
                      </View>

                      <View style={[{ borderWidth: 0, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}, getMarginBottom(2.5), getWidthnHeight(100)]}>
                          <RedBox
                              placeholder={"Other Source"}
                              onChangeText={otherSource => this.setState({otherSource})}
                              value={this.state.otherSource}
                              style={[{flex: 1, justifyContent: 'center', paddingHorizontal: 10, borderRadius: 10}, getWidthnHeight(90, 7)]}
                          />
                      </View>

                      <View style={[styles.box, getMarginBottom(2.5), getWidthnHeight(100, 7)]}>
                          <Dropdown
                              containerStyle={[{justifyContent: 'center', borderColor: 'grey', borderWidth: 1, paddingLeft: 10, borderRadius: 10}, getWidthnHeight(90, 7)]}
                              //  maxLength = {12}
                              inputContainerStyle={{borderBottomColor:"rgb(19,111,232)",fontSize:hp(2) }}
                              label={'Select Industry'}
                              data={this.state.leadIndustryOptionsId}
                              valueExtractor={({id})=> id}
                              labelExtractor={({industry_name})=> industry_name}
                              onChangeText={leadIndustryOptions_id => this.setState({ leadIndustryOptions_id })}
                              value={this.state.leadIndustryOptions_id}
                              baseColor = '#E5314E'
                          />
                      </View>

                      <View style={[{alignItems:'center'}, getWidthnHeight(100), getMarginBottom(2.5)]}> 
                          <View style={[{justifyContent: 'space-evenly', flexDirection: 'row', borderColor: 'black', borderWidth: 0}, getWidthnHeight(100)]}>  
                              <RedBox
                                  placeholder={"Contact Name"}
                                  onChangeText={contact_person_name => this.setState({contact_person_name})}
                                  value={this.state.contact_person_name}
                                  style={[getWidthnHeight(43, 7)]}
                                  contentStyle={{paddingLeft: 10}}
                              />
                              <RedBox
                                  placeholder={"Contact Number"}
                                  onChangeText={contact_person_mobile_number => this.setState({contact_person_mobile_number})}
                                  value={this.state.contact_person_mobile_number}
                                  style={[getWidthnHeight(43, 7)]}
                                  contentStyle={{paddingLeft: 10}}
                              />
                          </View>
                      </View>
          
                      <View style={[{alignItems: 'center'}, getWidthnHeight(100), getMarginBottom(2.5)]}>
                          <RedBox
                              placeholder={"Email Address"}
                              onChangeText={contact_person_email => this.setState({contact_person_email})}
                              value={this.state.contact_person_email}
                              style={[{flex: 1, justifyContent: 'center', paddingHorizontal: 10, borderRadius: 10}, getWidthnHeight(90, 7)]}
                          />
                      </View>

                      <View style={[{alignItems: 'center'}, getWidthnHeight(100), getMarginBottom(2.5)]}>
                          <RedBox
                              placeholder={"Address Location"}
                              onChangeText={address_location => this.setState({address_location})}
                              value={this.state.address_location}
                              style={[{flex: 1, justifyContent: 'center', paddingHorizontal: 10, borderRadius: 10}, getWidthnHeight(90, 7)]}
                          />
                      </View>
                      
                      <View style={[{alignItems:'center', borderColor: 'black', borderWidth: 0}, getWidthnHeight(100,7), getMarginBottom(2.5)]}> 
                          <View style={[{justifyContent: 'space-between', flexDirection: 'row',borderColor: 'red', borderWidth: 0}, getWidthnHeight(90, 7)]}>
                              <DateTime
                                  date={this.state.dateTime}
                                  format="DD/MM/YYYY"
                                  mode="date"
                                  dateIcon={{
                                    position: 'relative',
                                    left: 0,
                                    top: 0,
                                    marginLeft: 0,
                                  }}
                                  style={[{alignItems: 'center', justifyContent: 'center'},getWidthnHeight(43,7)]}
                                  onDateChange={(date) => {this.setState({dateTime: date})}}
                              />
                              <DateTime
                                  date={this.state.Time}
                                  format="hh:mm A"
                                  mode="time"
                                  style={[{alignItems: 'center', justifyContent: 'center'},getWidthnHeight(43,7)]}
                                  onDateChange={(date) => {this.setState({Time: date})}}
                              />
                          </View>
                      </View>

                      <View style={[{alignItems: 'center'}, getWidthnHeight(100), getMarginBottom(2.5)]}>
                          <RedBox
                              placeholder={"Services Required"}
                              onChangeText={services_required => this.setState({services_required})}
                              value={this.state.services_required}
                              style={[{flex: 1, justifyContent: 'center', paddingHorizontal: 10, borderRadius: 10}, getWidthnHeight(90, 7)]}
                          />
                      </View>

                      <View style={[{alignItems: 'center'}, getWidthnHeight(100), getMarginBottom(2.5)]}>
                        <View style={[{alignItems: 'center', justifyContent: 'space-evenly',borderWidth: 1, borderColor: 'grey', borderRadius: 10}, getWidthnHeight(90, 10)]}>
                          <View style={[{alignItems: 'center'}, getWidthnHeight(90)]}>
                            <Text style={[{color: '#E5314E', fontSize: 16, textAlign: 'center'}, getWidthnHeight(40)]}>Pre Bid:</Text>
                          </View>
                          <View style={[getWidthnHeight(90)]}>
                            {this.state.radioPreBidStatus === true ? 
                                <View style={{flexDirection:'row',justifyContent:'space-around',borderColor: 'black', borderWidth: 0}}> 
                                    <RadioEnableComponent title={"Yes"} onPress={()=>{this.setState({radioPreBidStatus:true})}}/>
                                    <RadioDisableComponent title={"No"} onPress={()=>{this.setState({radioPreBidStatus:false})}}/>
                                </View>
                            :
                                <View style={{flexDirection:'row',justifyContent:'space-around',borderColor: 'black', borderWidth: 0}}> 
                                    <RadioDisableComponent title={"Yes"} onPress={()=>{this.setState({radioPreBidStatus:true})}}/>
                                    <RadioEnableComponent title={"No"} onPress={()=>{this.setState({radioPreBidStatus:false})}}/>
                                </View>
                            }
                          </View>
                        </View>
                      </View> 

                      <View style={[{alignItems:'center'}, getWidthnHeight(100), getMarginBottom(2.5)]}> 
                          <View style={[{justifyContent: 'space-evenly', flexDirection: 'row', borderColor: 'black', borderWidth: 0}, getWidthnHeight(100)]}>  
                              <RedBox
                                  placeholder={"Tenure in Months"}
                                  onChangeText={(number) => {
                                    const tenure = number.replace(/[^0-9]/g, '')
                                    this.setState({tenure})
                                  }}
                                  value={this.state.tenure}
                                  style={[getWidthnHeight(43, 7)]}
                                  contentStyle={{paddingLeft: 10}}
                              />
                              <RedBox
                                  placeholder={"Volume"}
                                  onChangeText={(number) => {
                                    const volume = number.replace(/[^0-9]/g, '')
                                    this.setState({volume})
                                  }}
                                  value={this.state.volume}
                                  style={[getWidthnHeight(43, 7)]}
                                  contentStyle={{paddingLeft: 10}}
                              />
                          </View>
                      </View>

                      <View style={[{alignItems:'center'}, getWidthnHeight(100), getMarginBottom(2.5)]}> 
                          <View style={[{justifyContent: 'space-evenly', flexDirection: 'row', borderColor: 'black', borderWidth: 0}, getWidthnHeight(100)]}>  
                              <RedBox
                                  placeholder={`Value (${"\u20B9"})`}
                                  onChangeText={(number) => {
                                    const value = number.replace(/[^0-9]/g, '')
                                    this.setState({value})
                                  }}
                                  value={this.state.value}
                                  style={[getWidthnHeight(43, 7)]}
                                  contentStyle={{paddingLeft: 10}}
                              />
                              <RedBox
                                  placeholder={"EMD AMount"}
                                  onChangeText={(number) => {
                                    const emdAmount = number.replace(/[^0-9]/g, '')
                                    this.setState({emdAmount})
                                  }}
                                  value={this.state.emdAmount}
                                  style={[getWidthnHeight(43, 7)]}
                                  contentStyle={{paddingLeft: 10}}
                              />
                          </View>
                      </View>

                      <View style={[{flexDirection: 'row'}, getWidthnHeight(100)]}>
                          <View style={[{alignItems: 'flex-end'},getWidthnHeight(5)]}>
                              <Image source={require('../Image/red_icon/asterisk.png')} style={styles.image} />
                          </View>
                          <View style={[getWidthnHeight(90)]}>
                              <RedBox
                                  placeholder={"Services Description"}
                                  onChangeText={service_description => this.setState({service_description})}
                                  value={this.state.service_description}
                                  style={[{flex: 1, justifyContent: 'center', paddingHorizontal: 10, borderRadius: 10}, getWidthnHeight(90, 7)]}
                                  image={{ width: 10,
                                    height: 14, }}
                              />
                          </View>
                      </View>

                      <View style={[{alignItems: 'center'}, getWidthnHeight(100), getMarginVertical(2.5)]}>
                          <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',borderBottomWidth:3,borderBottomColor:'#E5314E',width:60}}/>
                      </View>

                      <View style={[{alignItems: 'center'}, getWidthnHeight(100), getMarginBottom(2.5)]}>
                          <TouchableOpacity onPress={() =>Actions.LeadComments({Comment:Comment,name:name, screen: Actions.currentScene})}>
                              <Text style={{color:'#E5314E',textDecorationLine: 'underline',fontSize:11}}>VIEW PREVIOUS COMMENTS</Text>
                          </TouchableOpacity>
                      </View>
    
                      <View style={[{alignItems: 'center', justifyContent: 'flex-start'}, getWidthnHeight(100), getMarginBottom(2.5)]}>
                          <RedBox
                              placeholder={"Add New Comments"}
                              onChangeText={Newcomments => this.setState({Newcomments})}
                              value={this.state.Newcomments}
                              style={[{flex: 1, justifyContent: 'center',paddingHorizontal: 10, borderRadius: 10}, getWidthnHeight(90, 7)]}
                              image={{ width: 10, height: 14, }}
                              inputStyle={{borderWidth: 0, borderColor: 'red', fontSize: 14, textAlignVertical: 'top'}}
                          />
                      </View>

                      <View style={[getMarginBottom(2.5)]}>
                          <TouchableOpacity
                              activeOpacity={0.5}
                              style={styles.LastButton}
                              onPress={this.SingleFilePickerAttechment.bind(this)}
                          >
                              {this.state.singleFileOBJAttechment.name ? 
                                  <Text numberOfLines={1} style={{color:'white',width:'100%',height:'100%',textAlign:'center'}}>{this.state.singleFileOBJAttechment.name}</Text>
                              : 
                                  <View style={{flexDirection:'row'}}>
                                      <Image source={require('../Image/white_icon/upload.png')} style={{ width: 20, height: 20, marginLeft: 0,bottom:0 }} />
                                      <Text style={{color:'white'}}>  Attachment</Text>
                                  </View>
                              }
                          </TouchableOpacity>
                      </View>
                    <View/>
                  </ScrollView>
                  <View style={{alignItems: 'center'}}>
                    <View style={[{borderWidth: 1, borderColor: '#E5314E', justifyContent: 'space-between'}, getWidthnHeight(80)]}/>
                      <View style={[{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}, getWidthnHeight(100, 7)]}>
                          <RedButton
                              onPress={()=>{this.setState({show_is_completed: false})||this.store_lead()}}
                              title={'SAVE AS DRAFT'}
                              style={[{backgroundColor:'#e5314e'}, getWidthnHeight(43, 6)]}
                          />
                          <RedButton
                              onPress={()=>{this.setState({show_is_completed: true})||this.store_lead()}}
                              title={'COMPLETED'}
                              style={[{backgroundColor:'#e5314e'}, getWidthnHeight(43, 6)]}
                          />
                      </View>
                  </View>
              </View>
          <CommonModal 
              title="Something went wrong"
              subtitle= {`Error Code: ${errorCode}${apiCode}`}
              visible={this.state.commonModal}
              onDecline={this.onDecline.bind(this)}
              buttonColor={['#0E57CF', '#25A2F9']}
          />
      </View>
    // )}
    // </KeyboardShift>
    
    );
}

}
const styles = StyleSheet.create({
  MainContainer:{
    flex: 1,
    alignItems: 'center',
    backgroundColor:'white',
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 50,
        },
        zIndex: 10
      },
      android: {
        elevation: 15,
      }
    }),
    shadowOpacity: 0.3,
    shadowRadius: 40,
    borderColor: 'blue',
    borderWidth: 0
  },
  button: {
    width:'88%',
    flexDirection:'row',
    justifyContent:'center',
    marginLeft:0,
    marginRight:0,
    marginBottom: 0,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:0,
    paddingRight:0,
    backgroundColor:'#e5314e',
    borderRadius:1,
    borderWidth: 0,
    // borderColor: 'rgb(19,111,232)',
    elevation: 0,
  },
  container: {
    flex: 0,
    flexDirection:'column',
    width:wp('100%'),
    height:hp('90%'),

  },
  image:{
    backgroundColor:'white',
    width: 10,
    height: 14,
  },
  LastButton:{
    width:'90%',
    flexDirection:'row',
    justifyContent:'center',
    marginLeft:15,
    marginRight:5,
    marginBottom: 0,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:0,
    paddingRight:0,
    backgroundColor:'#e5314e',
    borderRadius:1,
    borderWidth: 0,
    // borderColor: 'rgb(19,111,232)',
    elevation: 0,
  },
  box:{
    borderWidth: 0,
    borderColor:'#c4c4c4',
    borderRadius:10,
    left:0,
    height:50,
    width:'90%',
    justifyContent: 'center',
    alignItems: 'center'
 },
  PictureButton: {
    width:'88%',
    flexDirection:'row',
    justifyContent:'center',
    marginLeft:0,
    marginRight:0,
    marginBottom: 0,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:0,
    paddingRight:0,
    backgroundColor:'#e5314e',
    borderRadius:1,
    borderWidth: 0,
    // borderColor: 'rgb(19,111,232)',
    elevation: 0,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  cancel: {
    position: 'absolute',
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  }
});

export default withNavigation(App);
