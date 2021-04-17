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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {IOS_StatusBar, getWidthnHeight, getMarginTop} from '../KulbirComponents/common'

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
         const {screen} = this.props;
         console.log(this.state.leadSourceOptions_id)
         let status = [{value: 'all',}, {value: 'Today Tasks',}, {value: 'Delayed Tasks',},{value: 'Upcoming Tasks', },{value: "This Week's Tasks",},{value: "This Month's Tasks",},];

         var Comment = (context.props.Comment);
         var Name = (context.props.name);
         let gradient = ['#E5314E', '#E5314E'];
  return (
          <View style={{height:viewportHeight,width:viewportWidth,backgroundColor:'#e6e6e6'}}>
              <IOS_StatusBar color={gradient} barStyle="light-content"/>
                  <Header titleFirstFloor='View All' titleGroundFloor='Comments' onPress={() => Actions.popTo(screen)} source={require('../Image/icons8-back-26.png')} style={{width: 20, height: 20, marginLeft: 10}}/>
                      <View style={[styles.MainContainer, getMarginTop(8)]}>
                          <ScrollView>
                              {Comment.map((item) => {
                                var date, TimeType, hour, minutes, seconds, fullTime;
                                date = new Date();
                                hour = item.created_at.substring(11,13)
                                if(hour <= 11)
                                {
                                  TimeType = 'AM';
                                }
                                else{
                                  TimeType = 'PM';
                                }
                                if( hour > 12 )
                                {
                                  hour = hour - 12;
                                }
                                if( hour == 0 )
                                {
                                    hour = 12;
                                }
                                minutes = item.created_at.substring(14,16)
                                if(minutes < 10)
                                {
                                  minutes = '0' + minutes.toString();
                                }
                                seconds = date.getSeconds();
                                if(seconds < 10)
                                {
                                  seconds = '0' + seconds.toString();
                                }
                                fullTime = hour.toString() +':'+ minutes.toString() +' ' + TimeType.toString();
                              
                                var year = item.created_at.substring(0,4)
                                var month = item.created_at.substring(5,7)
                                var day = item.created_at.substring(8,10)
                                var date = day+'/'+month+'/'+year;

                                console.log("fullTime",item.created_at.substring(14,16))
                                return(
                                    <View style={[{flexDirection:'row', justifyContent: 'space-evenly', marginVertical: 20, borderColor: 'red', borderWidth: 0}, getWidthnHeight(90)]}>
                                        <View style={{flex: 1, alignItems: 'center'}}>
                                            <View style={{borderColor:'#e5314e',borderWidth:0,borderRadius:75,height:40,width:40,alignItems:'center'}}>
                                                <Image source={require('../Image/grayCommentUser.png')} style={{height:30,width:24,bottom:0,borderColor:'black'}}/>
                                            </View>
                                        </View>
                                        <View style={{flex: 3}}>
                                            <View>
                                                <Text style={{color:'gray',fontStyle: 'italic',}}>{date}</Text>
                                            </View>
                                            <View style={{flexDirection:'row', borderColor: 'green', borderWidth: 0, justifyContent: 'space-between'}}>
                                                <Text style={{fontWeight:'bold', flex: 2}}>{item.user_employee.fullname}</Text>
                                                <Text style={{color:'#e5314e',fontStyle: 'italic', flex: 1, textAlign: 'right', borderWidth: 0, borderColor: 'black'}}>{fullTime}</Text>
                                            </View>
                                            <View style={[{borderWidth: 0, borderColor: 'black'}, getWidthnHeight(60)]}>
                                                <Text>{item.comments} {"\n"}{"\n"}</Text>
                                            </View>
                                        </View>
                                    </View>
                                );
                              })}
                          </ScrollView>
                      </View>
                  </View>
    );
}

}
const styles = StyleSheet.create({
    MainContainer:{
        flex: 1,
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
        flexDirection:'column',
        width:wp('100%'),
        height:hp('90%'),
    }
});
