import React, { Component } from 'react';
import {
  AsyncStorage, StyleSheet, Text,
  TouchableOpacity, View, Image,
  Dimensions, ActivityIndicator,
  ScrollView, Keyboard,
} from 'react-native';
import ActionModal from 'react-native-modal';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {withNavigation} from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import { Dropdown } from 'react-native-material-dropdown';
import DocumentPicker from 'react-native-document-picker';
import NewsPaper from '../Components/NewsPaper';
import {extractBaseURL} from '../api/BaseURL';
import KeyboardShift from '../KeyboardShift';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  CommonModal, IOS_StatusBar, getMarginTop, getMarginBottom, getWidthnHeight, 
  FloatingTitleTextInputField, getMarginVertical, DateSelector, WaveHeader, 
  TimePicker, RoundButton, RadioEnable, RadioDisable, AlertBox
} from '../KulbirComponents/common';
import {cameraFile, show_HideTimePicker, prebidTime} from '../actions';
import moment from 'moment';

//const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const colorBase = '#25A2F9';
const colorTitle = '#0B8EE8';

class App extends Component {
  constructor() {
    super();
    this.myTextInput = React.createRef();
    this.state = {
        loading: false,
        Prospect_name:'',
        button_value: null,
        leadIndustryOptions_id:'',
        other_industry: '',
        leadSourceOptions_id: 1,
        leadSourceOptions:[],
        leadIndustryOptions:[],
        service_description:'',
        name_of_prospect:'',
        address_location:'',
        business_type: 1,
        contact_person_name:'',
        contact_person_email:'',
        contact_person_mobile_number:'',
        contact_person_alternate_mobile_number:'',
        services_required:'',
        singleFileOBJ:'',
        dateTime:'',
        radioComponentStatus:true,
        container:'newsPaper',
        otherSource:'',
        Time:'',
        leadIndustryOptionsId:[],
        StartingDateTimeValue: null,
        ToDateValue: null,
        ToTimeValue: null,
        isStartingDateTimePickerVisible: false,
        isToDatePickerVisible: false,
        isToTimePickerVisible: false,
        dateOrTimeValue: null,
        datePickerVisible: false, 
        timePickerVisible: false,
        LeadTime:'',
        file:'',
        chooseFileStatus:true,
        chooseFileView:true,
        path: null,
        image:'',
        status:'false',
        baseURL: null,
        errorCode: null,
        apiCode: null,
        commonModal: false,
        dimensions: undefined,
        data: null,
        slideAnimationDialog: false,
        radioPreBidStatus: false,
        tenure: '',
        volume: '',
        value: '',
        emdAmount: '',
        timePicker: false,
        prebidDate: '',
        prebidTimeValue: null,
        preBidTimeState: false,
        dateNTime: '',
        preBidDatenTime: '',
        dueTimeError: true,
        prebidDateError: true,
        prebidTimeError: true,
        serviceDescriptionError: true,
        otherError: true,
        prebidNumber: 0,
        noErrorSource: function(){
          return (this.serviceDescriptionError === false && this.container !== 'Other')
        },
        noOtherError: function(){
          return (this.serviceDescriptionError === false && this.otherError === false)
        },
        savePressed: false,
        otherIndustryError: true,
        email: true,
        enableAlert: false,
        alertTitle: null,
        alertColor: false
    };
  }
  
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
    ImagePicker.launchCamera(options, (response)  => {
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
    });
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
    this.setState({button_value:0}); 
    this.setState({business_type:1});

  };
  corporate = () => {
    this.setState({button_value:1});
    this.setState({business_type:2});
    
  };


 componentDidMount(){
  const {navigation} = this.props;
  this.props.show_HideTimePicker({'fromTime': null, 'toTime': null});
  this.props.prebidTime({'fromTime': null, 'toTime': null});
  this._unsubscribe = navigation.addListener("didFocus", async() => {
    await this.extractLink();
    this.dropdown_api();
    if(this.props.file.file){
      const filePath = this.props.file.file.uri
      const splitArray = filePath.split('Camera/')
      const fileData = {type: 'image/jpeg', name: splitArray[1], uri: filePath}
      
      console.log("OBJECT ASSIGN: ", Object.assign({}, fileData))
      this.setState({data: filePath}, () => {
        if(this.state.data){
          this.props.cameraFile(null)
        }
        console.log("FILE: ", this.state.data)
      })
      this.setState({singleFileOBJ: fileData}, () => console.log("FILE DATA: ", this.state.singleFileOBJ))
    }
    // if(this.state.chooseFileStatus=='false'){
    // this.imageUrl();
    // }
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

imageUrl(){
  const context=this;
  var image = (this.state.status==true?context.props.route.params.image:'blank.jpg');
  console.log("image",image)
  var name = (this.state.status==true?"capture.jpg":'')
  const _this=this;
  const file={uri:image,name:name, type: 'image/jpg'}
  _this.setState({singleFileOBJ:file}, () => console.log("### SingleFileOBJ: ", this.state.singleFileOBJ))
  _this.setState({status:true})
}

dropdown_api=async()=>{
    const {baseURL} = this.state;
    console.log("*****naveen", baseURL)
    const context=this;
    const _this = this;
    this.showLoader();
    var user_token= await AsyncStorage.getItem('user_token');
    //var permissions= await AsyncStorage.getItem('permissions');
    var permissions_fir= JSON.parse(user_token);
    var permissions_four=permissions_fir.success.secret_token;
    //var user_permission= permissions_fir.success.user.permissions;
    // console.log("permission",user_permission)
    var data = new FormData();

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(xhr.readyState !== 4) {
    return;
  }if(xhr.status === 200){
    var json_obj = JSON.parse(xhr.responseText);
    
    _this.hideLoader();
        var leadSourceOptions = json_obj.success.leadSourceOptions;
        var leadIndustryOptions = json_obj.success.leadIndustryOptions;
        // console.log("json_obj 200",leadIndustryOptions);
        context.state.leadSourceOptions.push({leadSourceOptions});
        context.state.leadIndustryOptions.push({leadIndustryOptions});
        _this.setState({leadIndustryOptionsId:leadIndustryOptions})
  }
  else{
    _this.hideLoader();
    _this.enableModal(xhr.status, "073");
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
data.append("other_sources", this.state.otherSource);
data.append("service_description", this.state.service_description);
data.append("name_of_prospect", this.state.name_of_prospect);
data.append("contact_person_name", this.state.contact_person_name);
data.append("contact_person_mobile", this.state.contact_person_mobile_number);
data.append("industry_id", this.state.leadIndustryOptions_id);
data.append("other_industry", this.state.other_industry);
data.append("due_date", this.state.dateNTime);
data.append("prebid", this.state.prebidNumber);
data.append("prebid_date", this.state.preBidDatenTime);
data.append("tenure", this.state.tenure);
data.append("volume", this.state.volume);
data.append("value", this.state.value);
data.append("emd_amount", this.state.emdAmount);
data.append("business_type", this.state.business_type);
data.append("address_location", this.state.address_location);
data.append("contact_person_email", this.state.contact_person_email);
data.append("contact_person_alternate", this.state.contact_person_alternate_mobile_number);
data.append("service_required", this.state.services_required); 
data.append("file_name", this.state.singleFileOBJ); 

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if (xhr.readyState !== 4) {
    return;
  }
if (xhr.status === 200) {
  var json_obj = JSON.parse(xhr.responseText);
  var msg = json_obj.success.message;
  _this.setState({enableAlert: true, alertTitle: msg, alertColor: false})
  //Alert.alert(msg);
_this.hideLoader();
console.log("DUE DATE: ", _this.state.dateNTime);
_this.setState({service_description:'', prebidNumber: 0, tenure: ''})
_this.setState({name_of_prospect:'', prebidDateError: true, volume: ''})
_this.setState({contact_person_name:'', radioPreBidStatus: false, value: ''})
_this.setState({contact_person_mobile_number:'', container: 'newsPaper'})
_this.setState({leadIndustryOptions_id:'', leadSourceOptions_id: 1})
_this.setState({dateTime:'', dateOrTimeValue: null, dateNTime: ''})
_this.setState({prebidDate:'', prebidTimeValue: null, preBidDatenTime: null})
_this.setState({address_location:'', data: null, dueTimeError: true, email: true})
_this.setState({contact_person_email:'', otherSource: '', prebidTimeError: true})
_this.setState({contact_person_alternate_mobile_number:'', emdAmount: ''})
_this.setState({services_required:'', otherError: true, savePressed: false})
_this.setState({singleFileOBJ:'', serviceDescriptionError: true, other_industry: ''})
}if(xhr.status == 400){
  var error = JSON.parse(xhr.responseText);
  console.log("API ERROR", error)
  _this.setState({enableAlert: true, alertTitle: error.message, alertColor: false})
  //Alert.alert(error.message)
  _this.hideLoader();
}
else{
  console.log(xhr.responseText)
  var error = xhr.responseText
  console.log(error)
  if(error == '{"validation_error":{"sources":["The sources field is required."],"service_description":["The services description field is required."]}}'){
    alert("1) Sources : The sources field is required\n 2) Service Description : The services description field is required");
  }
  _this.myTextInput.current.value='';
  _this.hideLoader();
  _this.enableModal(xhr.status, "074");
}
});

xhr.open("POST", `${baseURL}/store-lead`);
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
xhr.setRequestHeader("Accept", "application/json");
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
        this.setState({singleFileOBJ: ''})
        this.setState({enableAlert: true, alertTitle: 'Cancelled', alertColor: false})
        //Alert.alert('Cancelled');
      } else {
        this.setState({enableAlert: true, alertTitle: 'Unknown Error: ' + JSON.stringify(err), alertColor: false})
        //Alert.alert('Unknown Error: ' + JSON.stringify(err));
        console.log(JSON.stringify(err))
        throw err;
      }
    }
  }

  saveStartingDateTime = (value) => { 
    console.log("saveStartingDateTime - value:", value); 
    this.setState({
        StartingDateTimeValue: value,
    });
}; 

