import React, {useState} from 'react';
import {Button, Text, View, StyleSheet,TouchableOpacity, FlatList,  TouchableHighlight} from 'react-native';
import Modal from 'react-native-modal';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {getMarginTop, getMarginLeft, fontSizeH3, getWidthnHeight, fontSizeH4} from './width';
import Icons from 'react-native-vector-icons/Fontisto';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import AntdesignIcons from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from 'react-native-elements';
import { Alert } from 'react-native';
import {Textbox} from './Textbox'

function ItineraryModal({isvisible, toggle, style, title, textboxtitle, textinputdata, inputbgStyle,
  iconname_1,
  iconsize_1,
  iconcolor_1,
  iconbgColor_1,
  textboxvalue_1,
  textboxplaceholder_1,
  boxcontainerStyle_1,
  iconname_2,
  iconsize_2,
  iconcolor_2,
  iconbgColor_2,
  textboxvalue_2,
  textboxplaceholder_2,
  boxcontainerStyle_2,
  iconfirst,
  containerstyle,
  textmarginleft
}) {
    const [isModalVisible, setModalVisible] = useState(true);
    const [id, setid] = useState('');
    
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    const DATA = [
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
      ];

      const tsetdown = ({item}) => {
        setid(item.id)
      }

      const tsetup = ({item}) => {
        setid('')
      }
      

      const renderItem = ({ item }) => (
       <View> 
        { id !== item.id ?( 
        <View style={styles.flatlistcontainer}>
            <View style={[styles.triangleCorner]}/>
            <View>
                <Text style={[{marginTop:getMarginTop(-5).marginTop, color:'white'}, fontSizeH4(),getMarginLeft(1)]}>{item.id}</Text>
                <View style={[{marginTop:getMarginTop(-5.5).marginTop,}]}>
                <TouchableOpacity onPress={() => tsetdown({item})} style={{width: '10%',height: 35,borderRadius: 35/2, borderWidth:0,marginLeft:getMarginLeft(75).marginLeft, marginTop:getMarginTop(3).marginTop}}>
                <View style={[getMarginTop(0.6), getMarginLeft(2)]}>   
                <Icons name='angle-down' color={'#3180E5'} size={18}/>
                </View> 
                </TouchableOpacity>               
                </View>
                
            </View>
            <Text style={[{color:'#3180E5', fontWeight:'700',}, getMarginTop(-4), getMarginLeft(10)]}>{item.date}</Text>
            <View style={{flexDirection:'row', marginTop:getMarginTop(0.5).marginTop}}>
                <Text style={[{color:'black'}, getMarginLeft(5)]}>{item.from}</Text>
                { iconfirst ?
                <View style={[{color:'black'}, getMarginLeft(2)]}>  
                <Icons name={iconfirst} color={'#000'} size={23}/>
                </View>:
                <Text>,</Text>
                }
                <Text style={[{color:'black'}, getMarginLeft(2)]}>{item.to}</Text>
            </View>
            <View style={[{flexDirection:'row'},getMarginLeft(-2)]}>
            <TouchableHighlight underlayColor="#3280E4" onPress= {() => console.log("button pressed")} style={{width: '9%',height: 30,borderRadius: 30/2, borderWidth:0, backgroundColor:'#DBE8F8', justifyContent:'center',marginLeft:getMarginLeft(67.5).marginLeft, marginTop:getMarginTop(1).marginTop}}>
            <View style={[getMarginTop(0.6), getMarginLeft(2)]}>   
            <FontAwesomeIcons name='edit' size={19}/>
            </View> 
            </TouchableHighlight>
            <TouchableHighlight underlayColor="#3280E4" onPress= {() => console.log("button pressed")} style={{width: '9%',height: 30,borderRadius: 30/2, borderWidth:0, backgroundColor:'#DBE8F8', justifyContent:'center',marginLeft:getMarginLeft(2).marginLeft, marginTop:getMarginTop(1).marginTop}}>
            <View style={[{alignItems:'center'}]}>   
            <AntdesignIcons name='delete' size={19}/>
            </View> 
            </TouchableHighlight>
            </View>
        </View>
        ) : (
          <View style={[styles.flatlistcontainer , containerstyle]}>
            <View style={[styles.triangleCorner]}/>
            <View>
                <Text style={[{marginTop:getMarginTop(-5).marginTop, color:'white'}, fontSizeH4(),getMarginLeft(1)]}>{item.id}</Text>
                <View style={[{marginTop:getMarginTop(-5.5).marginTop,}]}>
                  <TouchableOpacity onPress={() => tsetup({item})} style={{width: '10%',height: 35,borderRadius: 35/2, borderWidth:0,marginLeft:getMarginLeft(75).marginLeft, marginTop:getMarginTop(3).marginTop}}>
                  <View style={[{alignItems:'center'}]}>
                    <Icons name='angle-up' color={'#3180E5'} size={18}/>
                  </View>
                  </TouchableOpacity>  
                </View>
                
            </View>
            <Text style={[{color:'#3180E5', fontWeight:'700',}, getMarginTop(-4), getMarginLeft(10)]}>{item.date}</Text>
            <View style={{flexDirection:'row', marginTop:getMarginTop(0.5).marginTop}}>
                <Text style={[{color:'black'}, getMarginLeft(5)]}>{item.from}</Text>
                { iconfirst ? 
                <View style={[{color:'black'}, getMarginLeft(2)]}>  
                <Icons name={iconfirst} color={'#000'} size={23}/>
                </View>:
                <Text>,</Text>
                }
                <Text style={[{color:'black'}, getMarginLeft(2)]}>{item.to}</Text>
            </View>
            {textboxtitle?(
            <View style = {[{alignItems:'flex-start', flexDirection:'row'}, getMarginLeft(4.5), getMarginTop(1)]}>
                <Text style = {[{color:'#565656', fontWeight:'600'},fontSizeH3() ]}>{textboxtitle}</Text>
                <View style={[inputbgStyle]}>
                <Text style = {[{color:'#565656', fontWeight:'600', fontStyle:'italic'},fontSizeH3() ]}>{textinputdata}</Text>
                </View>
            </View>) 
            : null
            }
            <View style ={[{flexDirection:"row"}]}>
            <View style ={[getMarginLeft(4.5)]}>   
            <Textbox 
            boxcontainerStyle ={boxcontainerStyle_1}
            textboxplaceholder = {textboxplaceholder_1}
            textboxvalue = {textboxvalue_1}
            iconbgColor = {iconbgColor_1}
            iconname = {iconname_1}
            iconsize = {iconsize_1}
            iconcolor ={iconcolor_1}
            />
            </View>
            <View>
            <Textbox 
            boxcontainerStyle ={boxcontainerStyle_2}
            textboxplaceholder = {textboxplaceholder_2}
            textboxvalue = {textboxvalue_2}
            iconbgColor = {iconbgColor_2}
            iconname = {iconname_2}
            iconsize = {iconsize_2}
            iconcolor ={iconcolor_2}
            />
            </View>
            </View>
            <View style={[{flexDirection:'row'}, getMarginTop(2), getMarginLeft(-2)]}>
            <TouchableHighlight underlayColor="#3280E4" onPress= {() => console.log("button pressed")} style={{width: '9%',height: 30,borderRadius: 30/2, borderWidth:0, backgroundColor:'#DBE8F8', justifyContent:'center',marginLeft:getMarginLeft(67.5).marginLeft, marginTop:getMarginTop(1).marginTop}}>
            <View style={[getMarginTop(0.6), getMarginLeft(2)]}>   
            <FontAwesomeIcons name='edit' size={19}/>
            </View> 
            </TouchableHighlight>
            <TouchableHighlight underlayColor="#3280E4" onPress= {() => console.log("button pressed")} style={{width: '9%',height: 30,borderRadius: 30/2, borderWidth:0, backgroundColor:'#DBE8F8', justifyContent:'center',marginLeft:getMarginLeft(2).marginLeft, marginTop:getMarginTop(1).marginTop}}>
            <View style={[{alignItems:'center'}]}>   
            <AntdesignIcons name='delete' size={19}/>
            </View> 
            </TouchableHighlight>
            </View>
        </View>
        ) 
        }
        </View>
      );
    
  
      return (
        <View>
          <Modal 
          isVisible={isvisible}
          onBackdropPress={toggle}
          >    
            <View style={styles.container}>
                <View style={[{flexDirection:'row' ,borderTopLeftRadius:12, borderTopRightRadius:12, alignItems:'flex-start'},style,getWidthnHeight(90, 7)]}>
                    <Text style={[{fontSize:18, color:'white', fontWeight:'600',}, getMarginLeft(6), getMarginTop(1.3)]}>{title}</Text>
                    <View style={[{backgroundColor:'white', borderRadius:30, marginLeft:getMarginLeft(35).marginLeft, marginTop:getMarginTop(-2).marginTop}]}>
                    <TouchableOpacity onPress={toggle}>
                    <Icons name="close" color={'#3180E5'} size={35}/>
                    </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                <FlatList
                    data={DATA}
                    initialNumToRender = {DATA.length}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                </ScrollView>
            </View>
          </Modal>
         
        </View>
      );
  }

  const styles = StyleSheet.create({
    container:{
        width:getWidthnHeight(90).width,
        height:getWidthnHeight(undefined,60).height,
        backgroundColor: '#EEEEEE',
        borderWidth:0,
        borderColor: '#C4C4C4',
        alignItems:'center',
        borderRadius:12
      },
    flatlistcontainer:{
        width:getWidthnHeight(85).width,
        height:getWidthnHeight(undefined,13.5).height,
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
  });
  

export {ItineraryModal};