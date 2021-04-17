import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getWidthnHeight} from './width';
import {GradientText} from './GradientText';

const HolidayCard = ({holidayName, date, id}) => {
    return (
        <View style={styles.container}>
            <View style={{justifyContent: 'center'}}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={require('../../Image/chat.png')}/>
                    <Text style={{color: 'black', position: 'absolute', fontWeight: 'bold', fontSize: 14}}>{id}</Text>
                </View>
            </View>
            <View style={[{
                alignItems: 'flex-start', 
                backgroundColor: 'white', 
                shadowColor: 'black', 
                elevation: 5,
                borderRadius: 5,
                }, getWidthnHeight(70, 8)]}>
                <View style={[{marginHorizontal: 10, justifyContent: 'space-evenly'}, getWidthnHeight(undefined, 8)]}>
                    <GradientText title={holidayName} style={{fontSize: 14}}/>
                    <Text style={{color: 'black'}}>{date}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = {
    container: {
        backgroundColor: 'white',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0, 
        borderColor: '#E72828', 
        flexDirection: 'row',
        justifyContent: 'space-around', 
        borderRadius: 5,
        marginVertical: 10,
        backgroundColor: 'transparent'
    }
}

export {HolidayCard};