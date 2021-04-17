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
import Base_url from './Base_url';
import LinearGradient from 'react-native-linear-gradient';
import { SegmentedControls } from 'react-native-radio-buttons'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import { Hoshi } from 'react-native-textinput-effects';
import time from '../src/Image/menu.png'
import Triangle from './triangle'
import LeftSide from '../src/Image/side.png';
import DocumentPicker from 'react-native-document-picker';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
        Prospect_name:'',
        button_value:'',
        leadIndustryOptions_id:'',
        leadSourceOptions_id:'',
        leadSourceOptions:[],
        leadIndustryOptions:[],
        service_description:'',
        name_of_prospect:'',
        address_location:'',
        business_type:'1',
        contact_person_name:'',
        contact_person_email:'',
        contact_person_mobile_number:'',
        contact_person_alternate_mobile_number:'',
        services_required:'',
        singleFileOBJ: '',
        dateTime:'',
        
      
    };
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
   this.dropdown_api();
 }

  dropdown_api=async()=>{
    const context=this;
    const _this = this;
  this.showLoader();
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions= await AsyncStorage.getItem('permissions');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
  var user_permission= permissions_fir.success.user.permissions;
  console.log("permission",user_permission)
    var data = new FormData();

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    var json_obj = JSON.parse(xhr.responseText);
    _this.hideLoader();
        var leadSourceOptions = json_obj.success.leadSourceOptions;
        var leadIndustryOptions = json_obj.success.leadIndustryOptions;

    
    context.setState({leadSourceOptions:leadSourceOptions});
    context.setState({leadIndustryOptions:leadIndustryOptions});
  }
});

xhr.open("GET", "http://erp.xeamventures.com/api/v1/create-lead");
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
xhr.send(data);
  }

  store_lead=async()=>{
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

}

else{

var error = xhr.responseText
console.log(error)
if(error == '{"validation_error":{"sources":["The sources field is required."],"service_description":["The services description field is required."]}}'){
  alert("1) Sources : The sources field is required\n 2) Service Description : The services description field is required");
}

_this.hideLoader();

}
});

xhr.open("POST", "http://erp.xeamventures.com/api/v1/store-lead");
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);

