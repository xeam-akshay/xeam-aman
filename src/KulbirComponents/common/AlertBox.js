import React, { Component } from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import ActionModal from 'react-native-modal';
import {getWidthnHeight} from './width';

class AlertBox extends Component{
    constructor(props){
        super(props)
            this.state = {
                errorCode: null
            }
    }

    render(){
        const {title, subtitle = null, visible, onDecline, titleStyle, buttonText = "OK", color = false} = this.props;
        let extractColor = null;
        let colorText = null;
        let breakSentence = null;
        let sentence = null;
        if(color){
            extractColor = title.split(' ');
            colorText = extractColor[extractColor.length - 1];
            breakSentence = title.split(colorText)
            sentence = breakSentence[0]
        }
    return (
        <ActionModal 
            isVisible={visible}
            style={{justifyContent: 'center', alignItems: 'center'}}
            onBackdropPress={onDecline}
        >
            <View style={[{backgroundColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'space-evenly', borderWidth: 0, borderColor: 'red'}, getWidthnHeight(90, 15)]}>
                {(color)?
                    <View style={{flexDirection: 'row'}}>
                        <Text>{sentence}</Text>
                        <Text style={{color: colorText.toLowerCase()}}>{colorText}</Text>
                    </View>
                :
                    <View>
                        <Text style={[{textAlign: 'center', color: '#E72828'}, getWidthnHeight(80), titleStyle]}>{title}</Text>
                    </View>
                }
                
                <Text style={[{textAlign: 'center', color: '#E72828'}, getWidthnHeight(80)]}>{subtitle}</Text>
                <View style={[{borderWidth: 0, borderColor: 'red', alignItems: 'flex-end'},getWidthnHeight(90)]}>
                    <TouchableOpacity style={[{borderColor: 'green', borderWidth: 0, marginRight: 10, alignItems: 'center'}, getWidthnHeight(10)]} onPress={onDecline}>
                        <Text style={[{textAlign: 'center', fontWeight: 'bold'}, getWidthnHeight(10)]}>{buttonText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ActionModal>
    )}
};

export {AlertBox};