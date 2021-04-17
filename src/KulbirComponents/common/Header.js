import React, { Component } from 'react';
import {Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { LinearTextGradient } from 'react-native-text-gradient';
import {Actions} from 'react-native-router-flux';
import {getWidthnHeight} from './width';
import {MenuIcon} from './MenuIcon';

const values = getWidthnHeight(100, 15)
const calculate = Dimensions.get('window')

class Header extends Component{
  state = {
    dimensions: undefined,
    title: undefined,
  }

  onLayout = (event) => {
    if(this.state.dimensions){
      return;
    }
    let width = Math.round(event.nativeEvent.layout.width)
    let height = Math.round(event.nativeEvent.layout.height)
    let data = event.nativeEvent.layout
    this.setState({dimensions: {width, height}})
  }

  secondLayout = (event) => {
    if(this.state.title){
      return;
    }
    let width = Math.round(event.nativeEvent.layout.width)
    let height = Math.round(event.nativeEvent.layout.height)
    let data = event.nativeEvent.layout
    this.setState({title: {width, height}})
  }

  fontSizeH3 = () => {
    const getWidth = calculate.width;
    let font_Size = null;
    if(getWidth < 360){
        font_Size = {fontSize: 14}
        return font_Size;
    } else {
        font_Size = {fontSize: 20}
        return font_Size;
    }
  } 

  render() {
  const {title, width, menu, images, menuState = true, hideIcon = false} = this.props;
  const {linearGradient, textBackground, imageStyle} = styles;
  const {dimensions} = this.state;
  let marginTop = null;
  let second = null;
  let logo321 = null;
  let logo322 = null;
  let logo641 = null;
  let logo642 = null;

  if(this.state.dimensions){
    logo321 = {width: Math.round(dimensions.height/2.5), height: Math.round(dimensions.height/2.5)}
    logo322 = {width: Math.round(dimensions.height/4), height: Math.round(dimensions.height/4)}
    logo641 = {width: Math.round(dimensions.height/1.7), height: Math.round(dimensions.height/1.7)}
    logo642 = {width: Math.round(dimensions.height/1.4), height: Math.round(dimensions.height/1.4)}
    //console.log("LOGO Dimensions: ", logo321, logo641, logo642)
  }

  if(this.state.title){
    second = {marginTop: Math.round((-1) * (this.state.title.height/2))}
  }
  
  return (
    <View style={[{borderColor: 'black', borderWidth: 0}, getWidthnHeight(100)]}>
      <View>  
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#F03030', '#E1721D']} style={[linearGradient, getWidthnHeight(100, 15)]} onLayout={this.onLayout}>
        {(images === undefined)?
        <View style={[{flexDirection: 'row', justifyContent: 'space-around', marginTop: 0, borderColor: 'black', borderWidth: 0}, getWidthnHeight(100, 15)]}>
          <View style={{borderColor: 'black', borderWidth: 0, alignSelf: 'flex-end'}}>
            <Image style={[styles.target641, logo641]} source={require('../../Image/target64.png')}/>
          </View>
          <Image style={[styles.target321, logo321]} source={require('../../Image/target32.png')}/>
          <View style={{borderColor: 'black', borderWidth: 0, alignSelf: 'center'}}>
            <Image style={[styles.target322, logo322]} source={require('../../Image/target32.png')}/>
          </View>
          <Image style={[styles.target642, logo642]} source={require('../../Image/target64.png')}/>
        </View>
        : null
        }
        </LinearGradient>
      </View>
          {(dimensions && menuState) ?
          <TouchableOpacity style={{borderColor: 'black', borderWidth: 0, position: 'absolute'}} onPress={() => Actions.drawerOpen()} style={imageStyle}>
            <MenuIcon boundary={dimensions} color={menu} />
          </TouchableOpacity>
          : 
          <TouchableOpacity onPress={() => Actions.pop()} style={styles.imageStyle}>
            <Image source={require('../../Image/left.png')}/>
          </TouchableOpacity>
          }
      <View style={[textBackground, width, second]} onLayout={this.secondLayout}>
      {(this.state.title) ?
        <View>
          <LinearTextGradient
            style={[{fontWeight: "bold", textAlign: 'center', borderWidth: 0, borderColor: 'black', textAlignVertical: 'center'}, width, this.fontSizeH3()]}
            locations={[0, 1]}
            colors={['#F71A1A', '#E1721D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
              <Text style={{borderWidth: 0, borderColor: 'black', textAlignVertical: 'center'}}>{title}</Text>
          </LinearTextGradient>
        </View>
        : null
      }
      </View>

    </View>
  )};
};

const styles = {
  container: {
    shadowColor: 'black',
    elevation: 8,
    position: 'relative',
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 95,
    borderBottomLeftRadius:25,
    borderBottomRightRadius: 25
  },
  textBackground: {
    // flexDirection:'column',
    // alignItems: 'center',
    justifyContent:'center',
    alignSelf: 'center', 
    marginTop: 0, 
    backgroundColor: 'white',
    width: 180,
    height: 40,
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 10,
    //position: 'absolute',
  },
  imageStyle: {
    justifyContent: 'flex-start',
    position: 'absolute',
    marginTop: 25,
    marginLeft: 10,
    width: 70,
    height: 50
  },
  target321: {
    borderColor: 'black',
    borderWidth: 0,
    opacity: 0.12,
    width: 40,
    height: 40,
    marginTop: 15
  },
  target322: {
    borderColor: 'black',
    borderWidth: 0,
    opacity: 0.12,
    width: 30,
    height: 30,
    marginTop: 15
  },
  target641: {
    borderColor: 'black',
    borderWidth: 0,
    opacity: 0.11,
  },
  target642: {
    borderColor: 'black',
    borderWidth: 0,
    opacity: 0.11,
    width: 80,
    height: 80,
    marginTop: 15
  },
};

export {Header};
