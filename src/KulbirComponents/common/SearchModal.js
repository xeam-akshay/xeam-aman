import React, { Component } from 'react';
import {Text, View, Modal} from 'react-native';
import {connect} from 'react-redux';
import {Button} from './Button';
import {getWidthnHeight} from './width';
import {Input} from './Input';
import {searchText} from '../../actions';

class SearchModal extends Component{

    render(){
        const {title, subtitle, visible, onDecline, buttonColor} = this.props;
        console.log("MODAL TEXT: ", this.props.text)
        
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
                    <Input 
                        updateContainer={[{flex: null, flexDirection: 'column', marginVertical: 20}, getWidthnHeight(90)]}
                        style={[styles.inputStyle, getWidthnHeight(80)]}
                        value={this.props.text.text}
                        onChangeText={(text) => {
                            //const number = text.replace(/[^0-9]/g, '')
                            //this.setState({text})
                            this.props.searchText(text);
                        }}
                        placeholder='Type here'
                        keyboardType='default'
                    />
                </View>
                
                <Button onPress={onDecline} style={[getWidthnHeight(90)]} buttonColor={buttonColor}>OK</Button>
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
    inputStyle: {
        flex: null, 
        borderColor: 'gray', 
        borderWidth: 1, 
        textAlign: 'left',
        height: 43,
        width: 370,
    },
};

const mapStateToProps = (state) => {
    //console.log("***Drawer***MAP STATE TO PROPS: ", state.enableDrawer.drawer, state.props)
    return {
      text: state.inputText
    }
  }

const SearchModalComponent = connect(mapStateToProps, {searchText})(SearchModal)
export {SearchModalComponent as SearchModal};