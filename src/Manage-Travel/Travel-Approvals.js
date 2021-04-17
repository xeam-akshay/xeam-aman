import React from 'react';
import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  FlatList,
  TouchableHighlight,
  TextInput,
  KeyboardAvoidingView,
  Animated
} from 'react-native';

import { Dropdown } from 'react-native-material-dropdown';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import AntdesignIcons from 'react-native-vector-icons/AntDesign';
import {Svg, Line} from 'react-native-svg';
import {Actions} from 'react-native-router-flux';
import {
  CommonModal, IOS_StatusBar, getMarginTop, getMarginBottom, getWidthnHeight,fontSizeH4,
  FloatingTitleTextInputField, getMarginVertical, DateSelector, WaveHeader, fontSizeH3, ItineraryModal,
  TimePicker, RoundButton, RadioEnable, RadioDisable, AlertBox, DismissKeyboard, getMarginLeft, Date, MySwitch
} from '../KulbirComponents/common';

export default class Travel_Approvals extends React.Component {

  constructor() {
    super();
    this.state = {
      searchtext:'',
      status:'',
      placeholder:'Search here',
      show: true,
      DATA : [
        {
          id: '01',
          from:'Travel Purpose',
          travelcode:'200700002',
          status:'Approved',
          datefrom:'01/01/2021',
          dateto:'02/01/2021',
          title: 'First Item',
          name:'Name',
        },
        {
          id: '02',
          from:'Travel Purpose',
          travelcode:'200700002',
          status:'New',
          datefrom:'01/01/2021',
          dateto:'02/01/2021',
          title: 'Second Item',
          name:'Name',
        },
        {
          id: '03',
          from:'Travel Purpose',
          travelcode:'200700002',
          status:'New',
          datefrom:'01/01/2021',
          dateto:'02/01/2021',
          title: 'Third Item',
          name:'Name',
        },
        {
            id: '04',
            from:'Travel Purpose',
            travelcode:'200700002',
            status:'New',
            datefrom:'01/01/2021',
            dateto:'02/01/2021',
            title: 'First Item',
            name:'Name',
          },
          {
            id: '05',
            from:'Travel Purpose',
            travelcode:'200700002',
            status:'New',
            datefrom:'01/01/2021',
            dateto:'02/01/2021',
            title: 'Second Item',
            name:'Name',
          },
          {
            id: '06',
            from:'Travel Purpose',
            travelcode:'200700002',
            status:'New',
            datefrom:'01/01/2021',
            dateto:'02/01/2021',
            title: 'Third Item',
            name:'Name',
          },
      ],
    };
    this.arrayholder = this.state.DATA;
  }

  componentWillMount = () => {
    this.animatedWidth = new Animated.Value(0)
    this.animatedHeight = new Animated.Value(0)
    this.iconaling = new Animated.Value(0)
    this.borderanimated = new Animated.Value(0)
    this.iconmargintop = new Animated.Value(0)
    this.animation = new Animated.Value(0)
 }
 

 animatedBox = () => {
    Animated.timing(this.animatedWidth, {
       toValue: 351,
       duration: 700
    }).start()
    Animated.timing(this.animatedHeight, {
       toValue: 39,
       duration: 10
    }).start()
    Animated.timing(this.iconaling, {
      toValue: 311,
      duration: 700
   }).start()
   Animated.timing(this.borderanimated, {
    toValue: 0,
    duration: 500
  }).start()
 Animated.timing(this.iconmargintop, {
    toValue: 0,
    duration: 500
  }).start()
  Animated.timing(this.animation, {
    toValue: 1,
    duration: 500
  }).start()

  this.setState({show:false})
 }

 hideshow=()=>{
  Animated.timing(this.animatedWidth, {
    toValue: 0,
    duration: 70
 }).start()
 Animated.timing(this.animatedHeight, {
    toValue: 0,
    duration: 70
 }).start()
 Animated.timing(this.iconaling, {
   toValue: 0,
   duration: 70
}).start()
Animated.timing(this.borderanimated, {
 toValue: 0,
 duration: 500
}).start()
Animated.timing(this.iconmargintop, {
 toValue: 0,
 duration: 500
}).start()
Animated.timing(this.animation, {
 toValue: 1,
 duration: 500
}).start()
  this.setState({show:true})
}


