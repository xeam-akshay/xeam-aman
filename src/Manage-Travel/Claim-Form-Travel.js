import React from 'react';
import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Alert,
  FlatList,
  ScrollView,
} from 'react-native';
import {FloatingTitleTextInputField,getWidthnHeight, WaveHeader, getMarginTop, getMarginLeft, 
  MySwitch,RoundButton, ItineraryModal,fontSizeH3, fontSizeH4, Date} from '../KulbirComponents/common'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { Dropdown } from 'react-native-material-dropdown';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Icons from 'react-native-vector-icons/MaterialIcons';
import DocumentPicker from 'react-native-document-picker';

const colorBase = '#25A2F9';
const colorTitle = '#0B8EE8';

export default class Claim_Form_Travel extends React.Component {

  constructor() {
    super();
    this.state = {
      remark:'',
      index:'1',
      itinerarytoggle:false,
      switchStay: false,
      staytoggle:false,
      dateTime:'',
      fill:0,
      Distance:'',
      Amount:'',
      city_to:'',
      city_from:'',
      conveyance:'',
      progress: 0,
      staydateTime:'',
      staycity:'',
      staypernight:'',
      staystate:'',
      foodexpda:'',
      stayprogress:0
    };
  }

  async pickfile(){
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    });
    console.log(
      res.uri,
      res.type, // mime type
      res.name,
      res.size
    );
    Alert.alert("File Name", res.name)
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
}


  itinerarytoggle = () => {
    const {itinerarytoggle} = this.state;
    this.setState({itinerarytoggle : !itinerarytoggle},()=>console.log('switchValue:',itinerarytoggle))
  }

  staytoggle = () => {
    const {staytoggle} = this.state;
    this.setState({staytoggle : !staytoggle},()=>console.log('staytoggle:',staytoggle))
  }

  setindex=(value) => {
    const {index} = this.state;
    this.setState({index:value}, ()=>console.log(index))
  }

  setprogressbarvalue = () => {
    this.setState({progress:Math.round(this.state.progress+16.67)})
  }

  setprogressbarvalueonclear = () => {
    this.setState({progress:Math.round(this.state.progress-33)})
  }

  onclickdelete = () => {
    this.setState({dateTime:'', Distance:'', Amount:'', conveyance:'',city_from:'',city_to:'', progress:0})
  }

  setstayprogressbarvalue = () => {
    this.setState({stayprogress:Math.round(this.state.stayprogress+20)})
  }

  setstayprogressbarvalueonclear = () => {
    this.setState({stayprogress:Math.round(this.state.stayprogress-40)})
  }

  onclickstaydelete = () => {
    this.setState({staydateTime:'', staystate:'', staycity:'', staypernight:'', foodexpda:'', stayprogress:0})
  }

  Dropboxvalueconveyance = (valueconveyance) => {
    this.setState({conveyance:valueconveyance})
    this.setprogressbarvalue();
  }

  Dropboxvaluecityfrom = (value) => {
    this.setState({city_from:value})
    this.setprogressbarvalue();
  }

  Dropboxvaluecityto = (value) => {
    this.setState({city_to:value})
    this.setprogressbarvalue();
  }

  Dropboxstaycity = (value) => {
    this.setState({staycity:value})
    this.setstayprogressbarvalue();
  }

  Dropboxstaystate = (value) => {
    this.setState({staystate:value})
    this.setstayprogressbarvalue();
  }



  colorbox = (color, title, amount, width) => {
    return(
          <View style= {[{backgroundColor:color},styles.multicolorsmallbox, getWidthnHeight(width)]}>
              <Text style = {[{fontStyle:'normal',textAlign:'center', color:'white'}, getMarginTop(0.5)]}>
                {title}
              </Text>
              <Text style = {[{fontWeight:'bold',textAlign:'center', color:'white', fontSize:16}, getMarginTop(-0.3)]}>
                {amount}
              </Text>
          </View>
    )        
  }

  renderStatusItem = ({item}) => {
    return(
    <View>
      <View style ={[{flexDirection:'row', },getMarginTop(0)]}>
      <View style={[{color:'black'}, getMarginLeft(2.5), getMarginTop(0.5)]}>  
      <View style={[{width: '100%',height:30,borderRadius: 30/2, borderWidth:1, justifyContent:'center', borderColor:'#0553BF'}, getMarginTop(1.5), getMarginLeft(1.5)]}>
        <View style={[{alignItems:'center'}]}>   
        <FontAwesome name='user-check' size={18} color={'#3480E0'}/>
        </View>
      </View>
      </View>
      <View style = {[getMarginTop(1), getMarginLeft(4)]}>
      <View style={[]}>
      <Text style={[ fontSizeH4()]}>{item.name}</Text>  
      <View>    
      <Text numberOfLines={10} style={[fontSizeH4(), getWidthnHeight(60)]}>{item.remark}</Text>
      <View style ={[getWidthnHeight(25), getMarginLeft(52.5), getMarginTop(-3)]}>
      {(item.status === 'New')?
      <View style = {[{backgroundColor:'transparent', borderRadius:5, borderWidth:0, borderColor:'red', alignItems:'flex-end'}]}>
      <View style={{backgroundColor:'#2F7DE1',borderRadius:5,}}>
      <Text style={[{textAlign:'center', margin: '2%' , color:'white', fontWeight:'bold',paddingHorizontal:5},fontSizeH4() ]}>{item.status}</Text> 
      </View>
      </View> :
      <View style = {[{backgroundColor:'transparent', borderRadius:5, borderWidth:0, alignItems:'flex-end'}]}> 
      <View style={{backgroundColor:'#3CA73F',borderRadius:5,}}>
      <Text style={[{textAlign:'center', margin:"2%" , color:'white', fontWeight:'bold', paddingHorizontal:5},fontSizeH4() ]}>{item.status}</Text> 
      </View>
      </View>
      }  
      </View>
      </View> 
      </View>
      </View>
      </View>
    </View>
    )
  }


  pre_approval_amount = () => {
    return (
      <View>
      <View style = {[{flexDirection:'row',  marginTop:getMarginTop(1.2).marginTop, justifyContent:'center', alignItems:'center'}, getWidthnHeight(94.77,5), getMarginLeft(2.55)]}>  
      <LinearGradient start={{x: 0, y: 0}} end={{x: 0.6, y: 0}} colors={['#0255BF','#1968CF', '#2C7BE0']} style={[{ borderWidth:0, flex:0.5,justifyContent:'center', alignItems:'center'},getWidthnHeight(undefined,5)]}>
     <TouchableHighlight underlayColor="transparent" onPress= {() => this.setindex('0')} style = {[getMarginTop(2.2)]}>
         <Text style={[{textAlign:'center', color:'white'}]}> Pre-Approval Amount </Text>    
     </TouchableHighlight>
     <View style = {[styles.triangleCorner]}/>
     </LinearGradient>
     <TouchableHighlight underlayColor="#DAE7F7" onPress= {() => this.setindex('1')} style={[{ borderWidth:0, flex:0.5, backgroundColor:'#DAE7F7',justifyContent:'center', alignItems:'center'},getWidthnHeight(undefined,5)]}>
         <Text style={{textAlign:'center'}}> Bank Details </Text> 
     </TouchableHighlight>
     </View>
     <View style = {[{borderWidth:1, borderColor:'#1968CF'}, getWidthnHeight(94.7, 9.8), getMarginLeft(2.55)]}>
     <View style = {{flexDirection:'row'}}>
       {this.colorbox('#EB3A32', 'Itinerary', '3000/-' , 29.5)}
       {this.colorbox('#E68F1B', 'Stay', '1500/-', 29.5)}
       {this.colorbox('#00B7D9', 'Imprest', '500/-', 29.5)}
     </View>  
     <View style ={[getMarginTop(-47.4), getMarginLeft(21.5)]}>
     <View style = {[styles.triangleCorner]}/>
     </View>
     </View>
     </View>
    )
  };
  
  
  bank_details = () => {
    return (
      <View>
      <View style = {[{flexDirection:'row',  marginTop:getMarginTop(1.2).marginTop, justifyContent:'center', alignItems:'center'}, getWidthnHeight(94.5,5), getMarginLeft(2.55)]}>
      <TouchableHighlight underlayColor="#DAE7F7" onPress= {() => this.setindex('0')} style={[{ borderWidth:0, flex:0.5, backgroundColor:'#DAE7F7',justifyContent:'center', alignItems:'center'},getWidthnHeight(undefined,5)]}>
        <Text style={[{textAlign:'center'}]}> Pre-Approval Amount </Text>    
      </TouchableHighlight>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 0.4, y: 0}} colors={['#0255BF','#1968CF', '#2C7BE0']} style={[{ borderWidth:0, flex:0.5,justifyContent:'center', alignItems:'center'},getWidthnHeight(undefined,5)]}>
      <TouchableHighlight underlayColor="transparent" onPress= {() => this.setindex('1')} style = {[getMarginTop(2.2)]}>
        <Text style={{textAlign:'center', color:'white'}}> Bank Details </Text> 
      </TouchableHighlight>
      <View style = {[styles.triangleCorner]}/>
      </LinearGradient>
      </View>
      <View style = {[{borderWidth:1, borderColor:'#1968CF'}, getWidthnHeight(94.7, 18), getMarginLeft(2.55)]}>
      <View style = {{flexDirection:'row'}}>
       {this.colorbox('#EB3A32', 'Bank Name', 'SBI', 45)}
       {this.colorbox('#E68F1B', 'IFSC', 'SBIN000636212', 45)}
     </View>  
       {this.colorbox('#00B7D9', 'Account Number', '568166510531356416022925625',91.5)}
     <View style ={[getMarginTop(-47.4), getMarginLeft(69)]}>
     <View style = {[styles.triangleCorner]}/>
     </View>

     </View>
      </View>
    )
  };

  render() {
    const {color} = this.state;
    const {dateTime} = this.state
    let data = [{
      value: 'New',
    }, {
      value: 'Approved',
    }, {
      value: 'Rejected',
    }];
    return (
          <View style = {{flex: 1}}>
            <View>
              <WaveHeader
                    wave={Platform.OS ==="ios" ? false : false} 
                    //logo={require('../Image/Logo-164.png')}
                    menu='white'
                    title='Travel Claim Form'
                    designby = {'aman'}
                    //menuState = {false}
                    //version={`Version ${this.state.deviceVersion}`}
              />
          </View>
          <ScrollView>
          <View>    
              <LinearGradient start={{x: 0, y: 0}} end={{x: 0.4, y: 0}} colors={['#0255BF','#1968CF', '#2C7BE0']} style = {[styles.bigbluebox]}> 
              <View>  
              <View style = {[{flexDirection:'row'}]}>  
              <View style = {[getMarginTop(3.5), getMarginLeft(50)]}>
              <FontAwesomeIcons name ='plane' size = {50} color = {'#4087E3'}/>
              </View>
              <View style = {[getMarginTop(-1.3), getMarginLeft(4)]}>
              <FontAwesomeIcons name ='plane' size = {130} color = {'#4087E3'}/>
              </View>
              </View>
              <View style ={[getMarginTop(-15), getMarginLeft(5)]}>
              <Text style = {[{fontWeight:'700', color:'white', fontSize:16, fontStyle:'italic'}]}>Have to go for service Delivery Work </Text>
              <View style = {{flexDirection:'row', marginTop:getMarginTop(1).marginTop}}>
              <View style={{width: '6%',height: 21,borderRadius: 21/2, borderWidth:0, backgroundColor:'white', justifyContent:'center', marginTop:getMarginTop(0.5).marginTop}}>  
              <View style={{alignItems:'center'}}>   
              <FontAwesome name='map-marked-alt' size={13} color={'#3280E2'}/>
              </View>
              </View>
              <Text style = {[{fontWeight:'700', color:'white'}, fontSizeH3, getMarginTop(0.2)]}> SD </Text>
              <Text style = {[{color:'white'}, fontSizeH4, getMarginTop(0.2)]}>(Existing Client - Aarti Drugs LTD) </Text>
              </View>
              </View>
              </View>
              <View style = {[{flexDirection:'row'}, getMarginLeft(4.5),getMarginTop(1)]}>
              <Text style = {[{fontWeight:'700', color:'white'},fontSizeH3]}> TC -  </Text>
              <Text style = {[{fontWeight:'700',color:'white'},fontSizeH4]}>123412341234 </Text>
              </View>  
              </LinearGradient>
          </View> 
          
                {(this.state.index === '0')?
                 this.pre_approval_amount() : 
                 this.bank_details()
                }     
          <View style ={[{flexDirection:'row'},getWidthnHeight(89),getMarginLeft(3)]}> 
                  <View style={[{alignItems:'flex-start', marginTop:getMarginTop(2).marginTop}]}>
                    <Text style={[{color:"#3280E4", fontWeight:'bold'}, fontSizeH4()]}>ITINERARY DETAILS</Text>
                  </View>
                  <View style={[{borderColor: colorBase,}]}/>
                      <RoundButton 
                        title="View All"
                        onPress={()=>this.itinerarytoggle()}
                        gradient={['#3280E4', '#3280E4']}
                        style={[getWidthnHeight(30, 4), getMarginTop(1),getMarginLeft(29)]}
                      />
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
                     <View>
                    <View style={[{flexDirection:'row'}]}>
                    <Date 
                              containerStyle={[{borderWidth: 1, borderColor: '#BABABA', borderRadius: 0, justifyContent: 'center'}, getWidthnHeight(35, 7), getMarginTop(1.5), getMarginLeft(2)]}
                              style={[(dateTime === '')? {borderWidth: 0, borderColor: 'green', width: getWidthnHeight(35).width} : {fontSize: 12, width: getWidthnHeight(35).width}]}
                              date={this.state.dateTime}
                              //clearDate={(dateTime === '')? false : true}
                              onPress={() => this.setState({dateTime: '', dueTimeError: true, dateOrTimeValue: null, dateNTime: ''})}
                              dateFont={{fontSize: 14}}
                              androidMode='default'
                              mode='date'
                              placeholder='Date'
                              format='DD/MM/YYYY'
                              onDateChange={(date) => {this.setState({dateTime: date}),this.setprogressbarvalue()}} 
                          />
                    <View style={[styles.Dropbox]}>
                    <Dropdown
                        containerStyle={[{justifyContent: 'center', borderColor: 'grey', borderWidth: 0, paddingLeft: 0, borderRadius: 10, marginTop:-5}, getWidthnHeight(100, 7)]}
                        //  maxLength = {12}
                        inputContainerStyle={[{borderBottomWidth:0, marginTop:4,alignSelf:'center'}, getWidthnHeight(30, 7.9)]}
                        label={'Conveyance Type*'}
                        data={data}
                        value = {this.state.conveyance}
                        onChangeText ={(valueconveyance)=>this.Dropboxvalueconveyance(valueconveyance)}
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
                        containerStyle={[{justifyContent: 'center', borderColor: 'grey', borderWidth: 0, paddingLeft: 0, borderRadius: 10,}, getWidthnHeight(100, 7.5), getMarginTop(-0.8)]}
                        //  maxLength = {12}
                        inputContainerStyle={[{borderBottomWidth:0, marginTop:4,alignSelf:'center'}, getWidthnHeight(30, 7.9), getMarginLeft(1.5)]}
                        label={'City (from)*'}
                        value = {this.state.city_from}
                        data={data}
                        onChangeText ={(value)=>this.Dropboxvaluecityfrom(value)}
                        baseColor='grey'
                        pickerStyle={{borderWidth: 0}}
                        dropdownOffset={{ 'top': 25 }}
                        fontSize = {13.5}
                    />
                    </View>  
                    <View style={[styles.Dropbox]}>
                    <Dropdown
                        containerStyle={[{justifyContent: 'center', borderColor: 'grey', borderWidth: 0, paddingLeft: 0, borderRadius: 10}, getWidthnHeight(100, 7), getMarginTop(-0.8)]}
                        //  maxLength = {12}
                        inputContainerStyle={[{borderBottomWidth:0, marginTop:4,alignSelf:'center'}, getWidthnHeight(30, 7.9), getMarginLeft(1.5)]}
                        label={'City (to)*'}
                        data={data}
                        value = {this.state.city_to}
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
                        onChangeText ={(value)=>this.Dropboxvaluecityto(value)}
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
                        attrName = 'Distance'
                        title = 'Distance (in k.m)*'
                        value = {this.state.Distance}
                        titleActiveColor = {colorTitle}
                        titleInactiveColor = 'dimgrey'
                        Border_Styling = {'false'}
                        //titleActiveSize = {13}
                        titleInActiveSize = {13.5}
                        updateMasterState = {(attrName, Distance) => {
                          this.setState({Distance})
                          if(Distance.length == 1){ 
                            this.setprogressbarvalue()
                          }
                           else if(Distance.length < 1){
                             this.setprogressbarvalueonclear()
                         }
                          
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
                          attrName = 'Amount'
                          title = 'Amount'
                          value = {this.state.Amount}
                          titleActiveColor = {colorTitle}
                          titleInactiveColor = 'dimgrey'
                          Border_Styling = {'false'}
                          //titleActiveSize = {13}
                          titleInActiveSize = {13.5}
                          updateMasterState = {(attrName, Amount) => {
                            this.setState({Amount})
                            {if(Amount.length == 1){ 
                              this.setprogressbarvalue()
                            }
                             else if(Amount.length < 1){
                               this.setprogressbarvalueonclear()
                           } }
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
                  </View>
                  </View> 
                  <View style = {[getMarginTop(-20),getMarginLeft(77.5)]}>
                  <AnimatedCircularProgress
                        size={50}
                        width={4}
                        fill={this.state.dateTime === '' && this.state.conveyance == '' && this.state.city_from == '' && this.state.city_to == '' && this.state.Distance == '' && this.state.Amount == ''  ? 0: this.state.progress > 15 ? this.state.progress : 0}
                        tintColor="#00A030"
                        backgroundColor="#D1D2D4">
                        {
                          (fill) => (
                            <View>
                              {this.state.dateTime === '' && this.state.conveyance == '' && this.state.city_from == '' && this.state.city_to == '' && this.state.Distance == '' && this.state.Amount == ''? <Text>{'0'}</Text>:
                              <View>
                              {this.state.progress < 100?
                              this.state.progress > 15? 
                            <Text>
                              { this.state.progress }
                            </Text>:
                            <Text>
                            {'0'}
                            </Text>:
                            <FontAwesomeIcons name={'check-circle'} size={43} color={'#00A030'}/>}
                            </View>}
                            </View>
                          )
                        }
                      </AnimatedCircularProgress>
                      </View>
                      <View style = {[getMarginTop(1),getMarginLeft(77.5)]}>
                      <TouchableOpacity onPress = {this.onclickdelete}>  
                      <AnimatedCircularProgress
                        size={50}
                        width={4}
                        fill={this.state.dateTime === '' && this.state.conveyance == '' && this.state.city_from == '' && this.state.city_to == '' && this.state.Distance == '' && this.state.Amount == '' ? 0 : 100}
                        tintColor="#EB3A32"
                        backgroundColor="#D1D2D4">
                        {
                          (fill) => (
                            <View>
                            {this.state.dateTime === '' && this.state.conveyance == '' && this.state.city_from == '' && this.state.city_to == '' && this.state.Distance == '' && this.state.Amount == ''?
                            <Icons name={'delete'} size={35} color={'#D1D2D4'}/>:
                            <Icons name={'delete'} size={35} color={'#EB3A32'}/>}
                            </View>
                          )
                        }
                      </AnimatedCircularProgress>
                      </TouchableOpacity>
                      </View>
                  </View> 
                  {/* End Big Box */}   
                  <View style = {[{borderWidth:0, borderColor:'#487DCB', backgroundColor:'#DCDCDC'}, getWidthnHeight(94.4,0.2), getMarginTop(1.5), getMarginLeft(3)]}/>
                  <MySwitch
                            title = 'Stay*'
                            value={this.state.switchStay}
                            onValueChange ={(switchStay)=>this.setState({switchStay},()=>console.log('switchValue:',switchStay))}
                            disabled={false}
                            />
                {(this.state.switchStay)?
                <View>
                      <View style ={[{flexDirection:'row'}]}> 
                        <View style={[{marginTop:getMarginTop(2).marginTop}]}>
                          <Text style={[{color:"#3280E4", fontWeight:'bold'}, fontSizeH4(), getMarginLeft(3)]}>STAY DETAILS</Text>
                        </View>
                        <View style={[{borderColor: colorBase,}]}/>
                        <RoundButton 
                              title="View All"
                              onPress={()=>this.staytoggle()}
                              gradient={['#3280E4', '#3280E4']}
                              style={[getWidthnHeight(30, 4), getMarginTop(1),getMarginLeft(39)]}
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
                                containerStyle={[{borderWidth: 1, borderColor: '#BABABA', borderRadius: 0, justifyContent: 'center'}, getWidthnHeight(35, 7), getMarginTop(1.5), getMarginLeft(2)]}
                                style={[(dateTime === '')? {borderWidth: 0, borderColor: 'green', width: getWidthnHeight(35).width} : {fontSize: 12, width: getWidthnHeight(35).width}]}
                                date={this.state.staydateTime}
                                //clearDate={(dateTime === '')? false : true}
                                onPress={() => this.setState({dateTime: '', dueTimeError: true, dateOrTimeValue: null, dateNTime: ''})}
                                dateFont={{fontSize: 14}}
                                androidMode='default'
                                mode='date'
                                placeholder='Date'
                                format='DD/MM/YYYY'
                                onDateChange={(date) => {this.setState({staydateTime: date}),this.setstayprogressbarvalue()}} 
                            />
                      <View style={[styles.Dropbox]}>
                      <Dropdown
                          containerStyle={[{justifyContent: 'center', borderColor: 'grey', borderWidth: 0, paddingLeft: 0, borderRadius: 10, marginTop:-5}, getWidthnHeight(100, 7)]}
                          //  maxLength = {12}
                          inputContainerStyle={[{borderBottomWidth:0, marginTop:4,alignSelf:'center'}, getWidthnHeight(29, 7.9)]}
                          label={'State'}
                          data={data}
                          value={this.state.staystate}
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
                          onChangeText ={(value)=>this.Dropboxstaystate(value)}
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
                          containerStyle={[{justifyContent: 'center', borderColor: 'grey', borderWidth: 0, paddingLeft: 0, borderRadius: 10,}, getWidthnHeight(100, 7.5), getMarginTop(-0.8)]}
                          //  maxLength = {12}
                          inputContainerStyle={[{borderBottomWidth:0, marginTop:4,alignSelf:'center'}, getWidthnHeight(29.5, 7.9), getMarginLeft(1.5)]}
                          label={'City'}
                          data={data}
                          value={this.state.staycity}
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
                          onChangeText ={(value)=>this.Dropboxstaycity(value)}
                          baseColor='grey'
                          pickerStyle={{borderWidth: 0}}
                          dropdownOffset={{ 'top': 25 }}
                          fontSize = {13.5}
                      />
                      </View>  
                      <View style={[styles.InputBox]}>
                      <FloatingTitleTextInputField
                            attrName = 'staypernight'
                            title = 'Rate stay/night'
                            value = {this.state.staypernight}
                            titleActiveColor = {colorTitle}
                            titleInactiveColor = 'dimgrey'
                            Border_Styling = {'false'}
                            //titleActiveSize = {13}
                            titleInActiveSize = {13.5}
                            updateMasterState = {(attrName, staypernight) => {
                              this.setState({staypernight})
                              {if(staypernight.length == 1){ 
                                this.setstayprogressbarvalue()
                              }
                               else if(staypernight.length < 1){
                                 this.setstayprogressbarvalueonclear()
                             } }
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
                          attrName = 'foodexpda'
                          title = 'Food Exp.(DA)'
                          value = {this.state.foodexpda}
                          titleActiveColor = {colorTitle}
                          titleInactiveColor = 'dimgrey'
                          Border_Styling = {'false'}
                          //titleActiveSize = {13}
                          titleInActiveSize = {13.5}
                          updateMasterState = {(attrName, foodexpda) => {
                            this.setState({foodexpda})
                            {if(foodexpda.length == 1){ 
                              this.setstayprogressbarvalue()
                            }
                             else if(foodexpda.length < 1){
                               this.setstayprogressbarvalueonclear()
                           } }
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
                      <View style = {[getMarginTop(-20),getMarginLeft(77.5)]}>
                  <AnimatedCircularProgress
                        size={50}
                        width={4}
                        fill={this.state.staydateTime === '' && this.state.staystate == '' && this.state.staycity == '' && this.state.staypernight == '' && this.state.foodexpda == '' ? 0: this.state.stayprogress > 2 ? this.state.stayprogress : 0}
                        tintColor="#00A030"
                        backgroundColor="#D1D2D4">
                        {
                          (fill) => (
                            <View>
                              {this.state.staydateTime === '' && this.state.staystate == '' && this.state.staycity == '' && this.state.staypernight == '' && this.state.foodexpda == ''? <Text>{'0'}</Text>:
                              <View>
                              {this.state.stayprogress < 100?
                              this.state.stayprogress > 2? 
                            <Text>
                              { this.state.stayprogress }
                            </Text>:
                            <Text>
                            {'0'}
                            </Text>:
                            <FontAwesomeIcons name={'check-circle'} size={43} color={'#00A030'}/>}
                            </View>}
                            </View>
                          )
                        }
                      </AnimatedCircularProgress>
                      </View>
                      <View style = {[getMarginTop(1),getMarginLeft(77.5)]}>
                      <TouchableOpacity onPress = {this.onclickstaydelete}>  
                      <AnimatedCircularProgress
                        size={50}
                        width={4}
                        fill={this.state.staydateTime === '' && this.state.staystate == '' && this.state.staycity == '' && this.state.staypernight == '' && this.state.foodexpda == '' ? 0 : 100}
                        tintColor="#EB3A32"
                        backgroundColor="#D1D2D4">
                        {
                          (fill) => (
                            <View>
                            {this.state.staydateTime === '' && this.state.staystate == '' && this.state.staycity == '' && this.state.staypernight == '' && this.state.foodexpda == ''?
                            <Icons name={'delete'} size={35} color={'#D1D2D4'}/>:
                            <Icons name={'delete'} size={35} color={'#EB3A32'}/>}
                            </View>
                          )
                        }
                      </AnimatedCircularProgress>
                      </TouchableOpacity>
                      </View>
                  </View>
                  
                </View>
                :null}     
                <View style = {[{borderWidth:0, borderColor:'#487DCB', backgroundColor:'#DCDCDC'}, getWidthnHeight(94.4,0.2), getMarginTop(1.5), getMarginLeft(3)]}/>
                      <View style ={[{flexDirection:'row'}]}> 
                        <View style={[{marginTop:getMarginTop(2).marginTop}]}>
                          <Text style={[{color:"#3280E4", fontWeight:'bold'}, fontSizeH4(), getMarginLeft(3)]}>UPLOAD DOCUMENTS</Text>
                        </View>
                        <View style={[{borderColor: colorBase,}]}/>
                        <RoundButton 
                              title="View All"
                              onPress={()=>this.staytoggle()}
                              gradient={['#3280E4', '#3280E4']}
                              style={[getWidthnHeight(30, 4), getMarginTop(1),getMarginLeft(25.3)]}
                        />
                      </View>

                      <View style ={[styles.bigbox, getWidthnHeight(undefined,20)]}>
                        <TouchableOpacity onPress = {this.pickfile}>
                        <View style = {[{flexDirection:'row'},getMarginLeft(2), getMarginTop(1)]}>
                          <FontAwesome name={'plus-circle'} size={20} color={'#3280E4'}/>
                          <Text style={[{color:'#3280E4', textDecorationLine:'underline', fontWeight:'700'},getMarginLeft(2), fontSizeH3()]}>Add File</Text>
                        </View>  
                        </TouchableOpacity>
                        <View style={[{flexDirection:'row'}]}>
                    <View style={[styles.InputBox,getWidthnHeight(44.3)]}>
                    <FloatingTitleTextInputField
                        attrName = 'Distance'
                        title = 'File Name'
                        //value = {this.state.Distance}
                        titleActiveColor = {colorTitle}
                        titleInactiveColor = 'dimgrey'
                        Border_Styling = {'false'}
                        //titleActiveSize = {13}
                        titleInActiveSize = {13.5}
                        updateMasterState = {(attrName, Distance) => {
                          //this.setState({Distance})
                          
                        }}
                        textInputStyles = {[{ // here you can add additional TextInput styles
                          color: 'black',
                          fontSize: 14,
                          borderWidth:0,
                          width:getWidthnHeight(42).width,
                          paddingLeft:10,
                          paddingTop:15
                        }]}
                    />
                    </View>
                    <View style={[styles.Dropbox, getWidthnHeight(44.3)]}>  
                      <Dropdown
                          containerStyle={[{justifyContent: 'center', borderColor: 'grey', borderWidth: 0, paddingLeft: 0, borderRadius: 10,}, getWidthnHeight(100, 7.5), getMarginTop(-0.8)]}
                          //  maxLength = {12}
                          inputContainerStyle={[{borderBottomWidth:0, marginTop:4,alignSelf:'center'}, getWidthnHeight(40, 7.9), getMarginLeft(1.5)]}
                          label={'Attachment Type'}
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
                          onChangeText ={(value)=>this.Dropboxstaycity(value)}
                          baseColor='grey'
                          pickerStyle={{borderWidth: 0}}
                          dropdownOffset={{ 'top': 25 }}
                          fontSize = {13.5}
                      />
                    </View> 
                    </View>  
                    <View style={[{alignItems: 'center', justifyContent: 'center'},getMarginTop(1.3)]}>
                      <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity style={[{flexDirection:'row', justifyContent: 'center', }]}>
                        <View style={[{justifyContent: 'center', alignItems: 'center', backgroundColor:'#3280E4',borderRightWidth:2, borderRightColor:'white', borderTopLeftRadius:10, borderBottomLeftRadius:10}, getWidthnHeight(4,5)]}/>
                            <View style={[{ justifyContent: 'center', alignItems: 'center', backgroundColor:'#3280E4'}, getWidthnHeight(30,5)]}>
                            <Text style = {{color:'white', fontWeight:"bold", paddingHorizontal:4}}>UPLOAD  FILE</Text>
                            </View>
                            <View style={[{justifyContent: 'center', alignItems: 'center', backgroundColor:'#3280E4',borderLeftWidth:2, borderLeftColor:'white', borderTopRightRadius:10, borderBottomRightRadius:10}, getWidthnHeight(4,5)]}/>
                        </TouchableOpacity>
                        </View>  
                    </View> 
                      </View>
                      <View style = {[{borderWidth:0, borderColor:'#487DCB', backgroundColor:'#DCDCDC'}, getWidthnHeight(94.4,0.2), getMarginTop(1.5), getMarginLeft(3)]}/>
                      <View style={[styles.InputBox,getWidthnHeight(94.4), getMarginLeft(3)]}>
                    <FloatingTitleTextInputField
                        attrName = 'Comment'
                        title = 'Comment'
                        //value = {this.state.Distance}
                        titleActiveColor = {colorTitle}
                        titleInactiveColor = 'dimgrey'
                        Border_Styling = {'false'}
                        //titleActiveSize = {13}
                        titleInActiveSize = {13.5}
                        multiline = {true}
                        updateMasterState = {(attrName, Distance) => {
                          //this.setState({Distance})
                          
                        }}
                        textInputStyles = {[{ // here you can add additional TextInput styles
                          color: 'black',
                          fontSize: 14,
                          borderWidth:0,
                          width:getWidthnHeight(92).width,
                          paddingLeft:10,
                          paddingTop:15
                        }]}
                    />
                    </View>
                    <View style={[{alignItems: 'center', justifyContent: 'center'},getMarginTop(1.3)]}>
                      <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity style={[{flexDirection:'row', justifyContent: 'center', }]}>
                        <View style={[{justifyContent: 'center', alignItems: 'center', backgroundColor:'#3280E4',borderRightWidth:2, borderRightColor:'white', borderTopLeftRadius:10, borderBottomLeftRadius:10}, getWidthnHeight(4,5)]}/>
                            <View style={[{ justifyContent: 'center', alignItems: 'center', backgroundColor:'#3280E4'}, getWidthnHeight(33,5)]}>
                            <Text style = {{color:'white', fontWeight:"bold", paddingHorizontal:4}}>SUBMIT CLAIM</Text>
                            </View>
                            <View style={[{justifyContent: 'center', alignItems: 'center', backgroundColor:'#3280E4',borderLeftWidth:2, borderLeftColor:'white', borderTopRightRadius:10, borderBottomRightRadius:10}, getWidthnHeight(4,5)]}/>
                        </TouchableOpacity>
                        </View>  
                    </View> 
                    <View style = {[{borderWidth:0, borderColor:'#487DCB', backgroundColor:'white'}, getWidthnHeight(94.4,1), getMarginTop(1), getMarginLeft(3)]}/>
          </ScrollView>
          </View>
         
    )
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigbluebox: {
    marginLeft:"2.5%",
    marginRight:'2.5%',
    marginTop:'2%',
    height:getWidthnHeight(undefined,15).height,
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  },
  multicolorsmallbox: {
    marginLeft:"1.5%",
    marginTop:'2.5%',
    height:getWidthnHeight(undefined,7).height,
   // width : getWidthnHeight(29.5).width,
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
  triangleCorner: {
    marginTop:getMarginTop(.8).marginTop,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 9,
    borderTopWidth: 9,
    borderLeftWidth: 9,
    borderRightColor: "transparent",
    borderLeftColor:"transparent",
    borderTopColor: "#307FE4",
  }, 
flatlistcontainer:{
    width:getWidthnHeight(89).width,
    height:getWidthnHeight(undefined,20).height,
    backgroundColor: '#FFFFFF',
    borderWidth:0,
    borderColor: '#C4C4C4',
    marginTop:getMarginTop(2.5).marginTop,
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
        elevation: 7,
      }
    }),
    shadowOpacity: 0.3,
    shadowRadius: 40,
    borderColor: 'black',
    borderWidth: 0
  }, 
  triangleCornerl: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 40,
    borderTopWidth: 40,
    borderRightColor: "transparent",
    borderTopColor: "#307FE4",
  },
  box:{
    left:0,
    height:45,
    width:'80%',
    borderRadius:10,
    },   
    Dropbox:{
      borderWidth: 1,
      left:0,
      width:getWidthnHeight(35).width,
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
      width:getWidthnHeight(35).width,
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
      width: wp(94.5),
      height:hp(27),
      backgroundColor: '#FFFFFF',
      borderWidth:1,
      borderColor: '#C4C4C4',
      marginLeft:getMarginLeft(3).marginLeft
    },
});
