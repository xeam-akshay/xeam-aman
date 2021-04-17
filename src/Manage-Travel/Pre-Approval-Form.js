import React from 'react';
import {
  Image,
  Platform,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  ScrollView,
  Alert,
  Keyboard, 
  TouchableWithoutFeedback,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  CommonModal, IOS_StatusBar, getMarginTop, getMarginBottom, getWidthnHeight,fontSizeH4,
  FloatingTitleTextInputField, getMarginVertical, DateSelector, WaveHeader, fontSizeH3, ItineraryModal,
  TimePicker, RoundButton, RadioEnable, RadioDisable, AlertBox, DismissKeyboard, getMarginLeft, Date, MySwitch
} from '../KulbirComponents/common';

const colorBase = '#25A2F9';
const colorTitle = '#0B8EE8';


export default class Pre_Approval_Form extends React.Component {

  constructor() {
    super();
    this.myTextInput = React.createRef();
    this.state = {
      purpose:'',
      dateTime:'',
      switchpolicy: false,
      switchStay: false,
      switchImprest: false,
      itinerarytoggle:false,
      staytoggle:false,
    };
  }

  itinerarytoggle = () => {
    const {itinerarytoggle} = this.state;
    this.setState({itinerarytoggle : !itinerarytoggle},()=>console.log('switchValue:',itinerarytoggle))
  }

  staytoggle = () => {
    const {staytoggle} = this.state;
    this.setState({staytoggle : !staytoggle},()=>console.log('staytoggle:',staytoggle))
  }


  render() {
    const {dateTime} = this.state
    let data = [{
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
    }];

    return (
          
            <DismissKeyboard>
              <View style={styles.container}>
                  <WaveHeader
                        wave={Platform.OS ==="ios" ? false : false} 
                        //logo={require('../Image/Logo-164.png')}
                        menu='white'
                        title='Travel Approval Form'
                        designby = {'aman'}
                        //version={`Version ${this.state.deviceVersion}`}
                  />
                  <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginVertical:15}}>
                    <View>
                      <Text style={{color: colorBase, textAlign: 'center', fontWeight: 'bold', fontFamily: ''}}>Note: Fields with  </Text>
                    </View>
                    <View style={{width: '5.2%',height: 20,borderRadius: 20/2, borderWidth:2,borderColor:colorBase, backgroundColor:colorBase, justifyContent:'center'}}>
                      <Text style={[{color: 'white', fontWeight: 'bold', fontFamily: '', fontSize:25 },getMarginTop(0.8), getMarginLeft(0.6)]}>*</Text>
                    </View>
                    <View >
                      <Text style={{color: colorBase, textAlign: 'center', fontWeight: 'bold', fontFamily: ''}}>  are mandatory</Text>
                    </View>
                  </View>
                  <View style={styles.MainContainer}>
                  <ScrollView>
                  <View style={{alignItems:'center'}}>
                  
                  <View style={[{alignItems: 'center', justifyContent: 'space-evenly', borderWidth: 0, borderColor: 'red'}, getWidthnHeight(100, 18), getMarginTop(3)]}>
                    
