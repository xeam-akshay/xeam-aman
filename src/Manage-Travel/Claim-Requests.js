import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  TouchableHighlight,
  TextInput,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Dropdown } from 'react-native-material-dropdown';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
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
      showbox: true,
      showsubmitbtn:false,
      opid:'',
      opacity:1,
      backstatus:'',
      full:true,
      DATA : [
        {
          id: '01',
          from:'Travel Purpose',
          travelcode:'200700002',
          status:'Approved',
          to:'To',
          title: 'First Item',
          name:'Name',
          show:false,
          swbtn:true,
          swipe:true
        },
        {
          id: '02',
          from:'Travel Purpose',
          travelcode:'200700002',
          status:'Paid',
          to:'To',
          title: 'Second Item',
          name:'Name',
          show:false,
          swbtn:true,
          swipe:true
        },
        {
          id: '03',
          from:'Travel Purpose',
          travelcode:'200700002',
          status:'New',
          to:'To',
          title: 'Third Item',
          name:'Name',
          show:false,
          swipe:true,
          swbtn:true,
        },
        {
            id: '04',
            from:'Travel Purpose',
            travelcode:'200700002',
            status:'New',
            to:'To',
            title: 'First Item',
            name:'Name',
            show:false,
            swbtn:true,
            swipe:true
          },
          {
            id: '05',
            from:'Travel Purpose',
            travelcode:'200700002',
            status:'Back',
            to:'To',
            title: 'Second Item',
            name:'Name',
            show:false,
            swbtn:true,
            swipe:true
          },
          {
            id: '06',
            from:'Travel Purpose',
            travelcode:'200700002',
            status:'New',
            to:'To',
            title: 'Third Item',
            name:'Name',
            show:false,
            swbtn:true,
            swipe:true
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
    this.animatedlistHeight = new Animated.Value(0)
    this.animatedlistWidth = new Animated.Value(0)
    this.animatedswipWidth = new Animated.Value(10)
    this.animatedopacity = new Animated.Value(1)
    this.animatedmargin = new Animated.Value(100)
    this.animatedcommentWidth = new Animated.Value(0)
    this.animatedcommentHeight = new Animated.Value(0)
    this.bordercommentanimated = new Animated.Value(0)
 }
 
 /* To Animate Open Search Bar On click*/
 /******/
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
 /******/

 /* To Animate Open Status Box On click*/
 /******/

 animatedlistbox =(status, id)=>{
    this.state.DATA.forEach(element => {
      if(element.id === id && element.swipe === true){
      element.show = true
      this.listbox();
      }
    });
    this.setState({showbox:false})
    this.setState({opid:selectedid})
    this.setState({backstatus:status})
    this.setState({showsubmitbtn:true})
 }

 listbox =()=>{
    Animated.timing(this.animatedlistWidth, {
        toValue: 260,
        duration: 1000
    }).start()
    Animated.timing(this.animatedlistHeight, {
        toValue: 82.3,
        duration: 1000
    }).start()
    Animated.timing(this.animatedswipWidth,{
      toValue: 100,
      duration: 1000
    }).start()
    Animated.timing(this.animatedmargin,{
      toValue: 1000,
      duration: 100
    })
    Animated.timing(this.animatedcommentWidth, {
      toValue: 220,
      duration: 1000
    }).start()
    Animated.timing(this.animatedcommentHeight, {
        toValue: 30,
        duration: 1000
    }).start()
    Animated.timing(this.bordercommentanimated, {
      toValue: 0,
      duration: 1000
    }).start()
 }

 /******/

 /* To Animate Hide Search Box On click*/
 /******/
  hideshow=()=>{
    Animated.timing(this.animatedWidth, {
      toValue: 0,
      duration: 100
    }).start()
    Animated.timing(this.animatedHeight, {
      toValue: 0,
      duration: 100
    }).start()
    Animated.timing(this.iconaling, {
      toValue: 0,
      duration: 0
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
  /******/

  /* To Animate Hide Status Box On click*/
  /******/

  opacitybox = (id) => {
    this.state.DATA.forEach(element => {
      if(element.id === id){
      element.show = false
      this.listclose();
      this.close(id);
      }
    });
    this.setState({opid:selectedid})
  }

  listclose = () => {
    Animated.timing(this.animatedopacity, {
      toValue: 1,
      duration: 10
    }).start()
    Animated.timing(this.animatedlistWidth, {
      toValue: 0,
      duration: 100
      }).start()
    Animated.timing(this.animatedlistHeight, {
        toValue: 0,
        duration: 100
    }).start()
    Animated.timing(this.animatedcommentWidth, {
      toValue:0,
      duration: 100
    }).start()
    Animated.timing(this.animatedcommentHeight, {
        toValue: 0,
        duration: 100
    }).start()
    Animated.timing(this.bordercommentanimated, {
      toValue: 0,
      duration: 100
    }).start()
  }
  /******/


  open = (item) => {
    global.selectedid = ' '
  }


  close = (id) => {
    //this.renderLeftActions().close
  }

  set = (id) => {
    this.state.DATA.forEach(element => {
      if(element.id === id){
        element.swipe = true
      }
    });
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

  /* On Swipe Render*/
  /******/

  renderLeftActions = (progress,id,status,show,swbtn,dragX) => {
    global.selectedid = id
    const animatedStyle = [!status? {width:this.animatedlistWidth, height:this.animatedlistHeight}:null]
    const animatedmargin = [!status?{marginRight:this.animatedmargin}:null]
    const animatedcomment = [!status?{ width: this.animatedcommentWidth, height: this.animatedcommentHeight, borderWidth:this.bordercommentanimated}:null]
    return (
      <Animated.View style ={[getMarginTop(0.5)]} >
        {show?
        <View>  
        <View style ={{flexDirection:'row'}}>
            <View>  
                <Animated.View style={[getWidthnHeight(85)]}> 
                <TouchableHighlight underlayColor="#3280E4" onPress= {()=>this.animatedlistbox('Approved', id)} style={[{height: 25,borderRadius:5, borderWidth:0, backgroundColor:'#009E00', justifyContent:'center', marginHorizontal:'3%', marginVertical:'0.5%'}, getWidthnHeight(21)]}>
                    <View style={[{alignItems:'center'}]}>   
                    <Text style = {{padding:0.5,color:'white'}}>Approved</Text>
                    </View> 
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#3280E4" onPress= {() =>this.animatedlistbox('Rejected', id)} style={[{height: 25,borderRadius:5, borderWidth:0, backgroundColor:'#EA3933', justifyContent:'center', marginHorizontal:'3%', marginVertical:'0.5%'},getWidthnHeight(21)]}>
                    <View style={[{alignItems:'center'}]}>   
                    <Text style = {{padding:0.5,color:'white'}}>Rejected</Text>
                    </View> 
                </TouchableHighlight>
                </Animated.View>
            </View>
        {(status)?
        <Animated.View style = {[{borderWidth:0, backgroundColor:'white', position:'absolute' },getMarginLeft(28),getMarginTop(-0.3), animatedStyle]}>
            <View style ={{flexDirection:'row', flex:1}}> 
                <View>
                {this.state.backstatus != ''?
                <Text style={[{alignItems:'center', flex:0.7},getMarginLeft(1)]}>Status : {this.state.backstatus}</Text>:
                <Text>STATUS : {status}</Text>}</View>
                <View>
                <TouchableOpacity onPress={() => this.opacitybox(id)} style ={[{flex:0.3},getMarginTop(0), getMarginLeft(18)]}>
                  <FontAwesomeIcons name='close' size={18} color={'black'}/>
                </TouchableOpacity> 
                </View>
            </View> 
            <Animated.View style={[{borderWidth:0},animatedcomment]}>
              <TextInput
                placeholder={'Comment'}
                onFocus={() => this.setState({placeholder: ''})}
                onBlur = {() => this.setState({placeholder: 'Search here'})}
                onChangeText={(searchtext) => this.setState({searchtext})}  
                value={this.state.searchtext}
                backgroundColor='white'
                style= {[{paddingLeft:5,borderWidth:0.8, borderColor:'#DBE8F8', borderRadius:0, padding:0}, getMarginTop(0.5),getMarginLeft(1)]}
              />
            </Animated.View>   
            {this.state.showsubmitbtn? 
              <TouchableOpacity onPress={this.opacitybox} style ={[{borderWidth:0,borderRadius:5, backgroundColor:'#3280E2'},getMarginTop(0.3), getWidthnHeight(20), getMarginLeft(36)]}>
              <Text style={{textAlign:'center', fontSize:13, color:'white'}}>SUBMIT</Text>
              </TouchableOpacity>: null }
        </Animated.View>  : null}
        </View>
        </View>:null}
      </Animated.View>
    );
  };

  /******/

  
  /* Render Flatlist*/
  /******/


  renderItem = ({ item }) => {
    const animatedopacity = {opacity: this.animatedopacity}
    return( 
        <Animated.View style={[item.id == this.state.opid? animatedopacity:{opacity:1},styles.flatlistcontainer, getMarginLeft(4)]}>
        <Swipeable childrenContainerStyle ={{backgroundColor:'white'}} onSwipeableWillClose = {()=>this.close(item.id)} renderLeftActions= {(progress) => this.renderLeftActions(progress, item.id, item.show, item.swipe , item.swbtn)}>
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
            <View style ={[{flexDirection:'row'},getMarginLeft(6), getMarginTop(-1.6)]}>
                <FontAwesomeIcons name='caret-right' size={23} color={'#3280E4'}/>  
                <Text style={[{fontWeight:'bold'},getMarginLeft(2)]}>{item.from}</Text>
            </View>
            <View style = {[{alignItems:'flex-start', flexDirection:'row'}, getMarginLeft(6), getMarginTop(0.6)]}>
                <Text style = {[{color:'#565656', fontWeight:'600'} ,fontSizeH4()]}>CC: </Text>
            <View style={{backgroundColor:'#DAE7F7'}}>
                <Text style = {[{fontWeight:'600', fontStyle:'italic',fontSize:12}]}> {item.travelcode} </Text>
            </View>
            <View>
                <Text style = {[{color:'#565656', fontWeight:'bold', fontSize:20}, getMarginTop(-1), getMarginLeft(7.5)]}>|</Text>
            </View>
                <Text style = {[{color:'#565656', fontWeight:'600'},fontSizeH4(),getMarginLeft(7.5)]}>Amount: </Text>
            <View style={{backgroundColor:'#367FE6'}}>
                <Text style = {[{color:'#fff', fontWeight:'600', fontStyle:'italic',fontSize:12}]}> {'3000/-'} </Text>
            </View>
            <TouchableHighlight underlayColor="#3280E4" onPress= {() =>console.log("Pressed")} style={{width: '8%',height: 25,borderRadius: 25/2, borderWidth:0, backgroundColor:'#DBE8F8', justifyContent:'center',marginLeft:getMarginLeft(7).marginLeft}}>
                <View style={[{alignItems:'center'}]}>   
                    <FontAwesomeIcons name='eye' size={16}/>
                </View> 
            </TouchableHighlight>
            </View>
        </Swipeable>
        </Animated.View>     
    )
  };

  /******/

  /* Main Render */
  /******/
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
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style = {styles.container}>
          <WaveHeader
                wave={Platform.OS ==="ios" ? false : false} 
                //logo={require('../Image/Logo-164.png')}
                menu='white'
                title='Travel Claim Requests'
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

/******/

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
    height:getWidthnHeight(undefined,12).height,
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
