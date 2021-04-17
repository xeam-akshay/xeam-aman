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
  Circle,MySwitch,RoundButton, ItineraryModal,fontSizeH3, fontSizeH4, Date} from '../KulbirComponents/common'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { Dropdown } from 'react-native-material-dropdown';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Icons from 'react-native-vector-icons/MaterialIcons';
import DocumentPicker from 'react-native-document-picker';
import { stat } from 'react-native-fs';

const colorBase = '#25A2F9';
const colorTitle = '#0B8EE8';

export default class View_claim extends React.Component {

  constructor() {
    super();
    this.state = {
      remark:'',
      index:'0',
      twoindex:'0',
      status:'',
      position:'',
      activecircle:false,
      activecirclehod:false,
      activecircleauditor:false,
      activecirclemd:false,
      activecircleauditor2:false,
      DATA : [
        {
          id: '01',
          date: '01/01/2021',
          from:'From',
          to:'To',
          title: 'First Item',
        },
        {
          id: '02',
          date: '01/01/2021',
          from:'From',
          to:'To',
          title: 'Second Item',
        },
        {
          id: '03',
          date: '01/01/2021',
          from:'From',
          to:'To',
          title: 'Third Item',
        },
        {
          id: '04',
          date: '01/01/2021',
          from:'From',
          to:'To',
          title: 'First Item',
        },
        {
          id: '05',
          date: '01/01/2021',
          from:'From',
          to:'To',
          title: 'Second Item',
        },
        {
          id: '06',
          date: '01/01/2021',
          from:'From',
          to:'To',
          title: 'Third Item',
        },
      ],
    };
  }


  settwoindex=(value) => {
    const {twoindex} = this.state;
    this.setState({twoindex:value}, ()=>console.log(twoindex))
  }

  setindex=(value) => {
    const {index} = this.state;
    this.setState({index:value}, ()=>console.log(index))
  }

  renderItineraryItem = ({item}) => {
    return(
      <View style={[styles.flatlistcontainer, getMarginLeft(2.5)]}>
            <View style={[styles.triangleCornerl]}/>
            <View>
                <Text style={[{marginTop:getMarginTop(-5.2).marginTop, color:'white'}, fontSizeH4(),getMarginLeft(1)]}>{item.id}</Text>                
            </View>
            <Text style={[{ fontWeight:'bold',}, getMarginTop(-4.3), getMarginLeft(8)]}>{item.date}</Text>
            <View style={{flexDirection:'row', marginTop:getMarginTop(0.5).marginTop}}>
                <View style={[{color:'black'}, getMarginLeft(2.5), getMarginTop(0.2)]}>  
                <FontAwesomeIcons name='map-marker' color={'#0D900C'} size={18}/>
                </View>
                <Text style={[{color:'black'}, getMarginLeft(2)]}>{item.from}</Text>
                <View style={[{color:'black'}, getMarginLeft(5), getMarginTop(0.2)]}>  
                <FontAwesomeIcons name='map-marker' color={'#E92A32'} size={18}/>
                </View>
                <Text style={[{color:'black'}, getMarginLeft(2)]}>{item.to}</Text>
            </View>
            <View style = {[{alignItems:'flex-start', flexDirection:'row'}, getMarginLeft(2.2), getMarginTop(0.5)]}>
                <Text style = {[{color:'#565656', fontWeight:'bold'},fontSizeH3() ]}> Conveyance: </Text>
                <View style={{backgroundColor:'#DAE7F7'}}>
                <Text style = {[{color:'#565656', fontWeight:'600', fontStyle:'italic'},fontSizeH3() ]}> Own car -Diesel[4.5/km] </Text>
                </View>
            </View>
            <View style ={[{flexDirection:"row"}]}>
            <View style ={[getMarginLeft(3)]}>  
            <View>
            <View style = {[getWidthnHeight(35)]}>
            <View style={[{flexDirection:'row',backgroundColor:'#E83A31', marginTop:getMarginTop(1).marginTop},styles.box]}>    
            <View style={[{width: '25%',height:28,borderRadius: 28/2, borderWidth:0, backgroundColor:'#DBE8F8', justifyContent:'center', backgroundColor:'#F48D88'}, getMarginTop(1.25), getMarginLeft(1.5)]}>
            <View style={[{alignItems:'center'}]}>   
            <FontAwesome name='route' size={16} color={'white'}/>
            </View> 
            </View>    
            <View style ={[getMarginTop(0.7), getMarginLeft(1)]}>
            <Text style = {[{color:'#FFFEFF', fontSize:9} ]}>Distance</Text>
            <Text style = {[{color:'#FFFEFF', fontWeight:'bold'},fontSizeH4() ]}>10 km</Text>
            </View>
            </View>
            </View>
            </View> 
            </View>
            <View>
            <View style = {[getWidthnHeight(35)]}>
            <View style={[{flexDirection:'row', marginTop:getMarginTop(1).marginTop, backgroundColor:'#E58F1E'},styles.box, getMarginLeft(-6)]}>    
            <View style={[{width: '25%',height: 28,borderRadius: 28/2, borderWidth:0, backgroundColor:'#DBE8F8', justifyContent:'center', backgroundColor:'#EAA74E'}, getMarginTop(1.25), getMarginLeft(1.5)]}>
            <View style={[{alignItems:'center'}]}>   
            <FontAwesome name={'money-bill-alt'} size={16} color={'white'}/>
            </View> 
            </View>    
            <View style ={[getMarginTop(0.7), getMarginLeft(1)]}>
            <Text style = {[{color:'#FFFEFF', fontSize:9 }]}>{'Expected Cost'}</Text>
            <Text style = {[{color:'#FFFEFF', fontWeight:'bold'},fontSizeH4() ]}>{'45/-'}</Text>
            </View>
            </View>
            </View>
            </View>
            </View>
      </View>
    )
  }