  onPress=()=>{
      const newData = this.arrayholder.filter((item)=>{
        return item.id.match(this.state.searchtext);
      })
      this.setState({
      DATA: newData
      });
  }
  
  ondrop=()=>{
    const newData = this.arrayholder.filter((item)=>{
      return item.status === this.state.status
    }).filter((item)=>{
      return item.id.match(this.state.searchtext);
    })
    this.setState({
    DATA: newData
    });
  }



  renderItem = ({ item }) => {
    return(
    <View style={[styles.flatlistcontainer, getMarginLeft(4)]}>
      <View>
            <View style={[styles.triangleCorner]}/>
            <View>
                <Text style={[{marginTop:getMarginTop(-5).marginTop, color:'white'}, fontSizeH4(),getMarginLeft(1)]}>{item.id}</Text>       
            </View>
            <View style={[{flexDirection:'row', flex:1}]}>
            <View style = {{flex:0.97}}>
            <Text style={[{color:'#3180E5', fontWeight:'500', fontSize:16 }, getMarginTop(-4.8), getMarginLeft(10)]}>{item.name}</Text>
            </View>
            {(item.status === 'Approved')?
            <View style={[{borderWidth:0, borderRadius:5, backgroundColor:'#029D01', justifyContent:'flex-end'}, getWidthnHeight(undefined,3), getMarginTop(-4.2)]}>
            <Text style={[{color:'#ffffff', paddingHorizontal:10, paddingVertical:1, fontStyle:'italic'}, fontSizeH4()]}>{item.status}</Text>
            </View>:
            (item.status === 'Paid')?
            <View style={[{borderWidth:0, borderRadius:5, backgroundColor:'#EB3A32', justifyContent:'flex-end'}, getWidthnHeight(undefined,3), getMarginTop(-4.2)]}>
            <Text style={[{color:'#ffffff', paddingHorizontal:10, paddingVertical:1, fontStyle:'italic'}, fontSizeH4()]}>{item.status}</Text>
            </View>:
            (item.status === 'New')?
            <View style={[{borderWidth:0, borderRadius:5, backgroundColor:'#00B7DB', justifyContent:'flex-end'}, getWidthnHeight(undefined,3), getMarginTop(-4.2)]}>
            <Text style={[{color:'#ffffff', paddingHorizontal:10, paddingVertical:1, fontStyle:'italic'}, fontSizeH4()]}>{item.status}</Text>
            </View>:
            <View style={[{borderWidth:0, borderRadius:5, backgroundColor:'#DE9222', justifyContent:'flex-end'}, getWidthnHeight(undefined,3), getMarginTop(-4.2)]}>
            <Text style={[{color:'#ffffff', paddingHorizontal:10, paddingVertical:1, fontStyle:'italic'}, fontSizeH4()]}>{item.status}</Text>
            </View>
            }
            </View>
            <View style ={[{flexDirection:'row'},getMarginLeft(6), getMarginTop(-1.8)]}>
            <FontAwesomeIcons name='caret-right' size={23} color={'#3280E4'}/>  
            <Text style={[{fontWeight:'bold'},getMarginLeft(2)]}>{item.from}</Text>
            </View>
            
            <View style ={[{flexDirection:'row'},getMarginLeft(4.5), getMarginTop(0)]}>
            <Text style={[{fontStyle:'italic',color:'#3280E4', marginRight:'2.5%'},getMarginLeft(2)]}>{item.datefrom}</Text>  
            <FontAwesomeIcons name='long-arrow-right' size={23} color={'#3280E4'}/>  
            <Text style={[{fontStyle:'italic',color:'#3280E4'},getMarginLeft(3)]}>{item.dateto}</Text>
            </View>
            <View style = {[{alignItems:"flex-start", flexDirection:'row'}, getMarginLeft(6), getMarginTop(0.6)]}>
                <Text style = {[{color:'#565656', fontWeight:'600'} ,fontSizeH4()]}>TC: </Text>
                <View style={{backgroundColor:'#DAE7F7'}}>
                <Text style = {[{fontWeight:'600', fontStyle:'italic',fontSize:12}]}> {item.travelcode} </Text>
                </View>
                <View>
                  <Text style = {[{color:'#565656', fontWeight:'bold', fontSize:20}, getMarginTop(-1), getMarginLeft(3.5)]}>|</Text>
                </View>
                <Text style = {[{color:'#565656', fontWeight:'600'},fontSizeH4(),getMarginLeft(3.5)]}>Amount: </Text>
                <View style={{backgroundColor:'#367FE6'}}>
                <Text style = {[{color:'#fff', fontWeight:'600', fontStyle:'italic',fontSize:12}]}> {'3000/-'} </Text>
                </View>
                <TouchableHighlight underlayColor="#3280E4" onPress= {() => Actions.View_Travel()} style={{width: '8%',height: 25,borderRadius: 25/2, borderWidth:0, backgroundColor:'#DBE8F8', justifyContent:'center',marginLeft:getMarginLeft(7).marginLeft}}>
                    <View style={[{alignItems:'center'}]}>   
                    <FontAwesomeIcons name='eye' size={16}/>
                    </View> 
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#3280E4" onPress= {() => console.log("button pressed")} style={{width: '8%',height: 25,borderRadius: 25/2, borderWidth:0, backgroundColor:'#DBE8F8', justifyContent:'center',marginLeft:getMarginLeft(2).marginLeft}}>
                    <View style={[getMarginTop(0.6), getMarginLeft(2)]}>   
                    <FontAwesomeIcons name='edit' size={16}/>
                    </View> 
                </TouchableHighlight>
            </View>
            </View>
          </View>
    )
  };

