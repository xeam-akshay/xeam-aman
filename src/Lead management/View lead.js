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
import LinearGradient from 'react-native-linear-gradient';
import { SegmentedControls } from 'react-native-radio-buttons'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import { Hoshi } from 'react-native-textinput-effects';
// import time from '../Image/menu.png'

import LeftSide from '../Image/side.png';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class App extends Component {
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
        services_required:''
    };
  }

  
  render (){
         const context=this;
         console.log(this.state.leadSourceOptions_id)
         let status = [{value: 'all',}, {value: 'Today Tasks',}, {value: 'Delayed Tasks',},{value: 'Upcoming Tasks', },{value: "This Week's Tasks",},{value: "This Month's Tasks",},];

        var ViewLead = (context.props.view_lead);
        console.log("***PROPS: ", ViewLead.industry)
  return (
    <View style={{height:viewportHeight,width:viewportWidth,backgroundColor:'white'}}>
    <View style={{backgroundColor:'rgb(19,111,232)',height:hp('10%')}}>
            <View style={{top:hp(4),left:wp(15)}}>
             <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>View Lead</Text>
              </View>
            <TouchableOpacity style={{right:'0%',top:'0%'}} onPress={() => context.props.navigation.navigate("Lead list")}>
           <Image source={require('../Image/back.png')} style={{ width: wp(8), height: hp(5), marginLeft:wp(2),top:0 }}/>
            </TouchableOpacity>
            </View>
            <View style={styles.pagecomponent_thrd}>
            <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={{marginTop: wp(5),marginBottom: wp(5)}}>
                    <View style={{marginLeft: wp(5),marginRight: wp(5)}}>
                        <Text>Prospect Name</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={require('../Image/Prospect.png')} style={{  marginRight: wp(2),top:hp(0) }}/>
                                    <Text style={{fontSize:16,width:'85%'}}>{ViewLead.name_of_prospect} </Text>       
                                </View>
                        <View style={{borderTopWidth:0.6,borderTopColor:'black',top:hp(1)}}></View>
                    </View>

                    <View style={{marginLeft: wp(5),marginRight: wp(5),marginTop: wp(5)}}>
                        <Text>Address</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={require('../Image/Location.png')} style={{  marginRight: wp(2),top:hp(0) }}/>
                                    <Text style={{fontSize:16,width:'85%'}}>{ViewLead.address_location}</Text>       
                                </View>
                        <View style={{borderTopWidth:0.6,borderTopColor:'black',top:hp(1)}}></View>
                    </View>

                    <View style={{marginLeft: wp(5),marginRight: wp(5),marginTop: wp(5)}}>
                        <Text>Industry</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={require('../Image/Industry.png')} style={{  marginRight: wp(2),top:hp(0) }}/>
                                    <Text style={{fontSize:16,width:'85%'}}>{ViewLead.industry == null ? '--' : ViewLead.industry.industry_name }</Text>       
                                </View>
                        <View style={{borderTopWidth:0.6,borderTopColor:'black',top:hp(1)}}></View>
                    </View>

                    <View style={{marginLeft: wp(5),marginRight: wp(5),marginTop: wp(5)}}>
                        <Text>Source | Lead Type</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={require('../Image/Source.png')} style={{  marginRight: wp(2),top:hp(0) }}/>
                                    <Text style={{fontSize:16,width:'85%'}}>{ViewLead.source.source_name}</Text>       
                                </View>
                        <View style={{borderTopWidth:0.6,borderTopColor:'black',top:hp(1)}}></View>
                    </View>

                    <Text style={{fontWeight:'bold',marginLeft: wp(5),marginRight: wp(5),marginTop: wp(5)}}>Contect Person Detail</Text>

                    <View style={{marginLeft: wp(5),marginRight: wp(5),marginTop: wp(5)}}>
                        <Text>Name</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={require('../Image/name.png')} style={{  marginRight: wp(2),top:hp(0) }}/>
                                    <Text style={{fontSize:16,width:'85%'}}>{ViewLead.contact_person_name}</Text>       
                                </View>
                        <View style={{borderTopWidth:0.6,borderTopColor:'black',top:hp(1)}}></View>
                    </View>

                    <View style={{marginLeft: wp(5),marginRight: wp(5),marginTop: wp(5)}}>
                        <Text>Email</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={require('../Image/mail.png')} style={{  marginRight: wp(2),top:hp(0) }}/>
                                    <Text style={{fontSize:16,width:'85%'}}>{ViewLead.email}</Text>       
                                </View>
                        <View style={{borderTopWidth:0.6,borderTopColor:'black',top:hp(1)}}></View>
                    </View>

                    <View style={{marginLeft: wp(5),marginRight: wp(5),marginTop: wp(5)}}>
                        <Text>Mobile | Alternative Mobile</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={require('../Image/phone.png')} style={{  marginRight: wp(2),top:hp(0) }}/>
                                    <Text style={{fontSize:16,width:'85%'}}>{ViewLead.contact_person_no} , {ViewLead.alternate_contact_no}</Text>       
                                </View>
                        <View style={{borderTopWidth:0.6,borderTopColor:'black',top:hp(1)}}></View>
                    </View>

                    <View style={{marginLeft: wp(5),marginRight: wp(5),marginTop: wp(5)}}>
                        <Text>Date & Time</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={require('../Image/Source.png')} style={{  marginRight: wp(2),top:hp(0) }}/>
                                    <Text style={{fontSize:16,width:'85%'}}>{ViewLead.due_date}</Text>       
                                </View>
                        <View style={{borderTopWidth:0.6,borderTopColor:'black',top:hp(1)}}></View>
                    </View>

                    <View style={{marginLeft: wp(5),marginRight: wp(5),marginTop: wp(5)}}>
                        <Text>Service Required</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={require('../Image/Services.png')} style={{  marginRight: wp(2),top:hp(0) }}/>
                                    <Text style={{fontSize:16,width:'85%'}}>{ViewLead.service_required}</Text>       
                                </View>
                        <View style={{borderTopWidth:0.6,borderTopColor:'black',top:hp(1)}}></View>
                    </View>

                    <View style={{marginLeft: wp(5),marginRight: wp(5),marginTop: wp(5)}}>
                        <Text>Service Description</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={require('../Image/Services.png')} style={{  marginRight: wp(2),top:hp(0) }}/>
                                    <Text style={{fontSize:16,width:'85%'}}>{ViewLead.service_description}</Text>       
                                </View>
                        <View style={{borderTopWidth:0.6,borderTopColor:'black',top:hp(1)}}></View>
                    </View>

                    <View style={{marginLeft: wp(5),marginRight: wp(5),marginTop: wp(5)}}>
                        <Text>File</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={require('../Image/Services.png')} style={{  marginRight: wp(2),top:hp(0) }}/>
                                    <Text style={{fontSize:16,width:'85%'}}>{ViewLead.file_name}</Text>       
                                </View>
                        <View style={{borderTopWidth:0.6,borderTopColor:'black',top:hp(1)}}></View>
                    </View>

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
});
