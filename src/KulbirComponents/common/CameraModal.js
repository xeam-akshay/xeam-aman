import React, { Component } from 'react';
import {Text, View, Modal, Image, TouchableOpacity} from 'react-native';
import {Button} from './Button';
import {getWidthnHeight} from './width';
import {Camera} from './Camera';

class CameraModal extends Component{

    render(){
        const {title, subtitle, visible, onDecline, buttonColor} = this.props;
        
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={() => {}}
        >
            <View style={styles.container}>
                <View>
                    <Camera style={[getWidthnHeight(100, 90)]}/>
                </View>
                {/* {<Button onPress={onDecline} style={[getWidthnHeight(90)]} buttonColor={buttonColor}>Close</Button>} */}
            </View>
        </Modal>
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

export {CameraModal};