  render() {
    let data = [{
      value: 'Banana',
    }, {
      value: 'New',
    }, {
      value: 'Ne',
    }];

    
    const animatedStyle = { width: this.animatedWidth, height: this.animatedHeight}
    const iconmargin = {marginLeft: this.iconaling} 


    return (
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
          <View style = {styles.container}>
              <WaveHeader
                    wave={Platform.OS ==="ios" ? false : false} 
                    //logo={require('../Image/Logo-164.png')}
                    menu='white'
                    title='Travel Approval Listing'
                    designby = {'aman'}
                    //version={`Version ${this.state.deviceVersion}`}
              />
          
          <View style={[{alignItems:'center'}, getMarginTop(1.5), fontSizeH3()]}>
                <Text style = {{color:'#3381E6', textDecorationLine: 'underline',}}>Check Travel Pre Approval Status</Text>
          </View>
          <View style={[styles.MainContainer, getMarginTop(2)]}>
           <View style = {[{flexDirection:'row', justifyContent:'center'},getMarginTop(2.5)]} >
                <View style = {[styles.Dropbox, getMarginLeft(-1)]}>

                <Dropdown
                 containerStyle={[{justifyContent: 'center', borderColor: 'grey', borderWidth: 0, paddingLeft: 0, borderRadius: 10, marginTop:-5}, getWidthnHeight(88.5, 7)]}
                 //  maxLength = {12}
                 inputContainerStyle={[{borderBottomWidth:0, marginTop:4,alignSelf:'center'}, getWidthnHeight(40, 7.9)]}
                 label={'Request Type'}
                 data={data}
                 //data={this.state.leadIndustryOptionsId}
                 //valueExtractor={({id})=> id}
                 //labelExtractor={({industry_name})=> industry_name}
                 onChangeText={status => this.setState({ status }, this.ondrop)}
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
                 <View style = {[styles.Dropbox , getMarginLeft(2)]}>
                 <Dropdown
                 containerStyle={[{justifyContent: 'center', borderColor: 'grey', borderWidth: 0, paddingLeft: 0, borderRadius: 10, marginTop:-5}, getWidthnHeight(88.5, 7)]}
                 //  maxLength = {12}
                 inputContainerStyle={[{borderBottomWidth:0, marginTop:4,alignSelf:'center'}, getWidthnHeight(40, 7.9)]}
                 label={'List Type'}
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
           <DismissKeyboard>
           <View style={{alignItems:'center',justifyContent:'center'}}>
              <Animated.View style = {[{},styles.box, animatedStyle, getMarginTop(2)]}>        
                <View>
                <TextInput
                  placeholder={this.state.placeholder}
                  onFocus={() => this.setState({placeholder: ''})}
                  onBlur = {() => this.setState({placeholder: 'Search here'})}
                  onChangeText={(searchtext) => this.setState({searchtext}, this.ondrop)}  
                  value={this.state.searchtext}
                  backgroundColor='white'
                  style= {[{paddingLeft:35,borderWidth:0, borderColor:'#DBE8F8', borderRadius:50, padding:10,}, getMarginTop(0),getMarginLeft(0), fontSizeH3()]}
                />
                </View>    
              </Animated.View>
              {this.state.show?
              <TouchableOpacity style = {[{backgroundColor:'white',width: '25%'},styles.Ancontainer]} onPress = {this.animatedBox}>  
                  <Animated.View style={[{elevation: 15, width: '35%',height: 35,borderRadius: 35/2, borderWidth:0, backgroundColor:'white', justifyContent:'center'}, iconmargin]}>
                  <Animated.View style={[{alignItems:'center'}]}>   
                      <FontAwesomeIcons name='search' size={20} color={'#3181E2'}/>
                  </Animated.View>
                  </Animated.View>
              </TouchableOpacity>:
              <View>
              <View style ={[getMarginTop(-4.1), getMarginLeft(-1.5), getWidthnHeight(5)]}>
              <TouchableOpacity onPress = {this.hideshow}>
                <FontAwesomeIcons name='close' size={20} color={'#C4C4C4'}/>
              </TouchableOpacity>
              </View> 
              <TouchableOpacity style = {[{backgroundColor:'white'},styles.Ancontainer,]} onPress = {this.animatedBox}>  
                  <Animated.View style={[{width: '11%',height: 35,borderRadius: 35/2, borderWidth:0, backgroundColor:'#3280E4', justifyContent:'center'}, getMarginTop(-3.22), iconmargin]}>
                  <Animated.View style={[{alignItems:'center'}]}>   
                      <FontAwesomeIcons name='search' size={20} color={'white'}/>
                  </Animated.View>
                  </Animated.View>
              </TouchableOpacity>
              </View>
              }
            </View>  
            </DismissKeyboard>
           <ScrollView>
                <FlatList
                    data={this.state.DATA}
                    initialNumToRender = {this.state.DATA.length}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                /> 
            </ScrollView>
          </View>
          </View>
          </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    height:'100%'
  },
  MainContainer:{
    flex: 1,
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
  },
  Dropbox:{
    borderWidth: 1,
    left:0,
    width:getWidthnHeight(45).width,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    borderColor: '#C4C4C4',
    marginTop:getMarginTop(1.5).marginTop
  },
  rectangletriangleCorner: {
    width: getWidthnHeight(42).width,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 23,
    borderTopWidth: 40,
    borderRightColor: "transparent",
    borderTopColor: "#307FE4",
  }, 
  flatlistcontainer:{
    width:getWidthnHeight(91).width,
    height:getWidthnHeight(undefined,14.5).height,
    backgroundColor: '#FFFFFF',
    borderWidth:0,
    borderColor: '#C4C4C4',
    marginTop:getMarginTop(3).marginTop,
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
        elevation: 13,
      }
    }),
    shadowOpacity: 0.3,
    shadowRadius: 40,
    borderColor: 'black',
    borderWidth: 0
  }, 
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 40,
    borderTopWidth: 40,
    borderRightColor: "transparent",
    borderTopColor: "#307FE4",
  }, 
  Ancontainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
      backgroundColor: 'white',
      width: 0,
      height: 0,
      justifyContent:"center",
      borderRadius:50,
      borderWidth:1,
      borderColor:'#DBE8F8'
  }
});
