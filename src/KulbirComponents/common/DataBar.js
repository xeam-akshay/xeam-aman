import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getWidthnHeight} from './width';
import {GradientText} from './GradientText';

const DataBar = ({date, target, achievedTarget, dailyTarget, navigation, id, userID, month, employer}) => {
    const data = [];
    data.push({
        "id": id,
        "date": date, 
        "user_id": userID, 
        "target": target, 
        "achieved": achievedTarget, 
        "dailyTarget": dailyTarget, 
        "month": month,
    })
    console.log('Data Array: ', data)
    return (
        <View style={[styles.container, getWidthnHeight(90, 7)]}>
            
            <View style={{flexDirection: 'row', justifyContent: "space-around"}}>
                <Text style={{color: 'black'}}>{date}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{color: 'black'}}>Achieved Target: </Text>
                    <Text style={{color: '#06B485'}}>{`${dailyTarget}`}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    Actions.EditAchievedTarget({empArray: data, employer: employer})
                }}>
                    <Image style={{marginRight: 0, borderColor: 'black', borderWidth: 0, width: 20, height: 20}} source={require('../../Image/pencil32.png')}/>
                </TouchableOpacity>
            </View>
            
        </View>
    );
}

const styles = {
    container: {
        backgroundColor: 'white',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1, 
        borderColor: '#E72828', 
        justifyContent: 'center', 
        borderRadius: 5}
}

export {DataBar};