import React, { Component } from 'react';
import {Text, View, Modal, Platform, AsyncStorage, Alert} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {Button} from './Button';
import {getWidthnHeight} from './width';

class CommonModal extends Component{
    constructor(props){
        super(props)
            this.state = {
                errorCode: null
            }
    }
    async componentDidMount(){
        if(this.props.subtitle){
            const errorCode = Number (this.props.subtitle.split(': ')[1])
            console.log("### OUTSIDE ERROR CODE: ", errorCode)
            if(errorCode === 3){
                console.log("### INSIDE ERROR CODE: ", errorCode)
                this.setState({errorCode})
            }
        }
    }

    logoutWithoutApi = async() =>{
        console.log("&&&LOG OUT")
        await AsyncStorage.removeItem('receivedBaseURL');
        await AsyncStorage.removeItem('user_token');
        await AsyncStorage.removeItem('userObj');
        this.props.onDecline();
        Actions.auth();
        Alert.alert("Please Login Again");
    }

    render(){
        const {title, subtitle, visible, onDecline, buttonColor, buttonText = "OK"} = this.props;
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={() => {}}
        >
            <View style={styles.container}>
                <View style={[{backgroundColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'center'}, getWidthnHeight(90, 15)]}>
                    <Text style={[{textAlign: 'center', color: '#E72828'}, getWidthnHeight(80)]}>{title}</Text>
                    <Text style={[{textAlign: 'center', color: '#E72828'}, getWidthnHeight(80)]}>{subtitle}</Text>
                </View>
                <Button 
                    onPress={() => {
                        if(this.state.errorCode === 3){
                            this.logoutWithoutApi();
                            onDecline();
                        }else{
                            onDecline();
                        }
                    }} 
                    style={[{textAlign: 'center'}, getWidthnHeight(90)]} buttonColor={buttonColor}>{buttonText}</Button>
            </View>
        </Modal>
    )}
};

const styles = {
    container: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
};

export {CommonModal};