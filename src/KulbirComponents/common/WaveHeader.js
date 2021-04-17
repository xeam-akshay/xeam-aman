import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Svg, { Path, LinearGradient, Defs, Stop } from 'react-native-svg';
import Gradient from 'react-native-linear-gradient';
import {getWidthnHeight, getMarginRight, getMarginBottom, getMarginTop,getMarginLeft} from './width';
import {MenuIcon} from './MenuIcon';
import {waveHeaderHeight} from '../../actions';
import { Platform } from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

const calculate = Dimensions.get('window')

const COLOR1 = "#0E57CF";
const COLOR2 = "#25A2F9";

class WaveHeader extends Component {
    state = {
        waveMargin: null,
        logoDimensions: null,
        margin: null
    };

    componentDidMount(){
        const dimensions = getWidthnHeight(100, 10)
        this.setState({waveMargin: dimensions.height})
        this.setState({logoDimensions: dimensions})
        console.log("GET WIDTH n HEIGHT: ", getWidthnHeight(100, 100))
    }

    onLayout = (event) => {
        if(this.state.margin){
            return;
          }
          let width = Math.round(event.nativeEvent.layout.width)
          let height = Math.round(event.nativeEvent.layout.height)
          const screenHeight = getWidthnHeight(undefined, 100)
          this.setState({margin: {width, height}}, () => {
              console.log("LAYOUT HEIGHT: ", this.state.margin)
            })
    }

    fontSizeH3 = () => {
        const getWidth = calculate.width;
        let font_Size = null;
        if(getWidth < 360){
            font_Size = {fontSize: 18}
            return font_Size;
        } else {
            font_Size = {fontSize: 22}
            return font_Size;
        }
    }

    newdesignfontSizeH3 = () => {
        const getWidth = calculate.width;
        let font_Size = null;
        if(getWidth < 360){
            font_Size = {fontSize: 14}
            return font_Size;
        } else {
            font_Size = {fontSize: 18}
            return font_Size;
        }
    }