  renderStayItem = ({item}) => {
    return(
      <View style={[styles.flatlistcontainer, getMarginLeft(2.5)]}>
            <View style={[styles.triangleCornerl]}/>
            <View>
                <Text style={[{marginTop:getMarginTop(-5.2).marginTop, color:'white'}, fontSizeH4(),getMarginLeft(1)]}>{item.id}</Text>                
            </View>
            <View style={[{flexDirection:'row'},getMarginTop(-3), getMarginLeft(3.5)]}>
                <View style={[{color:'black'}, getMarginLeft(2.5), getMarginTop(0.2)]}>  
                <FontAwesomeIcons name='map-marker' color={'#747474'} size={20}/>
                </View>
                <Text style={[{color:'black'}, getMarginLeft(2), fontSizeH3(), getMarginTop(0.3)]}>{item.from}</Text>
            </View>
            <View style = {[{alignItems:'flex-start', flexDirection:'row'}, getMarginLeft(2.2), getMarginTop(0.5)]}>
                <Text style = {[{color:'#565656'},fontSizeH3() ]}> From: </Text>
                <View style={{backgroundColor:'#DAE7F7'}}>
                <Text style = {[{color:'#565656', fontWeight:'600', fontStyle:'italic'},fontSizeH4() ]}> {item.date} </Text>
                </View>
                <Text style = {[{color:'#565656'},fontSizeH3(), getMarginLeft(5)]}> To: </Text>
                <View style={{backgroundColor:'#DAE7F7'}}>
                <Text style = {[{color:'#565656', fontWeight:'600', fontStyle:'italic'},fontSizeH4() ]}> {item.date} </Text>
                </View>
            </View>
            <View style ={[{flexDirection:"row"}, getMarginTop(0.5)]}>
            <View style ={[getMarginLeft(3)]}>  
            <View>
            <View style = {[getWidthnHeight(33.7)]}>
            <View style={[{flexDirection:'row',backgroundColor:'#E83A31', marginTop:getMarginTop(1).marginTop},styles.box]}>    
            <View style={[{width: '25%',height:28,borderRadius: 28/2, borderWidth:0, backgroundColor:'#DBE8F8', justifyContent:'center', backgroundColor:'#F48D88'}, getMarginTop(1.25), getMarginLeft(1.5)]}>
            <View style={[{alignItems:'center'}]}>   
            <FontAwesome name='home' size={16} color={'white'}/>
            </View> 
            </View>    
            <View style ={[getMarginTop(0.7), getMarginLeft(1)]}>
            <Text style = {[{color:'#FFFEFF', fontSize:9} ]}>Stay Night</Text>
            <Text style = {[{color:'#FFFEFF', fontWeight:'bold'},fontSizeH4() ]}>300/-</Text>
            </View>
            </View>
            </View>
            </View> 
            </View>
            <View>
            <View style = {[getWidthnHeight(33.9)]}>
            <View style={[{flexDirection:'row', marginTop:getMarginTop(1).marginTop, backgroundColor:'#E58F1E'},styles.box, getMarginLeft(-5.6)]}>    
            <View style={[{width: '25%',height: 28,borderRadius: 28/2, borderWidth:0, backgroundColor:'#DBE8F8', justifyContent:'center', backgroundColor:'#EAA74E'}, getMarginTop(1.25), getMarginLeft(1.5)]}>
            <View style={[{alignItems:'center'}]}>   
            <FontAwesome name={'money-bill-alt'} size={16} color={'white'}/>
            </View> 
            </View>    
            <View style ={[getMarginTop(0.7), getMarginLeft(1)]}>
            <Text style = {[{color:'#FFFEFF', fontSize:9 }]}>{'DA'}</Text>
            <Text style = {[{color:'#FFFEFF', fontWeight:'bold'},fontSizeH4() ]}>{'200/-'}</Text>
            </View>
            </View>
            </View>
            </View>
            <View>
            <View style = {[getWidthnHeight(33.7)]}>
            <View style={[{flexDirection:'row', marginTop:getMarginTop(1).marginTop, backgroundColor:'#00C9DA'},styles.box, getMarginLeft(-11.5)]}>    
            <View style={[{width: '25%',height: 28,borderRadius: 28/2, borderWidth:0, justifyContent:'center', backgroundColor:'#72DDE7'}, getMarginTop(1.25), getMarginLeft(1.5)]}>
            <View style={[{alignItems:'center'}]}>   
            <FontAwesome name={'money-bill-alt'} size={16} color={'white'}/>
            </View> 
            </View>    
            <View style ={[getMarginTop(0.7), getMarginLeft(1)]}>
            <Text style = {[{color:'#FFFEFF', fontSize:9 }]}>{'Total'}</Text>
            <Text style = {[{color:'#FFFEFF', fontWeight:'bold'},fontSizeH4() ]}>{'500/-'}</Text>
            </View>
            </View>
            </View>
            </View>
            </View>
      </View>
    )
  }