saveEndingDate = (value) => { 
    console.log("saveEndingDate - value:", value);
    this.setState({
        ToDateValue: value,
    });
}; 

saveEndingTime = (value) => {
    console.log("saveEndingTime - value:", value);
    this.setState({
        ToTimeValue: value,
    });
};

setTimings(){
    const {fromTime} = this.props;
    const {dateOrTimeValue, dateTime, dueTimeError} = this.state;
    this.setState({dateOrTimeValue: fromTime, dueTimeError: false}, () => this.props.show_HideTimePicker({'fromTime': null, 'toTime': null}))
    this.setState({dateNTime: dateTime + " " + moment(dateOrTimeValue, ["h:mm A"]).format("HH:mm:ss")}, () => console.log("DATE N TIME: ", this.state.dateNTime))
}

setPreBidTimings(){
    const {setPreBid} = this.props;
    const {prebidTimeValue, prebidDate, prebidTimeError} = this.state;
    this.setState({prebidTimeValue: setPreBid, prebidTimeError: false}, () => this.props.prebidTime({'fromTime': null, 'toTime': null}))
    this.setState({preBidDatenTime: prebidDate + " " + moment(prebidTimeValue, ["h:mm A"]).format("HH:mm:ss")}, () => console.log("PREBID DATE N TIME: ", this.state.preBidDatenTime))
}

store_lead_button(){
  // this.apply_leave();
  const {container, leadIndustryOptions_id, otherIndustryError, dateTime, dateOrTimeValue, prebidDate, prebidTimeValue, radioPreBidStatus, contact_person_email, email} = this.state;
  this.setState({savePressed: true})
  const noErrorSource = this.state.noErrorSource();
  const noOtherError = this.state.noOtherError();
  const message = "Please fill the fields highlighted in RED";
  if(leadIndustryOptions_id === 33 && otherIndustryError){
    this.setState({enableAlert: true, alertTitle: message, alertColor: true})
    //Alert.alert("Please fill the fields highlighted in RED")
  }else if(contact_person_email !== '' && !email){
    this.setState({enableAlert: true, alertTitle: "Invalid Email Address", alertColor: false})
    //Alert.alert("Invalid Email Address")
  }else if(dateTime !== '' && !dateOrTimeValue){
    this.setState({enableAlert: true, alertTitle: message, alertColor: true})
    //Alert.alert("Please fill the fields highlighted in RED")
  }else if(radioPreBidStatus && prebidDate === ''){
    this.setState({enableAlert: true, alertTitle: message, alertColor: true})
    //Alert.alert("Please fill the fields highlighted in RED")
  }else if(prebidDate !== '' && !prebidTimeValue){
    this.setState({enableAlert: true, alertTitle: message, alertColor: true})
    //Alert.alert("Please fill the fields highlighted in RED")
  }else{
    if(noErrorSource && container !== 'Other'){
      this.store_lead();
      this.dropDownValueChange();
    }else if(noOtherError){
      this.store_lead();
      this.dropDownValueChange();
    }
    else {
      this.setState({enableAlert: true, alertTitle: message, alertColor: true})
      //Alert.alert("Please fill the fields highlighted in RED")
    }
  }
  Keyboard.dismiss();
}

