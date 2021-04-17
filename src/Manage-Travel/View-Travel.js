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
import {FloatingTitleTextInputField,getWidthnHeight, WaveHeader, getMarginTop, getMarginLeft, fontSizeH3, fontSizeH4} from '../KulbirComponents/common'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { Dropdown } from 'react-native-material-dropdown';

export default class View_Travel extends React.Component {

  constructor() {
    super();
    this.state = {
      remark:'',
      index:'0',
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
        STATUS : [
          {
            name:'Name',
            status:'New',
            remark:'Remark Remark Remark Remark Remark Remark Remark',
          },
          {
            name:'Name',
            status:'Approved',
            remark:'Remark Remark Remark Remark Remark Remark Remark',
          },
          ],
    };
  }

  setindex=(value) => {
    const {index} = this.state;
    this.setState({index:value}, ()=>console.log(index))
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
            <Text style = {[{color:'#FFFEFF', fontSize:9 }]}>{'Food Expenses'}</Text>
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
         <Text style={{textAlign:'center'}}> Imprest </Text>
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
     <View style ={[getMarginTop(-47.4), getMarginLeft(13)]}>
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
        <Text style={{textAlign:'center'}}> Imprest </Text>
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
     <View style ={[getMarginTop(-47.4), getMarginLeft(45)]}>
     <View style = {[styles.triangleCorner]}/>
     </View>

     </View>
      </View>
    )
  };
  
  
  Imprest = () => {
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
        <Text style={{textAlign:'center', color:'white'}}> Imprest </Text>
      </TouchableHighlight>
      <View style = {[styles.triangleCorner]}/>
      </LinearGradient>
      </View>
      <View style = {[{borderWidth:1, borderColor:'#1968CF'}, getWidthnHeight(94.7, 14), getMarginLeft(2.55)]}>
      <Text style={[{textAlign:'left', fontWeight:'700'}, fontSizeH3(), getMarginLeft(2.5), getMarginTop(2)]}> BPCL North Tech Assistant </Text> 
      <Text style={[{textAlign:'left'}, getMarginLeft(2.5)]}> Remarks Here Remarks Here </Text> 
      <View style = {{flexDirection:'row'}}>
      <Text style={[{textAlign:'left', fontWeight:'700'}, getMarginLeft(2.5)]}> Total Imprest Amount : </Text> 
      <View style={{backgroundColor:'#DAE7F7'}}>
        <Text style = {[{color:'#565656', fontWeight:'600', fontStyle:'italic'},fontSizeH4() ]}> 200/- </Text>
      </View>
      </View>
      <View style ={[getMarginTop(-11.6),getMarginLeft(77)]}>
      <View style = {[styles.triangleCorner]}/>
      </View>
      </View>
      </View>
    )
  };


  render() {
    const {color} = this.state;
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
                    title='View'
                    menuState = {false}
                    designby = {'aman'}
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
              <View style ={[{backgroundColor:'#009D00', borderRadius:10, alignItems:'center'},styles.bigbluebox, getWidthnHeight(25,3), getMarginTop(0.3)]}>
                <Text style = {[{color:'white', fontSize:12}]}>Under Policy</Text>
              </View>
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
              <View style ={[getMarginTop(-14), getMarginLeft(5)]}>
              <Text style = {[{fontWeight:'700', color:'white', fontSize:16, fontStyle:'italic'}]}>Have to go for service Delivery Work </Text>
              <View style = {{flexDirection:'row'}}>
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
              <View style = {[styles.smallbox]}>
              <Text style = {[{fontWeight:'700'},fontSizeH3]}> Final Status : </Text>
              <Text style = {[fontSizeH4]}>New </Text>
              </View>  
              </LinearGradient>
          </View> 
          
                {(this.state.index === '0')?
                 this.Itinerary() : 
                 (this.state.index === '1')?
                 this.Stay(): 
                 this.Imprest()
                }
          <View style = {[{borderWidth:1, borderColor:'#487DCB',backgroundColor:'#DAE7F7', alignItems:'center', justifyContent:'center'}, getWidthnHeight(55,8), getMarginTop(1), getMarginLeft(25)]}>
            <Text style = {[fontSizeH4()]}>Total Cost = Itinerary + Stay</Text>
            <Text style = {[{fontWeight:'bold', fontSize:18}]}>1090/-</Text>
          </View>     
          <View style = {[{borderWidth:1, borderColor:'#EDEDED',backgroundColor:'#DAE7F7'}, getWidthnHeight(95,0.2), getMarginTop(1), getMarginLeft(2.5)]}/>
          <View style = {[getMarginLeft(3), getMarginTop(0.5)]}>
            <Text style = {[{fontWeight:'bold', color:'#347FE5'},fontSizeH4()]}>APPROVAL / RECOMMENION STATUS</Text>
          </View>  
          <View style = {[{borderWidth:1, borderColor:'#487DCB', backgroundColor:'#DAE7F7'}, getWidthnHeight(95,15.5), getMarginTop(1), getMarginLeft(2.5)]}>
          <FlatList
              nestedScrollEnabled ={true}
              data={this.state.STATUS}
              initialNumToRender = {this.state.STATUS.length}
              renderItem={this.renderStatusItem}
              keyExtractor={item => item.id}
              ListFooterComponent={() => <View style ={[getWidthnHeight(undefined,0.3)]}/>}
              ItemSeparatorComponent = {()=><View style ={[{backgroundColor:'#3480E0'}, getMarginTop(0.3), getMarginLeft(2.5), getWidthnHeight(89,0.2)]}></View>}
          />
          </View> 
          <View style = {[{borderWidth:1, borderColor:'#DAE7F7', backgroundColor:'#DAE7F7'}, getWidthnHeight(95,0.2), getMarginTop(1), getMarginLeft(2.5)]}/>
          <View style = {[styles.Dropbox, getMarginLeft(2.5)]}>
          <Dropdown
                 containerStyle={[{justifyContent: 'center', borderColor: 'grey', borderWidth: 0, paddingLeft: 0, borderRadius: 10, marginTop:-5}, getWidthnHeight(100, 7)]}
                 //  maxLength = {12}
                 inputContainerStyle={[{borderBottomWidth:0, marginTop:4,alignSelf:'center'}, getWidthnHeight(90, 7.9)]}
                 label={'Status'}
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
          <View style = {[{borderWidth:0, borderColor:'#487DCB', backgroundColor:'white'}, getWidthnHeight(95,1.5), getMarginTop(1), getMarginLeft(2.5)]}/>
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
    height:getWidthnHeight(undefined,17).height,
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  },
  smallbox: {
    marginLeft:getMarginLeft(14).marginLeft,
    marginTop:getMarginTop(2.0).marginTop,
    height:getWidthnHeight(undefined,6.5).height,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    backgroundColor:'white',
    width:getWidthnHeight(66).width,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
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
});
