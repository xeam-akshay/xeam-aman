import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getWidthnHeight} from './width';

const RoundButton = ({title, onPress, gradient, style}) => {
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <LinearGradient 
                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                    colors={gradient}
                    style={[styles.button, style]}>
                    <Text style={[{color:'white', fontSize: 14, textAlign: 'center', fontWeight: 'bold'}, getWidthnHeight(40)]}>{title}</Text>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    )
}

const styles = {
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        shadowColor: '#000000',
    },
}

export {RoundButton};