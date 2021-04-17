import React, { Component } from 'react';
import {Text, View, Modal} from 'react-native';
import MapView, {Polyline, Marker} from 'react-native-maps';
import {Button} from './Button';
import {getWidthnHeight} from './width';

class Confirm extends Component{
    state = {
        dimensions: undefined
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

    render(){
        const {title, visible, onDecline, distance, data, startPoint, initialRegion, index, date} = this.props;
        //console.log("MODAL: ", startPoint);
        //console.log("MODAL: ", initialRegion);
        let marginTop = null;
        if(this.state.dimensions){
            marginTop = {marginTop: Math.round(this.state.dimensions.height - 12)}
        }
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={() => {}}
        >
            <View style={styles.container}>
                <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginVertical: 0}}>{title}</Text>
                <View style={[styles.map, getWidthnHeight(100, 70)]}>
                    <View style={{borderColor: '#E72828', borderWidth: 1, alignItems: 'center'}}>
                        <MapView  
                            style={[getWidthnHeight(90, 60)]}
                            initialRegion={initialRegion}
                            onLayout={this.onLayout}
                        >
                            {/*First Location*/}
                            <Marker 
                                coordinate={startPoint}
                                pinColor='green'
                            />
                            {/*Last Location*/}
                            <Marker
                                coordinate={initialRegion}   
                            />
                            <Polyline strokeWidth={3} strokeColor={'#116DEB'} coordinates={data.map((coordinate) => {
                                //console.log("POLYLINE", coordinate)
                                return coordinate
                            })}/>
                        </MapView>
                        <View style={[{position: 'absolute', alignSelf: 'center', backgroundColor: '#EFE7DB', borderRadius: 5, borderColor: '#E72828', borderWidth: 1}, marginTop,getWidthnHeight(25)]}>
                            <Text style={{fontSize: 8, alignSelf: 'center'}}>{`Distance: ${distance} KM`}</Text>
                        </View>
                    </View>
                </View>
                <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16, marginBottom: 20}}>{`${index}. ${date}`}</Text>
                <Button onPress={onDecline} style={[{marginTop: 0, textAlign: 'center'}, getWidthnHeight(90)]}>Close</Button>
            </View>
        </Modal>
    )}
};

const styles = {
    container: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    },
    map: {
        marginTop: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 0
    },
};

export {Confirm};