  renderdocument = ({item}) => {
    return(
      <View style={[styles.flatlistcontainer, getMarginLeft(2.5), getWidthnHeight(undefined,12)]}>
            <View style={[styles.triangleCornerl]}/>
            <View>
                <Text style={[{marginTop:getMarginTop(-5.2).marginTop, color:'white'}, fontSizeH4(),getMarginLeft(1)]}>{item.id}</Text>                
            </View>
            <View style={[{flexDirection:'row'},getMarginTop(-3), getMarginLeft(3.5)]}>
                <Text style={[{color:'black', fontWeight:'bold'}, getMarginLeft(2), getMarginTop(0.3)]}>{'Flight'}</Text>
            </View>
            <View style = {[{alignItems:'flex-start', flexDirection:'row'}, getMarginLeft(2.2), getMarginTop(0.5)]}>
                <Text style = {[{color:'#565656'},fontSizeH3() ]}> Travel Exp. Travel Exp. Travel Exp. </Text>
                <TouchableHighlight underlayColor="#3280E4" onPress= {() =>console.log("Pressed")} style={{width: '8%',height: 28,borderRadius: 28/2, borderWidth:0, backgroundColor:'#DBE8F8', justifyContent:'center',marginLeft:getMarginLeft(13).marginLeft}}>
                    <View style={[{alignItems:'center'}]}>   
                        <FontAwesomeIcons name='download' size={18}/>
                    </View> 
                </TouchableHighlight>    
            </View>
      </View>
    )
  }