                  <View> 
                  <View>
                    <FloatingTitleTextInputField
                        attrName = 'purpose'
                        title = 'Travel Purpose*'
                        value = {this.state.purpose}
                        titleActiveColor = {colorTitle}
                        titleInactiveColor = 'dimgrey'
                        Border_Styling = {'false'}
                        //titleActiveSize = {13}
                        titleInActiveSize = {16}
                        updateMasterState = {(attrName, purpose) => {
                          this.setState({purpose})
                        }}
                        textInputStyles = {[{ // here you can add additional TextInput styles
                          color: 'black',
                          fontSize: 14,
                          paddingLeft: 10,
                        }, getWidthnHeight(undefined, 7)]}
                        containerStyle = {[getWidthnHeight(89, 10)]}
                    />
                  </View>
                  </View>
                  <View style={[styles.box]}>
                    <Dropdown
                        containerStyle={[{justifyContent: 'center', borderColor: 'grey', borderWidth: 0, paddingLeft: 0, borderRadius: 10, marginTop:-5}, getWidthnHeight(88.5, 7)]}
                        //  maxLength = {12}
                        inputContainerStyle={[{borderBottomWidth:0,fontSize:13, marginTop:4,alignSelf:'center'}, getWidthnHeight(85, 7.9)]}
                        label={'Travel category*'}
                        data={data}
                        //data={this.state.leadIndustryOptionsId}
                        //valueExtractor={({id})=> id}
                        //labelExtractor={({industry_name})=> industry_name}
                        //onChangeText={leadIndustryOptions_id => this.setState({ leadIndustryOptions_id }, () => console.log("INDUSTRY: ", this.state.leadIndustryOptions_id))}
                        //value={leadIndustryOptions_id}
                        //baseColor = {(data)? colorTitle : 'grey'}
                        //baseColor = {(leadIndustryOptions_id)? colorTitle : 'grey'}
                        //  selectedItemColor='#aaa'
                        //  textColor='#aaa'
                        //  itemColor='#aaa'
                        baseColor='grey'
                        pickerStyle={{borderWidth: 0}}
                        dropdownOffset={{ 'top': 25 }}
                        underline="transparent"
                    />
                  </View> 
                  </View>
                  <View>
                  <View style ={[{flexDirection:'row'},getWidthnHeight(89)]}> 
                  <View style={[{alignItems:'flex-start', marginTop:getMarginTop(2).marginTop}]}>
                    <Text style={[{color:"#3280E4", fontWeight:'bold'}, fontSizeH4()]}>ITINERARY DETAILS</Text>
                  </View>
                  <View style={[{borderColor: colorBase,}]}/>
                      <RoundButton 
                        title="View All"
                        onPress={()=>this.itinerarytoggle()}
                        gradient={['#3280E4', '#3280E4']}
                        style={[getWidthnHeight(30, 4), getMarginTop(1),getMarginLeft(3)]}
                      />
                
                  </View>
                  