dropDownValueChange(value){
  console.log("value",value)
 
  // this.setState({name_of_prospect:""})
  this.setState({leadIndustryOptions_id:''})
}

chooseFile = () => {
  this.setState({chooseFileView:true})
   console.log("chooseFile")
};
takeAPicture = () => {
  this.setState({chooseFileView:false})
  console.log("takeAPicture")
};
onLayout = (event) => {
  if(this.state.dimensions){
      return;
    }
    let width = Math.round(event.nativeEvent.layout.width)
    let height = Math.round(event.nativeEvent.layout.height)
    this.setState({dimensions: {width, height}}, () => console.log("BUBBLE DIMENSIONS: ", this.state.dimensions))
}

  render (){
        const {errorCode, apiCode, dimensions, slideAnimationDialog, prebidDate, dateTime, dateOrTimeValue, savePressed, 
        serviceDescriptionError, otherError, otherIndustryError, dueTimeError, prebidTimeError, prebidDateError, email,
        leadIndustryOptions_id, contact_person_email
        } = this.state;
        let gradient = ['#E5314E', '#E5314E'];
        console.log("STRING CHECK: ", Boolean(''), Boolean('Kulbir'))
        let scrollHeight = null;
        if(this.state.dimensions){
            let screen = getWidthnHeight(undefined, 100)
            let buttonHeight = getWidthnHeight(undefined, 5)
            scrollHeight = {height: screen.height - dimensions.height - buttonHeight.height - 50}
        }
        const circleWidth = getWidthnHeight(60);
        const circleHeight = {height: circleWidth.width}
      return (  
          <KeyboardShift>
            {()=>(
            <View style={{flex: 1,backgroundColor:'#EEEDED'}}>
                <IOS_StatusBar color={gradient} barStyle="light-content"/>
                <WaveHeader
                    wave={Platform.OS ==="ios" ? false : false} 
                    //logo={require('../Image/Logo-164.png')}
                    menu='white'
                    title='Create New Lead'
                />

            <ActionModal 
              isVisible={slideAnimationDialog}
              style={{justifyContent: 'center', alignItems: 'center'}}
              onBackdropPress={() => this.setState({slideAnimationDialog: false})}
            >
              <View style={[{alignItems: 'center', backgroundColor: 'white', borderRadius: 10, justifyContent: 'center'}, getWidthnHeight(80, 60)]}>
                <Image source={{uri: `${this.state.data}`}} style={[{alignItems: 'center', justifyContent: 'center'}, getWidthnHeight(70, 50)]}/>
              </View>
            </ActionModal>
                    
              <View style={[styles.MainContainer, getMarginTop(0)]} onLayout={this.onLayout}> 
                
              <ScrollView persistentScrollbar={true} style={[{borderColor: 'green', borderWidth: 0}, getMarginTop(2), getWidthnHeight(100)]}>
              {(this.state.loading) ?
                  <View style={{
                      flex:1,flexDirection:'row',width: '45%',backgroundColor: '#EFEFEF',
                      alignItems: 'center', justifyContent: 'center',
                      position: 'absolute', height:'8%',
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
       
              {this.state.chooseFileStatus === true ? 
                <View style={[{flexDirection:'row',justifyContent:'space-around',top:0,paddingBottom:20}, getMarginTop(0)]}>
                    <RadioEnable title="Choose File" onPress={()=>{this.setState({chooseFileStatus:true, data: null, singleFileOBJ: ''}) || this.chooseFile()}}/> 
                    <RadioDisable title="Take a Picture" onPress={()=>{this.setState({chooseFileStatus:false, singleFileOBJ: ''}) || this.takeAPicture()}}/>
                </View>
              :
                <View style={[{flexDirection:'row',justifyContent:'space-around',top:0,paddingBottom:20}, getMarginTop(0)]}>
                    <RadioDisable title="Choose File" onPress={()=>{this.setState({chooseFileStatus:true, data: null, singleFileOBJ: ''}) || this.chooseFile()}}/>
                    <RadioEnable title="Take a Picture" onPress={()=>{this.setState({chooseFileStatus:false, singleFileOBJ: ''})|| this.takeAPicture()}}/>
                </View>
                }
       
              <View style={{justifyContent:'center',alignItems:'center',left:0}}>
              {(this.state.data)? 
                <TouchableOpacity onPress={() => this.setState({slideAnimationDialog: true})} style={{marginBottom: 15}}>
                  <Text style={{color: '#E5214E'}}>Click to View Image</Text>
                </TouchableOpacity>
              :
              null
              }  
              {this.state.chooseFileView === true ?
                  <TouchableOpacity activeOpacity={0.5} style={[styles.button, getWidthnHeight(80)]} onPress={this.SingleFilePicker.bind(this)}>
                  {this.state.singleFileOBJ.name ? 
                      <Text numberOfLines={1} style={{color:'white',width:'100%',height:'100%',textAlign:'center'}}>{this.state.singleFileOBJ.name}</Text>
                  : 
                      <View style={{flexDirection:'row'}}>
                          <Image source={require('../Image/white_icon/upload.png')} style={{ width: 20, height: 20, marginLeft: 0,bottom:0 }} />
                          <Text style={{color:'white'}}>  Choose file</Text>
                      </View>
                  }
                  </TouchableOpacity>
              :
                  <TouchableOpacity activeOpacity={0.5} style={[styles.button, getWidthnHeight(80)]} onPress={() => Actions.camera({imageQuality: 0.50, width: 500, height: 600})}>
                    {this.state.singleFileOBJ.name ? 
                      <Text numberOfLines={1} style={{color:'white',width:'100%',height:'100%',textAlign:'center'}}>{this.state.singleFileOBJ.name}</Text>
                    :
                    <View style={{flexDirection:'row'}}>
                        <Image source={require('../Image/white_icon/upload.png')} style={{ width: 20, height: 20, marginLeft: 0,bottom:0 }} />
                        <Text style={{color:'white'}}>Take a picture</Text>
                    </View>
                    }
                  </TouchableOpacity> 
                  }
              </View>

            <View style={[{ borderWidth: 0, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}, getMarginTop(2), getWidthnHeight(100, 10)]}>
                <FloatingTitleTextInputField
                    attrName = 'nameofprospect'
                    title = 'Name of Prospect'
                    value = {this.state.name_of_prospect}
                    titleActiveColor = {colorTitle}
                    titleInactiveColor = 'dimgrey'
                    updateMasterState = {(attrName, name_of_prospect) => {
                      this.setState({name_of_prospect})
                      console.log("ATTRNAME: ", attrName)
                    }}
                    textInputStyles = {[{ // here you can add additional TextInput styles
                      color: 'black',
                      fontSize: 14,
                    }, getWidthnHeight(undefined, 7)]}
                    containerStyle = {[getWidthnHeight(90, 10)]}
                />
            </View>

       {this.state.radioComponentStatus == true ? 
            <View style={{flexDirection:'row',justifyContent:'space-around',top:0, borderColor: 'black', borderWidth: 0}}> 
                <RadioEnable title="Government" onPress={()=>{this.setState({radioComponentStatus:true}) || this.goverment()}}/> 
                <RadioDisable title="Corporate" onPress={()=>{this.setState({radioComponentStatus:false}) || this.corporate()}}/>
            </View>
        :
            <View style={{flexDirection:'row',justifyContent:'space-around',top:0, borderColor: 'black', borderWidth: 0}}> 
                <RadioDisable title="Government" onPress={()=>{this.setState({radioComponentStatus:true})}}/> 
                <RadioEnable title="Corporate" onPress={()=>{this.setState({radioComponentStatus:false})}}/>
            </View>
        }

        <View style={[{borderWidth: 0, borderColor: 'black', alignItems: 'center'}, getMarginVertical(2)]}>
          <View style={[{borderWidth: 1, borderColor: 'grey', alignItems: 'center', borderRadius: 10, justifyContent: 'space-evenly'}, getWidthnHeight(90, 15)]}>
            <Text style={[{color: colorBase, fontWeight: 'bold', textAlign: 'center'}, getWidthnHeight(50)]}>Select Source:</Text>
            <View style={[{borderWidth: 0, borderColor: 'grey',flexDirection:'row',justifyContent:'center',}, getWidthnHeight(90, 9)]}>
            {this.state.container == 'newsPaper' ? 
                <NewsPaper 
                    title={"NEWS PAPER"} 
                    source={require('../Image/newspaperBlue.png')} 
                    style={{backgroundColor:colorBase,borderColor:colorBase,}} 
                    TextStyle={{color:'white',}} 
                    circle={{ backgroundColor:'white',borderColor:colorBase}}
                    onPress={()=>{}} 
                /> 
                : 
                <NewsPaper 
                    title={"NEWS PAPER"} 
                    source={require('../Image/newspaperBlack.png')} 
                    style={{backgroundColor:'white',borderColor:'#c4c4c4',}} 
                    TextStyle={{color:'#c4c4c4',}} 
                    circle={{ backgroundColor:'#c4c4c4',borderColor:'#c4c4c4',}}
                    onPress={()=>{this.setState({container:'newsPaper'}) || this.setState({leadSourceOptions_id:1, otherSource: ''})}} 
                />
            }
         
            {this.state.container == 'Website' ? 
                <NewsPaper 
                    title={"WEBSITE"} 
                    source={require('../Image/globeBlue.png')} 
                    style={{backgroundColor:colorBase,borderColor:colorBase,}} 
                    TextStyle={{color:'white',}} 
                    circle={{ backgroundColor:'white',borderColor:colorBase}}
                    onPress={()=>{}} 
                /> 
                : 
                <NewsPaper 
                    title={"WEBSITE"} 
                    source={require('../Image/globeBlack.png')} 
                    style={{backgroundColor:'white',borderColor:'#c4c4c4',}} 
                    TextStyle={{color:'#c4c4c4',}} 
                    circle={{ backgroundColor:'#c4c4c4',borderColor:'#c4c4c4',}}
                    onPress={()=>{this.setState({container:'Website'}) || this.setState({leadSourceOptions_id:2, otherSource: ''})}} 
                />
            }

            {this.state.container == 'Friend' ? 
                <NewsPaper 
                    title={"FRIEND"} 
                    source={require('../Image/friendsBlue.png')} 
                    style={{backgroundColor:colorBase,borderColor:colorBase,}} 
                    TextStyle={{color:'white',}} 
                    circle={{ backgroundColor:'white',borderColor:colorBase}}
                    onPress={()=>{}} 
                /> 
                : 
                <NewsPaper 
                    title={"FRIEND"} 
                    source={require('../Image/friendsBlack.png')} 
                    style={{backgroundColor:'white',borderColor:'#c4c4c4',}} 
                    TextStyle={{color:'#c4c4c4',}} 
                    circle={{ backgroundColor:'#c4c4c4',borderColor:'#c4c4c4',}}
                    onPress={()=>{this.setState({container:'Friend'}) || this.setState({leadSourceOptions_id:3, otherSource: ''})}} 
                />
            }

            {this.state.container == 'Other' ? 
                <NewsPaper 
                    title={"OTHERS"} 
                    source={require('../Image/menuBlue.png')} 
                    style={{backgroundColor:colorBase,borderColor:colorBase,}} 
                    TextStyle={{color:'white',}} 
                    circle={{ backgroundColor:'white',borderColor:colorBase}}
                    onPress={()=>{}} /> 
                : 
                <NewsPaper 
                    title={"OTHERS"} 
                    source={require('../Image/menuBlack.png')} 
                    style={{backgroundColor:'white',borderColor:'#c4c4c4',}} 
                    TextStyle={{color:'#c4c4c4',}} 
                    circle={{ backgroundColor:'#c4c4c4',borderColor:'#c4c4c4',}}
                    onPress={()=>{this.setState({container:'Other'}) || this.setState({leadSourceOptions_id:4})}} 
                />
            }
            </View>
          </View>
        </View>
       
        { this.state.container == 'Other' ?
          <View style={[{alignItems: 'center'},getWidthnHeight(100), getMarginBottom(2)]}>
                <FloatingTitleTextInputField
                    attrName = 'othersource'
                    title = 'Other Source'
                    value = {this.state.otherSource}
                    titleActiveColor = {colorTitle}
                    titleInactiveColor = 'dimgrey'
                    updateMasterState = {(attrName, otherSource) => {
                        this.setState({otherSource})
                        if(otherSource === ''){
                          this.setState({otherError: true})
                        }else{
                          this.setState({otherError: false})
                        }
                        console.log("ATTRNAME: ", otherSource)
                    }}
                    textInputStyles = {[{ // here you can add additional TextInput styles
                        color: 'black',
                        fontSize: 14,
                        borderColor: (savePressed && otherError)? 'red' : 'grey',
                        borderStyle: (savePressed && otherError)? 'dashed' : 'solid',
                        borderWidth: (savePressed && otherError)? 2 : 1,
                    }, getWidthnHeight(undefined, 7)]}
                    containerStyle = {[{borderColor: 'black', borderWidth: 0}, getWidthnHeight(90, 7)]}
                />
          </View>
        :null
        }

        <View style={[styles.box, getMarginBottom(2.5), getWidthnHeight(100, 7)]}>
            <Dropdown
                containerStyle={[{justifyContent: 'center', borderColor: 'grey', borderWidth: 1, paddingLeft: 10, borderRadius: 10}, getWidthnHeight(90, 7)]}
                //  maxLength = {12}
                inputContainerStyle={{borderBottomColor:"rgb(19,111,232)",fontSize:hp(2) }}
                label={'Select Industry'}
                data={this.state.leadIndustryOptionsId}
                valueExtractor={({id})=> id}
                labelExtractor={({industry_name})=> industry_name}
                onChangeText={leadIndustryOptions_id => this.setState({ leadIndustryOptions_id }, () => console.log("INDUSTRY: ", this.state.leadIndustryOptions_id))}
                value={leadIndustryOptions_id}
                //  baseColor = '#e5314e'
                baseColor = {(leadIndustryOptions_id)? colorTitle : 'grey'}
                //  selectedItemColor='#aaa'
                //  textColor='#aaa'
                //  itemColor='#aaa'
            />
        </View>

        {(this.state.leadIndustryOptions_id === 33)?
          <View style={[{alignItems:'center'}, getWidthnHeight(100), getMarginBottom(2.5)]}> 
                  <FloatingTitleTextInputField
                      attrName = 'otherindustry'
                      title = 'Other Industry'
                      value = {this.state.other_industry}
                      titleActiveColor = {colorTitle}
                      titleInactiveColor = 'dimgrey'
                      updateMasterState = {(attrName, other_industry) => {
                        this.setState({other_industry})
                        if(other_industry === ''){
                          this.setState({otherIndustryError: true})
                        }else{
                          this.setState({otherIndustryError: false})
                        }
                        console.log("ATTRNAME: ", attrName)
                      }}
                      textInputStyles = {[{ // here you can add additional TextInput styles
                        color: 'black',
                        fontSize: 14,
                        borderColor: (savePressed && otherIndustryError)? 'red' : 'grey',
                        borderStyle: (savePressed && otherIndustryError)? 'dashed' : 'solid',
                        borderWidth: (savePressed && otherIndustryError)? 2 : 1,
                      }, getWidthnHeight(undefined, 7)]}
                      containerStyle = {[{borderColor: 'red', borderWidth: 0, marginVertical: 0}, getWidthnHeight(90, 7)]}
                  />
          </View>
        : null
        }

        <View style={[{alignItems:'center'}, getWidthnHeight(100), getMarginBottom(2.5)]}> 
            <View style={[{justifyContent: 'space-evenly', flexDirection: 'row', borderColor: 'black', borderWidth: 0}, getWidthnHeight(100)]}>
                <FloatingTitleTextInputField
                    attrName = 'contactname'
                    title = 'Contact Name'
                    value = {this.state.contact_person_name}
                    titleActiveColor = {colorTitle}
                    titleInactiveColor = 'dimgrey'
                    updateMasterState = {(attrName, contact_person_name) => {
                      this.setState({contact_person_name})
                      console.log("ATTRNAME: ", attrName)
                    }}
                    textInputStyles = {[{ // here you can add additional TextInput styles
                      color: 'black',
                      fontSize: 14,
                    }, getWidthnHeight(undefined, 7)]}
                    containerStyle = {[{borderColor: 'red', borderWidth: 0, marginVertical: 0}, getWidthnHeight(43, 7)]}
                />
                {/* {<RedBox
                  placeholder={"Contact Name"}
                  onChangeText={contact_person_name => this.setState({contact_person_name})}
                  value={this.state.contact_person_name}
                  style={{top:0,height:50,width:'43%'}}
                />} */}
                <FloatingTitleTextInputField
                    attrName = 'contactnumber'
                    title = 'Contact Number'
                    value = {this.state.contact_person_mobile_number}
                    keyboardType = 'numeric'
                    titleActiveColor = {colorTitle}
                    titleInactiveColor = 'dimgrey'
                    updateMasterState = {(attrName, contact_person_mobile_number) => {
                      const number = contact_person_mobile_number.replace(/[^0-9]/g, '')
                      this.setState({contact_person_mobile_number: number})
                      console.log("ATTRNAME: ", attrName)
                    }}
                    textInputStyles = {[{ // here you can add additional TextInput styles
                      color: 'black',
                      fontSize: 14,
                    }, getWidthnHeight(undefined, 7)]}
                    containerStyle = {[{borderColor: 'red', borderWidth: 0, marginVertical: 0}, getWidthnHeight(43, 7)]}
                    otherTextInputProps = {{maxLength: 10}}
                />
                {/* {<RedBox
                  placeholder={"Contact Number"}
                  onChangeText={contact_person_mobile_number => this.setState({contact_person_mobile_number})}
                  value={this.state.contact_person_mobile_number}
                  style={{top:0,height:50,width:'43%',left:0}}
                />} */}
            </View> 
        </View>

        <View style={[{alignItems: 'center', borderColor: 'red', borderWidth: 0}, getWidthnHeight(100, 7), getMarginBottom(2.5)]}>
            <FloatingTitleTextInputField
                attrName = 'alternatenumber'
                title = 'Alternate Contact Number'
                value = {this.state.contact_person_alternate_mobile_number}
                keyboardType = 'numeric'
                titleActiveColor = {colorTitle}
                titleInactiveColor = 'dimgrey'
                updateMasterState = {(attrName, contact_person_alternate_mobile_number) => {
                  const number = contact_person_alternate_mobile_number.replace(/[^0-9]/g, '')
                  this.setState({contact_person_alternate_mobile_number: number})
                  console.log("ATTRNAME: ", attrName)
                }}
                textInputStyles = {[{ // here you can add additional TextInput styles
                  color: 'black',
                  fontSize: 14,
                }, getWidthnHeight(undefined, 7)]}
                containerStyle = {[{borderColor: 'red', borderWidth: 0, marginVertical: 0}, getWidthnHeight(60, 7)]}
                otherTextInputProps = {{maxLength: 10}}
            />
        </View>

        <View style={[{alignItems: 'center'}, getWidthnHeight(100)]}>
            <FloatingTitleTextInputField
                attrName = 'emailAddress'
                title = 'Email Address'
                value = {this.state.contact_person_email}
                titleActiveColor = {colorTitle}
                titleInactiveColor = 'dimgrey'
                updateMasterState = {(attrName, contact_person_email) => {
                  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  if(re.test(String(contact_person_email).toLowerCase())){
                    this.setState({email: true}, () => console.log("ATTRNAME: ", re.test(String(contact_person_email).toLowerCase()), this.state.email))
                  }else{
                    this.setState({email: false}, () => console.log("ATTRNAME: ", re.test(String(contact_person_email).toLowerCase()), this.state.email))
                  }
                  if(contact_person_email === ''){
                    this.setState({email: true})
                  }
                  this.setState({contact_person_email})
                }}
                textInputStyles = {[{ // here you can add additional TextInput styles
                  color: (this.state.email)? '#0AD159' : 'red',
                  fontSize: 14,
                  borderColor: (savePressed && !email)? 'red' : 'grey',
                  borderStyle: (savePressed && !email)? 'dashed' : 'solid',
                  borderWidth: (savePressed && !email)? 2 : 1,
                }, getWidthnHeight(undefined, 7)]}
                containerStyle = {[{borderColor: 'red', borderWidth: 0, marginVertical: 0}, getWidthnHeight(90, 7)]}
            />
        </View>
        {/* { <RedBox
        placeholder={"Email Address"}
        onChangeText={contact_person_email => this.setState({contact_person_email})}
        value={this.state.contact_person_email}
        style={{top:0,height:50,width:'90%'}}
       />} */}

        <View style={[{alignItems: 'center'}, getWidthnHeight(100), getMarginVertical(2.5)]}>
            <FloatingTitleTextInputField
                attrName = 'addressLocation'
                title = 'Address Location'
                value = {this.state.address_location}
                titleActiveColor = {colorTitle}
                titleInactiveColor = 'dimgrey'
                updateMasterState = {(attrName, address_location) => {
                  this.setState({address_location})
                  console.log("ATTRNAME: ", attrName)
                }}
                textInputStyles = {[{ // here you can add additional TextInput styles
                  color: 'black',
                  fontSize: 14,
                }, getWidthnHeight(undefined, 7)]}
                containerStyle = {[{borderColor: 'red', borderWidth: 0, marginVertical: 0}, getWidthnHeight(90, 7)]}
            />
            {/* {<RedBox
              placeholder={"Address Location"}
              onChangeText={address_location => this.setState({address_location})}
              value={this.state.address_location}
              style={{top:0,height:50,width:'90%'}}
            />} */}
        </View>

        {(this.state.timePicker)?
        <TimePicker 
            show={this.state.timePicker}
            timeDifference={2}
            onBackdropPress={() => this.setState({timePicker: false})}
        />
        : null
        }

        {(this.props.fromTime)? this.setTimings() : null}

        <View style={[{alignItems:'center', borderColor: 'black', borderWidth: 0}, getWidthnHeight(100,7), getMarginBottom(2.5)]}> 
            <View style={{alignItems: 'center',borderColor: 'red', borderWidth: 0}}>
                <View style={[{justifyContent: (dateTime)? 'space-between' : 'center', flexDirection: 'row',borderColor: 'red', borderWidth: 0}, getWidthnHeight(90, 7)]}>
                    <DateSelector 
                        containerStyle={[{borderWidth: 1, borderColor: 'grey', borderRadius: 10, justifyContent: 'center'}, getWidthnHeight(43, 7)]}
                        style={[(dateTime === '')? {borderWidth: 0, borderColor: 'green', width: getWidthnHeight(43).width} : {fontSize: 12, width: getWidthnHeight(35).width}]}
                        date={this.state.dateTime}
                        clearDate={(dateTime === '')? false : true}
                        onPress={() => this.setState({dateTime: '', dueTimeError: true, dateOrTimeValue: null, dateNTime: ''})}
                        dateFont={{fontSize: 14}}
                        androidMode='default'
                        mode='date'
                        placeholder='Due Date'
                        format='YYYY-MM-DD'
                        onDateChange={(date) => {this.setState({dateTime: date})}} 
                    />
                    {(dateTime !== '') ? 
                        <TouchableOpacity style={[styles.TimeBox, getWidthnHeight(43, 7), {
                          borderColor: (savePressed && dueTimeError)? 'red' : 'grey',
                          borderStyle: (savePressed && dueTimeError)? 'dashed' : 'solid',
                          borderWidth: (savePressed && dueTimeError)? 2 : 1,
                        }]}
                        onPress={() => {this.setState({timePicker: true})}}>
                        {(this.state.dateOrTimeValue)?
                        <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>{this.state.dateOrTimeValue}</Text>
                        :
                        <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>Due Time</Text>
                        }
                        </TouchableOpacity>
                    :
                        null
                    }
                </View>
            </View>
        </View>

       <View style={[{alignItems: 'center', borderColor: 'green', borderWidth: 0}, getWidthnHeight(100), getMarginBottom(2.5)]}>
            <FloatingTitleTextInputField
                attrName = 'servicesRequired'
                title = 'Services Required'
                value = {this.state.services_required}
                titleActiveColor = {colorTitle}
                titleInactiveColor = 'dimgrey'
                updateMasterState = {(attrName, services_required) => {
                  this.setState({services_required})
                  console.log("ATTRNAME: ", attrName)
                }}
                textInputStyles = {[{ // here you can add additional TextInput styles
                  color: 'black',
                  fontSize: 14,
                }, getWidthnHeight(undefined, 7)]}
                containerStyle = {[{borderColor: 'red', borderWidth: 0, marginVertical: 0}, getWidthnHeight(90, 7)]}
            />
            {/* <RedBox
              placeholder={"Services Required"}
              onChangeText={services_required => this.setState({services_required})}
              value={this.state.services_required}
              style={{top:0,height:50,width:'90%'}}
            /> */}
        </View>

        <View style={[{alignItems: 'center'}, getWidthnHeight(100), getMarginBottom(2.5)]}>
          <View style={[{alignItems: 'center', justifyContent: 'space-evenly',borderWidth: 1, borderColor: 'grey', borderRadius: 10}, getWidthnHeight(90, 10)]}>
            <View style={[{alignItems: 'center'}, getWidthnHeight(90)]}>
              <Text style={[{color: colorBase, textAlign: 'center', fontWeight: 'bold'}, getWidthnHeight(40)]}>Pre Bid:</Text>
            </View>
            <View style={[getWidthnHeight(90)]}>
              {this.state.radioPreBidStatus === true ? 
                  <View style={{flexDirection:'row',justifyContent:'space-around',borderColor: 'black', borderWidth: 0}}>
                      <RadioDisable title="No" onPress={()=>{this.setState({radioPreBidStatus:false, prebidDate: null, 
                        prebidTimeValue: null, prebidDateError: true, prebidDate: '', prebidTimeError: true, prebidNumber: 0})}}/> 
                      <RadioEnable title="Yes" onPress={()=>{this.setState({radioPreBidStatus:true, prebidNumber: 1})}}/>
                  </View>
              :
                  <View style={{flexDirection:'row',justifyContent:'space-around',borderColor: 'black', borderWidth: 0}}> 
                      <RadioEnable title="No" onPress={()=>{this.setState({radioPreBidStatus:false, prebidDate: null, 
                        prebidTimeValue: null, prebidNumber: 0})}}/> 
                      <RadioDisable title="Yes" onPress={()=>{this.setState({radioPreBidStatus:true, prebidNumber: 1})}}/> 
                  </View>
              }
            </View>
          </View>
        </View> 

        {(this.state.preBidTimeState)?
        <TimePicker 
            show={this.state.preBidTimeState}
            timeDifference={2}
            prebidTimeValue={true}
            onBackdropPress={() => this.setState({preBidTimeState: false})}
        />
        : null
        }

        {(this.props.setPreBid)? this.setPreBidTimings() : null}

        {this.state.radioPreBidStatus === true ?     
            <View style={[{alignItems:'center', borderColor: 'black', borderWidth: 0}, getWidthnHeight(100,7), getMarginBottom(2.5)]}> 
                <View style={{alignItems: 'center',borderColor: 'red', borderWidth: 0}}>
                    <View style={[{justifyContent: (!prebidDateError)? 'space-between' : 'center', flexDirection: 'row',borderColor: 'red', borderWidth: 0}, getWidthnHeight(90, 7)]}>
                        <DateSelector 
                            containerStyle={[{
                              borderWidth: 1, borderColor: (savePressed && prebidDateError)? 'red' : 'grey', borderRadius: 10, justifyContent: 'center',
                              borderStyle: (savePressed && prebidDateError)? 'dashed' : 'solid', borderWidth: (savePressed && prebidDateError)? 2 : 1,
                            }, getWidthnHeight(43, 7)]}
                            style={[getWidthnHeight(43)]}
                            date={this.state.prebidDate}
                            androidMode='default'
                            mode='date'
                            placeholder='PreBid Date'
                            format='YYYY-MM-DD'
                            onDateChange={(date) => {this.setState({prebidDate: date, prebidDateError: false})}} 
                        />
                        {(!prebidDateError)?
                            <TouchableOpacity style={[styles.TimeBox, getWidthnHeight(43, 7), {
                              borderColor: (savePressed && prebidTimeError)? 'red' : 'grey',
                              borderStyle: (savePressed && prebidTimeError)? 'dashed' : 'solid',
                              borderWidth: (savePressed && prebidTimeError)? 2 : 1,
                            }]}
                                onPress={() => {this.setState({preBidTimeState: true})}}>
                                {(this.state.prebidTimeValue)?
                                <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>{this.state.prebidTimeValue}</Text>
                                :
                                <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>PreBid Time</Text>
                                }
                            </TouchableOpacity>
                        :
                            null
                        }
                    </View>
                </View>
            </View>
        :
            null
        }

        <View style={[{alignItems: 'center'}, getWidthnHeight(100), getMarginBottom(2.5)]}>
          <View style={[{flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0, borderColor: 'grey', borderRadius: 10}, getWidthnHeight(90)]}>
            <FloatingTitleTextInputField
                attrName = 'tenureinmonths'
                title = 'Tenure in Months'
                value = {this.state.tenure}
                titleActiveColor = {colorTitle}
                titleInactiveColor = 'dimgrey'
                keyboardType='numeric'
                updateMasterState = {(attrName, number) => {
                  const tenure = number.replace(/[^0-9]/g, '')
                  this.setState({tenure})
                  console.log("ATTRNAME: ", attrName)
                }}
                textInputStyles = {[{ // here you can add additional TextInput styles
                  color: 'black',
                  fontSize: 14,
                  paddingLeft: 10
                }, getWidthnHeight(undefined, 7)]}
                containerStyle = {[{borderColor: 'red', borderWidth: 0, marginVertical: 0}, getWidthnHeight(43, 7)]}
            />

            <FloatingTitleTextInputField
                attrName = 'volume'
                title = 'Volume'
                value = {this.state.volume}
                titleActiveColor = {colorTitle}
                titleInactiveColor = 'dimgrey'
                keyboardType='numeric'
                updateMasterState = {(attrName, number) => {
                  const volume = number.replace(/[^0-9]/g, '')
                  this.setState({volume})
                  console.log("ATTRNAME: ", attrName)
                }}
                textInputStyles = {[{ // here you can add additional TextInput styles
                  color: 'black',
                  fontSize: 14,
                  paddingLeft: 10
                }, getWidthnHeight(undefined, 7)]}
                containerStyle = {[{borderColor: 'red', borderWidth: 0, marginVertical: 0}, getWidthnHeight(43, 7)]}
            />
          </View>
        </View> 

        <View style={[{alignItems: 'center'}, getWidthnHeight(100), getMarginBottom(2.5)]}>
          <View style={[{flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0, borderColor: 'grey', borderRadius: 10}, getWidthnHeight(90)]}>
            <FloatingTitleTextInputField
                attrName = 'value'
                title = {`Value (${"\u20B9"})`}
                value = {this.state.value}
                titleActiveColor = {colorTitle}
                titleInactiveColor = 'dimgrey'
                keyboardType='numeric'
                updateMasterState = {(attrName, number) => {
                  const value = number.replace(/[^0-9]/g, '')
                  this.setState({value})
                  console.log("ATTRNAME: ", attrName)
                }}
                textInputStyles = {[{ // here you can add additional TextInput styles
                  color: 'black',
                  fontSize: 14,
                  paddingLeft: 10
                }, getWidthnHeight(undefined, 7)]}
                containerStyle = {[{borderColor: 'red', borderWidth: 0, marginVertical: 0}, getWidthnHeight(43, 7)]}
            />

            <FloatingTitleTextInputField
                attrName = 'emdamount'
                title = 'EMD Amount'
                value = {this.state.emdAmount}
                titleActiveColor = {colorTitle}
                titleInactiveColor = 'dimgrey'
                keyboardType='numeric'
                updateMasterState = {(attrName, number) => {
                  const emdAmount = number.replace(/[^0-9]/g, '')
                  this.setState({emdAmount})
                  console.log("ATTRNAME: ", attrName)
                }}
                textInputStyles = {[{ // here you can add additional TextInput styles
                  color: 'black',
                  fontSize: 14,
                  paddingLeft: 10
                }, getWidthnHeight(undefined, 7)]}
                containerStyle = {[{borderColor: 'red', borderWidth: 0, marginVertical: 0}, getWidthnHeight(43, 7)]}
            />
          </View>
        </View> 

        <View style={[{borderColor: 'green', borderWidth: 0, alignItems: 'center'}, getWidthnHeight(100), getMarginBottom(2.5)]}>
            <View style={[{borderColor: 'green', borderWidth: 0}, getWidthnHeight(90)]}>
                <FloatingTitleTextInputField
                    attrName = 'servicesDescription'
                    title = 'Services Description'
                    value = {this.state.service_description}
                    titleActiveColor = {colorTitle}
                    titleInactiveColor = 'dimgrey'
                    updateMasterState = {(attrName, service_description) => {
                      this.setState({service_description})
                      if(service_description === ''){
                        this.setState({serviceDescriptionError: true})
                      }else {
                        this.setState({serviceDescriptionError: false})
                      }
                      console.log("ATTRNAME: ", attrName)
                    }}
                    textInputStyles = {[{ // here you can add additional TextInput styles
                      color: 'black',
                      fontSize: 14,
                      borderColor: (savePressed && serviceDescriptionError)? 'red' : 'grey',
                      borderStyle: (savePressed && serviceDescriptionError)? 'dashed' : 'solid',
                      borderWidth: (savePressed && serviceDescriptionError)? 2 : 1,
                    }, getWidthnHeight(undefined, 7)]}
                    containerStyle = {[{borderColor: 'red', borderWidth: 0, marginVertical: 0}, getWidthnHeight(90, 7)]}
                />
                
            </View>
            {/* <RedBox
              placeholder={"Services Description"}
              onChangeText={service_description => this.setState({service_description})}
              value={this.state.service_description}
              style={{top:0,height:50,width:'90%'}}
            
              image={{ width: 10,
                height: 14, }}
            /> */}
        </View>
        
        </ScrollView>
        <View style={[{justifyContent:'space-evenly',alignItems:'center', backgroundColor: 'transparent', borderColor: '#E5214E', borderTopWidth: 0}, getWidthnHeight(100, 7)]}>
            <View style={[{borderTopWidth: 1, borderColor: colorBase}, getWidthnHeight(80)]}/>
            <RoundButton 
              title="SAVE"
              onPress={()=>this.store_lead_button()}
              gradient={['#0E57CF', '#25A2F9']}
              style={[getWidthnHeight(30, 5)]}
            />
        </View>
        </View>
        <CommonModal 
          title="Something went wrong"
          subtitle= {`Error Code: ${errorCode}${apiCode}`}
          visible={this.state.commonModal}
          onDecline={this.onDecline.bind(this)}
          buttonColor={['#0E57CF', '#25A2F9']}
        />
        {(this.state.enableAlert)?
          <AlertBox 
            title={this.state.alertTitle}
            visible={this.state.enableAlert}
            onDecline={() => this.setState({enableAlert: false})}
            titleStyle={{color: 'black'}}
            color={this.state.alertColor}
          />
        :
          null
        }
    </View>
    )}
    </KeyboardShift>
    
    );
}

}
const styles = StyleSheet.create({
  MainContainer:{
    backgroundColor:'white',
    borderTopLeftRadius:0,
    borderTopRightRadius:0,
    flex: 1,
    borderWidth: 0,
    borderColor: 'yellow',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:colorBase,
    borderRadius:10,
    borderWidth: 0,
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
  container: {
    flex: 0,
    flexDirection:'column',
    left:'0%',
    width:wp('100%'),
    height:hp('90%'),

  },
  image:{
    top:0,
    left: 0,
    bottom:0,
    backgroundColor:'white',
    width: 10,
    height: 14,
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
 TimeBox:{
    borderWidth:1,
    borderColor:'grey',
    borderRadius:10,
    justifyContent: 'center'
},
});

const mapStateToProps = (state) => {
  console.log("***Welcome***MAP STATE TO PROPS: ", state.preBidTime.preBid)
  return {
    file: state.cameraFile,
    fromTime: state.timePickerModal.timePicker.fromTime,
    setPreBid: state.preBidTime.preBid.fromTime
  }
}

const appComponent = withNavigation(App);
export default connect(mapStateToProps, {cameraFile, show_HideTimePicker, prebidTime})(appComponent);