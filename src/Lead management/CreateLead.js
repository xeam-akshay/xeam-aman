import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
  ScrollView,
  Keyboard,
} from 'react-native';
import ActionModal from 'react-native-modal';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {withNavigation} from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import { Dropdown } from 'react-native-material-dropdown';
import DocumentPicker from 'react-native-document-picker';
import Header from '../Components/New header'
import RedBox from '../Components/redBox'
import RadioEnableComponent from '../Components/radioEnableComponent'
import RadioDisableComponent from '../Components/radioDisableComponent'
import NewsPaper from '../Components/NewsPaper';
import DateTime from '../Components/dateNtimeRedbox';
import RedButton from '../Components/normalButton';
import {extractBaseURL} from '../api/BaseURL';
import KeyboardShift from '../KeyboardShift';
import { Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import XDate from 'xdate'; 
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {CommonModal, IOS_StatusBar, getMarginTop, getMarginBottom, getWidthnHeight, FloatingTitleTextInputField, getMarginVertical, DateSelector, Input as TextInput} from '../KulbirComponents/common';
import {cameraFile} from '../actions';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
class App extends Component {
  constructor() {
    super();
    this.myTextInput = React.createRef();
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
        tenure: null,
        volume: null,
        value: null,
        emdAmount: null,
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
    this.setState({leaveType:"Short"});
    this.setState({button_value:0}); 
    this.setState({business_type:1});

  };
  corporate = () => {
    this.setState({leaveType:"Short"});
    this.setState({button_value:1});
    this.setState({business_type:2});
    
  };


 componentDidMount(){
  const {navigation} = this.props;
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
data.append("service_description", this.state.service_description);
data.append("name_of_prospect", this.state.name_of_prospect);
data.append("contact_person_name", this.state.contact_person_name);
data.append("contact_person_mobile", this.state.contact_person_mobile_number);
data.append("industry_id", this.state.leadIndustryOptions_id);
data.append("due_date", this.state.dateTime);
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
  var msg = json_obj.success.message
  Alert.alert(msg);
_this.hideLoader();
// console.log(this.responseText);
_this.setState({service_description:''})
_this.setState({name_of_prospect:null})
_this.setState({contact_person_name:''})
_this.setState({contact_person_mobile_number:''})
_this.setState({leadIndustryOptions_id:''})
_this.setState({dateTime:''})
_this.setState({address_location:''})
_this.setState({contact_person_email:''})
_this.setState({contact_person_alternate_mobile_number:''})
_this.setState({services_required:''})
_this.setState({singleFileOBJ:''})
}if(xhr.status == 400){
  console.log(xhr.responseText)
  Alert.alert("The services description field is required.")
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
        Alert.alert('Cancelled');
      } else {
        Alert.alert('Unknown Error: ' + JSON.stringify(err));
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

fRenderDateTimePicker = (dateTimePickerVisible, visibilityVariableName, dateTimePickerMode, defaultValue, saveValueFunctionName ) => {
    // dateTimePickerVisible:   a flag, which is used to show/hide this DateTimePicker
    // visibilityVariableName:              the name of the state variable, which controls showing/hiding this DateTimePicker. 
        // The name of the variable is received in (visibilityVariableName), and the value of it is received in the argument (dateTimePickerVisible).
    // dateTimePickerMode:      the mode mode of this DateTimePicker
    // defaultValue:                the default value, which should be selected initially when the DatTimePicker is displayed 
    // saveValueFunctionName:   the function, which would be called after the user selects a value. 
        // In my case it is a Redux's action creator, which saves the selected value in the app's state. 

    return (
        <View>
            {/* A. For iOS, display the picker in "date", "time" or "datetime" mode - No need for any customisation */}
            {Platform.OS === 'ios' && dateTimePickerVisible &&
                (<DateTimePicker
                    mode={dateTimePickerMode}
                    value={defaultValue}

                    onChange={ (event, value) => {
                        this.setState({
                            dateOrTimeValue: value,

                            // We are done. Hide the <DatTimePicker>
                            // Technically speaking, since this part of the script is only relevant to a certain platform, I don't need to check for the platform (below). 
                            // Note that [visibilityVariableName] refers to the NAME of a state variable
                            [visibilityVariableName]: Platform.OS === 'ios' ? true : false,
                        });

                        if (event.type === "set") {
                            saveValueFunctionName(value);
                            // console.log("visibilityVariableName:", [visibilityVariableName], " - value:", value); 
                        }

                    }}
                />)}

            {/* B.1 For Android - "date" mode:      display the picker in "date" mode */}
            {/*       For Android - "datetime" mode: display the picker in "date" mode (to be followed by another picker (below) in "time" mode) */}
            {Platform.OS === 'android' && dateTimePickerVisible && this.state.datePickerVisible &&
                (<DateTimePicker
                    mode={"date"}
                    display='default' // 'default', 'spinner', 'calendar', 'clock' // Android Only 
                    value={defaultValue}

                    onChange={ (event, value) => {
                        this.setState({
                            // In case of (mode == datetime), the TIME part will be added to "dateOrTimeValue" using another DateTimePicker (below).
                            dateOrTimeValue: value,
                            datePickerVisible: false,
                        });

                        // When the mode is "datetime" & this picker was set (the user clicked on OK, rather than cancel), 
                        // we need to display another DateTimePicker in TIME mode (below) 
                        if (event.type === "set" && dateTimePickerMode === "datetime") {
                            this.setState({
                                timePickerVisible: true,
                            });
                        }

                        // When the mode is "date" & this picker was set (the user clicked on OK, rather than cancel), 
                        // (1) We need to hide this picker. 
                        // (2) Save the data. Otherwise, do nothing. Date will be saved after the TIME picker is launched (below). 
                        else if (event.type === "set" && dateTimePickerMode === "date") {
                            // console.log("saveValueFunctionName: ", saveValueFunctionName); 
                            this.setState({ 
                                [visibilityVariableName]: Platform.OS === 'ios' ? true : false, 
                            }); 

                            saveValueFunctionName(value);
                            // console.log("visibilityVariableName:", [visibilityVariableName], " - value:", value); 
                        }

                    }}
                />)}

            {/* B.2 For Android - "time" mode:      display the picker in "time" mode */}
            {/*       For Android - "datetime" mode: display the picker in "time" mode (following another picker (above) in "date" mode) */}
            {Platform.OS === 'android' && dateTimePickerVisible && this.state.timePickerVisible &&
                (<DateTimePicker
                    mode={"time"}
                    display='spinner' // 'default', 'spinner', 'calendar', 'clock' // Android Only 
                    is24Hour={false} // Android Only 
                    value={defaultValue}

                    onChange={(event, value) => {
                        // 1. In case of (mode == "time"), (value) is assigned to (newDateTime), which will be used below (as is with no additions)
                        let newDateTime = value;

                        // 2. In case of (mode == "datetime"), 
                        if (event.type === "set" && dateTimePickerMode === "datetime") {

                            // 2.1. Get the (date) part from the previously displayed DATE picker, which saved its value into (this.state.dateValue)
                            newDateTime = this.state.dateOrTimeValue;

                            // 2.2. Get the (hours & minutes) parts from this TIME Picker, which saved its value into (value) 
                            const newHours = value.getHours();
                            const newMinutes = value.getMinutes();

                            // 2.3 Combine 2.1 & 2.2 (above) into (newDateTime).
                            newDateTime.setHours(newHours);
                            newDateTime.setMinutes(newMinutes);
                            newDateTime.setSeconds(0);
                        }

                        this.setState({
                            dateOrTimeValue: newDateTime,
                            datePickerVisible: false,
                            timePickerVisible: false,

                            // We are done. Hide the <DatTimePicker>
                            // Technically speaking, since this part of the script is only relevant to a certain platform, I don't need to check for the platform (below). 
                            [visibilityVariableName]: Platform.OS === 'ios' ? true : false,
                        });

                        if (event.type === "set") {
                            saveValueFunctionName(newDateTime);
                            // console.log("visibilityVariableName:", [visibilityVariableName], " - newDateTime:", newDateTime); 
                        } 
                    }}

                />)} 
        </View>
    );      
}; 

// This function formats date values. Obviously, using it is optional. 
// If you decide to use it, remember that it needs the XDate library: 
// import XDate from 'xdate';
fFormatDateTime = (date1, format1 = "datetime") => {
    // date1:   the date to be formatted 
    // format1: the date mode - "datetime" , "date" OR "time"
    if (date1 === null) {
        return null;
    }

    // else:
    const format2 = format1.toLowerCase();
    let dateFormatted;
    const date2 = new XDate(date1);

    switch (format2) {
        case "datetime": {
            dateFormatted = date2.toString('dd/MM/yyyy - hh:mm TT');
            return dateFormatted;
        }
        case "date": {
            dateFormatted = date2.toString('dd/MM/yyyy');
            return dateFormatted;
        }
        case "time": {
            dateFormatted = date2.toString('hh:mm TT');
            return dateFormatted;
        }
        default:
            return null;
    } 
};

// This function shows/hides the initial DateTimePicker 
// If the mode is "datetime", another picker will be displayed by the DATE picker 
fRenderDatePicker = (mode, visibilityVariableName) => {
    // mode:                        specifies the mode of the <DateTimePicker> 
    // visibilityVariableName:  the name of the state variable, which controls showing/hiding this DateTimePicker. 
    switch (mode) {
        case "datetime":
            return this.setState({ [visibilityVariableName]: true, datePickerVisible: true, timePickerVisible: false });
        case "date":
            return this.setState({ [visibilityVariableName]: true, datePickerVisible: true, timePickerVisible: false });
        case "time":
            return this.setState({ [visibilityVariableName]: true, datePickerVisible: false, timePickerVisible: true });
    }
}

store_lead_button(){
  // this.apply_leave();
  
  this.store_lead();
  this.dropDownValueChange();
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
      const {errorCode, apiCode, dimensions, slideAnimationDialog} = this.state;
      const context=this;
      console.log(this.state.business_type)
      let status = [{value: 'all',}, {value: 'Today Tasks',}, {value: 'Delayed Tasks',},{value: 'Upcoming Tasks', },{value: "This Week's Tasks",},{value: "This Month's Tasks",},];
      console.log("singleFileOBJ",this.state.chooseFileStatus, this.props.employer)

      // 1. For the "Shift Start", Initial/Default value for the DateTimePicker 
      // // defaultShiftStartDateTime: (tomorrow's date at 9 AM)
      let defaultShiftStartDateTime = new Date();
      defaultShiftStartDateTime.setDate(defaultShiftStartDateTime.getDate() + 1);
      defaultShiftStartDateTime.setHours(9);
      defaultShiftStartDateTime.setMinutes(0);
      defaultShiftStartDateTime.setSeconds(0);

      // 2. For the "Shift End", Initial/Default value for the DateTimePicker 
      let defaultShiftEndDateTime = new Date();
      defaultShiftEndDateTime.setDate(defaultShiftEndDateTime.getDate() + 1);
      defaultShiftEndDateTime.setHours(17);
      defaultShiftEndDateTime.setMinutes(0);
      defaultShiftEndDateTime.setSeconds(0);
        console.log("DATE TIME: ", this.state.dateTime )
      let gradient = ['#E5314E', '#E5314E'];
      console.log("MARGIN TOP FUNCTION: ", getWidthnHeight(10).width)
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
            <View style={{height:viewportHeight,width:viewportWidth,backgroundColor:'#EEEDED'}}>
              <IOS_StatusBar color={gradient} barStyle="light-content"/>
              <Header titleFirstFloor='Create' titleGroundFloor='New Lead' onPress={() => Actions.drawerOpen()} source={require('../Image/newManuIcon.png')}
                style={{width: 35, height: 35, marginLeft: 10, borderColor: 'black', borderWidth: 0}}/>

            <ActionModal 
              isVisible={slideAnimationDialog}
              style={{justifyContent: 'center', alignItems: 'center'}}
              onBackdropPress={() => this.setState({slideAnimationDialog: false})}
            >
              <View style={[{alignItems: 'center', backgroundColor: 'white', borderRadius: 10, justifyContent: 'center'}, getWidthnHeight(80, 60)]}>
                <Image source={{uri: `${this.state.data}`}} style={[{alignItems: 'center', justifyContent: 'center'}, getWidthnHeight(70, 50)]}/>
              </View>
            </ActionModal>

              <View style={[{flexDirection:'row',justifyContent:'center',alignItems: 'flex-end',borderColor: 'black', borderWidth: 0}, getMarginTop(8), getMarginBottom(1)]}>
                  <Text style={{color:'#e5314e'}}>Note</Text>
                  <Text>: Fields with </Text>
                  <Image source={require('../Image/red_icon/asterisk.png')} style={{ width: 10, height: 14, marginLeft: 0, borderColor: 'red', borderWidth: 0}} />
                  <Text> are mandatory</Text>
              </View>
                    
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
                    <RadioEnableComponent title={"Choose file"} onPress={()=>{this.setState({chooseFileStatus:true, data: null, singleFileOBJ: ''}) || this.chooseFile()}}/>
                    <RadioDisableComponent title={"Take a picture"} onPress={()=>{this.setState({chooseFileStatus:false, singleFileOBJ: ''}) || this.takeAPicture()}}/>
                </View>
              :
                <View style={[{flexDirection:'row',justifyContent:'space-around',top:0,paddingBottom:20}, getMarginTop(0)]}> 
                    <RadioDisableComponent title={"Choose file"} onPress={()=>{this.setState({chooseFileStatus:true, data: null, singleFileOBJ: ''}) || this.chooseFile()}}/>
                    <RadioEnableComponent title={"Take a picture"} onPress={()=>{this.setState({chooseFileStatus:false, singleFileOBJ: ''})|| this.takeAPicture()}}/>
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
                  <TouchableOpacity activeOpacity={0.5} style={[styles.button, getWidthnHeight(80)]} onPress={() => Actions.camera()}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={require('../Image/white_icon/upload.png')} style={{ width: 20, height: 20, marginLeft: 0,bottom:0 }} />
                        <Text style={{color:'white'}}>Take a picture</Text>
                    </View>
                  </TouchableOpacity> 
                  }
              </View>

            <View style={[{ borderWidth: 0, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}, getMarginTop(2), getWidthnHeight(100, 10)]}>
                <FloatingTitleTextInputField
                    attrName = 'nameofprospect'
                    title = 'Name of Prospect'
                    value = {this.state.name_of_prospect}
                    titleActiveColor = '#E5214E'
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
                <RadioEnableComponent title={"Government"} onPress={()=>{this.setState({radioComponentStatus:true}) || this.goverment()}}/>
                <RadioDisableComponent title={"Corporate"} onPress={()=>{this.setState({radioComponentStatus:false}) || this.corporate()}}/>
            </View>
        :
            <View style={{flexDirection:'row',justifyContent:'space-around',top:0, borderColor: 'black', borderWidth: 0}}> 
                <RadioDisableComponent title={"Government"} onPress={()=>{this.setState({radioComponentStatus:true})}}/>
                <RadioEnableComponent title={"Corporate"} onPress={()=>{this.setState({radioComponentStatus:false})}}/>
            </View>
        }

        <View style={[{borderWidth: 0, borderColor: 'black',flexDirection:'row',justifyContent:'center',}, getMarginVertical(2), getWidthnHeight(undefined, 9)]}>
            {this.state.container == 'newsPaper' ? 
              <NewsPaper 
                  title={"NEWS PAPER"} 
                  source={require('../Image/newspaper.png')} 
                  style={{backgroundColor:'#e5214e',borderColor:'#e5214e',}} 
                  TextStyle={{color:'white',}} 
                  circle={{ backgroundColor:'white',borderColor:'#e5214e'}}
                  onPress={()=>{}} 
              /> 
              : 
              <NewsPaper 
                  title={"NEWS PAPER"} 
                  source={require('../Image/blackiconnewspaper.png')} 
                  style={{backgroundColor:'white',borderColor:'#c4c4c4',}} 
                  TextStyle={{color:'#c4c4c4',}} 
                  circle={{ backgroundColor:'#c4c4c4',borderColor:'#c4c4c4',}}
                  onPress={()=>{this.setState({container:'newsPaper'}) || this.setState({leadSourceOptions_id:1})}} 
              />
            }
         
            {this.state.container == 'Website' ? 
              <NewsPaper 
                  title={"WEBSITE"} 
                  source={require('../Image/website.png')} 
                  style={{backgroundColor:'#e5214e',borderColor:'#e5214e',}} 
                  TextStyle={{color:'white',}} 
                  circle={{ backgroundColor:'white',borderColor:'#e5214e'}}
                  onPress={()=>{}} 
              /> 
              : 
              <NewsPaper 
                  title={"WEBSITE"} 
                  source={require('../Image/blackiconwebsite.png')} 
                  style={{backgroundColor:'white',borderColor:'#c4c4c4',}} 
                  TextStyle={{color:'#c4c4c4',}} 
                  circle={{ backgroundColor:'#c4c4c4',borderColor:'#c4c4c4',}}
                  onPress={()=>{this.setState({container:'Website'}) || this.setState({leadSourceOptions_id:2})}} 
              />
            }

            {this.state.container == 'Friend' ? 
              <NewsPaper 
                  title={"FRIEND"} 
                  source={require('../Image/friends.png')} 
                  style={{backgroundColor:'#e5214e',borderColor:'#e5214e',}} 
                  TextStyle={{color:'white',}} 
                  circle={{ backgroundColor:'white',borderColor:'#e5214e'}}
                  onPress={()=>{}} 
              /> 
              : 
              <NewsPaper 
                  title={"FRIEND"} 
                  source={require('../Image/blackiconfriends.png')} 
                  style={{backgroundColor:'white',borderColor:'#c4c4c4',}} 
                  TextStyle={{color:'#c4c4c4',}} 
                  circle={{ backgroundColor:'#c4c4c4',borderColor:'#c4c4c4',}}
                  onPress={()=>{this.setState({container:'Friend'}) || this.setState({leadSourceOptions_id:3})}} 
              />
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
                  onPress={()=>{this.setState({container:'Other'}) || this.setState({leadSourceOptions_id:4})}} 
              />
            }
        </View>
       
        { this.state.container == 'Other' ?
          <View style={[{alignItems: 'center'},getWidthnHeight(100)]}>
              <FloatingTitleTextInputField
                  attrName = 'othersource'
                  title = 'Other Source'
                  value = {this.state.otherSource}
                  titleActiveColor = '#E5214E'
                  titleInactiveColor = 'dimgrey'
                  updateMasterState = {(attrName, otherSource) => {
                    this.setState({otherSource})
                    console.log("ATTRNAME: ", attrName)
                  }}
                  textInputStyles = {[{ // here you can add additional TextInput styles
                    color: 'black',
                    fontSize: 14,
                  }, getWidthnHeight(undefined, 7)]}
                  containerStyle = {[{borderColor: 'black', borderWidth: 0}, getWidthnHeight(90, 10)]}
              />
          </View>
          // {<RedBox
          //     placeholder={"Other Source"}
          //     onChangeText={otherSource => this.setState({otherSource})}
          //     value={this.state.otherSource}
          //     style={{height:50,width:'90%'}}
          // />}
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
                onChangeText={leadIndustryOptions_id => this.setState({ leadIndustryOptions_id })}
                value={this.state.leadIndustryOptions_id}
                //  baseColor = '#e5314e'
                baseColor = '#e5314e'
                //  selectedItemColor='#aaa'
                //  textColor='#aaa'
                //  itemColor='#aaa'
            />
        </View>
      

        <View style={[{alignItems:'center'}, getWidthnHeight(100), getMarginBottom(2.5)]}> 
            <View style={[{justifyContent: 'space-evenly', flexDirection: 'row', borderColor: 'black', borderWidth: 0}, getWidthnHeight(100)]}>
                <FloatingTitleTextInputField
                    attrName = 'contactname'
                    title = 'Contact Name'
                    value = {this.state.contact_person_name}
                    titleActiveColor = '#E5214E'
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
                    titleActiveColor = '#E5214E'
                    titleInactiveColor = 'dimgrey'
                    updateMasterState = {(attrName, contact_person_mobile_number) => {
                      this.setState({contact_person_mobile_number})
                      console.log("ATTRNAME: ", attrName)
                    }}
                    textInputStyles = {[{ // here you can add additional TextInput styles
                      color: 'black',
                      fontSize: 14,
                    }, getWidthnHeight(undefined, 7)]}
                    containerStyle = {[{borderColor: 'red', borderWidth: 0, marginVertical: 0}, getWidthnHeight(43, 7)]}
                />
                {/* {<RedBox
                  placeholder={"Contact Number"}
                  onChangeText={contact_person_mobile_number => this.setState({contact_person_mobile_number})}
                  value={this.state.contact_person_mobile_number}
                  style={{top:0,height:50,width:'43%',left:0}}
                />} */}
            </View> 
        </View>

        <View style={[{alignItems: 'center'}, getWidthnHeight(100)]}>
            <FloatingTitleTextInputField
                attrName = 'emailAddress'
                title = 'Email Address'
                value = {this.state.contact_person_email}
                titleActiveColor = '#E5214E'
                titleInactiveColor = 'dimgrey'
                updateMasterState = {(attrName, contact_person_email) => {
                  this.setState({contact_person_email})
                  console.log("ATTRNAME: ", attrName)
                }}
                textInputStyles = {[{ // here you can add additional TextInput styles
                  color: 'black',
                  fontSize: 14,
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
                titleActiveColor = '#E5214E'
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

       
        <View style={[{alignItems:'center', borderColor: 'black', borderWidth: 0}, getWidthnHeight(100,7), getMarginBottom(2.5)]}> 
            <View style={{alignItems: 'center',borderColor: 'red', borderWidth: 0}}>
                <View style={[{justifyContent: 'space-between', flexDirection: 'row',borderColor: 'red', borderWidth: 0}, getWidthnHeight(90, 7)]}>
                    <DateSelector 
                        containerStyle={[{borderWidth: 1, borderColor: 'grey', borderRadius: 10, justifyContent: 'center'}, getWidthnHeight(43, 7)]}
                        style={[getWidthnHeight(43)]}
                        date={this.state.dateTime}
                        androidMode='default'
                        mode='date'
                        placeholder='Due Date'
                        format='DD/MM/YYYY'
                        onDateChange={(date) => {this.setState({dateTime: date})}} 
                    />
                    {/* {<DateTime
                        date={this.state.dateTime}
                        placeholder={'Due Date'}
                        format="DD/MM/YYYY"
                        mode="date"
                        style={{top:0,height:40,width:'40%'}}
                        onDateChange={(date) => {this.setState({dateTime: date})}}
                    />} */}
                    <TouchableOpacity style={[styles.TimeBox, getWidthnHeight(43, 7)]}
                        onPress={() => {
                            // this.setState({ isToTimePickerVisible: true, });
                            this.fRenderDatePicker("time", "isToTimePickerVisible");
                        }}>
                        <Input
                            // label='Time'
                            placeholder={"Time"}
                            editable={false}
                            style={{color:'black'}}
                            value={this.fFormatDateTime(this.state.ToTimeValue, "time") }
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {this.fRenderDateTimePicker(
                this.state.isToTimePickerVisible,
                "isToTimePickerVisible",
                "time",
                defaultShiftEndDateTime,
                this.saveEndingTime,
            )}
        </View>

       <View style={[{alignItems: 'center', borderColor: 'green', borderWidth: 0}, getWidthnHeight(100), getMarginBottom(2.5)]}>
            <FloatingTitleTextInputField
                attrName = 'servicesRequired'
                title = 'Services Required'
                value = {this.state.services_required}
                titleActiveColor = '#E5214E'
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

        <View style={[{alignItems: 'center'}, getWidthnHeight(100), getMarginBottom(2.5)]}>
          <View style={[{flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0, borderColor: 'grey', borderRadius: 10}, getWidthnHeight(90)]}>
            <FloatingTitleTextInputField
                attrName = 'tenureinmonths'
                title = 'Tenure in Months'
                value = {this.state.tenure}
                titleActiveColor = '#E5214E'
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
                titleActiveColor = '#E5214E'
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
                titleActiveColor = '#E5214E'
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
                titleActiveColor = '#E5214E'
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

        <View style={[{borderColor: 'green', borderWidth: 0, flexDirection: 'row'}, getWidthnHeight(100), getMarginBottom(2.5)]}>
            <View style={[{borderColor: 'red', borderWidth: 0, alignItems: 'flex-end'}, getWidthnHeight(5, 7)]}>
                <View>
                  <Image source={require('../Image/red_icon/asterisk.png')} style={styles.image} />
                </View>
            </View> 
            <View style={[{borderColor: 'green', borderWidth: 0}, getWidthnHeight(90)]}>
                <FloatingTitleTextInputField
                    attrName = 'servicesDescription'
                    title = 'Services Description'
                    value = {this.state.service_description}
                    titleActiveColor = '#E5214E'
                    titleInactiveColor = 'dimgrey'
                    updateMasterState = {(attrName, service_description) => {
                      this.setState({service_description})
                      console.log("ATTRNAME: ", attrName)
                    }}
                    textInputStyles = {[{ // here you can add additional TextInput styles
                      color: 'black',
                      fontSize: 14,
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
        <View style={[{justifyContent:'center',alignItems:'center', backgroundColor: 'transparent', borderTopLeftRadius: 50, borderTopRightRadius: 50, borderColor: '#E5214E', borderTopWidth: 1}, getWidthnHeight(100, 7)]}>
            <RedButton
              onPress={()=>this.store_lead_button()}
              title={'SAVE'}
              style={[{backgroundColor:'#e5314e'}, getWidthnHeight(30, 5)]}
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
    </View>
    )}
    </KeyboardShift>
    
    );
}

}
const styles = StyleSheet.create({
  MainContainer:{
      backgroundColor:'white',
      borderTopLeftRadius:40,
      borderTopRightRadius:40,
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
    backgroundColor:'#e5314e',
    borderRadius:1,
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
},
});

const mapStateToProps = (state) => {
  //console.log("***Welcome***MAP STATE TO PROPS: ", state.cameraFile)
  return {
    file: state.cameraFile
  }
}

const appComponent = withNavigation(App);
export default connect(mapStateToProps, {cameraFile})(appComponent);