                  </View>
                  {(this.state.itinerarytoggle)? 
                  <ItineraryModal 
                  containerstyle = {{height:getWidthnHeight(undefined,29).height}}
                  isvisible={this.state.itinerarytoggle}
                  toggle={() => this.itinerarytoggle()}
                  style = {{backgroundColor:'#3180E5'}}
                  iconfirst = {'arrow-right-l'}
                  title = {'Itinerary Details'}
                  textboxtitle = {'Conveyance:'}
                  textinputdata = {'Own car -Diesel[4.5/km]'}
                  inputbgStyle = {{backgroundColor:'#DAE7F7'}}
                  iconname_1 = {'route'}
                  iconsize_1 = {18}
                  iconcolor_1 = {'white'}
                  iconbgColor_1 = {{backgroundColor:'#F48D88'}}
                  textboxvalue_1 = {'10Km'}
                  textboxplaceholder_1 = {'Distance'}
                  boxcontainerStyle_1 = {{backgroundColor:'#EB3A32'}}
                  iconname_2 = {'money-bill-alt'}
                  iconsize_2 = {18}
                  iconcolor_2 = {'white'}
                  iconbgColor_2 = {{backgroundColor:'#EAA74E'}}
                  textboxvalue_2 = {'10000/-'}
                  textboxplaceholder_2 = {'Amount'}
                  boxcontainerStyle_2 = {{backgroundColor:'#E58E1B'}}
                  textmarginleft = {[getMarginLeft(4.5)]}
                  /> : null}
                  <View style={styles.bigbox}>
                    <View style={[{flexDirection:'row'}]}>
                    <Date 
                              containerStyle={[{borderWidth: 1, borderColor: '#BABABA', borderRadius: 0, justifyContent: 'center'}, getWidthnHeight(42, 7), getMarginTop(1.5), getMarginLeft(2)]}
                              style={[(dateTime === '')? {borderWidth: 0, borderColor: 'green', width: getWidthnHeight(42).width} : {fontSize: 12, width: getWidthnHeight(42).width}]}
                              date={this.state.dateTime}
                              //clearDate={(dateTime === '')? false : true}
                              onPress={() => this.setState({dateTime: '', dueTimeError: true, dateOrTimeValue: null, dateNTime: ''})}
                              dateFont={{fontSize: 14}}
                              androidMode='default'
                              mode='date'
                              placeholder='Date'
                              format='DD/MM/YYYY'
                              onDateChange={(date) => {this.setState({dateTime: date})}} 
                          />
                    <View style={[styles.Dropbox]}>
                    <Dropdown
                        containerStyle={[{justifyContent: 'center', borderColor: 'grey', borderWidth: 0, paddingLeft: 0, borderRadius: 10, marginTop:-5}, getWidthnHeight(88.5, 7)]}
                        //  maxLength = {12}
                        inputContainerStyle={[{borderBottomWidth:0, marginTop:4,alignSelf:'center'}, getWidthnHeight(40, 7.9)]}
                        label={'Conveyance Type*'}
                        data={data}
                        //data={this.state.leadIndustryOptionsId}
                        //valueExtractor={({id})=> id}
                        //labelExtractor={({industry_name})=> industry_name}
                        //onChangeText={leadIndustryOptions_id => this.setState({ leadIndustryOptions_id }, () => console.log("INDUSTRY: ", this.state.leadIndustryOptions_id))}
                        //value={leadIndustryOptions_id}
                        //baseColor = {(data)? colorTitle : 'grey'}
                        //baseColor = {(leadIndustryOptions_id)? colorTitle : 'grey'}
                        //  selectedItemColor='#aaa'
                        //  textColor='#aaa'
                        //  itemColor='#aaa'
                        baseColor='grey'
                        pickerStyle={{borderWidth: 0}}
                        dropdownOffset={{ 'top': 25 }}
                        fontSize = {13.5}
                    />
                    </View> 
                    </View>  
                    <View style={[{flexDirection:'row'}]}>
                    <View style={[styles.Dropbox]}>  
                    <Dropdown
                        containerStyle={[{justifyContent: 'center', borderColor: 'grey', borderWidth: 0, paddingLeft: 0, borderRadius: 10,}, getWidthnHeight(88.5, 7.5), getMarginTop(-0.8)]}
                        //  maxLength = {12}
                        inputContainerStyle={[{borderBottomWidth:0, marginTop:4,alignSelf:'center'}, getWidthnHeight(38, 7.9), getMarginLeft(1.5)]}
                        label={'City (from)*'}
                        data={data}
                        //data={this.state.leadIndustryOptionsId}
                        //valueExtractor={({id})=> id}
                        //labelExtractor={({industry_name})=> industry_name}
                        //onChangeText={leadIndustryOptions_id => this.setState({ leadIndustryOptions_id }, () => console.log("INDUSTRY: ", this.state.leadIndustryOptions_id))}
                        //value={leadIndustryOptions_id}
                        //baseColor = {(data)? colorTitle : 'grey'}
                        //baseColor = {(leadIndustryOptions_id)? colorTitle : 'grey'}
                        //  selectedItemColor='#aaa'
                        //  textColor='#aaa'
                        //  itemColor='#aaa'
                        baseColor='grey'
                        pickerStyle={{borderWidth: 0}}
                        dropdownOffset={{ 'top': 25 }}
                        fontSize = {13.5}
                    />
                    </View>  
                    <View style={[styles.Dropbox]}>
                    <Dropdown
                        containerStyle={[{justifyContent: 'center', borderColor: 'grey', borderWidth: 0, paddingLeft: 0, borderRadius: 10}, getWidthnHeight(88.5, 7), getMarginTop(-0.8)]}
                        //  maxLength = {12}
                        inputContainerStyle={[{borderBottomWidth:0, marginTop:4,alignSelf:'center'}, getWidthnHeight(38, 7.9), getMarginLeft(1.5)]}
                        label={'City (to)*'}
                        data={data}
                        //data={this.state.leadIndustryOptionsId}
                        //valueExtractor={({id})=> id}
                        //labelExtractor={({industry_name})=> industry_name}
                        //onChangeText={leadIndustryOptions_id => this.setState({ leadIndustryOptions_id }, () => console.log("INDUSTRY: ", this.state.leadIndustryOptions_id))}
                        //value={leadIndustryOptions_id}
                        //baseColor = {(data)? colorTitle : 'grey'}
                        //baseColor = {(leadIndustryOptions_id)? colorTitle : 'grey'}
                        //  selectedItemColor='#aaa'
                        //  textColor='#aaa'
                        //  itemColor='#aaa'
                        baseColor='grey'
                        pickerStyle={{borderWidth: 0}}
                        dropdownOffset={{ 'top': 25 }}
                        fontSize = {13.5}
                    />
                    </View> 
                    </View> 
                    <View style={[{flexDirection:'row'}]}>
                    <View style={[styles.InputBox]}>
                    <FloatingTitleTextInputField
                        attrName = 'purpose'
                        title = 'Distance (in k.m)*'
                        value = {this.state.purpose}
                        titleActiveColor = {colorTitle}
                        titleInactiveColor = 'dimgrey'
                        Border_Styling = {'false'}
                        //titleActiveSize = {13}
                        titleInActiveSize = {13.5}
                        updateMasterState = {(attrName, purpose) => {
                          this.setState({purpose})
                        }}
                        textInputStyles = {[{ // here you can add additional TextInput styles
                          color: 'black',
                          fontSize: 14,
                          borderWidth:0,
                          width:getWidthnHeight(42).width,
                          paddingLeft:10,
                          paddingTop:15
                        }]}
                        keyboardType = {'numeric'}
                    />
                    </View>
                    <View style={[styles.InputBox]}>
                    <FloatingTitleTextInputField
                          attrName = 'purpose'
                          title = 'Amount'
                          value = {this.state.purpose}
                          titleActiveColor = {colorTitle}
                          titleInactiveColor = 'dimgrey'
                          Border_Styling = {'false'}
                          //titleActiveSize = {13}
                          titleInActiveSize = {13.5}
                          updateMasterState = {(attrName, purpose) => {
                            this.setState({purpose})
                          }}
                          textInputStyles = {[{ // here you can add additional TextInput styles
                            color: 'black',
                            fontSize: 14,
                            borderWidth:0,
                            width:getWidthnHeight(42).width,
                            paddingLeft:10,
                            paddingTop:15
                          }]}
                          keyboardType = {'numeric'}
                      />
                    </View> 
                    </View>  
                    <View style={[{alignItems: 'center', justifyContent: 'center'},getMarginTop(1.3)]}>
                      <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity style={[{flexDirection:'row', justifyContent: 'center', }]}>
                        <View style={[{justifyContent: 'center', alignItems: 'center', backgroundColor:'#3280E4',borderRightWidth:2, borderRightColor:'white', borderTopLeftRadius:10, borderBottomLeftRadius:10}, getWidthnHeight(4,5)]}/>
                            <View style={[{ justifyContent: 'center', alignItems: 'center', backgroundColor:'#3280E4'}, getWidthnHeight(20,5)]}>
                            <Text style = {{color:'white', fontWeight:"bold"}}>SUBMIT</Text>
                            </View>
                            <View style={[{justifyContent: 'center', alignItems: 'center', backgroundColor:'#3280E4',borderLeftWidth:2, borderLeftColor:'white', borderTopRightRadius:10, borderBottomRightRadius:10}, getWidthnHeight(4,5)]}/>
                        </TouchableOpacity>
                        </View>  
                    </View> 
                  </View>
                  {/* End Big Box */}
                  </View>  
                