  Itinerary = () => {
    return (
      <View>
      <View style = {[{flexDirection:'row',  marginTop:getMarginTop(1.2).marginTop, justifyContent:'center', alignItems:'center'}, getWidthnHeight(98.77,5), getMarginLeft(0.7)]}>  
      <LinearGradient start={{x: 0, y: 0}} end={{x: 0.4, y: 0}} colors={['#0255BF','#1968CF', '#2C7BE0']} style={[{ borderWidth:0, flex:0.32,justifyContent:'center', alignItems:'center'},getWidthnHeight(undefined,5)]}>
     <TouchableHighlight underlayColor="transparent" onPress= {() => this.setindex('0')} style = {[getMarginTop(2.2)]}>
         <Text style={[{textAlign:'center', color:'white'}]}> Itinerary </Text>    
     </TouchableHighlight>
     <View style = {[styles.triangleCorner]}/>
     </LinearGradient>
     <TouchableHighlight underlayColor="#DAE7F7" onPress= {() => this.setindex('1')} style={[{ borderWidth:0, flex:0.32, backgroundColor:'#DAE7F7',justifyContent:'center', alignItems:'center'},getWidthnHeight(undefined,5)]}>
         <Text style={{textAlign:'center'}}> Stay </Text> 
     </TouchableHighlight>
     <TouchableHighlight underlayColor="#DAE7F7" onPress= {() => this.setindex('2')} style={[{ borderWidth:0, flex:0.32, backgroundColor:'#DAE7F7',justifyContent:'center', alignItems:'center'},getWidthnHeight(undefined,5)]}>
         <Text style={{textAlign:'center'}}> Documents </Text>
     </TouchableHighlight>
     </View>
     <View style = {[{borderWidth:1, borderColor:'#1968CF'}, getWidthnHeight(94.7, 47), getMarginLeft(2.55)]}>
          <View>
          <FlatList
              nestedScrollEnabled ={true}
              data={this.state.DATA}
              initialNumToRender = {this.state.DATA.length}
              renderItem={this.renderItineraryItem}
              keyExtractor={item => item.id}
              ListFooterComponent = {() => <View style ={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Text style = {[{textAlign:'center', marginVertical:'3%'},fontSizeH3()]}> Total Itinerary Cost : </Text>
              <Text style = {[{textAlign:'center', marginVertical:'3%', fontWeight:'bold'},fontSizeH3()]}> 90/- </Text>
              </View>}
          />
          </View>
     <View style ={[getMarginTop(-47.5), getMarginLeft(13)]}>
     <View style = {[styles.triangleCorner]}/>
     </View>
     </View>
     </View>
    )
  };
  
  
  Stay = () => {
    return (
      <View>
      <View style = {[{flexDirection:'row',  marginTop:getMarginTop(1.2).marginTop, justifyContent:'center', alignItems:'center'}, getWidthnHeight(98.77,5), getMarginLeft(0.7)]}>
      <TouchableHighlight underlayColor="#DAE7F7" onPress= {() => this.setindex('0')} style={[{ borderWidth:0, flex:0.32, backgroundColor:'#DAE7F7',justifyContent:'center', alignItems:'center'},getWidthnHeight(undefined,5)]}>
        <Text style={[{textAlign:'center'}]}> Itinerary </Text>    
      </TouchableHighlight>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 0.4, y: 0}} colors={['#0255BF','#1968CF', '#2C7BE0']} style={[{ borderWidth:0, flex:0.32,justifyContent:'center', alignItems:'center'},getWidthnHeight(undefined,5)]}>
      <TouchableHighlight underlayColor="transparent" onPress= {() => this.setindex('1')} style = {[getMarginTop(2.2)]}>
        <Text style={{textAlign:'center', color:'white'}}> Stay </Text> 
      </TouchableHighlight>
      <View style = {[styles.triangleCorner]}/>
      </LinearGradient>
      <TouchableHighlight underlayColor="#DAE7F7" onPress= {() => this.setindex('2')} style={[{ borderWidth:0, flex:0.32, backgroundColor:'#DAE7F7',justifyContent:'center', alignItems:'center'},getWidthnHeight(undefined,5)]}>
        <Text style={{textAlign:'center'}}> Documents </Text>
      </TouchableHighlight>
      </View>
      <View style = {[{borderWidth:1, borderColor:'#1968CF'}, getWidthnHeight(94.7, 47), getMarginLeft(2.55)]}>
          <View>
          <FlatList
              nestedScrollEnabled ={true}
              data={this.state.DATA}
              initialNumToRender = {this.state.DATA.length}
              renderItem={this.renderStayItem}
              keyExtractor={item => item.id}
              ListFooterComponent = {() => <View style ={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Text style = {[{textAlign:'center', marginVertical:'3%'},fontSizeH3()]}> Total Stay Cost : </Text>
              <Text style = {[{textAlign:'center', marginVertical:'3%', fontWeight:'bold'},fontSizeH3()]}> 1000/- </Text>
              </View>}
          />
          </View>
     <View style ={[getMarginTop(-47.5), getMarginLeft(45)]}>
     <View style = {[styles.triangleCorner]}/>
     </View>

     </View>
      </View>
    )
  };
  
  
  Documents = () => {
    return (
      <View>
      <View style = {[{flexDirection:'row',  marginTop:getMarginTop(1.2).marginTop, justifyContent:'center', alignItems:'center'}, getWidthnHeight(98.77,5), getMarginLeft(0.7)]}>
      <TouchableHighlight underlayColor="#DAE7F7" onPress= {() => this.setindex('0')} style={[{ borderWidth:0, flex:0.32, backgroundColor:'#DAE7F7',justifyContent:'center', alignItems:'center'},getWidthnHeight(undefined,5)]}>
        <Text style={[{textAlign:'center'}]}> Itinerary </Text>    
      </TouchableHighlight>
      <TouchableHighlight underlayColor="#DAE7F7" onPress= {() => this.setindex('1')} style={[{ borderWidth:0, flex:0.32, backgroundColor:'#DAE7F7',justifyContent:'center', alignItems:'center'},getWidthnHeight(undefined,5)]}>
        <Text style={{textAlign:'center'}}> Stay </Text> 
      </TouchableHighlight>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 0.4, y: 0}} colors={['#0255BF','#1968CF', '#2C7BE0']} style={[{ borderWidth:0, flex:0.32,justifyContent:'center', alignItems:'center'},getWidthnHeight(undefined,5)]}>
      <TouchableHighlight underlayColor="transparent" onPress= {() => this.setindex('2')} style = {[getMarginTop(2.2)]}>
        <Text style={{textAlign:'center', color:'white'}}> Documents </Text>
      </TouchableHighlight>
      <View style = {[styles.triangleCorner]}/>
      </LinearGradient>
      </View>
      <View style = {[{borderWidth:1, borderColor:'#1968CF'}, getWidthnHeight(94.7, 28), getMarginLeft(2.55)]}>
          <View>
          <FlatList
              nestedScrollEnabled ={true}
              data={this.state.DATA}
              initialNumToRender = {this.state.DATA.length}
              renderItem={this.renderdocument}
              keyExtractor={item => item.id}
              ListFooterComponent = {() => <View style ={[getWidthnHeight(100,2)]}/>}
          />
          </View>
      <View style ={[getMarginTop(-28.5),getMarginLeft(76.5)]}>
      <View style = {[styles.triangleCorner]}/>
      </View>
      </View>
      </View>
    )
  };



  colorbox = (color, title, amount, width) => {
    return(
          <View style= {[{backgroundColor:color},styles.multicolorsmallbox, getWidthnHeight(width)]}>
              <Text style = {[{fontStyle:'normal',textAlign:'center', color:'white', fontSize:13}, getMarginTop(0.5)]}>
                {title}
              </Text>
              <Text style = {[{fontWeight:'bold',textAlign:'center', color:'white', fontSize:16}, getMarginTop(-0.3)]}>
                {amount}
              </Text>
          </View>
    )        
  }

  pre_approval_amount = () => {
    return (
      <View>
      <View style = {[{flexDirection:'row',  marginTop:getMarginTop(1.2).marginTop, justifyContent:'center', alignItems:'center'}, getWidthnHeight(94.77,5), getMarginLeft(2.55)]}>  
      <LinearGradient start={{x: 0, y: 0}} end={{x: 0.7, y: 0}} colors={['#0255BF','#1968CF', '#2C7BE0']} style={[{ borderWidth:0, flex:0.5,justifyContent:'center', alignItems:'center'},getWidthnHeight(undefined,5)]}>
     <TouchableHighlight underlayColor="transparent" onPress= {() => this.settwoindex('0')}>
         <Text style={[{textAlign:'center', color:'white'}]}> Pre-Approval Amount </Text>    
     </TouchableHighlight>
     </LinearGradient>
     <TouchableHighlight underlayColor="#DAE7F7" onPress= {() => this.settwoindex('1')} style={[{ borderWidth:0, flex:0.5, backgroundColor:'#DAE7F7',justifyContent:'center', alignItems:'center'},getWidthnHeight(undefined,5)]}>
         <Text style={{textAlign:'center'}}> Bank Details </Text> 
     </TouchableHighlight>
     </View>
     <View style = {[{borderWidth:1, borderColor:'#1968CF'}, getWidthnHeight(94.7, 9.8), getMarginLeft(2.55)]}>
     <View style = {{flexDirection:'row'}}>
       {this.colorbox('#EB3A32', 'Itinerary', '3000/-' , 29.5)}
       {this.colorbox('#E68F1B', 'Stay', '1500/-', 29.5)}
       {this.colorbox('#00B7D9', 'Imprest', '500/-', 29.5)}
     </View>  
     <View style ={[getMarginTop(-8.9), getMarginLeft(21.2)]}>
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
      <TouchableHighlight underlayColor="#DAE7F7" onPress= {() => this.settwoindex('0')} style={[{ borderWidth:0, flex:0.5, backgroundColor:'#DAE7F7',justifyContent:'center', alignItems:'center'},getWidthnHeight(undefined,5)]}>
        <Text style={[{textAlign:'center'}]}> Pre-Approval Amount </Text>    
      </TouchableHighlight>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 0.7, y: 0}} colors={['#0255BF','#1968CF', '#2C7BE0']} style={[{ borderWidth:0, flex:0.5,justifyContent:'center', alignItems:'center'},getWidthnHeight(undefined,5)]}>
      <TouchableHighlight underlayColor="transparent" onPress= {() => this.settwoindex('1')}>
        <Text style={{textAlign:'center', color:'white'}}> Bank Details </Text> 
      </TouchableHighlight>
      </LinearGradient>
      </View>
      <View style = {[{borderWidth:1, borderColor:'#1968CF'}, getWidthnHeight(94.7, 18), getMarginLeft(2.55)]}>
      <View style = {{flexDirection:'row'}}>
       {this.colorbox('#EB3A32', 'BANK NAME', 'SBI', 45)}
       {this.colorbox('#E68F1B', 'IFSC', 'SBIN000636212', 45)}
     </View>  
       {this.colorbox('#00B7D9', 'ACCOUNT NUMBER', '568166510531356416022925625',91.5)}
     <View style ={[getMarginTop(-17.1), getMarginLeft(69)]}>
     <View style = {[styles.triangleCorner]}/>
     </View>

     </View>
      </View>
    )
  };


  status = ()=>{
    return(
      <View style = {[{flexDirection:'row'}, getMarginTop(2)]}>
          <TouchableOpacity onPress = {()=>this.setState({activecircle:true, activecirclehod:true , activecircleauditor: false, activecirclemd: false, activecircleauditor2: false})}>
          <View style={[{backgroundColor:'white', borderRadius:(getWidthnHeight(undefined,9.5).height)/2, borderColor:'#3181E4'}, this.state.activecirclehod ? {borderWidth: 2}:{ borderWidth:0} , getWidthnHeight(18,9.5),getMarginLeft(1)]}>  
          <Circle position = {'HOD'} status = {'approved'} activecircle={this.state.activecircle}/>
          {
          this.state.activecirclehod ? 
            <View style = {[{ borderWidth:2, borderColor:'#3280E4', borderRadius:8},getWidthnHeight(undefined,3), getMarginTop(1)]}>
              <View style = {{alignItems:'center', justifyContent:'center'}}>
              <Text style={[{color:"#3280E4", fontSize:12}, getMarginTop(-0.1)]}>HOD</Text>
              </View>
            </View> :
            <View style = {[{ borderWidth:0, borderColor:'#3280E4', borderRadius:8},getWidthnHeight(undefined,3), getMarginTop(1)]}>
            <View style = {{alignItems:'center', justifyContent:'center'}}>
            <Text style={[{color:"#DBE8F8", fontSize:12}, getMarginTop(-0.1)]}>HOD</Text>
            </View>
          </View>
          }
          </View>
          </TouchableOpacity>
          <FontAwesome name={'angle-right'} size={30} color = {'#DBE8F8'} style={[getMarginTop(3), getMarginLeft(1)]}/> 
          <TouchableOpacity onPress = {()=>this.setState({activecircle:true, activecirclehod:false , activecircleauditor: true, activecirclemd: false, activecircleauditor2: false})}>
          <View style={[{backgroundColor:'white', borderRadius:(getWidthnHeight(undefined,9.5).height)/2, borderColor:'#3181E4'}, this.state.activecircleauditor ? {borderWidth: 2}:{ borderWidth:0} , getWidthnHeight(18,9.5),getMarginLeft(1)]}>
          <Circle position = {'AUDITOR'} status = {'rejected'} activecircle={this.state.activecircle}/>
          {
          this.state.activecircleauditor ? 
            <View style = {[{ borderWidth:2, borderColor:'#3280E4', borderRadius:8},getWidthnHeight(undefined,3), getMarginTop(1)]}>
              <View style = {{alignItems:'center', justifyContent:'center'}}>
              <Text style={[{color:"#3280E4",fontSize:12}, getMarginTop(-0.1)]}>AUDITOR</Text>
              </View>
            </View> :
            <View style = {[{ borderWidth:0, borderColor:'#3280E4', borderRadius:8},getWidthnHeight(undefined,3), getMarginTop(1)]}>
            <View style = {{alignItems:'center', justifyContent:'center'}}>
            <Text style={[{color:"#DBE8F8",fontSize:12}, getMarginTop(-0.1)]}>AUDITOR</Text>
            </View>
          </View>
          }
          </View>
          </TouchableOpacity>
          <FontAwesome name={'angle-right'} size={30} color = {'#DBE8F8'} style={[getMarginTop(3), getMarginLeft(1)]}/>
          <TouchableOpacity onPress = {()=>this.setState({activecircle:true, activecirclehod:false , activecircleauditor: false, activecirclemd: true, activecircleauditor2: false})}>
          <View style={[{backgroundColor:'white', borderRadius:(getWidthnHeight(undefined,9.5).height)/2, borderColor:'#3181E4'}, this.state.activecirclemd ? {borderWidth: 2}:{ borderWidth:0} , getWidthnHeight(18,9.5),getMarginLeft(1)]}>
          <Circle position = {'MD SIR'} status = {'sendback'} activecircle={this.state.activecircle}/>
          {
          this.state.activecirclemd ? 
            <View style = {[{ borderWidth:2, borderColor:'#3280E4', borderRadius:8},getWidthnHeight(undefined,3), getMarginTop(1)]}>
              <View style = {{alignItems:'center', justifyContent:'center'}}>
              <Text style={[{color:"#3280E4",fontSize:12}, getMarginTop(-0.1)]}>MD SIR</Text>
              </View>
            </View> :
            <View style = {[{ borderWidth:0, borderColor:'#3280E4', borderRadius:8},getWidthnHeight(undefined,3), getMarginTop(1)]}>
            <View style = {{alignItems:'center', justifyContent:'center'}}>
            <Text style={[{color:"#DBE8F8",fontSize:12}, getMarginTop(-0.1)]}>MD SIR</Text>
            </View>
          </View>
          }
          </View>
          </TouchableOpacity>
          <FontAwesome name={'angle-right'} size={30} color = {'#DBE8F8'} style={[getMarginTop(3), getMarginLeft(1)]}/>
          <TouchableOpacity onPress = {()=>this.setState({activecircle:true, activecirclehod:false , activecircleauditor: false, activecirclemd: false, activecircleauditor2: true})}>
          <View style={[{backgroundColor:'white', borderRadius:(getWidthnHeight(undefined,9.5).height)/2, borderColor:'#3181E4'}, this.state.activecircleauditor2 ? {borderWidth: 2}:{ borderWidth:0} , getWidthnHeight(18,9.5),getMarginLeft(1)]}>
          <Circle position = {'AUDITOR'} activecircle={this.state.activecircle}/>
          {
          this.state.activecircleauditor2 ? 
            <View style = {[{ borderWidth:2, borderColor:'#3280E4', borderRadius:8},getWidthnHeight(undefined,3), getMarginTop(1)]}>
              <View style = {{alignItems:'center', justifyContent:'center'}}>
              <Text style={[{color:"#3280E4",fontSize:12}, getMarginTop(-0.1)]}>AUDITOR</Text>
              </View>
            </View> :
            <View style = {[{ borderWidth:0, borderColor:'#3280E4', borderRadius:8},getWidthnHeight(undefined,3), getMarginTop(1)]}>
            <View style = {{alignItems:'center', justifyContent:'center'}}>
            <Text style={[{color:"#DBE8F8",fontSize:12}, getMarginTop(-0.1)]}>AUDITOR</Text>
            </View>
          </View>
          }
          </View>
          </TouchableOpacity>
          </View>  
    );
  }

  render() {
    const {color} = this.state;
    const {dateTime} = this.state
    let data = [{
      value: 'New',
    }, {
      value: 'Approved',
    }, {
      value: 'Rejected',
    },{
      value: 'back',
    }
  ];
    return (
          <View style = {{flex: 1}}>
            <View>
              <WaveHeader
                    wave={Platform.OS ==="ios" ? false : false} 
                    //logo={require('../Image/Logo-164.png')}
                    menu='white'
                    title='View Claim'
                    designby = {'aman'}
                    menuState = {false}
                    //version={`Version ${this.state.deviceVersion}`}
              />
          </View>
          <ScrollView>
          <View style ={[{backgroundColor:'#DBE8F8', borderRadius:10},styles.bigbluebox, getWidthnHeight(undefined,5.5)]}>    
          <View style = {{flexDirection:'row', marginTop:getMarginTop(1).marginTop, marginLeft:getMarginLeft(4).marginLeft}}>  
              <Text style = {[{fontWeight:'700', color:'#000'}, fontSizeH3, getMarginTop(0.2)]}> Rajveer Singh </Text>  
              <View style={{width: '7%',height: 25,borderRadius: 25/2, borderWidth:0, backgroundColor:'#3381E5', justifyContent:'center', marginLeft:getMarginLeft(1).marginLeft}}>  
              <View style={{alignItems:'center', marginLeft:getMarginLeft(0.5).marginLeft, marginTop:getMarginTop(-0.2).marginTop}}>   
              <FontAwesomeIcons name='angle-right' size={20} color={'white'}/>
              </View>
              </View>
              <Text style = {[getMarginTop(0.2)]}>  210300398 </Text>
          </View>  
          </View>
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
              <TouchableHighlight underlayColor="#3280E4" onPress= {() =>console.log("Pressed")} style={{width: '8.5%',height: 30,borderRadius: 30/2, borderWidth:0, backgroundColor:'white', justifyContent:'center',marginLeft:getMarginLeft(37).marginLeft, marginTop:getMarginTop(-0.5).marginTop}}>
                <View style={[{alignItems:'center'}]}>   
                    <FontAwesomeIcons name='eye' size={16} color={'#3580E5'}/>
                </View> 
              </TouchableHighlight>
              </View>  
              </LinearGradient>
          </View> 
          
                {(this.state.twoindex === '0')?
                 this.pre_approval_amount() : 
                 this.bank_details()
                }   
                    
                <Text style = {[{textAlign:"center", textDecorationLine:'underline', fontWeight:'700'}, getMarginTop(1), fontSizeH3()]}>Claimed Details</Text>  

                {(this.state.index === '0')?
                 this.Itinerary() : 
                 (this.state.index === '1')?
                 this.Stay(): 
                 this.Documents()
                }  
          <View style = {[{alignItems:'center', justifyContent:'center'}, getMarginTop(1)]}>
          <View style = {[{borderWidth:1, borderColor:'#487DCB',backgroundColor:'#DAE7F7', alignItems:'center', justifyContent:'center'}, getWidthnHeight(50,10)]}>
            <Text style = {[{fontSize:15}]}>Total Amount To Be Paid</Text>
            <Text style = {[fontSizeH4()]}>(Itinerary + Stay + imprest)</Text>
            <Text style = {[{fontWeight:'bold', fontSize:18}]}>1090/-</Text>
          </View>  
          </View>
          <View style = {[{borderWidth:0, borderColor:'#487DCB', backgroundColor:'#DCDCDC'}, getWidthnHeight(94.4,0.2), getMarginTop(1), getMarginLeft(3)]}/>
          <Text style={[{textAlign:'left', color:"#3280E5",fontWeight:'700'},fontSizeH3(), getMarginLeft(3.5)]}>APPROVAL STATUS</Text>
          <View style = {{alignItems:'center'}}>
               {this.status(this.state.status)}
          </View>     
          <View style = {[{borderWidth:1, borderColor:'#DAE7F7', backgroundColor:'#DAE7F7'}, getWidthnHeight(95,0.2), getMarginTop(4), getMarginLeft(2.5)]}/>
          {this.state.activecirclehod ? 
          <View style = {[styles.showstatusbox]}>
              <View style= {[getMarginLeft(2), getMarginTop(0.5)]}>
              <Text>Approved</Text>
              <Text>Remark Remark Remark Remark Remark Remark Remark Remark Remark</Text>
              </View>
          </View>  
          : 
          this.state.activecircleauditor ? 
          
          <View style = {[styles.showstatusbox]}>
            <View style= {[getMarginLeft(2), getMarginTop(0.5)]}>
            <Text>Rejected</Text>
            <Text>Remark Remark Remark Remark Remark Remark Remark Remark Remark</Text>
            </View>
          </View>
          
          
          :

          this.state.activecirclemd ? 
          <View style = {[styles.showstatusbox]}>
            <View style= {[getMarginLeft(2), getMarginTop(0.5)]}>
            <Text>Send Back</Text>
            <Text>Remark Remark Remark Remark Remark Remark Remark Remark Remark</Text>
            </View>
          </View>
          
          :

          <View>
          <View style = {[styles.Dropbox, getMarginLeft(2.5)]}>
          <Dropdown
                 containerStyle={[{justifyContent: 'center', borderColor: 'grey', borderWidth: 0, paddingLeft: 0, borderRadius: 10, marginTop:-5}, getWidthnHeight(100, 7)]}
                 //  maxLength = {12}
                 inputContainerStyle={[{borderBottomWidth:0, marginTop:4,alignSelf:'center'}, getWidthnHeight(90, 7.9)]}
                 label={'Status'}
                 data={data}
                 value={this.state.status}
                 //data={this.state.leadIndustryOptionsId}
                 //valueExtractor={({id})=> id}
                 //labelExtractor={({industry_name})=> industry_name}
                 onChangeText={status => this.setState({ status })}
                 baseColor='grey'
                 pickerStyle={{borderWidth: 0}}
                 dropdownOffset={{ 'top': 25 }}
                 fontSize = {13.5}
                  />
          </View>    
          <View style={[styles.InputBox]}> 
          <FloatingTitleTextInputField
                        attrName = 'remark'
                        title = 'Remark'
                        value = {this.state.remark}
                        titleActiveColor = {'#0B8EE8'}
                        titleInactiveColor = 'dimgrey'
                        Border_Styling = {'false'}
                        //titleActiveSize = {13}
                        titleInActiveSize = {13.5}
                        updateMasterState = {(attrName, remark) => {
                          this.setState({remark})
                        }}
                        textInputStyles = {[{ // here you can add additional TextInput styles
                          color: 'black',
                          fontSize: 14,
                          borderWidth:0,
                          width:getWidthnHeight(95).width,
                          paddingLeft:10,
                          paddingTop:15,
                        }]}
                    />  
          </View>    
             
          <View style={[{alignItems: 'center', justifyContent: 'center'}, getMarginTop(1)]}>
                        <TouchableOpacity style={[{flexDirection:'row', justifyContent: 'center', }]}>
                        <View style={[{justifyContent: 'center', alignItems: 'center', backgroundColor:'#3280E4',borderRightWidth:2, borderRightColor:'white', borderTopLeftRadius:5, borderBottomLeftRadius:5}, getWidthnHeight(4,5)]}/>
                            <View style={[{ justifyContent: 'center', alignItems: 'center', backgroundColor:'#3280E4'}, getWidthnHeight(20,5)]}>
                            <Text style = {{color:'white', fontWeight:"bold"}}>Submit</Text>
                            </View>
                            <View style={[{justifyContent: 'center', alignItems: 'center', backgroundColor:'#3280E4',borderLeftWidth:2, borderLeftColor:'white', borderTopRightRadius:5, borderBottomRightRadius:5}, getWidthnHeight(4,5)]}/>
                        </TouchableOpacity>
          </View>
          </View> 
          }
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
      width:getWidthnHeight(95).width,
      justifyContent: 'center',
      alignItems: 'center',
      color: 'black',
      borderColor: '#C4C4C4',
      marginTop:getMarginTop(1.5).marginTop
    },  
    InputBox:{
      borderWidth: 1,
      left:0,
      width:getWidthnHeight(95).width,
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
    showstatusbox:{
      marginTop:'1%',
      width: wp(94.5),
      height:hp(10),
      backgroundColor: '#FFFFFF',
      borderWidth:1,
      borderColor: '#C4C4C4',
      marginLeft:getMarginLeft(3).marginLeft
    }
});
