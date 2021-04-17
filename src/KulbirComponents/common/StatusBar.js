import React, {Component} from 'react';
import {Platform, StatusBar, View, Text} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Gradient from 'react-native-linear-gradient';
import {getWidthnHeight} from './width';

const COLOR1 = "#0E57CF";
const COLOR2 = "#25A2F9";

class IOS_StatusBar extends Component {
    render(){
        const {color, barStyle} = this.props;
        return (
            <View>
                <Gradient 
                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                    colors={color}
                    style={{height: getStatusBarHeight(true)}}>
                    <StatusBar hidden={false} barStyle={barStyle} />
                </Gradient>
            </View>
        );
    }
}

export {IOS_StatusBar};