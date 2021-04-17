import React, { Component } from 'react';
import {Text, View, Modal, Image, TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {Camera, getWidthnHeight} from '../KulbirComponents/common';

class CameraScreen extends Component{

    render(){
        const {imageQuality = null, width = null, height = null} = this.props;
        
    return (
            <View style={styles.container}>
                <View>
                    <Camera imageQuality={imageQuality} width={width} height={height} style={[getWidthnHeight(100, 95)]}/>
                </View>
                {/* {<Button onPress={onDecline} style={[getWidthnHeight(90)]} buttonColor={buttonColor}>Close</Button>} */}
            </View>
    )}
};

const styles = {
    container: {
        backgroundColor: 'rgba(0,0,0,0.85)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
};

export default CameraScreen;