xhr.send(data);
  }

  async SingleFilePicker() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      
      });
 
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

  render (){
         const context=this;
         console.log(this.state.business_type)
         let status = [{value: 'all',}, {value: 'Today Tasks',}, {value: 'Delayed Tasks',},{value: 'Upcoming Tasks', },{value: "This Week's Tasks",},{value: "This Month's Tasks",},];
  return (
    <View style={{height:viewportHeight,width:viewportWidth,backgroundColor:'white'}}>
    <View style={{backgroundColor:'rgb(19,111,232)',height:hp('10%')}}>
            <View style={{top:hp(4),left:wp(15)}}>
             <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Create Lead</Text>
              </View>
            <TouchableOpacity style={{right:'0%',top:'0%'}} onPress={() => context.props.navigation.toggleDrawer()}>
           <Image source={require('../src/Image/menu.png')} style={{ width: wp(8), height: hp(5), marginLeft:wp(2),top:0 }}/>
            </TouchableOpacity>
            </View>
            <View style={styles.pagecomponent_thrd}>
              
            {(this.state.loading) ?
            <View style={{
                       flex:1,flexDirection:'row',width: '45%', backgroundColor: '#EFEFEF',
                       alignItems: 'center', justifyContent: 'center',
                       position: 'absolute', height:'10%',
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


            <SafeAreaView style={styles.container}>
              
            <ScrollView style={styles.scrollView}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../src/Image/Prospect.png')} style={{  marginLeft: wp(2),top:hp(3) }}/>
    <Hoshi
    style={{width:wp('80%'),borderBottomColor:'rgb(19,111,232)',marginLeft:wp(4),borderBottomWidth:hp(0.1),}}
    label={'Prospect Name'}
    borderColor={'rgb(19,111,232)'}
    borderHeight={1}
    inputPadding={16}
    height={hp(5)}
    labelStyle={{ fontSize:hp(2) }}
    inputStyle={{ color: 'black',fontSize:hp(2.5), }}
    backgroundColor={'transparent'}
    onChangeText={name_of_prospect => this.setState({ name_of_prospect })}
    value={this.state.name_of_prospect}
  />
    </View>

    <View style={{flexDirection:'row'}}>
        <Image source={require('../src/Image/Location.png')} style={{ marginLeft: wp(2),top:hp(2) }}/>
    <Hoshi
    style={{width:wp('80%'),borderBottomColor:'rgb(19,111,232)',marginLeft: wp(4),borderBottomWidth:hp(0.1)}}
    label={'Address'}
    borderColor={'rgb(19,111,232)'}
    borderHeight={1}
    inputPadding={16}
    height={hp(5)}
    labelStyle={{ fontSize:hp(2) }}
    inputStyle={{ color: 'black',fontSize:hp(2.5), }}
    backgroundColor={'transparent'}
    onChangeText={address_location => this.setState({ address_location })}
                  value={this.state.address_location}
  />
    </View>
     <View style={{flexDirection:'row'}}>
         <View style={{flexDirection:'row'}}>
         <Image source={require('../src/Image/Industry.png')} style={{ marginLeft: wp(2),top:hp(4) }}/>  
     <Dropdown
               containerStyle={{width:wp('35%'),left:wp('3%'),}}
               inputContainerStyle={{ borderBottomWidth:wp(0.2),borderBottomColor:"rgb(19,111,232)",fontSize:hp(2) }}
               data={this.state.leadIndustryOptions}
               valueExtractor={({id})=> id}
              labelExtractor={({industry_name})=> industry_name}
               label='Select Industry'
               onChangeText={leadIndustryOptions_id => this.setState({ leadIndustryOptions_id })}
             />
        </View>
        <View style={{flexDirection:'row',left:wp(10)}}>
        <Image source={require('../src/Image/Source.png')} style={{  marginRight: 0,top:hp(4) }}/> 
    <Dropdown
               containerStyle={{width:wp('32%'),left:wp('2%'),}}
               inputContainerStyle={{ borderBottomWidth:wp(0.2),borderBottomColor:"rgb(19,111,232)",fontSize:hp(2) }}
               data={this.state.leadSourceOptions} 
               valueExtractor={({id})=> id}
              labelExtractor={({source_name})=> source_name}
               label='Select Source'
               onChangeText={leadSourceOptions_id => this.setState({ leadSourceOptions_id })}
             />
        </View>
     </View>
       <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',top:hp(3)}}>
       <TouchableOpacity style={{right:'0%',top:'0%'}} onPress={context.goverment}>
            {this.state.business_type== 1 ?
            <Image source={require('../src/Image/radio_on.png')} style={{ width: wp(7), height: hp(4), marginLeft:wp(0),top:0 }}/>
        :
        <Image source={require('../src/Image/radio_off.png')} style={{ width: wp(7), height:hp(4), marginLeft: wp(0),top:0 }}/>
        }
            </TouchableOpacity> 
            <Text style={{color:'rgb(19,111,232)'}}>Government Business</Text>

            <TouchableOpacity style={{right:'0%',top:'0%'}} onPress={context.corporate}>
            {this.state.business_type== 2 ?
            <Image source={require('../src/Image/radio_on.png')} style={{ width: wp(7), height: hp(4), marginLeft: wp(1),top:0 }}/>
        :
        <Image source={require('../src/Image/radio_off.png')} style={{ width: wp(7), height: hp(4), marginLeft: wp(1),top:0 }}/>
        }
            </TouchableOpacity> 
            <Text style={{color:'rgb(19,111,232)'}}>Corporate Business</Text>
       </View>

       <View style={styles.pagecomponent_nine}>
           
              <Text style={{top:hp(4.5),backgroundColor:'white',color:'rgb(19,111,232)'}}>    Contect Person Detail    </Text>
              <View style={{top:hp(5)}}>
              <View style={{flexDirection:'row'}}>
        <Image source={require('../src/Image/name.png')} style={{ top:hp(2.5) }}/>
    <Hoshi
    style={{width:wp('70%'),borderBottomColor:'rgb(19,111,232)',marginLeft:wp(3) ,borderBottomWidth:1,}}
    label={'Name'}
    borderColor={'rgb(19,111,232)'}
    borderHeight={1}
    inputPadding={16}
    height={35}
    labelStyle={{ fontSize:14 }}
    inputStyle={{ color: 'black',fontSize:15, }}
    backgroundColor={'transparent'}
    onChangeText={contact_person_name => this.setState({ contact_person_name })}
                  value={this.state.contact_person_name}
  />
    </View>
    <View style={{flexDirection:'row'}}>
        <Image source={require('../src/Image/mail.png')} style={{ top:hp(4) }}/>
    <Hoshi
    style={{width:wp('70%'),borderBottomColor:'rgb(19,111,232)',marginLeft:wp(3) ,borderBottomWidth:1,}}
    label={'E-Mail'}
    borderColor={'rgb(19,111,232)'}
    borderHeight={1}
    inputPadding={16}
    height={35}
    labelStyle={{ fontSize:14 }}
    inputStyle={{ color: 'black',fontSize:15, }}
    backgroundColor={'transparent'}
    onChangeText={contact_person_email => this.setState({ contact_person_email })}
                  value={this.state.contact_person_email}
  />
    </View>
    <View style={{flexDirection:'row'}}>
        <Image source={require('../src/Image/phone.png')} style={{ top:hp(3) }}/>
    <Hoshi
    style={{width:wp('70%'),borderBottomColor:'rgb(19,111,232)',marginLeft:wp(3) ,borderBottomWidth:1,}}
    label={'Mobile Number'}
    keyboardType="numeric"
    borderColor={'rgb(19,111,232)'}
    borderHeight={1}
    inputPadding={16}
    height={35}
    labelStyle={{ fontSize:14 }}
    inputStyle={{ color: 'black',fontSize:15, }}
    backgroundColor={'transparent'}
    onChangeText={contact_person_mobile_number => this.setState({ contact_person_mobile_number })}
                  value={this.state.contact_person_mobile_number}
  />
    </View>
    <View style={{flexDirection:'row',marginBottom:20}}>
        <Image source={require('../src/Image/phone.png')} style={{ top:hp(3) }}/>
    <Hoshi
    style={{width:wp('70%'),borderBottomColor:'rgb(19,111,232)',marginLeft:wp(3) ,borderBottomWidth:1,}}
    label={'Alternet Number'}
    keyboardType="numeric"
    borderColor={'rgb(19,111,232)'}
    borderHeight={1}
    inputPadding={16}
    height={35}
    labelStyle={{ fontSize:14 }}
    inputStyle={{ color: 'black',fontSize:15, }}
    backgroundColor={'transparent'}
    onChangeText={contact_person_alternate_mobile_number => this.setState({ contact_person_alternate_mobile_number })}
                  value={this.state.contact_person_alternate_mobile_number}
  />
  </View>
    </View>
   </View>
     
   <View style={{flexDirection:'row',alignItems:'center',margin:10,}}>
                <View>
            <DatePicker
                style={{width:wp ('90%'),left:10}}
                date={this.state.dateTime}
                mode="datetime"
                placeholder="Due Date: (for meeting, pre-bid, tender,...etc.)"
                format="DD/MM/YYYY hh:mm"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                
                onDateChange={(date) => {this.setState({dateTime: date})}}
              />
              <View style={{backgroundColor:'rgb(19,111,232)',height:'1.4%',width:'100%',top:'0%',left:'4%'}}/>
             </View>
            
              
            </View>
    
            <View style={{flexDirection:'row',marginBottom:20}}>
        <Image source={require('../src/Image/Services.png')} style={{  marginLeft: wp(2),top:hp(3) }}/>
    <Hoshi
    style={{width:wp('80%'),borderBottomColor:'rgb(19,111,232)',marginLeft:wp(2),borderBottomWidth:hp(0.1),}}
    label={'Service Required'}
    borderColor={'rgb(19,111,232)'}
    borderHeight={1}
    inputPadding={16}
    height={hp(5)}
    labelStyle={{ fontSize:hp(2) }}
    inputStyle={{ color: 'black',fontSize:hp(2.5), }}
    backgroundColor={'transparent'}
    onChangeText={services_required => this.setState({ services_required })}
                  value={this.state.services_required}
  />
    </View>
    
    <View style={styles.card_view_thrd}>
        <Text style={{top:20,color:'white'}}>Service Description</Text>
       <Image source={LeftSide} style={{left:wp(24),bottom:hp('1.2%'),height:hp('5%'),width:wp('10%'),borderColor:'black',alignItems:'center'}}/>
       </View>
    
              <TextInput
                  style={{ height: 50, borderColor: 'rgb(19,111,232)',borderRadius:10, borderWidth: 1, top:15,width:'90%',fontSize:15,left:15 }}
                  placeholder={''}
                  keyboardType="default"
                  onChangeText={service_description => this.setState({ service_description })}
                  value={this.state.service_description}
                />
   
   
                  
                 
                    <View style={{top:'5%',left:'0%'}}>
                  
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.button}
          onPress={this.SingleFilePicker.bind(this)}>
          <Text style={{color:'black',top:'15%',left:'30%'}}>
          {this.state.singleFileOBJ.name ? this.state.singleFileOBJ.name : 'Choose file (Optional)'}
          </Text>
        </TouchableOpacity>
        </View>
       
       
   
    <View style={{height:'50%',top:60,paddingBottom:200}}>
              <TouchableOpacity style={{alignItems:'center',height:'100%'}} onPress={()=>this.store_lead()}>
                        <LinearGradient 
                                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                        colors={['#5434ff', '#21bbff']}
                                        style={{paddingTop:10,paddingBottom:10,paddingLeft:30,paddingRight:30,borderRadius: 20,}} >
                        <Text style={{fontSize:15,color:'white',}}>SAVE</Text>
                        </LinearGradient>
              </TouchableOpacity>
    </View>

    </ScrollView>
    </SafeAreaView>
    </View>
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
button: {
  width:'90%',
  color: '#DCE4EF',
  marginLeft:15,
  marginRight:5,
  marginBottom: 0,
  paddingTop:5,
  paddingBottom:10,
  paddingLeft:0,
  paddingRight:0,
  backgroundColor:'transparent',
  borderRadius:20,
  borderWidth: 1,
  borderColor: 'rgb(19,111,232)',
  elevation: 0,
},
});