                <MySwitch
                            title = 'Covered under policy*'
                            value={this.state.switchpolicy}
                            onValueChange ={(switchpolicy)=>this.setState({switchpolicy},()=>console.log('switchValue:',switchpolicy))}
                            disabled={false}
                            />
                <View style={{borderWidth:0.3,borderColor:'#BABABA', marginTop:getMarginTop(1).marginTop, width:getWidthnHeight(90).width, marginLeft:getMarginLeft(5).marginLeft}}/>            
                <MySwitch
                            title = 'Stay*'
                            value={this.state.switchStay}
                            onValueChange ={(switchStay)=>this.setState({switchStay},()=>console.log('switchValue:',switchStay))}
                            disabled={false}
                            />
                {(this.state.switchStay)?
                <View style = {[{alignItems:'center', justifyContent:'center'}]}>
                      <View style ={[{flexDirection:'row'},getWidthnHeight(89)]}> 
                        <View style={[{alignItems:'flex-start', marginTop:getMarginTop(2).marginTop}]}>
                          <Text style={[{color:"#3280E4", fontWeight:'bold'}, fontSizeH4()]}>STAY DETAILS</Text>
                        </View>
                        <View style={[{borderColor: colorBase,}]}/>
                        <RoundButton 
                              title="View All"
                              onPress={()=>this.staytoggle()}
                              gradient={['#3280E4', '#3280E4']}
                              style={[getWidthnHeight(30, 4), getMarginTop(1),getMarginLeft(3)]}
                        />
                      </View>
                      {(this.state.staytoggle)? 
                  <ItineraryModal 
                  containerstyle = {{height:getWidthnHeight(undefined,25).height}}
                  isvisible={this.state.staytoggle}
                  toggle={() => this.staytoggle()}
                  style = {{backgroundColor:'#3180E5'}}
                  title = {'Stay Details       '}
                  inputbgStyle = {{backgroundColor:'#DAE7F7'}}
                  iconname_1 = {'bed'}
                  iconsize_1 = {18}
                  iconcolor_1 = {'white'}
                  iconbgColor_1 = {{backgroundColor:'#F48D88'}}
                  textboxvalue_1 = {'700/-'}
                  textboxplaceholder_1 = {'Stay/Night'}
                  boxcontainerStyle_1 = {{backgroundColor:'#EB3A32'}}
                  iconname_2 = {'hand-holding-usd'}
                  iconsize_2 = {18}
                  iconcolor_2 = {'white'}
                  iconbgColor_2 = {{backgroundColor:'#EAA74E'}}
                  textboxvalue_2 = {'300/-'}
                  textboxplaceholder_2 = {'Food Exp'}
                  boxcontainerStyle_2 = {{backgroundColor:'#E58E1B'}}
                  textmarginleft = {[getMarginLeft(4.5)]}
                  /> : null}
                    <View style={styles.bigbox}>
                      <View style={[{flexDirection:'row'}]}>
                      <Date 
                                containerStyle={[{borderWidth: 1, borderColor: '#BABABA', borderRadius: 0, justifyContent: 'center'}, getWidthnHeight(42, 7), getMarginTop(1.5), getMarginLeft(2)]}
                                style={[(dateTime === '')? {borderWidth: 0, borderColor: 'green', width: getWidthnHeight(42).width} : {fontSize: 12, width: getWidthnHeight(42).width}]}
                                date={this.state.dateTime}
                                //clearDate={(dateTime === '')? false : true}
                                onPress={() => this.setState({dateTime: '', dueTimeError: true, dateOrTimeValue: null, dateNTime: ''})}
                                dateFont={{fontSize: 14}}
                                androidMode='default'
                                mode='date'
                                placeholder='Date'
                                format='DD/MM/YYYY'
                                onDateChange={(date) => {this.setState({dateTime: date})}} 
                            />
                      <View style={[styles.Dropbox]}>
                      <Dropdown
                          containerStyle={[{justifyContent: 'center', borderColor: 'grey', borderWidth: 0, paddingLeft: 0, borderRadius: 10, marginTop:-5}, getWidthnHeight(88.5, 7)]}
                          //  maxLength = {12}
                          inputContainerStyle={[{borderBottomWidth:0, marginTop:4,alignSelf:'center'}, getWidthnHeight(37, 7.9)]}
                          label={'State'}
                          data={data}
                          //data={this.state.leadIndustryOptionsId}
                          //valueExtractor={({id})=> id}
                          //labelExtractor={({industry_name})=> industry_name}
                          //onChangeText={leadIndustryOptions_id => this.setState({ leadIndustryOptions_id }, () => console.log("INDUSTRY: ", this.state.leadIndustryOptions_id))}
                          //value={leadIndustryOptions_id}
                          //baseColor = {(data)? colorTitle : 'grey'}
                          //baseColor = {(leadIndustryOptions_id)? colorTitle : 'grey'}
                          //  selectedItemColor='#aaa'
                          //  textColor='#aaa'
                          //  itemColor='#aaa'
                          baseColor='grey'
                          pickerStyle={{borderWidth: 0}}
                          dropdownOffset={{ 'top': 25 }}
                          fontSize = {13.5}
                      />
                      </View> 
                      </View>  
                      <View style={[{flexDirection:'row'}]}>
                      <View style={[styles.Dropbox]}>  
                      <Dropdown
                          containerStyle={[{justifyContent: 'center', borderColor: 'grey', borderWidth: 0, paddingLeft: 0, borderRadius: 10,}, getWidthnHeight(88.5, 7.5), getMarginTop(-0.8)]}
                          //  maxLength = {12}
                          inputContainerStyle={[{borderBottomWidth:0, marginTop:4,alignSelf:'center'}, getWidthnHeight(38, 7.9), getMarginLeft(1.5)]}
                          label={'City'}
                          data={data}
                          //data={this.state.leadIndustryOptionsId}
                          //valueExtractor={({id})=> id}
                          //labelExtractor={({industry_name})=> industry_name}
                          //onChangeText={leadIndustryOptions_id => this.setState({ leadIndustryOptions_id }, () => console.log("INDUSTRY: ", this.state.leadIndustryOptions_id))}
                          //value={leadIndustryOptions_id}
                          //baseColor = {(data)? colorTitle : 'grey'}
                          //baseColor = {(leadIndustryOptions_id)? colorTitle : 'grey'}
                          //  selectedItemColor='#aaa'
                          //  textColor='#aaa'
                          //  itemColor='#aaa'
                          baseColor='grey'
                          pickerStyle={{borderWidth: 0}}
                          dropdownOffset={{ 'top': 25 }}
                          fontSize = {13.5}
                      />
                      </View>  
                      <View style={[styles.InputBox]}>
                      <FloatingTitleTextInputField
                            attrName = 'purpose'
                            title = 'Rate stay/night'
                            value = {this.state.purpose}
                            titleActiveColor = {colorTitle}
                            titleInactiveColor = 'dimgrey'
                            Border_Styling = {'false'}
                            //titleActiveSize = {13}
                            titleInActiveSize = {13.5}
                            updateMasterState = {(attrName, purpose) => {
                              this.setState({purpose})
                            }}
                            textInputStyles = {[{ // here you can add additional TextInput styles
                              color: 'black',
                              fontSize: 14,
                              borderWidth:0,
                              width:getWidthnHeight(42).width,
                              paddingLeft:10,
                              paddingTop:15
                            }]}
                            keyboardType={'numeric'}
                        />
                      </View>  
                      </View> 
                      <View style={[{flexDirection:'row'}]}>
                      <View style={[styles.InputBox]}>
                      <FloatingTitleTextInputField
                          attrName = 'purpose'
                          title = 'Food Expense ( DA )'
                          value = {this.state.purpose}
                          titleActiveColor = {colorTitle}
                          titleInactiveColor = 'dimgrey'
                          Border_Styling = {'false'}
                          //titleActiveSize = {13}
                          titleInActiveSize = {13.5}
                          updateMasterState = {(attrName, purpose) => {
                            this.setState({purpose})
                          }}
                          textInputStyles = {[{ // here you can add additional TextInput styles
                            color: 'black',
                            fontSize: 14,
                            borderWidth:0,
                            width:getWidthnHeight(42).width,
                            paddingLeft:10,
                            paddingTop:15
                          }]}
                          keyboardType = {'numeric'}
                      />
                      </View>
                      </View>  
                      <View style={[{alignItems: 'center', justifyContent: 'center'},getMarginTop(1.3)]}>
                      <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity style={[{flexDirection:'row', justifyContent: 'center', }]}>
                        <View style={[{justifyContent: 'center', alignItems: 'center', backgroundColor:'#3280E4',borderRightWidth:2, borderRightColor:'white', borderTopLeftRadius:10, borderBottomLeftRadius:10}, getWidthnHeight(4,5)]}/>
                            <View style={[{ justifyContent: 'center', alignItems: 'center', backgroundColor:'#3280E4'}, getWidthnHeight(20,5)]}>
                            <Text style = {{color:'white', fontWeight:"bold"}}>SUBMIT</Text>
                            </View>
                            <View style={[{justifyContent: 'center', alignItems: 'center', backgroundColor:'#3280E4',borderLeftWidth:2, borderLeftColor:'white', borderTopRightRadius:10, borderBottomRightRadius:10}, getWidthnHeight(4,5)]}/>
                        </TouchableOpacity>
                        </View>  
                    </View> 
                  </View>
                  
                </View>
                :null}            
                <View style={{borderWidth:0.3,borderColor:'#BABABA', marginTop:getMarginTop(1).marginTop, width:getWidthnHeight(90).width, marginLeft:getMarginLeft(5).marginLeft}}/>            
                <MySwitch
                            title = 'Imprest Request*'
                            value={this.state.switchImprest}
                            onValueChange ={(switchImprest)=>this.setState({switchImprest},()=>console.log('switchValue:',switchImprest))}
                            disabled={false}
                            /> 
                {(this.state.switchImprest)?
                
                <View style = {[{alignItems:'center', justifyContent:'center'}]}>
                  <View style ={[{flexDirection:'row'},getWidthnHeight(89)]}> 
                        <View style={[{alignItems:'flex-start', marginTop:getMarginTop(2).marginTop}]}>
                          <Text style={[{color:"#3280E4", fontWeight:'bold'}, fontSizeH4()]}>IMPREST DETAILS</Text>
                        </View>
                        <View style={[{borderColor: colorBase,}]}/>
                       
                      </View>
                <View style={{
                  marginTop:'1%',
                  width: wp(90),
                  height:hp(18.75),
                  backgroundColor: '#FFFFFF',
                  borderWidth:1,
                  borderColor: '#C4C4C4',
                }}>
                <View style={[{flexDirection:'row'}]}>
                      <View style={[styles.Dropbox]}>  
                      <Dropdown
                          containerStyle={[{justifyContent: 'center', borderColor: 'grey', borderWidth: 0, paddingLeft: 0, borderRadius: 10,}, getWidthnHeight(88.5, 7.5), getMarginTop(-0.8)]}
                          //  maxLength = {12}
                          inputContainerStyle={[{borderBottomWidth:0, marginTop:4,alignSelf:'center'}, getWidthnHeight(38, 7.9), getMarginLeft(1.5)]}
                          label={'Project & Remarks*'}
                          data={data}
                          //data={this.state.leadIndustryOptionsId}
                          //valueExtractor={({id})=> id}
                          //labelExtractor={({industry_name})=> industry_name}
                          //onChangeText={leadIndustryOptions_id => this.setState({ leadIndustryOptions_id }, () => console.log("INDUSTRY: ", this.state.leadIndustryOptions_id))}
                          //value={leadIndustryOptions_id}
                          //baseColor = {(data)? colorTitle : 'grey'}
                          //baseColor = {(leadIndustryOptions_id)? colorTitle : 'grey'}
                          //  selectedItemColor='#aaa'
                          //  textColor='#aaa'
                          //  itemColor='#aaa'
                          baseColor='grey'
                          pickerStyle={{borderWidth: 0}}
                          dropdownOffset={{ 'top': 25 }}
                          fontSize = {13}
                      />
                      </View>  
                      <View style={[styles.InputBox]}>
                      <FloatingTitleTextInputField
                            attrName = 'purpose'
                            title = 'Amount for imprest*'
                            value = {this.state.purpose}
                            titleActiveColor = {colorTitle}
                            titleInactiveColor = 'dimgrey'
                            Border_Styling = {'false'}
                            //titleActiveSize = {13}
                            titleInActiveSize = {13.5}
                            updateMasterState = {(attrName, purpose) => {
                              this.setState({purpose})
                            }}
                            textInputStyles = {[{ // here you can add additional TextInput styles
                              color: 'black',
                              fontSize: 14,
                              borderWidth:0,
                              width:getWidthnHeight(42).width,
                              paddingLeft:10,
                              paddingTop:15
                            }]}
                            keyboardType={'numeric'}
                        />
                      </View>  
                      </View> 
                      <View style={[{flexDirection: 'row', justifyContent: 'space-around'}, getWidthnHeight(89)]}>   
                      <View style={[{ borderWidth: 0, borderColor: 'black', alignItems: 'center', justifyContent: 'center',marginTop:getMarginTop(1.5).marginTop,}, getWidthnHeight(100, 10)]}>
                        <FloatingTitleTextInputField
                            attrName = 'purpose'
                            title = 'Remarks'
                            value = {this.state.purpose}
                            titleActiveColor = {colorTitle}
                            titleInactiveColor = 'dimgrey'
                            Border_Styling = {'false'}
                            //titleActiveSize = {13}
                            titleInActiveSize = {13.5}
                            updateMasterState = {(attrName, purpose) => {
                              this.setState({purpose})
                            }}
                            textInputStyles = {[{ // here you can add additional TextInput styles
                              color: 'black',
                              fontSize: 14,
                              paddingLeft: 10,
                            }, getWidthnHeight(undefined, 7)]}
                            containerStyle = {[getWidthnHeight(86, 10)]}
                        />
                      </View>
                      </View>
                </View>
                </View>
                :null}             
                <View style={{borderWidth:0.3,borderColor:'#BABABA', marginTop:getMarginTop(1).marginTop, width:getWidthnHeight(90).width, marginLeft:getMarginLeft(5).marginLeft}}/>        
                <View style={[{alignItems: 'center', justifyContent: 'center'},getMarginTop(1.3)]}>
                      <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity style={[{flexDirection:'row', justifyContent: 'center', }]}>
                        <View style={[{justifyContent: 'center', alignItems: 'center', backgroundColor:'#3280E4',borderRightWidth:2, borderRightColor:'white', borderTopLeftRadius:10, borderBottomLeftRadius:10}, getWidthnHeight(4,5)]}/>
                            <View style={[{ justifyContent: 'center', alignItems: 'center', backgroundColor:'#3280E4'}, getWidthnHeight(20,5)]}>
                            <Text style = {{color:'white', fontWeight:"bold"}}>SAVE</Text>
                            </View>
                            <View style={[{justifyContent: 'center', alignItems: 'center', backgroundColor:'#3280E4',borderLeftWidth:2, borderLeftColor:'white', borderTopRightRadius:10, borderBottomRightRadius:10}, getWidthnHeight(4,5)]}/>
                        </TouchableOpacity>
                        </View>  
                    </View>
                    <View style={{height:10,borderColor:'#BABABA', marginTop:getMarginTop(1).marginTop, width:getWidthnHeight(90).width, marginLeft:getMarginLeft(5).marginLeft}}/>
                </ScrollView>
                </View>
              </View>  
              
            </DismissKeyboard>
            
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height:'100%'
  },
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
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
  Dropbox:{
    borderWidth: 1,
    left:0,
    width:getWidthnHeight(42).width,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    borderColor: '#C4C4C4',
    marginLeft:'2%',
    marginTop:getMarginTop(1.5).marginTop
  },
  InputBox:{
    borderWidth: 1,
    left:0,
    width:getWidthnHeight(42).width,
    height:52,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    borderColor: '#C4C4C4',
    marginLeft:'2%',
    marginTop:getMarginTop(1.5).marginTop
  },
  bigbox:{
    marginTop:'1%',
    width: wp(90),
    height:hp(33),
    backgroundColor: '#FFFFFF',
    borderWidth:1,
    borderColor: '#C4C4C4',
  },
  box:{
    borderWidth:1,
    borderColor: '#C4C4C4',
    },
  switchcontainer: {      
    flexDirection:'row',
    marginTop:getMarginTop(1).marginTop
  },  
  textStyle:{  
    fontSize: fontSizeH3().fontSize,  
    textAlign: 'left',  
    color: '#344953'    
  }  
});