    render(){
        const {logo = null, menu, version, wave, title, menuState = true , designby = ''} = this.props;
        const {waveMargin, logoDimensions, dimensions, margin} = this.state;
        //console.log("WAVE HEADER: ", Actions);
        const menuDimensions = getWidthnHeight(100, 15);
        //let marginTop = null;
        let logoSize = {width: 164};
        let titleHeight = null;
        return (
            <View>
            {designby == '' ?  
            <View style={[{alignItems: 'center', borderColor: 'red', borderWidth: 0}, getWidthnHeight(100, 12)]}>
            <Gradient 
                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                colors={[COLOR1, COLOR2]}
                style={{flex: 1}}>
                {/* {(wave) ?
                <Svg style={[{borderColor: 'red', borderWidth: 0, position: 'relative'}, marginTop, getWidthnHeight(100, 13)]} viewBox="0 0 1440 320">
                    <Defs>
                        <LinearGradient id="path" x1="0" y1="1" x2="1" y2="1">
                        <Stop offset="0" stopColor={COLOR1} stopOpacity="1" />
                        <Stop offset="1" stopColor={COLOR2} stopOpacity="1" />
                    </LinearGradient>
                    </Defs>
                    
                    <Path 
                        fill="url(#path)" 
                        d="M0,160L80,181.3C160,203,320,245,480,224C640,203,800,117,960,106.7C1120,96,1280,160,1360,192L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z">
                    </Path>
                </Svg>
                : null
                } */}
            {(logo)?
                <View style={[{justifyContent: 'center', flexDirection: 'row', borderColor: 'white', borderWidth: 0}, getWidthnHeight(100, 12)]}>
                    <View style={{alignItems: 'center', justifyContent: 'center', borderColor: 'white', borderWidth: 0, flex: 1}}>
                        <TouchableOpacity onPress={() => Actions.drawerOpen()} style={[styles.imageStyle, {width: 70, height: 50}]}>
                            <MenuIcon boundary={menuDimensions} color={menu} />
                        </TouchableOpacity>
                    </View>
                    <View style={{borderColor: 'yellow', borderWidth: 0, alignItems: 'center', justifyContent: 'center', flex: 3}}>
                        <Image source={logo} style={[logoSize]}/>
                    </View>
                    <View style={{flex: 1}}/>
                </View>
            :
                null
            }
            {(menuState)?
                <View style={[{justifyContent: 'center', flexDirection: 'row', borderColor: 'white', borderWidth: 0}, getWidthnHeight(100, 12)]}>
                    <View style={{alignItems: 'center', justifyContent: 'center', borderColor: 'white', borderWidth: 0, flex: 1}}>
                        <TouchableOpacity onPress={() => Actions.drawerOpen()} style={[styles.imageStyle, {width: 70, height: 50}]}>
                            <MenuIcon boundary={menuDimensions} color={menu} />
                        </TouchableOpacity>
                    </View>
                    <View style={{borderColor: 'yellow', borderWidth: 0, alignItems: 'center', justifyContent: 'center', flex: 3}}>
                        <Text style={[{borderColor: 'white', borderWidth: 0, color: 'white', fontWeight: 'bold',textAlign: 'center', textAlignVertical: 'center', flex: 1}, this.fontSizeH3(), getWidthnHeight(60)]}>{title}</Text>
                    </View>
                    <View style={{flex: 1}}/>
                </View>
            :
                <View style={[{justifyContent: 'center', flexDirection: 'row', borderColor: 'white', borderWidth: 0}, getWidthnHeight(100, 12)]}>
                    <View style={{alignItems: 'center', justifyContent: 'center', borderColor: 'white', borderWidth: 0, flex: 1}}>
                        <TouchableOpacity onPress={() => Actions.pop()} style={[styles.imageStyle, {width: 20, height: 20}]}>
                            <Image source={require('../../Image/left.png')} style={{width: 25, height: 25}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{borderColor: 'yellow', borderWidth: 0, alignItems: 'center', justifyContent: 'center', flex: 3}}>
                        <Text style={[{borderColor: 'white', borderWidth: 0, color: 'white', fontWeight: 'bold',textAlign: 'center', textAlignVertical: 'center', flex: 1}, this.fontSizeH3(), getWidthnHeight(60)]}>{title}</Text>
                    </View>
                    <View style={{flex: 1}}/>
                </View>
            }
            </Gradient>
            </View>: 
            <View>
            <View style={[{alignItems: 'center', borderColor: 'red', borderWidth: 0}, getWidthnHeight(100, 8)]}>
            <Gradient 
                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                colors={[COLOR1, COLOR2]}
                style={{flex: 1}}>
                {/* {(wave) ?
                <Svg style={[{borderColor: 'red', borderWidth: 0, position: 'relative'}, marginTop, getWidthnHeight(100, 13)]} viewBox="0 0 1440 320">
                    <Defs>
                        <LinearGradient id="path" x1="0" y1="1" x2="1" y2="1">
                        <Stop offset="0" stopColor={COLOR1} stopOpacity="1" />
                        <Stop offset="1" stopColor={COLOR2} stopOpacity="1" />
                    </LinearGradient>
                    </Defs>
                    
                    <Path 
                        fill="url(#path)" 
                        d="M0,160L80,181.3C160,203,320,245,480,224C640,203,800,117,960,106.7C1120,96,1280,160,1360,192L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z">
                    </Path>
                </Svg>
                : null
                } */}
            {(logo)?
                <View style={[{flexDirection: 'row', borderColor: 'white', borderWidth: 0}]}>
                    <View style={{alignItems: 'center', justifyContent: 'center', borderColor: 'white', borderWidth: 0, flex: 1}}>
                        <TouchableOpacity onPress={() => Actions.drawerOpen()} style={[styles.imageStyle, {width: 70, height: 50}]}>
                            <MenuIcon boundary={menuDimensions} color={menu}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{borderColor: 'yellow', borderWidth: 0, alignItems: 'center', justifyContent: 'center', flex: 3}}>
                        <Image source={logo} style={[logoSize]}/>
                    </View>
                    <View style={{flex: 1}}/>
                </View>
            :
                null
            }
            {(menuState)?
                <View style={[{justifyContent: 'center', flexDirection: 'row', borderColor: 'white', borderWidth: 0}, getWidthnHeight(100, 8)]}>
                    <View style={{alignItems: 'center', justifyContent: 'center', borderColor: 'white', borderWidth: 0}}>
                        <TouchableOpacity onPress={() => Actions.drawerOpen()} style={[styles.imageStyle, {width: 60, height: 40}]}>
                            <MenuIcon boundary={menuDimensions} color={menu}  designby={'aman'} />
                        </TouchableOpacity>
                    </View>
                    <View style={[{borderColor: 'yellow', borderWidth: 0,}, getMarginLeft(2)]}>
                        <Text style={[{borderColor: 'white', borderWidth: 0, color: 'white', fontWeight: 'bold', textAlignVertical: 'center', flex: 1}, this.newdesignfontSizeH3(), getWidthnHeight(60)]}>{title}</Text>
                    </View>
                    <View style={{flex: 1}}/>
                </View>
            :
                <View style={[{justifyContent: 'center', flexDirection: 'row', borderColor: 'white', borderWidth: 0}, getWidthnHeight(100, 8)]}>
                <View style={{alignItems: 'center', justifyContent: 'center', borderColor: 'white', borderWidth: 0}}>
                    <TouchableOpacity onPress={() => Actions.pop()} style={[styles.imageStyle, {width: 60, height: 40}]}>
                        <FontAwesomeIcons name={'angle-left'} color={'white'} size={35}/>
                    </TouchableOpacity>
                </View>
                <View style={[{borderColor: 'yellow', borderWidth: 0,}, getMarginLeft(2)]}>
                    <Text style={[{borderColor: 'white', borderWidth: 0, color: 'white', fontWeight: 'bold', textAlignVertical: 'center', flex: 1}, this.newdesignfontSizeH3(), getWidthnHeight(60)]}>{title}</Text>
                </View>
                <View style={{flex: 1}}/>
            </View>
            }
            </Gradient>
            </View>
            </View>
            }
            </View>
            
        );
    }
}

const styles = {
  imageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 0,
    borderColor: 'black',
    borderWidth: 0,
    ...Platform.select({
        ios: {
            zIndex: 1
        }
    })
  }
}
// const WaveHeaderComponent = connect(null, {waveHeaderHeight})(WaveHeader);
// export {WaveHeaderComponent as WaveHeader};

export {WaveHeader};